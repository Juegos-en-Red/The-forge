package grupoE.laforja;

import java.util.HashMap;

import org.springframework.web.socket.WebSocketSession;

public class Room {
	private String p1Name;
	private boolean p1Online;
	private int p1Timeout;
	private String p1Character;
	private WebSocketSession p1Session;
	private String p2Name;
	private boolean p2Online;
	private int p2Timeout;
	private WebSocketSession p2Session;
	private String p2Character;
	private boolean full;
	private boolean gameOver;
	private int gameTime;
	private String[] p1Recipes;
	private String[] p2Recipes;
	private String currentTrap;
	private boolean trapActive;
	private HashMap<String,Station> stations;

	public Room() {}
	
	public Room(WebSocketSession session, String p1Name, String p2Name, String p1Character) {
		this.p1Name = p1Name;
		p1Online = true;
		p1Timeout = -1;
		this.p1Session = session;
		this.p1Character = p1Character;
		this.p2Name = p2Name;
		p2Online = false;
		p2Timeout = -1;
		p2Session = null;
		p2Character = null;
		full = false;
		gameOver = false;
		gameTime = 306000;
		p1Recipes = new String[4];
		p2Recipes = new String[4];
		currentTrap = "none";
		trapActive = true;
		stations = new HashMap<>();
	}
	
	public String getP1Name() {
		return p1Name;
	}
	public void setP1Name(String p1Name) {
		this.p1Name = p1Name;
	}
	public boolean isP1Online() {
		return p1Online;
	}
	public void setP1Online(boolean p1Online) {
		this.p1Online = p1Online;
	}
	public int getP1Timeout() {
		return p1Timeout;
	}
	public void setP1Timeout(int p1Timeout) {
		this.p1Timeout = p1Timeout;
	}
	public String getP2Name() {
		return p2Name;
	}
	public void setP2Name(String p2Name) {
		this.p2Name = p2Name;
	}
	public boolean isP2Online() {
		return p2Online;
	}
	public void setP2Online(boolean p2Online) {
		this.p2Online = p2Online;
	}
	public int getP2Timeout() {
		return p2Timeout;
	}
	public void setP2Timeout(int p2Timeout) {
		this.p2Timeout = p2Timeout;
	}
	public boolean isFull() {
		return full;
	}
	public void setFull(boolean full) {
		this.full = full;
	}
	public boolean isGameOver() {
		return gameOver;
	}
	public void setGameOver(boolean gameOver) {
		this.gameOver = gameOver;
	}

	public WebSocketSession getP1Session() {
		return p1Session;
	}

	public void setP1Session(WebSocketSession p1Session) {
		this.p1Session = p1Session;
	}

	public WebSocketSession getP2Session() {
		return p2Session;
	}

	public void setP2Session(WebSocketSession p2Session) {
		this.p2Session = p2Session;
	}

	public String getP1Character() {
		return p1Character;
	}

	public void setP1Character(String p1Character) {
		this.p1Character = p1Character;
	}

	public String getP2Character() {
		return p2Character;
	}

	public void setP2Character(String p2Character) {
		this.p2Character = p2Character;
	}

	public int getGameTime() {
		return gameTime;
	}

	public void setGameTime(int gameTime) {
		this.gameTime = gameTime;
	}

	public String[] getP1Recipes() {
		return p1Recipes;
	}

	public void setP1Recipes(String[] p1Recipes) {
		this.p1Recipes = p1Recipes;
	}

	public String[] getP2Recipes() {
		return p2Recipes;
	}

	public void setP2Recipes(String[] p2Recipes) {
		this.p2Recipes = p2Recipes;
	}
	
	public String getCurrentTrap() {
		return currentTrap;
	}

	public void setCurrentTrap(String currentTrap) {
		this.currentTrap = currentTrap;
	}

	public HashMap<String, Station> getStations() {
		return stations;
	}

	public void setStationTimes(HashMap<String, Station> stations) {
		this.stations = stations;
	}

	public boolean isTrapActive() {
		return trapActive;
	}

	public void setTrapActive(boolean trapActive) {
		this.trapActive = trapActive;
	}
	
	
}
