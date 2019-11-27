package grupoE.laforja;

public class Player {
	private int id = -1;
	private String name;
	private int timeout;
	private String character;
	private int opponentId = -1;
	private String opponentName = null;
	private boolean inGame = false;
	
	public Player() {}
	public Player(String name, int timeout) {
		this.name = name;
		this.timeout = timeout;
		this.character = null;
	}
	
	public Player(String name, int timeout, String character) {
		this.name = name;
		this.timeout = timeout;
		this.character = character;
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
	
}
