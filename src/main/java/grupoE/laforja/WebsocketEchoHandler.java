package grupoE.laforja;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@EnableScheduling
public class WebsocketEchoHandler extends TextWebSocketHandler {
	
	private ConcurrentHashMap<String, Room> rooms = new ConcurrentHashMap<>();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		/*System.out.println("Message received: " + message.getPayload());
		
		String msg = message.getPayload();
		session.sendMessage(new TextMessage(msg));*/
		//Usar aquí cosas concurrentes como ConcurrentHashMap para que no deje de funcionar todo
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(message.getPayload());
		System.out.println("Received message of type " + node.get("message_type").asText());
		switch (node.get("message_type").asText()) {
			case "OPEN":
				rooms.put(node.get("player_name").asText(), new Room(session, node.get("player_name").asText(), node.get("opponent_name").asText(),node.get("player_character").asText()));
				System.out.println("User's name: " + node.get("player_name").asText());
				System.out.println("Opponent's name: " + node.get("opponent_name").asText());
			break;
			case "OPEN2":
				System.out.println("User's name: " + node.get("player_name").asText());
				System.out.println("Opponent's name: " + node.get("opponent_name").asText());
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("opponent_name").asText()) && r.getP2Name().equals(node.get("player_name").asText())) {
						if (!r.isP2Online() && r.getP2Timeout() == -1) {
							//Si el jugador no está conectado, le metemos de forma normal
							if (r.getP2Character() == null) {
								r.setP2Character(node.get("player_character").asText());
							}
							r.setP2Name(node.get("player_name").asText());
							r.setP2Online(true);
							r.setP2Session(session);
							r.setFull(true);
							
							ObjectNode sendNode = createBeginGameMessage(mapper, r);
							System.out.println("Sending message " + sendNode.toString());
							r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
							r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
							
							
						} else {
							//Si el jugador ya estaba conectado, le sustituimos
							r.setP2Online(true);
							r.setP2Session(session);
							r.setP2Timeout(-1);
							ObjectNode sendNode = createBeginGameMessage(mapper, r);
							System.out.println("Sending message " + sendNode.toString());
							r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
							
						}
					} else if (r.getP2Name().equals(node.get("opponent_name").asText()) && r.getP1Name().equals(node.get("player_name").asText())) {
						if (!r.isP1Online() && r.getP1Timeout() == -1) {
							//Si el jugador no está conectado, le metemos de forma normal. No debería llegarse nunca a esta situación, vamos
							if (r.getP1Character() == null) {
								r.setP1Character(node.get("player_character").asText());
							}
							r.setP1Name(node.get("player_name").asText());
							r.setP1Online(true);
							r.setP1Session(session);
							r.setFull(true);
							
							
						} else {
							//Si el jugador ya estaba conectado, le sustituimos
							r.setP1Online(true);
							r.setP1Session(session);
							r.setP1Timeout(-1);
							ObjectNode sendNode = createBeginGameMessage(mapper, r);
							System.out.println("Sending message " + sendNode.toString());
							r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
							
						}
					}
				}
			break;
			case "GRAB TRAP":
				
			break;
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//No hay que echar al jugador de la sala, pero sí marcarlo como que se ha ido. Podrá volver, espero
		for (Room r : rooms.values()) {
			if (r.getP1Session().equals(session)) {
				r.setP1Timeout(30000);
			} else if (r.getP2Session().equals(session)) {
				r.setP2Timeout(30000);
			}
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//Comprobar si la sesión ya está en una sala. Si es así, volver a meterle. No se si esto va a funcionar. De hecho casi que va a ser mejor que esto no ocurra, creo. Pero a saber.
	}
	
	//Rehacer lo del timeout aquí también, y ya está. Acabamos antes.
	//Solo bajarlo si un jugador no está online, evidentemente
	
	
	//Función que se ejecuta cada segundo, o algo así. Hace lo mismo para todas las sesiones que [no se lo que iba a poner aquí]
	//Que sea cada 100 ms y nos quitamos de líos.
	@Scheduled(fixedDelay=100)
	public void serverTick() {
		ObjectMapper mapper = new ObjectMapper();
		for (Room r : rooms.values()) {
			if (r.isFull()) {
				if (r.isGameOver()) {
					//Si se acaba la partida, ver qué hay que hacer
					//Sólo debería ocurrir si alguien se desconecta y ha perdido, aunque complicado lo veo, ya que el juego le haría no irse del lobby y ya.
					
				} else {
					//Si no se ha acabado la partida, toca disminuir todos los valores del juego
					
					if (r.getP1Timeout() > 0) {
						r.setP1Timeout(r.getP1Timeout()-100);
						if (r.getP1Timeout() == 0) {
							r.setP1Online(false);
							//Tramitar victoria del jugador 2
						}
					}
					if (r.getP2Timeout() > 0) {
						r.setP2Timeout(r.getP2Timeout()-100);
						if (r.getP2Timeout() == 0) {
							r.setP2Online(false);
							//Tramitar victoria del jugador 1
						}
					}
					
					if (r.getGameTime() > -1000) {
						r.setGameTime(r.getGameTime()-100);
						//Enviar a los jugadores el tiempo que lleva la partida
						ObjectNode sendNode = mapper.createObjectNode();
						sendNode.put("message_type","game_time");
						sendNode.put("game_time", r.getGameTime());
						try {
							r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
							r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
						} catch (IOException e) {
							System.out.println(e);
						}
						
						if (r.getGameTime() <= 300000) {
							//Si la partida ha empezado
							//Cada 17 segundos se activa/desactiva la trampa. no hace falta guardar tiempos de trampas, cuando toque, se genera una trampa y se le envía a los clientes
							if (r.getGameTime()%17000 == 11000) {
								if (!r.isTrapActive()) {
									r.setTrapActive(true);
									if (r.getCurrentTrap().equals("none")) {
										//Generar aleatoriamente una trampa
										int trampa = (int) Math.round(Math.random());
										if (trampa == 0) {
											r.setCurrentTrap("trampaMuro");
										} else {
											r.setCurrentTrap("trampaReloj");
										}
										//Enviar al cliente la trampa nueva
										ObjectNode sendTrap = mapper.createObjectNode();
										sendTrap.put("message_type","trap_change");
										sendTrap.put("target", "altar");
										sendTrap.put("trap", r.getCurrentTrap());
										try {
											System.out.println("Sending message " + sendTrap.toString());
											r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
											r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
										} catch (IOException e) {
											System.out.println(e);
										}
									}
								} else if (r.isTrapActive()) {
									r.setTrapActive(false);
									r.setCurrentTrap("none");
									//Enviar al cliente que ya no hay trampa
									ObjectNode sendTrap = mapper.createObjectNode();
									sendTrap.put("message_type","trap_change");
									sendTrap.put("target", "altar");
									sendTrap.put("trap", r.getCurrentTrap());
									try {
										System.out.println("Sending message " + sendTrap.toString());
										r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
										r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
									} catch (IOException e) {
										System.out.println(e);
									}
								}
							}
							
							//Ahora vamos a modificar los tiempos de las estaciones de trabajo.
							//Vamos a trabajar en milisegundos aquí, pero en el cliente van de 0 a 100 (sin contar duraciones extras)
							
							
							//Enviar todas las estaciones de trabajo a los clientes
							
						}
					} else {
						//La partida se ha acabado. Mandar mensajes de que hasta aquí hemos llegado.
					}
					/*	private String[] p1Recipes; //Enviarla al conectarse por primera vez. Tendrá que perder elementos según se vayan entregando objetos.
						private String[] p2Recipes; //Enviarla al conectarse por primera vez. Lo mismo que lo de arriba.
						//Cuando el cliente diga que ha pillado una trampa, asignarle la que sea y ponerla a none. Si llega tarde pues mala suerte oye.
						private HashMap<String,Integer> stationTimes; //Habrá que inicializarlas en algún momento igual a lo mejor no se
						//Cada vez que un cliente interactúe con una estación de trabajo, hay que 
						//También hacer que si ambos jugadores se han desconectado se anule la partida. En api rest en cuanto uno se va se acabó. Aquí no vale eso.
						//Si hacemos que cuando se va uno gana el otro, todo bien. Si se van los dos, qué pasa? Sencillo.
						//Si uno se desconecta por timeout, le mandamos al otro un mensaje de que se acabó la fiesta y cerramos la sala.
						//Qué pasa si el otro no lo recibe? Pues da absolutamente igual, ya que es él el que debe mandar el resultado de la victoria por API REST.
						*/
				}
			}
		}
	}
	
	
	public ObjectNode createBeginGameMessage(ObjectMapper mapper, Room r) {
		ObjectNode sendNode = mapper.createObjectNode();
		sendNode.put("message_type","begin_game");
		sendNode.put("player_1", r.getP2Name());
		sendNode.put("p1_character", r.getP1Character());
		sendNode.put("p2_character", r.getP2Character());
		return sendNode;
	}
}
