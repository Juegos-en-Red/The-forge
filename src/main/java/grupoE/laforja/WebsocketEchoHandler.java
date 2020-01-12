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
	private int sent = 0;
	
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
						if (!r.isP2Online()) {
							//Si el jugador no está conectado, le metemos de forma normal
							if (r.getP2Character() == null) {
								r.setP2Character(node.get("player_character").asText());
							}
							r.setP2Name(node.get("player_name").asText());
							r.setP2Online(true);
							r.setP2Session(session);
							r.setP2Timeout(-1);
							r.setFull(true);
							
							ObjectNode sendNode = createBeginGameMessage(mapper, r);
							System.out.println("Sending message " + sendNode.toString());
							if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
							if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
							
							//Enviar al cliente la trampa
							ObjectNode sendTrap = createSendTrapMessage(mapper, r);
							try {
								System.out.println("Sending message " + sendTrap.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
							//Enviar a los clientes las posiciones de ambos
							ObjectNode sendPos = mapper.createObjectNode();
							sendPos.put("message_type","player_move");
							sendPos.put("player1_x",r.getP1x());
							sendPos.put("player1_y",r.getP1y());
							sendPos.put("player2_x",r.getP2x());
							sendPos.put("player2_y",r.getP2y());
							try {
								System.out.println("Sending message " + sendPos.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
						} else {
							//Si el jugador ya estaba conectado, le sustituimos
							r.setP2Online(true);
							r.setP2Session(session);
							r.setP2Timeout(-1);
							ObjectNode sendNode = createBeginGameMessage(mapper, r);
							System.out.println("Sending message " + sendNode.toString());
							r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
							
							//Enviar al cliente la trampa
							ObjectNode sendTrap = createSendTrapMessage(mapper, r);
							try {
								System.out.println("Sending message " + sendTrap.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
							//Enviar a los clientes las posiciones de ambos
							ObjectNode sendPos = mapper.createObjectNode();
							sendPos.put("message_type","player_move");
							sendPos.put("player1_x",r.getP1x());
							sendPos.put("player1_y",r.getP1y());
							sendPos.put("player2_x",r.getP2x());
							sendPos.put("player2_y",r.getP2y());
							try {
								System.out.println("Sending message " + sendPos.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
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
							
							//Enviar al cliente la trampa
							ObjectNode sendTrap = createSendTrapMessage(mapper, r);
							try {
								System.out.println("Sending message " + sendTrap.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
							//Enviar a los clientes las posiciones de ambos
							ObjectNode sendPos = mapper.createObjectNode();
							sendPos.put("message_type","player_move");
							sendPos.put("player1_x",r.getP1x());
							sendPos.put("player1_y",r.getP1y());
							sendPos.put("player2_x",r.getP2x());
							sendPos.put("player2_y",r.getP2y());
							try {
								System.out.println("Sending message " + sendPos.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
							
						} else {
							//Si el jugador ya estaba conectado, le sustituimos
							r.setP1Online(true);
							r.setP1Session(session);
							r.setP1Timeout(-1);
							ObjectNode sendNode = createBeginGameMessage(mapper, r);
							System.out.println("Sending message " + sendNode.toString());
							r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
							
							//Enviar al cliente la trampa
							ObjectNode sendTrap = createSendTrapMessage(mapper, r);
							try {
								System.out.println("Sending message " + sendTrap.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
							
							//Enviar a los clientes las posiciones de ambos
							ObjectNode sendPos = mapper.createObjectNode();
							sendPos.put("message_type","player_move");
							sendPos.put("player1_x",r.getP1x());
							sendPos.put("player1_y",r.getP1y());
							sendPos.put("player2_x",r.getP2x());
							sendPos.put("player2_y",r.getP2y());
							try {
								System.out.println("Sending message " + sendPos.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
						}
					}
				}
			break;
			case "GRAB TRAP":
				for (Room r : rooms.values()) {
					if (!r.getCurrentTrap().equals("none")) {
						if (r.getP1Name().equals(node.get("player_name").asText())) {
							System.out.println("Trap grabbed by player " + node.get("player_name").asText());
							r.setP1Trap(r.getCurrentTrap());
							r.setCurrentTrap("none");
							//Enviar a los clientes la trampa
							ObjectNode sendTrap = createSendTrapMessage(mapper, r);
							try {
								System.out.println("Sending message " + sendTrap.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
						} else if (r.getP2Name().equals(node.get("player_name").asText())) { //Algo de aquí no va, no se muy bien el qué puede ser.
							System.out.println("Trap grabbed by player " + node.get("player_name").asText());
							r.setP2Trap(r.getCurrentTrap());
							r.setCurrentTrap("none");
							//Enviar a los clientes la trampa
							ObjectNode sendTrap = createSendTrapMessage(mapper, r);
							try {
								System.out.println("Sending message " + sendTrap.toString());
								if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
								if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
							} catch (IOException e) {
								//System.out.println(e);
							}
						}
					}
				}
				
			break;
			case "USE TRAP":
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("player_name").asText())) {
						if (r.getP1Trap().equals("trampaMuro")) {
							r.getStations().get("trampamuro2").setTime(1000);
							r.setP1Trap("none");
						} else if (r.getP1Trap().equals("trampaReloj")) {
							r.getStations().get("trampareloj2").setTime(250);
							r.setP1Trap("none");
						}
					} else if (r.getP2Name().equals(node.get("player_name").asText())) {
						if (r.getP2Trap().equals("trampaMuro")) {
							r.getStations().get("trampamuro1").setTime(1000);
							r.setP2Trap("none");
						} else if (r.getP2Trap().equals("trampaReloj")) {
							r.getStations().get("trampareloj1").setTime(250);
							r.setP2Trap("none");
						}
					}
				}
				
			break;
			
			case "PLAYER MOVE":
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("player_name").asText())) {
						r.setP1x(node.get("player_x").asInt());
						r.setP1y(node.get("player_y").asInt());
						r.setP1Spdx(node.get("player_spdx").asInt());
						r.setP1Spdy(node.get("player_spdy").asInt());
						r.setP1Dir(node.get("player_direction").asText());
						
					} else if (r.getP2Name().equals(node.get("player_name").asText())) {
						r.setP2x(node.get("player_x").asInt());
						r.setP2y(node.get("player_y").asInt());
						r.setP2Spdx(node.get("player_spdx").asInt());
						r.setP2Spdy(node.get("player_spdy").asInt());
						r.setP2Dir(node.get("player_direction").asText());
						
					}
				}
				
			break;
			case "INTERACT":
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("player_name").asText())) {
						r.setP1HeldObject(node.get("player_ho").asText());
						//ver a qué estación de trabajo se refiere y cambiar el objeto y el tiempo según toque
						for (Station s : r.getStations().values()) {
							if (s.getType().equals(node.get("station_type").asText()) && s.getPlayer() == (node.get("station_player").asInt())) {
								s.setTime(node.get("station_time").asDouble());
								s.setHeldObject(node.get("station_ho").asText());
								if (s.getType().equals("hornod") || s.getType().equals("yunqued")) {
									s.setHeldObject2(node.get("station_ho2").asText());
								}
							}
						}
						
					} else if (r.getP2Name().equals(node.get("player_name").asText())) {
						r.setP2HeldObject(node.get("player_ho").asText());
						//ver a qué estación de trabajo se refiere y cambiar el objeto y el tiempo según toque
						for (Station s : r.getStations().values()) {
							if (s.getType().equals(node.get("station_type").asText()) && s.getPlayer() == (node.get("station_player").asInt())) {
								s.setTime(node.get("station_time").asDouble());
								s.setHeldObject(node.get("station_ho").asText());
								if (s.getType().equals("hornod") || s.getType().equals("yunqued")) {
									s.setHeldObject2(node.get("station_ho2").asText());
								}
							}
						}
					}
				}
				break;
			case "INTERACT_TIMER":
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("player_name").asText())) {;
						//ver a qué estación de trabajo se refiere y cambiar el tiempo según toque
						for (Station s : r.getStations().values()) {
							if (s.getType().equals(node.get("station_type").asText()) && s.getPlayer() == (node.get("station_player").asInt())) {
								s.setTime(node.get("station_time").asDouble());
							}
						}
						
					} else if (r.getP2Name().equals(node.get("player_name").asText())) {
						//ver a qué estación de trabajo se refiere y cambiar el tiempo según toque
						for (Station s : r.getStations().values()) {
							if (s.getType().equals(node.get("station_type").asText()) && s.getPlayer() == (node.get("station_player").asInt())) {
								s.setTime(node.get("station_time").asDouble());
							}
						}
					}
				}
				break;
			case "INTERACT_MONSTER":
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("player_name").asText())) {
						if (node.get("monster").asInt() == 1) {
							if (r.getP1HeldObject().equals(r.getP1Recipes()[0])) {
								if (r.getP1Recipes()[1].equals("none")) {
									r.setP1MHeldObject4(r.getP1HeldObject());
								} else if (r.getP1Recipes()[2].equals("none")) {
									r.setP1MHeldObject3(r.getP1HeldObject());
								} if (r.getP1Recipes()[3].equals("none")) {
									r.setP1MHeldObject2(r.getP1HeldObject());
								} else {
									r.setP1MHeldObject1(r.getP1HeldObject());
								}
								r.setP1HeldObject("none");
								r.getP1Recipes()[0] = r.getP1Recipes()[1];
								r.getP1Recipes()[1] = r.getP1Recipes()[2];
								r.getP1Recipes()[2] = r.getP1Recipes()[3];
								r.getP1Recipes()[3] = "none";
								if (r.getP1Recipes()[0].equals("none")) {
									System.out.println("Player 1 is the winner!");
									//llamar al método de victoria por aquí
									gameOver(2,r);
								}
							}
						} else if (node.get("monster").asInt() == 2) {
							if (r.getP1HeldObject().equals(r.getP2Recipes()[0])) {
								if (r.getP2Recipes()[1].equals("none")) {
									r.setP2MHeldObject4(r.getP1HeldObject());
								} else if (r.getP2Recipes()[2].equals("none")) {
									r.setP2MHeldObject3(r.getP1HeldObject());
								} if (r.getP2Recipes()[3].equals("none")) {
									r.setP2MHeldObject2(r.getP1HeldObject());
								} else {
									r.setP2MHeldObject1(r.getP1HeldObject());
								}
								r.setP1HeldObject("none");
								r.getP2Recipes()[0] = r.getP2Recipes()[1];
								r.getP2Recipes()[1] = r.getP2Recipes()[2];
								r.getP2Recipes()[2] = r.getP2Recipes()[3];
								r.getP2Recipes()[3] = "none";
								if (r.getP2Recipes()[0].equals("none")) {
									System.out.println("Player 2 is the winner!");
									//llamar al método de victoria por aquí
									gameOver(1,r);
								}
							}
						}
						
					} else if (r.getP2Name().equals(node.get("player_name").asText())) {
						if (node.get("monster").asInt() == 1) {
							if (r.getP2HeldObject().equals(r.getP1Recipes()[0])) {
								if (r.getP1Recipes()[1].equals("none")) {
									r.setP1MHeldObject4(r.getP2HeldObject());
								} else if (r.getP1Recipes()[2].equals("none")) {
									r.setP1MHeldObject3(r.getP2HeldObject());
								} if (r.getP1Recipes()[3].equals("none")) {
									r.setP1MHeldObject2(r.getP2HeldObject());
								} else {
									r.setP1MHeldObject1(r.getP2HeldObject());
								}
								r.setP2HeldObject("none");
								r.getP1Recipes()[0] = r.getP1Recipes()[1];
								r.getP1Recipes()[1] = r.getP1Recipes()[2];
								r.getP1Recipes()[2] = r.getP1Recipes()[3];
								r.getP1Recipes()[3] = "none";
								if (r.getP1Recipes()[0].equals("none")) {
									System.out.println("Player 1 is the winner!");
									//llamar al método de victoria por aquí
									gameOver(2,r);
								}
							}
						} else if (node.get("monster").asInt() == 2) {
							if (r.getP2HeldObject().equals(r.getP2Recipes()[0])) {
								if (r.getP2Recipes()[1].equals("none")) {
									r.setP2MHeldObject4(r.getP2HeldObject());
								} else if (r.getP2Recipes()[2].equals("none")) {
									r.setP2MHeldObject3(r.getP2HeldObject());
								} if (r.getP2Recipes()[3].equals("none")) {
									r.setP2MHeldObject2(r.getP2HeldObject());
								} else {
									r.setP2MHeldObject1(r.getP2HeldObject());
								}
								r.setP2HeldObject("none");
								r.getP2Recipes()[0] = r.getP2Recipes()[1];
								r.getP2Recipes()[1] = r.getP2Recipes()[2];
								r.getP2Recipes()[2] = r.getP2Recipes()[3];
								r.getP2Recipes()[3] = "none";
								if (r.getP2Recipes()[0].equals("none")) {
									System.out.println("Player 2 is the winner!");
									//llamar al método de victoria por aquí
									gameOver(1,r);
								}
							}
						}
					}
				}
				break;
			case "SURRENDER":
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("player_name").asText())) {
						gameOver(2,r);
					} else if (r.getP2Name().equals(node.get("player_name").asText())) {
						gameOver(1,r);
					}
				}
			break;
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//No hay que echar al jugador de la sala, pero sí marcarlo como que se ha ido. Podrá volver, espero
		System.out.println("Session disconnected: " + session.getId() + ". Status: " + status);
		for (Room r : rooms.values()) {
			if (r.getP1Session() == session) {
				r.setP1Timeout(30000);
				r.setP1Session(null);
			} else if (r.getP2Session() == session) {
				r.setP2Timeout(30000);
				r.setP2Session(null);
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
	//Al final es cada 25 pero como si fuera cada 100
	@Scheduled(fixedDelay=25)
	public void serverTick() {
		ObjectMapper mapper = new ObjectMapper();
		for (Room r : rooms.values()) {
			//if (r.isFull()) { //Quitar esto me va a causar más problemas que otra cosa
				if (r.isGameOver()) {
					//Si se acaba la partida, ver qué hay que hacer
					//Sólo debería ocurrir si alguien se desconecta y ha perdido, aunque complicado lo veo, ya que el juego le haría no irse del lobby y ya.
					
				} else {
					
					if (r.getP1Timeout() > 0) {
						r.setP1Timeout(r.getP1Timeout()-25);
						if (r.getP1Timeout() <= 0) {
							r.setP1Online(false);
							//Tramitar victoria del jugador 2
							gameOver(2,r);
						}
					}
					if (r.getP2Timeout() > 0) {
						r.setP2Timeout(r.getP2Timeout()-25);
						if (r.getP2Timeout() <= 0) {
							r.setP2Online(false);
							//Tramitar victoria del jugador 1
							gameOver(1,r);
						}
					}
					
					//Enviar el timeout de un jugador al otro para que sepa si se ha ido o algo
					try {
						ObjectNode sendPos = mapper.createObjectNode();
						sendPos.put("message_type","timeout");
						sendPos.put("op_timeout",r.getP2Timeout());
						if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
						 sendPos = mapper.createObjectNode();
						sendPos.put("message_type","timeout");
						sendPos.put("op_timeout",r.getP1Timeout());
						if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
					} catch (Exception e) {
						//System.out.println(e);
					}
					if (r.isP1Online() && r.isP2Online() && r.getP1Timeout() == -1 && r.getP2Timeout() == -1) { //Si ambos jugadores están conectados, seguimos calculando todo. Si no, se pausa.
						//Enviar a los clientes las posiciones de ambos
						
						try {
							ObjectNode sendPos = mapper.createObjectNode();
							sendPos.put("message_type","player_move_single");
							sendPos.put("player",2);
							sendPos.put("player_x",r.getP2x());
							sendPos.put("player_y",r.getP2y());
							sendPos.put("player_spdx",r.getP2Spdx());
							sendPos.put("player_spdy",r.getP2Spdy());
							sendPos.put("player_direction",r.getP2Dir());
							if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
							sendPos = mapper.createObjectNode();
							sendPos.put("message_type","player_move_single");
							sendPos.put("player",1);
							sendPos.put("player_x",r.getP1x());
							sendPos.put("player_y",r.getP1y());
							sendPos.put("player_spdx",r.getP1Spdx());
							sendPos.put("player_spdy",r.getP1Spdy());
							sendPos.put("player_direction",r.getP1Dir());
							if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
						} catch (IOException e) {
							//System.out.println(e);
						}
						
						//Vamos a enviar las recetas a ambos clientes
						try {
							ObjectNode sendPos = mapper.createObjectNode();
							sendPos.put("message_type","recetas");
							sendPos.put("receta_p1_0",r.getP1Recipes()[0]);
							sendPos.put("receta_p1_1",r.getP1Recipes()[1]);
							sendPos.put("receta_p1_2",r.getP1Recipes()[2]);
							sendPos.put("receta_p1_3",r.getP1Recipes()[3]);
							sendPos.put("receta_p2_0",r.getP2Recipes()[0]);
							sendPos.put("receta_p2_1",r.getP2Recipes()[1]);
							sendPos.put("receta_p2_2",r.getP2Recipes()[2]);
							sendPos.put("receta_p2_3",r.getP2Recipes()[3]);
							if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendPos.toString()));
							if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendPos.toString()));
						} catch (IOException e) {
							//System.out.println(e);
						}
						
						//Si toca, enviamos el resto de información
						if (sent == 0) {
							sent = 1;
						} else {
							sent++;
							if (sent > 2) { //Estoy convencido de que esto debería ser un 3 pero bueno
								sent = 0;
							}
							return;
						}
						
						
						//Si no se ha acabado la partida, toca disminuir todos los valores del juego
						
						
						
						if (r.getGameTime() > -1000) {
							r.setGameTime(r.getGameTime()-100);
							//Enviar a los jugadores el tiempo que lleva la partida
							ObjectNode sendNode = mapper.createObjectNode();
							sendNode.put("message_type","game_time");
							sendNode.put("game_time", r.getGameTime());
							//if (r.getGameTime() >= 300000 || r.getGameTime()%1000 == 0) { //quitar esto por favor
								try {
									//System.out.println("Sending message " + sendNode.toString());
									if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
									if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
									//System.out.println("Time sent.");
								} catch (IOException e) {
									//System.out.println(e);
								}
							//}
							if (r.getGameTime() <= 0) {
								int puntos1=0,puntos2=0;
								for (int i = 0; i < 4; i++) {
									if (r.getP1Recipes()[i].equals("none")) {
										puntos1++;
									}

									if (r.getP2Recipes()[i].equals("none")) {
										puntos2++;
									}
								}
								if (puntos1 > puntos2) {
									gameOver(2,r);
								} else if (puntos1 < puntos2) {
									gameOver(1,r);
								} else {
									gameOver(0,r);
								}
								
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
											
										}
									} else if (r.isTrapActive()) {
										r.setTrapActive(false);
										r.setCurrentTrap("none");
									}
								}
								//Enviar al cliente las trampas
								ObjectNode sendTrap = createSendTrapMessage(mapper, r);
								try {
									System.out.println("Sending message " + sendTrap.toString());
									if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendTrap.toString()));
									if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendTrap.toString()));
								} catch (IOException e) {
									//System.out.println(e);
								}
								
								//Ahora vamos a modificar los tiempos de las estaciones de trabajo.
								for (Station s : r.getStations().values()) {
									s.updateTimer();
								}
								
								
								//Enviar todas las estaciones de trabajo a los clientes
								try {
									ObjectNode sendStations = mapper.createObjectNode();
									sendStations.put("message_type","estaciones");
									//enviar objetos de los jugadores
									sendStations.put("p1_ho",r.getP1HeldObject());
									sendStations.put("p2_ho",r.getP2HeldObject());
									//enviar información de las estaciones de trabajo
									for (Station s : r.getStations().values()) {
										sendStations.put(s.getType()+s.getPlayer()+"time",s.getTime());
										sendStations.put(s.getType()+s.getPlayer()+"ho",s.getHeldObject());
										if (s.getType().equals("hornod") || s.getType().equals("yunqued")) {
											sendStations.put(s.getType()+s.getPlayer()+"ho2",s.getHeldObject2());
										}
									}
									//enviar objetos de los monstruos
									sendStations.put("p1m_ho1",r.getP1MHeldObject1());
									sendStations.put("p1m_ho2",r.getP1MHeldObject2());
									sendStations.put("p1m_ho3",r.getP1MHeldObject3());
									sendStations.put("p1m_ho4",r.getP1MHeldObject4());
									sendStations.put("p2m_ho1",r.getP2MHeldObject1());
									sendStations.put("p2m_ho2",r.getP2MHeldObject2());
									sendStations.put("p2m_ho3",r.getP2MHeldObject3());
									sendStations.put("p2m_ho4",r.getP2MHeldObject4());
									//enviar los mensajes a los clientes
									if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendStations.toString()));
									if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendStations.toString()));
								} catch (IOException e) {
									//System.out.println(e);
								}
							}
						
						}
					} else {
						//La partida se ha acabado. Mandar mensajes de que hasta aquí hemos llegado.
					}
				}
			//}
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
	
	public ObjectNode createSendTrapMessage(ObjectMapper mapper, Room r) {
		ObjectNode sendTrap = mapper.createObjectNode();
		sendTrap.put("message_type","trap_change");
		sendTrap.put("altarTrap", r.getCurrentTrap());
		sendTrap.put("p1Trap", r.getP1Trap());
		sendTrap.put("p2Trap", r.getP2Trap());
		return sendTrap;
	}
	
	public void gameOver(int winner, Room r) {
		ObjectMapper mapper = new ObjectMapper();
		//Enviar todas las estaciones de trabajo a los clientes no está de más
		try {
			ObjectNode sendStations = mapper.createObjectNode();
			sendStations.put("message_type","estaciones");
			//enviar objetos de los jugadores
			sendStations.put("p1_ho",r.getP1HeldObject());
			sendStations.put("p2_ho",r.getP2HeldObject());
			//enviar información de las estaciones de trabajo
			for (Station s : r.getStations().values()) {
				sendStations.put(s.getType()+s.getPlayer()+"time",s.getTime());
				sendStations.put(s.getType()+s.getPlayer()+"ho",s.getHeldObject());
				if (s.getType().equals("hornod") || s.getType().equals("yunqued")) {
					sendStations.put(s.getType()+s.getPlayer()+"ho2",s.getHeldObject2());
				}
			}
			//enviar objetos de los monstruos
			sendStations.put("p1m_ho1",r.getP1MHeldObject1());
			sendStations.put("p1m_ho2",r.getP1MHeldObject2());
			sendStations.put("p1m_ho3",r.getP1MHeldObject3());
			sendStations.put("p1m_ho4",r.getP1MHeldObject4());
			sendStations.put("p2m_ho1",r.getP2MHeldObject1());
			sendStations.put("p2m_ho2",r.getP2MHeldObject2());
			sendStations.put("p2m_ho3",r.getP2MHeldObject3());
			sendStations.put("p2m_ho4",r.getP2MHeldObject4());
			//enviar los mensajes a los clientes
			if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendStations.toString()));
			if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendStations.toString()));
		} catch (IOException e) {
			//System.out.println(e);
		}
		
		
		
		//Enviar a ambos el nombre del ganador con un mensaje de victoria
		ObjectNode sendWinner = mapper.createObjectNode();
		sendWinner.put("message_type","winner");
		if (winner == 0) {
			sendWinner.put("winner", "none");
		} else if (winner == 1) {
			sendWinner.put("winner", r.getP1Name());
		} else if (winner == 2) {
			sendWinner.put("winner", r.getP2Name());
		}
		try {
			System.out.println("Sending message " + sendWinner.toString());
			if (r.getP1Session() != null) if (r.getP1Session().isOpen()) r.getP1Session().sendMessage(new TextMessage(sendWinner.toString()));
			if (r.getP2Session() != null) if (r.getP2Session().isOpen()) r.getP2Session().sendMessage(new TextMessage(sendWinner.toString()));
		} catch (IOException e) {
			//System.out.println(e);
		}
		//Importante destruir la sala, ya no tiene sentido que siga existiendo
		System.out.println("Removed room: " + r.getP1Name() + " vs. " + r.getP2Name());
		rooms.remove(r.getP1Name());
	}
}
