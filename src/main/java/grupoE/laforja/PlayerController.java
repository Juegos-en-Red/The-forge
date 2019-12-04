package grupoE.laforja;


import grupoE.laforja.Player;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
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
	private Player[] players = new Player[100];
	private boolean[] ids = new boolean[100]; //Array que guarda si los ids de los jugadores están ocupados
	private ArrayList<Player> registeredPlayers = new ArrayList<Player>();
	private ArrayList<ChatMessage> fullChat = new ArrayList<ChatMessage>();
	
	@PostConstruct
	public void init() {
		try {
			BufferedReader in = new BufferedReader(new FileReader ("users.txt"));
			String line = in.readLine();
			
			while (line != null) {
				String[] data = line.split(" ");
				registeredPlayers.add(new Player(data[0],data[1],Integer.parseInt(data[2]),data[3]));
				line = in.readLine();
			}
			
			in.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
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
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	//Método get de los jugadores
	@GetMapping("/players/")
	public Player[] players() {
		return players;
	}
	
	//Método para que los clientes sepan si hay huecos
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
	
	private int getFirstFreeSlot() {
		for(int i = 0; i < ids.length; i++) {
			if (!ids[i]) {
				return i;
			}
		}
		return -1;
	}
	
	//Conexión del cliente por primera vez. Devuelve su id. Igual ni se va a usar.
	@PostMapping("/players/")
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
	}
	
	
	//Método login
	@PostMapping("/login/")
	public ResponseEntity<Integer> login(@RequestBody Player player) {
		for (int i = 0; i < players.length; i++) {
			if (ids[i]) {
				if (players[i].getName().equals(player.getName())) {
					return new ResponseEntity<>(i,HttpStatus.CONFLICT);
				}
			}
		}
		
		for (Player p : registeredPlayers) {
			if (p.getName().equals(player.getName())) {
				if (p.getPassword().equals(player.getPassword())) {
					player.setId(getFirstFreeSlot());
					players[player.getId()] = player;
					ids[player.getId()] = true;
					//System.out.println("OK");
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
	
	//Método registrarse
	@PostMapping("/register/")
	public ResponseEntity<Integer> register(@RequestBody Player player) {
		int firstEmptyId = getFirstFreeSlot();
		
		if (player.getName().contains(" ") || player.getPassword().contains(" ")) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
		
		//System.out.print(registeredPlayers.isEmpty());
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
			out.append(player.getName() + " " + player.getPassword() + " " + player.getWins() + " " + player.getLosses());
			out.newLine();
			out.close();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		return new ResponseEntity<>(firstEmptyId,HttpStatus.CREATED);
	}
	
	
	
	//Método que actualiza los datos del jugador
	@PutMapping("/players/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable int id, @RequestBody Player player) {
		if (ids[id]) {
			player.setId(id);
			players[id] = player;
			return new ResponseEntity<>(player,HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PutMapping("/reminder/{id}")
	public ResponseEntity<Integer> resetTimeout(@PathVariable int id) {
		if (ids[id]) {
			players[id].setTimeout(4);
			return new ResponseEntity<>(4,HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@DeleteMapping("/players/{id}")
	public ResponseEntity<Integer> deletePlayer(@PathVariable int id){
		Player player = players[id];

		if (player != null) {
			if (player.getOpponentId() != -1 && player.getOpponentName() != null) {
				if (ids[player.getOpponentId()]) {
					if (players[player.getOpponentId()].getName().equals(player.getOpponentName()))
					players[player.getOpponentId()].setOpponentId(-1);
					players[player.getOpponentId()].setOpponentName(null);
				}
			}
		}
		
		
		players[id] = null;
		ids[id] = false;
		
		if (player != null) {
			return new ResponseEntity<>(id, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Scheduled(fixedDelay=1000)
	public void manageTimeout() {
		for (int i = 0; i < players.length; i++) {
			if (players[i] != null) {
				players[i].setTimeout(players[i].getTimeout()-1);
				if (players[i].getTimeout() == 0) {
					if (players[i].getOpponentId() != -1 && players[i].getOpponentName() != null) {
						if (ids[players[i].getOpponentId()]) {
							if (players[players[i].getOpponentId()].getName().equals(players[i].getOpponentName()))
							players[players[i].getOpponentId()].setOpponentId(-1);
							players[players[i].getOpponentId()].setOpponentName(null);
						}
					}
					players[i] = null;
					ids[i] = false;
				}
			}
		}
	}
	
	
	
	//Chat por aquí
	
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
			
			e.printStackTrace();
		}
		return new ResponseEntity<>(nextMessageId,HttpStatus.CREATED);
	}
	
	@GetMapping("/chat/{id}")
	public ResponseEntity<ChatMessage[]> updateChat(@PathVariable int id) {
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
	
	@GetMapping("/users/")
	public ResponseEntity<String[]> getPlayerNames() {
		
		int i = 100-freeSlots();
		int j = 0;
		int k = 0;
		
		String[] onlinePlayers = new String[i];
		
		while (i > 0 && j < 100) {
			if (ids[j]) {
				onlinePlayers[k] = players[j].getName();
				k++;
				i--;
			}
			j++;
		}

		return new ResponseEntity<>(onlinePlayers, HttpStatus.OK);

	}
	
}
