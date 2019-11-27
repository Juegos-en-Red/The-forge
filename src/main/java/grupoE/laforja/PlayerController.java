package grupoE.laforja;


import grupoE.laforja.Player;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@EnableScheduling
@RestController
public class PlayerController {
	private Player[] players = new Player[100];
	private boolean[] ids = new boolean[100]; //Array que guarda si los ids de los jugadores están ocupados
	
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
	
	//Conexión del cliente por primera vez
	@PostMapping("/players/")
	public ResponseEntity<Player> newPlayer(@RequestBody Player player) {
		for (int i = 0; i < ids.length; i++) {
			if (!ids[i]) {
				player.setId(i);
				players[i] = player;
				ids[i] = true;
				return new ResponseEntity<>(player,HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
		
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
	
	@DeleteMapping("/players/{id}")
	public ResponseEntity<Player> deletePlayer(@PathVariable int id){
		Player player = players[id];
		players[id] = null;
		ids[id] = false;
		
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
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
					players[i] = null;
					ids[i] = false;
				}
			}
		}
	}
	
	
	
}
