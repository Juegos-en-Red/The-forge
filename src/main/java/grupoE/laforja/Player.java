package grupoE.laforja;

public class Player {
	private int id = -1;
	private String name;
	private String password;
	private int timeout;
	private String character;
	private int opponentId = -1;
	private String opponentName = null;
	private boolean inGame = false;
	private int wins = 0;
	private int losses = 0;
	
	public Player() {}
	public Player(String name, String password, int timeout) {
		this.name = name;
		this.password = password;
		this.timeout = timeout;
		this.character = null;
	}
	
	public Player(String name, String password, int timeout, String character) {
		this.name = name;
		this.password = password;
		this.timeout = timeout;
		this.character = character;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTimeout() {
		return timeout;
	}
	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}
	public String getCharacter() {
		return character;
	}
	public void setCharacter(String character) {
		this.character = character;
	}
	public int getOpponentId() {
		return opponentId;
	}
	public void setOpponentId(int opponentId) {
		this.opponentId = opponentId;
	}
	public String getOpponentName() {
		return opponentName;
	}
	public void setOpponentName(String opponentName) {
		this.opponentName = opponentName;
	}
	public boolean isInGame() {
		return inGame;
	}
	public void setInGame(boolean inGame) {
		this.inGame = inGame;
	}
	public int getWins() {
		return wins;
	}
	public void setWins(int wins) {
		this.wins = wins;
	}
	public int getLosses() {
		return losses;
	}
	public void setLosses(int losses) {
		this.losses = losses;
	}
	
}
