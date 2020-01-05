package grupoE.laforja;

import java.util.HashMap;
import java.util.Random;

import org.springframework.web.socket.WebSocketSession;

public class Room {
	private String p1Name;
	private boolean p1Online;
	private int p1Timeout;
	private String p1Character;
	private WebSocketSession p1Session;
	private int p1x;
	private int p1y;
	private int p1Spdx;
	private int p1Spdy;
	private String p1HeldObject;
	private String p1MHeldObject1;
	private String p1MHeldObject2;
	private String p1MHeldObject3;
	private String p1MHeldObject4;
	private String p2Name;
	private boolean p2Online;
	private int p2Timeout;
	private WebSocketSession p2Session;
	private String p2Character;
	private int p2x;
	private int p2y;
	private int p2Spdx;
	private int p2Spdy;
	private String p2HeldObject;
	private String p2MHeldObject1;
	private String p2MHeldObject2;
	private String p2MHeldObject3;
	private String p2MHeldObject4;
	private boolean full;
	private boolean gameOver;
	private int gameTime;
	private String[] p1Recipes;
	private String[] p2Recipes;
	private String currentTrap;
	private String p1Trap;
	private String p2Trap;
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
		p1Trap = "none";
		p2Trap = "none";
		trapActive = true;
		stations = new HashMap<>();
		p1x=590;
		p1y=320;
		p2x=210;
		p2y=320;
		p1Spdx=0;
		p1Spdy=0;
		p2Spdx=0;
		p2Spdy=0;
		p1HeldObject = "none";
		p2HeldObject = "none";
		p1MHeldObject1 = "none";
		p1MHeldObject2 = "none";
		p1MHeldObject3 = "none";
		p1MHeldObject4 = "none";
		p2MHeldObject1 = "none";
		p2MHeldObject2 = "none";
		p2MHeldObject3 = "none";
		p2MHeldObject4 = "none";
		
		//Vamos a generar las recetas
	
	    int aux1, aux2;

	    //piernas
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    p1Recipes[0] = ("metal"+aux1+"yunquetemplado");
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    p2Recipes[0] = ("metal"+aux1+"yunquetemplado");

	    //cascos
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    p1Recipes[1] = ("metal"+aux1+"moldetemplado");
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    p2Recipes[1] = ("metal"+aux1+"moldetemplado");

	    //espadas
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    do {
	    	aux2 = (int) Math.round((Math.random()*4)+1);
	    } while (aux2 == aux1);
	    if (aux2 < aux1) {
	    	int temp = aux2;
	    	aux2 = aux1;
	    	aux1 = temp;
	    }
	    p1Recipes[2] = ("metal"+aux1+aux2+"espadatemplado");
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    do {
	    	aux2 = (int) Math.round((Math.random()*4)+1);
	    } while (aux2 == aux1);
	    if (aux2 < aux1) {
	    	int temp = aux2;
	    	aux2 = aux1;
	    	aux1 = temp;
	    }
	    p2Recipes[2] = ("metal"+aux1+aux2+"espadatemplado");

	    //pecheras
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    do {
	    	aux2 = (int) Math.round((Math.random()*4)+1);
	    } while (aux2 == aux1);
	    if (aux2 < aux1) {
	    	int temp = aux2;
	    	aux2 = aux1;
	    	aux1 = temp;
	    }
	    p1Recipes[3] = ("metal"+aux1+aux2+"yunquetemplado");
	    aux1 = (int) Math.round((Math.random()*4)+1);
	    do {
	    	aux2 = (int) Math.round((Math.random()*4)+1);
	    } while (aux2 == aux1);
	    if (aux2 < aux1) {
	    	int temp = aux2;
	    	aux2 = aux1;
	    	aux1 = temp;
	    }
	    p2Recipes[3] = ("metal"+aux1+aux2+"yunquetemplado");
	    
	    //Randomizar recetas
	   
	   	Random rand = new Random();
	   	for (int i = 0; i < 4; i++) {
	   		int swapIndex = rand.nextInt(4);
	   		String temp = p1Recipes[swapIndex];
	   		p1Recipes[swapIndex] = p1Recipes[i];
	   		p1Recipes[i] = temp;
	   	}
	   	for (int i = 0; i < 4; i++) {
	   		int swapIndex = rand.nextInt(4);
	   		String temp = p2Recipes[swapIndex];
	   		p2Recipes[swapIndex] = p2Recipes[i];
	   		p2Recipes[i] = temp;
	   	}
		//Generamos las estaciones de trabajo
	    stations.put("horno1", new Station("horno", 1));
	    stations.put("hornod1", new Station("hornod", 1));
	    stations.put("yunque1", new Station("yunque", 1));
	    stations.put("yunqued1", new Station("yunqued", 1));
	    stations.put("molde1", new Station("molde", 1));
	    stations.put("barril1", new Station("barril", 1));
	    stations.put("mesa11", new Station("mesa1", 1));
	    stations.put("mesa21", new Station("mesa2", 1));
	    stations.put("mesa31", new Station("mesa3", 1));
	    stations.put("trampamuro1", new Station("trampamuro", 1));
	    stations.put("trampareloj1", new Station("trampareloj", 1));

