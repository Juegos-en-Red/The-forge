package grupoE.laforja;


import grupoE.laforja.Player;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.annotation.PostConstruct;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@EnableScheduling
@CrossOrigin
@RestController
public class PlayerController {
	private Player[] players = new Player[100]; //Array que guarda los jugadores conectados
	private boolean[] ids = new boolean[100]; //Array que guarda si los ids de los jugadores están ocupados
	private ArrayList<Player> registeredPlayers = new ArrayList<Player>(); //Lista que guarda los jugadores registrados
	private ArrayList<ChatMessage> fullChat = new ArrayList<ChatMessage>(); //Lista que guarda todo el chat histórico
	
	/*
	 * Método init()
	 * Se ejecuta al iniciar el servidor
	 * Lee los archivos "users.txt" y "chat.txt" y carga su información en el ArrayList correspondiente
	 * */
	@PostConstruct
	public void init() {
		try {
			BufferedReader in = new BufferedReader(new FileReader ("users.txt"));
			String line = in.readLine();
			
			while (line != null) {
				String name = line;
				line = in.readLine();
				String password = line;
				line = in.readLine();
				String character = line;
				line = in.readLine();
				int wins = Integer.parseInt(line);
				line = in.readLine();
				int losses = Integer.parseInt(line);
				line = in.readLine();
				registeredPlayers.add(new Player(name, password, character, wins, losses));
			}
			
			in.close();
			
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
		} catch (IOException e) {
			//e.printStackTrace();
		}
		
		try {
			BufferedReader in = new BufferedReader(new FileReader ("chat.txt"));
			String line = in.readLine();
			
			while (line != null) {
				int id = Integer.parseInt(line);
				line = in.readLine();
				String time = line;
				line = in.readLine();
				String sender = line;
				line = in.readLine();
				String message = line;
				line = in.readLine();

				fullChat.add(new ChatMessage(id, time, sender, message));
			}
			
			in.close();
			
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
		} catch (IOException e) {
			//e.printStackTrace();
		}
		
	}
	
	
	/*
	 * GET "/players/"
	 * Al hacer esta petición, se devuelve un array con los jugadores conectados.
	 * Devuelve toda la información relativa a los jugadores, incluidas contraseñas, por lo que el método no se usa.
	 * */
	/*@GetMapping("/players/")
	public Player[] players() {
		return players;
	}*/
	
	/*
	 * GET "/freeslots/"
	 * Al hacer esta petición, se devuelve el número de huecos disponibles en el servidor
	 * */
	@GetMapping("/freeSlots/")
	public int freeSlots() {
		int i = ids.length;
		for (int j = 0; j < ids.length; j++) {
			if (ids[j]) {
				i--;
			}
		}
		return i;
	}
	
	/*
	 * Método getFirstFreeSlot()
	 * Recorre el array de ids hasta que encuentra el primero sin ocupar, y devuelve su posición
	 * */
	private int getFirstFreeSlot() {
		for(int i = 0; i < ids.length; i++) {
			if (!ids[i]) {
				return i;
			}
		}
		return -1;
	}
	
	/*
	 * POST "/players/"
	 * Método post que se utilizaba para subir los datos del jugador al servidor. Ahora se utilizan login y register.
	 * */
	/*@PostMapping("/players/")
	public ResponseEntity<Integer> newPlayer(@RequestBody Player player) {
		for (int i = 0; i < ids.length; i++) {
			if (!ids[i]) {
				System.out.println(i);
				player.setId(i);
				players[i] = player;
				ids[i] = true;
				return new ResponseEntity<>(i,HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}*/
	
	
	/*
	 * POST "/login/"
	 * Al hacer esta petición, se comprueba si el jugador existe y si la contraseña es correcta, y se devuelve un código de estado apropiado para cada situación.
	 * */
	@PostMapping("/login/")
	public ResponseEntity<Integer> login(@RequestBody Player player) {
		for (int i = 0; i < players.length; i++) {
			if (ids[i]) {
				if (players[i].getName().equals(player.getName())) {
					if (players[i].getTimeout() > 0) {
						return new ResponseEntity<>(i,HttpStatus.CONFLICT);
					} else {
						if (players[i].getPassword().equals(player.getPassword())) {
							player.setId(i);
							/*players[player.getId()] = player;
							ids[player.getId()] = true;*/
							players[i].setTimeout(4);
							return new ResponseEntity<>(player.getId(),HttpStatus.OK);
						} else {
							return new ResponseEntity<>(-1, HttpStatus.UNAUTHORIZED);
						}
					}
				}
			}
		}
		
		for (Player p : registeredPlayers) {
			if (p.getName().equals(player.getName())) {
				if (p.getPassword().equals(player.getPassword())) {
					p.setSendingChallenge(false);
					player = p;
					player.setId(getFirstFreeSlot());
					players[player.getId()] = player;
					ids[player.getId()] = true;
					//System.out.println("OK");
					//System.out.println(players[player.getId()].getCharacter());
					return new ResponseEntity<>(player.getId(),HttpStatus.OK);
				} else {
					//System.out.println("UNAUTHORIZED");
					return new ResponseEntity<>(-1, HttpStatus.UNAUTHORIZED);
				}
			}
		}
		
		//System.out.println("NOT FOUND");
		return new ResponseEntity<>(-1, HttpStatus.NOT_FOUND);
	}
	
