package grupoE.laforja;

public class Station {
	private String type;
	private int player;
	private int time;
	private String heldObject;
	private String heldObject2;
	
	public Station(String type, int player) {
		this.type = type;
		this.player = player;
		time = 0;
		heldObject = "none";
		heldObject2 = "none";
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getPlayer() {
		return player;
	}

	public void setPlayer(int player) {
		this.player = player;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getHeldObject() {
		return heldObject;
	}

	public void setHeldObject(String heldObject) {
		this.heldObject = heldObject;
	}

	public String getHeldObject2() {
		return heldObject2;
	}

	public void setHeldObject2(String heldObject2) {
		this.heldObject2 = heldObject2;
	}
	
}