	    stations.put("horno2", new Station("horno", 2));
	    stations.put("hornod2", new Station("hornod", 2));
	    stations.put("yunque2", new Station("yunque", 2));
	    stations.put("yunqued2", new Station("yunqued", 2));
	    stations.put("molde2", new Station("molde", 2));
	    stations.put("barril2", new Station("barril", 2));
	    stations.put("mesa12", new Station("mesa1", 2));
	    stations.put("mesa22", new Station("mesa2", 2));
	    stations.put("mesa32", new Station("mesa3", 2));
	    stations.put("trampamuro2", new Station("trampamuro", 2));
	    stations.put("trampareloj2", new Station("trampareloj", 2));
		
		
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

	public void setStations(HashMap<String, Station> stations) {
		this.stations = stations;
	}

	public boolean isTrapActive() {
		return trapActive;
	}

	public void setTrapActive(boolean trapActive) {
		this.trapActive = trapActive;
	}

	public String getP1Trap() {
		return p1Trap;
	}

	public void setP1Trap(String p1Trap) {
		this.p1Trap = p1Trap;
	}

	public String getP2Trap() {
		return p2Trap;
	}

	public void setP2Trap(String p2Trap) {
		this.p2Trap = p2Trap;
	}

	public int getP1x() {
		return p1x;
	}

	public void setP1x(int p1x) {
		this.p1x = p1x;
	}

	public int getP1y() {
		return p1y;
	}

	public void setP1y(int p1y) {
		this.p1y = p1y;
	}

	public int getP2x() {
		return p2x;
	}

	public void setP2x(int p2x) {
		this.p2x = p2x;
	}

	public int getP2y() {
		return p2y;
	}

	public void setP2y(int p2y) {
		this.p2y = p2y;
	}

	public int getP1Spdx() {
		return p1Spdx;
	}

	public void setP1Spdx(int p1Spdx) {
		this.p1Spdx = p1Spdx;
	}

	public int getP1Spdy() {
		return p1Spdy;
	}

	public void setP1Spdy(int p1Spdy) {
		this.p1Spdy = p1Spdy;
	}

	public int getP2Spdx() {
		return p2Spdx;
	}

	public void setP2Spdx(int p2Spdx) {
		this.p2Spdx = p2Spdx;
	}

	public int getP2Spdy() {
		return p2Spdy;
	}

	public void setP2Spdy(int p2Spdy) {
		this.p2Spdy = p2Spdy;
	}

	public String getP1HeldObject() {
		return p1HeldObject;
	}

	public void setP1HeldObject(String p1HeldObject) {
		this.p1HeldObject = p1HeldObject;
	}

	public String getP2HeldObject() {
		return p2HeldObject;
	}

	public void setP2HeldObject(String p2HeldObject) {
		this.p2HeldObject = p2HeldObject;
	}

	public String getP1MHeldObject1() {
		return p1MHeldObject1;
	}

	public void setP1MHeldObject1(String p1mHeldObject1) {
		p1MHeldObject1 = p1mHeldObject1;
	}

	public String getP1MHeldObject2() {
		return p1MHeldObject2;
	}

	public void setP1MHeldObject2(String p1mHeldObject2) {
		p1MHeldObject2 = p1mHeldObject2;
	}

	public String getP1MHeldObject3() {
		return p1MHeldObject3;
	}

	public void setP1MHeldObject3(String p1mHeldObject3) {
		p1MHeldObject3 = p1mHeldObject3;
	}

	public String getP1MHeldObject4() {
		return p1MHeldObject4;
	}

	public void setP1MHeldObject4(String p1mHeldObject4) {
		p1MHeldObject4 = p1mHeldObject4;
	}

	public String getP2MHeldObject1() {
		return p2MHeldObject1;
	}

	public void setP2MHeldObject1(String p2mHeldObject1) {
		p2MHeldObject1 = p2mHeldObject1;
	}

	public String getP2MHeldObject2() {
		return p2MHeldObject2;
	}

	public void setP2MHeldObject2(String p2mHeldObject2) {
		p2MHeldObject2 = p2mHeldObject2;
	}

	public String getP2MHeldObject3() {
		return p2MHeldObject3;
	}

	public void setP2MHeldObject3(String p2mHeldObject3) {
		p2MHeldObject3 = p2mHeldObject3;
	}

	public String getP2MHeldObject4() {
		return p2MHeldObject4;
	}

	public void setP2MHeldObject4(String p2mHeldObject4) {
		p2MHeldObject4 = p2mHeldObject4;
	}
	
	
}