	/*
	 * POST "/register/"
	 * Al hacer esta petición, se comprueba que el jugador todavía no exista. En caso afirmativo, se añade a la lista de jugadores.
	 * */
	@PostMapping("/register/")
	public ResponseEntity<Integer> register(@RequestBody Player player) {
		int firstEmptyId = getFirstFreeSlot();
		
		if (player.getName().length() > 12) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}

		for (Player p : registeredPlayers) {
			if (p.getName().equals(player.getName())) {
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}
		}
		registeredPlayers.add(player);
		player.setId(firstEmptyId);
		players[firstEmptyId] = player;
		ids[firstEmptyId] = true;
		try {
			BufferedWriter out = new BufferedWriter(new FileWriter ("users.txt", true));
			out.append(player.getName());
			out.newLine();
			out.append(player.getPassword());
			out.newLine();
			out.append(player.getCharacter());
			out.newLine();
			out.append(String.valueOf(player.getWins()));
			out.newLine();
			out.append(String.valueOf(player.getLosses()));
			out.newLine();
			out.close();
		} catch (IOException e) {
			
			//e.printStackTrace();
		}
		return new ResponseEntity<>(firstEmptyId,HttpStatus.CREATED);
	}
	
	
	
	/*
	 * PUT "/players/id"
	 * Al hacer esta petición, se actualiza toda la información del jugador con la que se suba. No se usa ya que sube demasiada información innecesaria.
	 * */
	/*@PutMapping("/players/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable int id, @RequestBody Player player) {
		if (ids[id]) {
			player.setId(id);
			players[id] = player;
			return new ResponseEntity<>(player,HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}*/
	
	/*
	 * PUT "/reminder/id"
	 * Al hacer esta petición, si hay un jugador en la id especificada, se actualiza su timeout a 4 segundos.
	 * */
	@PutMapping("/reminder/{id}")
	public ResponseEntity<Integer> resetTimeout(@PathVariable int id, @RequestBody String name) {
		if (id >= 0) {
			if (ids[id]) {
				if (players[id].getName().equals(name)) { //Esto igual da algún error, si se echa a los jugadores de forma rara es por esto probablemente
					players[id].setTimeout(4);
					return new ResponseEntity<>(4,HttpStatus.OK);
				} else {
					return new ResponseEntity<>(HttpStatus.CONFLICT); 
				}
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	/*
	 * DELETE "/players/id"
	 * Al hacer esta petición, si hay un jugador en la id especificada, se elimina del servidor en todos los lugares en los que pueda estar menos en la lista de usuarios registrados.
	 * */
	@DeleteMapping("/players/{id}")
	public ResponseEntity<Integer> deletePlayer(@PathVariable int id){
		Player player = players[id];

		if (player != null) {
			if (player.getOpponentId() != -1 && !player.getOpponentName().equals("")) {
				if (ids[player.getOpponentId()]) {
					if (players[player.getOpponentId()].getName().equals(player.getOpponentName()))
					players[player.getOpponentId()].setOpponentId(-1);
					players[player.getOpponentId()].setOpponentName("");
					players[player.getOpponentId()].setSendingChallenge(false);
					players[player.getOpponentId()].setInGame(false);
				}
			}
			players[id].setOpponentId(-1);
			players[id].setOpponentName("");
			players[id].setSendingChallenge(false);
			players[id].setInGame(false);
		}
		
		
		players[id] = null;
		ids[id] = false;
		
		if (player != null) {
			return new ResponseEntity<>(id, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	/*
	 * Método manageTimeout()
	 * Este método se ejecuta cada segundo, y reduce el timeout de todos los jugadoes en 1.
	 * Si en algún caso se llega a 0, se elimina al jugador del servidor.
	 * */
	@Scheduled(fixedDelay=1000)
	public void manageTimeout() {
		for (int i = 0; i < players.length; i++) {
			if (players[i] != null) {
				players[i].setTimeout(players[i].getTimeout()-1);
				if (players[i].getTimeout() <= -60) { //Tienen un minuto para reconectarse los jugadores que se desconecten
					if (players[i].getOpponentId() != -1 && !players[i].getOpponentName().equals("")) {
						if (ids[players[i].getOpponentId()]) {
							if (players[players[i].getOpponentId()].getName().equals(players[i].getOpponentName()))
							players[players[i].getOpponentId()].setOpponentId(-1);
							players[players[i].getOpponentId()].setOpponentName("");
							players[players[i].getOpponentId()].setSendingChallenge(false);
							players[players[i].getOpponentId()].setInGame(false);
						}
					}
					players[i].setOpponentId(-1);
					players[i].setOpponentName("");
					players[i].setInGame(false);
					players[i].setSendingChallenge(false);
					System.out.println("Kicked " + players[i].getName() + " for inactivity.");
					players[i] = null;
					ids[i] = false;
				}
			}
		}
	}
	
	
	
	/*
	 * POST "/chat/"
	 * Al hacer esta petición, se asigna una nueva id al mensaje subido, se escribe en el fichero "chat.txt" y se guarda en fullChat.
	 * */
	@PostMapping("/chat/")
	public ResponseEntity<Integer> postChatMessage(@RequestBody ChatMessage newMessage) {
		
		int nextMessageId;
		
		if (fullChat.size() == 0) {
			nextMessageId = 0;
		} else {
			nextMessageId = fullChat.get(fullChat.size()-1).getId()+1;
		}
		newMessage.setId(nextMessageId);

		Date date = new Date();
		Calendar calendar = GregorianCalendar.getInstance();
		calendar.setTime(date);
		
		newMessage.setTime(String.format("%02d", calendar.get(Calendar.HOUR_OF_DAY)) + ":" + String.format("%02d", calendar.get(Calendar.MINUTE)));
		fullChat.add(newMessage);

		try {
			BufferedWriter out = new BufferedWriter(new FileWriter ("chat.txt", true));
			out.append(String.valueOf(newMessage.getId()));
			out.newLine();
			out.append(newMessage.getTime());
			out.newLine();
			out.append(newMessage.getSender());
			out.newLine();
			out.append(newMessage.getMessage());
			out.newLine();
			out.close();
		} catch (IOException e) {
			
			//e.printStackTrace();
		}
		return new ResponseEntity<>(nextMessageId,HttpStatus.CREATED);
	}
	
	/* 
	 * GET "/chat/id"
	 * Al hacer esta petición, se devuelve un array con todos los mensajes posteriores al correspondiente a la id proporcionada
	 * */
	@GetMapping("/chat/{id}")
	public ResponseEntity<ChatMessage[]> updateChat(@PathVariable int id) {
		if (fullChat.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		if (fullChat.get(fullChat.size()-1).getId() <= id) {

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			ChatMessage[] newMessages = new ChatMessage[fullChat.get(fullChat.size()-1).getId() - id];
			for (int i = 0; i < newMessages.length; i++) {
				newMessages[i] = fullChat.get(i+id+1);
			}
			
			return new ResponseEntity<>(newMessages, HttpStatus.OK);
		}
		
	}
	
	/*
	 * GET "/users/"
	 * Al hacer esta petición, se devuelve un array con los nombres de todos los usuarios conectados
	 * */
	@GetMapping("/users/")
	public ResponseEntity<PlayerListElement[]> getPlayerNames() {
		
		int i = 100-freeSlots();
		int j = 0;
		int k = 0;
		
		PlayerListElement[] onlinePlayers = new PlayerListElement[i];
		
		while (i > 0 && j < 100) {
			if (ids[j]) {
				onlinePlayers[k] = new PlayerListElement(players[j]);
				k++;
				i--;
			}
			j++;
		}
		
		//Ordenar el array, para que se muestren en orden alfabético
		Arrays.sort(onlinePlayers);
		

		return new ResponseEntity<>(onlinePlayers, HttpStatus.OK);

	}
	
	/*
	 * PUT "/character/id"
	 * Al hacer esta petición, si hay un jugador en la id especificada, se actualiza el personaje que tiene seleccionado.
	 * */
	@PutMapping("/character/{id}")
	public ResponseEntity<String> changeCharacter(@PathVariable int id, @RequestBody String character) {
		if (id >= 0) {
			if (ids[id]) {
				if (character.equals("SSHielo1") || character.equals("SSElfa1") || character.equals("SSFuego1")) {
					players[id].setCharacter(character);
					//ESCRIBIRLO AL TXT
					replaceLine(players[id].getName(), 2, players[id].getCharacter());
					//FIN DE ESCRIBIRLO AL TXT
					return new ResponseEntity<>(character,HttpStatus.OK);
				} else {
					System.out.println(character + "is not allowed.");
					return new ResponseEntity<>(character,HttpStatus.BAD_REQUEST);
				}
				
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	private void replaceLine(String name, int replaceLine, String replaceContent) {
		try {
			
			BufferedReader in = new BufferedReader(new FileReader ("users.txt"));
			String line = in.readLine();
			String file = "";
			if (line != null) {
				file += (line + "\n");
			}
			
			while (line != null) {
				if (line.equals(name)) {
					for (int i = 0; i < replaceLine-1; i++) {
						line = in.readLine();
						if (line != null) {
							file += (line + "\n");
						}
					}
					line = in.readLine();
					System.out.println("Line '" + line + "' replaced by line '" + replaceContent + "' for player " + name);
					line = replaceContent;
					if (line != null) {
						file += (line + "\n");
					}
					for (int i = 0; i < 5-replaceLine; i++) {
						line = in.readLine();
						if (line != null) {
							file += (line + "\n");
						}
					}
				} else {
					for (int i = 0; i < 5; i++) {
						line = in.readLine();
						if (line != null) {
							file += (line + "\n");
						}
					}
				}
			}
			
			in.close();

			BufferedWriter out = new BufferedWriter(new FileWriter ("users.txt"));
			out.append(file);
			out.close();
			
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
		} catch (IOException e) {
			//e.printStackTrace();
		}
	}
	
	/*
	 * PUT "/challenge/id"
	 * Al hacer esta petición, si hay un jugador en la id especificada, se le intenta asignar como oponente al jugador que tenga el nombre proporcionado
	 * */
	@PutMapping("/challenge/{id}")
	public ResponseEntity<String> challenge(@PathVariable int id, @RequestBody String opponentName) {
		int opId = -1;
		for (int i = 0; i < players.length; i++) {
			if (ids[i]) {
				if (players[i].getName().equals(opponentName)) {
					opId = i;
				}
			}
		}
		if (opId != -1) {
			//Existe el oponente, vamos a ver si ambos tienen el hueco de oponente libre
			if (players[opId].getOpponentId() == -1 && players[opId].getOpponentName().equals("") && players[id].getOpponentId() == -1 && players[id].getOpponentName().equals("")) {
				//Huecos libres, vamos a asignar a cada jugador la información de su oponente
				players[opId].setOpponentId(id);
				players[opId].setOpponentName(players[id].getName());
				players[id].setOpponentId(opId);
				players[id].setOpponentName(players[opId].getName());
				players[id].setSendingChallenge(true);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				//No hay huecos libres, vamos a dar un error
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	
	/*
	 * DELETE "/challenge/id"
	 * Al hacer esta petición, si hay un jugador en la id especificada, se le intenta asignar como oponente al jugador que tenga el nombre proporcionado
	 * */
	@DeleteMapping("/challenge/{id}")
	public ResponseEntity<String> removeChallenge(@PathVariable int id, @RequestBody String opponentName) {
		int opId = -1;
		for (int i = 0; i < players.length; i++) {
			if (ids[i]) {
				if (players[i].getName().equals(opponentName)) {
					opId = i;
				}
			}
		}
		if (opId != -1) {
			//Existe el oponente, vamos a ver si ambos son oponentes entre sí
			if (players[opId].getOpponentId() == players[id].getId() && players[opId].getOpponentName().equals(players[id].getName()) && players[id].getOpponentId() == players[opId].getId() && players[id].getOpponentName().equals(players[opId].getName())) {
				//Son oponentes, vamos a hacer que dejen de serlo
				players[opId].setOpponentId(-1);
				players[opId].setOpponentName("");
				players[id].setOpponentId(-1);
				players[id].setOpponentName("");
				players[id].setSendingChallenge(false);
				players[opId].setSendingChallenge(false);
				players[opId].setInGame(false);
				players[id].setInGame(false);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				//No son oponentes, vamos a dar un error
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	/*
	 * PUT "/beginGame/id"
	 * Al hacer esta petición, se empieza una partida si los jugadores existen y son oponentes
	 * */
	@PutMapping("/beginGame/{id}")
	public ResponseEntity<String> beginGame(@PathVariable int id, @RequestBody String name) {
		if (id >= 0) {
			if (ids[id]) {
				if (players[id].getName().equals(name)) { 
					int opId = -1;
					for (int i = 0; i < players.length; i++) {
						if (ids[i]) {
							if (players[i].getName().equals(players[id].getOpponentName())) {
								opId = i;
							}
						}
					}
					if (opId == -1) {
						return new ResponseEntity<>(HttpStatus.CONFLICT); 
					} else {
						if (players[opId].getOpponentId() == players[id].getId() && players[opId].getOpponentName().equals(players[id].getName()) && players[id].getOpponentId() == players[opId].getId() && players[id].getOpponentName().equals(players[opId].getName())) {
							players[id].setInGame(true);
							players[opId].setInGame(true);
							return new ResponseEntity<>(HttpStatus.OK);
						} else {
							return new ResponseEntity<>(HttpStatus.CONFLICT);
						}
					}
					
				} else {
					return new ResponseEntity<>(HttpStatus.CONFLICT); 
				}
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	/*
	 * PUT "/gameEnd/id"
	 * Al hacer esta petición, si hay un jugador en la id especificada, se actualiza su timeout a 4 segundos.
	 * */
	@PutMapping("/gameEnd/{id}")
	public ResponseEntity<Integer> gameEnd(@PathVariable int id, @RequestBody String winner) {
		if (id >= 0) {
			if (ids[id]) {
				
				if (!winner.equals("none")) {
					if (players[id].getName().equals(winner)) { //Esto igual da algún error, si se echa a los jugadores de forma rara es por esto probablemente
						players[id].setWins(players[id].getWins()+1);
						if (ids[players[id].getOpponentId()]) {
							players[players[id].getOpponentId()].setLosses(players[players[id].getOpponentId()].getLosses()+1);
						}
						replaceLine(players[id].getName(), 3, Integer.toString(players[id].getWins()));
						replaceLine(players[players[id].getOpponentId()].getName(), 4, Integer.toString(players[players[id].getOpponentId()].getLosses()));
						
						if (ids[players[id].getOpponentId()]) {
							players[players[id].getOpponentId()].setOpponentId(-1);
							players[players[id].getOpponentId()].setOpponentName("");
							players[players[id].getOpponentId()].setSendingChallenge(false);
							players[players[id].getOpponentId()].setInGame(false);
							players[id].setOpponentId(-1);
							players[id].setOpponentName("");
							players[id].setSendingChallenge(false);
							players[id].setInGame(false);
						}
						return new ResponseEntity<>(4,HttpStatus.OK);
					} else {
						return new ResponseEntity<>(HttpStatus.CONFLICT); 
					}
				} else {
					if (players[id].getOpponentId() >= 0) {
						if (ids[players[id].getOpponentId()]) {
							System.out.println(players[id].getOpponentId() + ", " + id + " / " + players[players[id].getOpponentId()].getOpponentId() + ", " + players[players[id].getOpponentId()].getId());
							players[players[id].getOpponentId()].setOpponentId(-1);
							players[players[id].getOpponentId()].setOpponentName("");
							players[players[id].getOpponentId()].setSendingChallenge(false);
							players[players[id].getOpponentId()].setInGame(false);
							players[id].setOpponentId(-1);
							players[id].setOpponentName("");
							players[id].setSendingChallenge(false);
							players[id].setInGame(false);
						}
						return new ResponseEntity<>(4,HttpStatus.OK);
					}
					
				}
				
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
}
