package grupoE.laforja;

public class PlayerListElement implements Comparable<PlayerListElement> {
	private int id;
	private String name;
	private int timeout;
	private String character;
	private String opponentName;
	private boolean inGame;
	private int wins;
	private int losses;
	
	public PlayerListElement() {}
	
	public PlayerListElement(Player p) {
		this.id = p.getId();
		this.name = p.getName();
		this.timeout = p.getTimeout();
		this.character = p.getCharacter();
		this.opponentName = p.getOpponentName();
		this.inGame = p.isInGame();
		this.wins = p.getWins();
		this.losses = p.getLosses();
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

	@Override
	public int compareTo(PlayerListElement p2) {
		return name.compareToIgnoreCase(p2.getName());
	}
	
}
