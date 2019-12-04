package grupoE.laforja;

public class ChatMessage {

	private int id;

	private String time;
	private String sender;
	private String message;
	
	public ChatMessage() {}
	
	public ChatMessage(int id, String time, String sender, String message) {
		this.id = id;
		this.time = time;
		this.sender = sender;
		this.message = message;
	}

	public ChatMessage(String time, String sender, String message) {
		this.id = -1;
		this.time = time;
		this.sender = sender;
		this.message = message;
	}
	
	public ChatMessage(String sender, String message) {
		this.id = -1;
		this.time = "";
		this.sender = sender;
		this.message = message;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
