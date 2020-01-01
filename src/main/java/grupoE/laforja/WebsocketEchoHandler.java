package grupoE.laforja;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
				rooms.put(node.get("player_name").asText(), new Room(session, node.get("player_name").asText(), node.get("opponent_name").asText()));
				System.out.println("User's name: " + node.get("player_name").asText());
				System.out.println("Opponent's name: " + node.get("opponent_name").asText());
			break;
			case "OPEN2":
				System.out.println("User's name: " + node.get("player_name").asText());
				System.out.println("Opponent's name: " + node.get("opponent_name").asText());
				for (Room r : rooms.values()) {
					if (r.getP1Name().equals(node.get("opponent_name").asText()) && r.getP2Name().equals(node.get("player_name").asText())) {
						System.out.println("Hola buenas tardes");
						if (!r.isP2Online() && r.getP2Timeout() == 4) {
							//Si el jugador no está conectado, le metemos de forma normal
							r.setP2Name(node.get("player_name").asText());
							r.setP2Online(true);
							r.setP2Session(session);
							r.setFull(true);
							
							ObjectNode sendNode = mapper.createObjectNode();
							sendNode.put("message_type","begin_game");
							System.out.println("Sending message " + sendNode.toString());
							r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
							r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
							
						} else {
							//Si el jugador ya estaba conectado, le sustituimos
							r.setP2Online(true);
							r.setP2Session(session);
							r.setP2Timeout(4);
							ObjectNode sendNode = mapper.createObjectNode();
							sendNode.put("message_type","begin_game");
							System.out.println("Sending message " + sendNode.toString());
							r.getP2Session().sendMessage(new TextMessage(sendNode.toString()));
						}
					} else if (r.getP2Name().equals(node.get("opponent_name").asText()) && r.getP1Name().equals(node.get("player_name").asText())) {
						if (!r.isP1Online() && r.getP1Timeout() == 4) {
							//Si el jugador no está conectado, le metemos de forma normal. No debería llegarse nunca a esta situación, vamos
							r.setP1Name(node.get("player_name").asText());
							r.setP1Online(true);
							r.setP1Session(session);
							r.setFull(true);
							
						} else {
							//Si el jugador ya estaba conectado, le sustituimos
							r.setP1Online(true);
							r.setP1Session(session);
							r.setP1Timeout(4);
							ObjectNode sendNode = mapper.createObjectNode();
							sendNode.put("message_type","begin_game");
							System.out.println("Sending message " + sendNode.toString());
							r.getP1Session().sendMessage(new TextMessage(sendNode.toString()));
						}
					}
				}
			break;
			case "TIMEOUT":
				
			break;
			
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//No hay que echar al jugador de la sala, pero sí marcarlo como que se ha ido. Podrá volver, espero
		//sessions.remove(session.getId());
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//Comprobar si la sesión ya está en una sala. Si es así, volver a meterle. No se si esto va a funcionar
	}
	
	//Rehacer lo del timeout aquí también, y ya está. Acabamos antes.
	//Solo bajarlo si un jugador no está online, evidentemente
}
