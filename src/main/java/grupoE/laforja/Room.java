package grupoE.laforja;

import org.springframework.web.socket.WebSocketSession;

public class Room {
	private String p1Name;
	private boolean p1Online;
	private int p1Timeout;
	private WebSocketSession p1Session;
	private String p2Name;
	private boolean p2Online;
	private int p2Timeout;
	private WebSocketSession p2Session;
	private boolean full;
	private boolean gameOver;

	public Room() {}
	
	public Room(WebSocketSession session, String p1Name, String p2Name) {
		this.p1Name = p1Name;
		p1Online = true;
		p1Timeout = 4;
		this.p1Session = session;
		this.p2Name = p2Name;
		p2Online = false;
		p2Timeout = 4;
		p2Session = null;
		full = false;
		gameOver = false;
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
	
	
}
