package grupoE.laforja;

public class Station {
	private String type;
	private int player;
	private double time;
	private String heldObject;
	private String heldObject2;
	
	public Station(String type, int player) {
		this.type = type;
		this.player = player;
		time = -1;
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

	public double getTime() {
		return time;
	}

	public void setTime(double time) {
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
	
	public void updateTimer() {
		if (type.equals("horno")) {
			if (time >= 0 && time < 200) {
				time += 2;
			} else if (time >= 200) {
				time = -1;
				heldObject = "none";
			}
		} else if (type.equals("barril")) {
			if (time >= 0 && time < 100) {
				time += 3.33;
			}
		} else if (type.equals("molde")) {
			if (time >= 0 && time < 100) {
				time += 2.5;
			}
		} else if (type.equals("hornod")) {
			if (time >= 0 && time < 200) {
				time += 1;
			} else if (time >= 200) {
				time = -1;
				heldObject = "none";
				heldObject2 = "none";
			}
		} else if (type.equals("trampamuro")) {
			if (time >= 0) time -= 6;
		} else if (type.equals("trampareloj")) {
			if (time >= 0) time -= 6;
		}
	}
	
}
