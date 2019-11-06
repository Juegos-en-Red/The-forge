"use strict";

var sc_Game = new Phaser.Scene("JuegoLocal");

const INF = 0X3F3F3F3F;

const MAX_SPEED = 100;

var mundo = new Mundo(40, 40, sc_Game);

var receta = new RecetaHandler("jugador1");

var arr = receta.generateRandomCombination();

var cartelOkJ1 = undefined;
var cartelOkJ2 = undefined;

var martillo1J1 = undefined;
var martillo2J1 = undefined;
var martillo1J2 = undefined;
var martillo2J2 = undefined;

var martillazosJ1 = 0;
var martillazosJ2 = 0;

var numHornoJ1 = 0;
var numHornoJ2 = 0;

var unodedosJ1 = undefined;
var unodedosJ2 = undefined;

var timer = 0;

sc_Game.create = function()
{     
    initAnimations(sc_Game);    
    mundo.init();
}

sc_Game.update = function(time, delta)
{
    
    mundo.update();
    timer++;
    mundo.updateTrampa(timer % 2002);
    console.log(timer);
}

function Player(posX, posY, nombre, escena, arriba, abajo, izda, derecha, interact, accion, id)
{
    /* VARIABLES */

    // Personaje
    this.cuadrado;

    // Posición en X
    this.posX = posX;

    // Posición en Y
    this.posY = posY;

    // Tecla para movernos hacia arriba
    var up = undefined; 

    // Tecla para movernos hacia abajo
    var down = undefined;

    // Tecla para ir a la izda
    var left = undefined;

    // Tecla para ir a la derecha
    var right = undefined;

    // Tecla para interactuar con los objetos
    var interactuar = undefined;
    
    // Tecla para lanzar trampas
    var lanzar = undefined;

    // Velocidad del personaje
    var speed = undefined;

    // Dirección del personaje
    var direction = undefined;

    // Velocidad del personaje
    var velocity = undefined;

    // Jugador 1 o jugador 2
    this.nombre = nombre

    // Manejador de recetas del personaje
    this.recetasHandler = new RecetaHandler(nombre);

    // Recetas del personaje
    this.recetas = undefined;

    // Variable para saber si lleva metal
    this.llevaMetal = false;

    // Variable para saber si lleva un metal calentado
    this.llevaMetalCalentado = false;

    // Variable para saber si lleva un metal doble
    this.llevaMetalDoble = false;

    // Color del metal que lleva
    this.metal = undefined;

    // Variable para indicar si estamos pulsando la tecla de interaccion
    this.interactuando = false;

    // Variable para saber si estamos martilleando el metal
    this.martilleando = false;

    // Variable para saber si puedo coger un material del horno
    this.cogerDelHorno = false;

    // Array para guardar las acciones que lleva hechas el jugador
    this.accion = new Array();

    // Variable para saber si puede interactuar con otros objetos
    this.puedeInteractuar = true;

    // Animación que tendremos que usar, por defecto la sin objetos
    this.animacion = 'withoutObject';

    // Dirección del personaje
    var dir = "Down";

    // Trampa que posee el personaje
    this.trampa = undefined;

    // Variable para saber si estamos lanzando una trampa
    this.lanzarTrampa = false;

    // Variable para saber si puede moverse
    this.puedeMoverse = true;

    /* PUBLIC FUNCTIONS */

    this.create = function()
    {
        this.cuadrado = escena.physics.add.sprite(this.posX * 40, this.posY * 40, "perHielo").setOrigin(0, 0);
        this.cuadrado.setCollideWorldBounds(true);
        speed = 0;
        direction = {x: 0, y: 0};
        velocity = {x: 0, y: 0};
        activeKeys();
        
        this.recetas = this.recetasHandler.generateRandomCombination();
    }

    this.update = function(time, delta)
    {
        this.lanzarTrampa = false;
        this.interactuando = false;
        this.martilleando = false;
        if (this.puedeMoverse)
        {
            if (interactuar.isDown)
            this.interactuando = true;
            if (lanzar.isDown && this.trampa != undefined)
            {
                this.lanzarTrampa = true;
            }     
            updateMovimiento(this.cuadrado, this.animacion);
        }
    }

    this.x = function()
    {
        return this.cuadrado.x;
    }

    this.y = function()
    {
        return this.cuadrado.y;
    }

    this.fromWorldToTile = function()
    {
        var tileCoords = {fila: undefined, columna: undefined};
        tileCoords.fila = Math.round(this.cuadrado.y / 40);
        tileCoords.columna = Math.round(this.cuadrado.x / 40);
        return tileCoords;
    }

    this.getSprite = function()
    {
        return this.cuadrado;
    }

    this.getTargetPosition = function()
    {
        var targetPosition = recetasPosibles.get(this.recetas[0].pasos[0]);
        return targetPosition;
    }    

    this.chooseObject = function(nombre)
    {
        if (nombre == "cascogrismarron" || nombre == "cascoamarillomarron" || nombre == "cascoazulmarron")
            return "brownHelmet";
        else if (nombre == "cascogris")
            return "greyHelmet";
        else if (nombre == "cascoamarillo")
            return "yellowHelmet";
        else if (nombre == "cascoazul")
            return "blueHelmet";
        else if (nombre == "cotamarron")
            return "brownArmor";
        else if (nombre == "cota")
            return "greyArmor";
        else if (nombre == "protectoresbrazosazulmarron" || nombre == "protectoresbrazosamarillomarron" || nombre == "protectoresbrazosgrismarron")
            return "brownArms";
        else if (nombre == "protectoresbrazosazul")
            return "blueArms";
        else if (nombre == "protectoresbrazosamarillo")
            return "yellowArms";
        else if (nombre == "protectoresbrazosgris")
            return "greyArms";
        else if (nombre == "espadamarron")
            return "brownSword";
        else if (nombre == "espada")
            return "finalSword";
        
    }

    this.catchTrampa = function(nombre)
    {
        this.trampa = nombre;
    }

    this.useTrampa = function()
    {
        this.trampa = undefined;
    }

    /* PRIVATE FUNCTIONS */

    function activeKeys()
    {
        up = escena.input.keyboard.addKey(arriba);
        down = escena.input.keyboard.addKey(abajo);
        left = escena.input.keyboard.addKey(izda);
        right = escena.input.keyboard.addKey(derecha);
        interactuar = escena.input.keyboard.addKey(interact);
        lanzar = escena.input.keyboard.addKey(accion);
    }

    function move(velocity, personaje)
    {
        personaje.body.velocity.x = velocity.x;
        personaje.body.velocity.y = velocity.y;
    }

    function updateMovimiento(cuadrado, animacion)
    {
        direction = {x: 0, y: 0};
        var isMoving = right.isDown || left.isDown || down.isDown || up.isDown;

        if (isMoving)
        {
            speed = MAX_SPEED;

            if (right.isDown)
            {
                direction.x = 1;
                dir = "Right";
                
            }   
            else if (left.isDown)
            {
                direction.x = -1;
                dir = "Left";
            }
            if (down.isDown)
            {
                direction.y = 1;
                dir = "Down";
            }
            else if (up.isDown)
            {
               direction.y = -1;
               dir = "Up";
            }      
            cuadrado.play(nombre + animacion + dir, true);      
        }
        else
        {
            speed = 0;
            cuadrado.anims.stop();
        }
        
        velocity.x = speed * direction.x;
        velocity.y = speed * direction.y;

        move(velocity, cuadrado);
    }     
}

function Mundo(width, height, escena)
{
    /* VARIABLES */

    // Ancho del mundo
    this.width = width;

    // Alto del mundo
    this.height = height;

    // Array mundo
    var world = undefined;   
    
    // Matriz de adyacencia del escenario para representar qué puntos están unidos
    var adjacencyMatrix = undefined;

    // Array de distancias
    var distances = undefined;

    // Gráficos
    var graphics = undefined;

    // Jugador 1
    var player1 = new Player(4, 4, "H", escena, 'W', 'S', 'A', 'D', 'E', 'Q', "jugador1");

    var player2 = new Player(15, 4, "H", escena, 'up', 'down', 'left', 'right', 'shift', 'P', "jugador2");

    // Variable para ver si la trampa está activada
    var trampaActivada = false;

    // Variable para saber si la trampa tiene objeto
    var tieneObjeto = false;

    // Variable para saber qué objeto tiene la trampa
    var objetoTrampa = undefined;

    // Variable para saber si se traza o no el camino mas corto
    var dijkstraJ1 = true;
    var dijkstraJ2 = true;

    // Trampas que pueden salir
    var trampas = new Array();
    trampas.push(new Trampa(10 * 40, 5 * 40, "trampaReloj", escena));
    trampas.push(new Trampa(10 * 40, 5 * 40, "trampaMuro", escena));

    /* FUNCIONES PÚBLICAS */

    this.init = function()
    {       
        initGrafo();    
        initWorld();        
        initGraphics();
        initDistances();
        addButton(5, 8, "btnAltar", 18, false, false);
        addButton(5, 11, "btnAltar", 18, false, false);
        player1.create();
        player2.create();        
        wallCollision();
        centerCollision();
        putObjects();
        initGlobals(escena);
    }
    
    this.update = function(time, delta)
    {
        player1.update(time, delta);
        player2.update(time, delta);
        var targetJ1 = player1.getTargetPosition();
        var targetJ2 = player2.getTargetPosition();
        if (!dijkstraJ1)
            targetJ1 = {filaJ1: 0, columnaJ1: 0, filaJ2: 0, columnaJ2: 0};
        if (!dijkstraJ2)
            targetJ2 = {filaJ1: 0, columnaJ1: 0, filaJ2: 0, columnaJ2: 0}
        dijkstra({f: player1.fromWorldToTile().fila, c: player1.fromWorldToTile().columna}, {f: targetJ1.filaJ1, c: targetJ1.columnaJ1 },
                 {f: player2.fromWorldToTile().fila, c: player2.fromWorldToTile().columna}, {f: targetJ2.filaJ2, c: targetJ2.columnaJ2 });
        updateReceta(player1, "jugador1");
        updateReceta(player2, "jugador2");
        updateTrampaPlayer(player1, "jugador1");
        updateTrampaPlayer(player2, "jugador2");
        lanzarTramplaPlayer(player1, "jugador1", player2);
        lanzarTramplaPlayer(player2, "jugador2", player1);
    }

    this.updateTrampa = function(timer)
    {
        if (timer == 1000)
        {
            activateTrampa();
        }
        if (timer >= 2000)
        {
            defuseTrampa();
            timer = 0;
        }
    }

    /* FUNCIONES PRIVADAS */

    function activateTrampa()
    {
        // Numero aleatorio para ver qué trampa sale
        var random = Math.floor(Math.random() * 2);
        objetoTrampa = escena.add.image(trampas[random].posX, trampas[random].posY, trampas[random].nombre);
        world[5][9].object.visible = true;
        trampaActivada = true;
        tieneObjeto = true;
    }

    function defuseTrampa()
    {
        world[5][9].object.visible = false;
        trampaActivada = false;
        tieneObjeto = false;
        timer = 0;
        objetoTrampa.visible = false;
        objetoTrampa = undefined;
    }

    // Función para inicializar el mundo predeterminado
    function initWorld()
    {
        world = new Array();
        for (var i = 0; i < config.height / height; i++)
        {
            world.push(new Array());
            for(var j = 0; j < config.width / width; j++)
            {
                // Metemos las propiedades de cada casilla del mundo
                world[i].push({width: width, height: height, fila: i, columna: j, 
                    posY: height * i, posX: width * j, ocupada: 0, object: undefined});
            }
        }
        escena.add.image(0, 0, "sky").setOrigin(0, 0);        
    }

    function putObjects()
    {
        /* LADO IZQUIERDO */

        putOneStaticTileIntoTheWorld(8, 2, "yunquePequeño", 2, false, false);        
        putOneStaticTileIntoTheWorld(8, 3, "mesa", 3, false, false);
        putThreeDynamicTilesIntoTheWorld(5, 1, "hornoGrande", 4, "hornoGrande_fuego", false, false);
        putThreeDynamicTilesIntoTheWorld(2, 1, "hornoGrande", 5, "hornoPequeño_fuego", false, false);
        putTwoDynamicTilesIntoTheWorld(1, 3, "cajaMarron", 6, "cajaMarron_abrir", false, false);
        putTwoDynamicTilesIntoTheWorld(1, 4, "cajaGris", 7, "cajaGris_abrir", false, false);
        putTwoDynamicTilesIntoTheWorld(1, 5, "cajaAzul", 8, "cajaAzul_abrir", false, false);
        putOneDynamicTileIntoTheWorld(2, 6, "molde", 9, "molde_On", false, false);
        putOneStaticTileIntoTheWorld(4, 7, "barril", 10, false, false);
        putOneStaticTileIntoTheWorld(8, 4, "yunqueGrande", 11, false, false);
        putTwoStaticTilesIntoTheWorld(2, 7, "dobleProhibido", 12, false, false);
        putOneStaticTileIntoTheWorld(2, 2, "prohibido", 13, false, false);
        putOneStaticTileIntoTheWorld(8, 1, "prohibido", 13, false, false);
        putTwoDynamicTilesIntoTheWorld(5, 7, "basura", 14, "basura_On", false, false);
        putOneDynamicTileIntoTheWorld(12, 1, "monstruohielo", 15, false, false);
        putTwoStaticTilesIntoTheWorld(7, 7, "dobleProhibido", 12, false, false);

        /* LADO DERECHO */

        putOneStaticTileIntoTheWorld(8, 17, "yunquePequeño", 2, false, false);
        putOneStaticTileIntoTheWorld(8, 16, "mesa", 3, false, false);
        putThreeDynamicTilesIntoTheWorld(5, 18, "hornoGrande", 4, "hornoGrande_fuego", true, false);
        putThreeDynamicTilesIntoTheWorld(2, 18, "hornoGrande", 5, "hornoPequeño_fuego", true, false);
        putTwoDynamicTilesIntoTheWorld(1, 16, "cajaMarron", 6, "cajaMarron_abrir", false, false);
        putTwoDynamicTilesIntoTheWorld(1, 15, "cajaGris", 7, "cajaGris_abrir", false, false);
        putTwoDynamicTilesIntoTheWorld(1, 14, "cajaAzul", 8, "cajaAzul_abrir", false, false);
        putOneDynamicTileIntoTheWorld(2, 13, "molde", 9, "molde_On", false, false);
        putOneStaticTileIntoTheWorld(4, 12, "barril", 10, false, false);
        putOneStaticTileIntoTheWorld(8, 15, "yunqueGrande", 11, false, false);
        putTwoStaticTilesIntoTheWorld(2, 12, "dobleProhibido", 12, false, false);
        putOneStaticTileIntoTheWorld(2, 17, "prohibido", 12, false, false);
        putOneStaticTileIntoTheWorld(8, 18, "prohibido", 12, false, false);
        putTwoDynamicTilesIntoTheWorld(5, 12, "basura", 13, "basura_On", true, false);
        putOneDynamicTileIntoTheWorld(12, 17, "monstruoelfo", 15, false, false);
        putTwoStaticTilesIntoTheWorld(7, 12, "dobleProhibido", 12, false, false);

        /* ZONA CENTRAL */
        putFourDynamicTilesIntoTheWorld(4, 9, "altar1", 15, "", false, false);
        putFourDynamicTilesIntoTheWorld(4, 9, "altar2", 16, "", false, false);
        putOneStaticTileIntoTheWorld(4, 8, "wallCollider", 17, false, false);
        putOneStaticTileIntoTheWorld(4, 11, "wallCollider", 17, false, false);
    }

    // Función para crear nuestro grafo predeterminado
    function initGrafo()
    {
        /* ARRAY 4-DIMENSIONAL de i = 15, j = 20, k = 15, l = 20 */
        adjacencyMatrix = new Array();

        for (var i = 0; i < config.height / height; i++)
        {
            adjacencyMatrix.push(new Array());
            for (var j = 0; j < config.width / width; j++)
            {
                adjacencyMatrix[i].push(new Array());
                for (var k = 0; k < config.height / height; k++)
                {
                    adjacencyMatrix[i][j].push(new Array());
                    for (var l = 0; l < config.width / width; l++)
                    {
                        adjacencyMatrix[i][j][k].push(new Array());
                        adjacencyMatrix[i][j][k][l] = INF;
                        // Unión izda-derecha derecha-izda
                        if ((i == k && l == j + 1) || (i == k && l == j - 1))
                        {
                            adjacencyMatrix[i][j][k][l] = 1;
                        }                        
                        // Unión arriba-abajo abajo-arriba
                        if ((j == l && k == i + 1) || (j == l && k == i - 1))
                        {
                            adjacencyMatrix[i][j][k][l] = 1;
                        }
                    }
                }
            }
        }
    }

    // Función para inicializar los gráficos del juegos
    function initGraphics()
    {
        escena.cameras.main.setBackgroundColor('#ffffff');
        graphics = escena.add.graphics();
        graphics.lineStyle(4, 0x000000);    
        graphics.fillStyle(0x000000, 0.3);
    }

    // Función para inicializar el array de distancias
    function initDistances()
    {
        distances = new Array();
        for (var i = 0; i < config.height / height; i++)
        {
            distances.push(new Array());
            for (var j = 0; j < config.width / height; j++)
            {
                distances[i].push(new Array());
                distances[i][j] = INF;
            }
        }
    }

    // Función auxiliar para dibujar el camino más corto de un punto a otro
    function drawPath(prev, inicio, final)
    {
        if (inicio != undefined && final != undefined)
        {
            graphics.fillRect(inicio.columna * width, inicio.fila * height, width, height);
            if (inicio.fila != final.fila || inicio.columna != final.columna)
            {
                drawPath(prev, prev[inicio.fila][inicio.columna], final);
            }
        }
    }

    // Función para añadir la colisión con las paredes
    function wallCollision()
    {
        // PAREDES HORIZONTALES
        for (var i = 0; i < config.width / width; i++)
        {
            // Pared de arriba
            putOneStaticTileIntoTheWorld(0, i, "wallCollider", 1);
            // Pared de abajo
            putOneStaticTileIntoTheWorld((config.height / height) - 1, i, "wallCollider", 1);
        }

        // PAREDES VERTICALES
        for (var i = 0; i < config.height / height; i++)
        {
            // Pared de arriba
            putOneStaticTileIntoTheWorld(i, 0, "wallCollider", 1);
            // Pared de abajo
            putOneStaticTileIntoTheWorld(i, (config.width / width) - 1, "wallCollider", 1);
        }
    }

    function centerCollision()
    {
        for (var i = 6; i < config.height / height; i++)
        {
            putOneStaticTileIntoTheWorld(i, 9, "wallCollider", 1);
            putOneStaticTileIntoTheWorld(i, 10, "wallCollider", 1);
        }
    }

    /* FUNCIONES PARA AÑADIR TILES CON Y SIN ANIMACIÓN */ 
    function putOneStaticTileIntoTheWorld(fila, columna, nombre, id, flipX, flipY)
    {
        disconnectNeighbours(fila, columna);
        var objeto = escena.physics.add.image(columna * 40, fila * 40, nombre).setOrigin(0, 0).setImmovable();
        objeto.flipX = flipX;
        objeto.flipY = flipY;
        escena.physics.add.collider(objeto, player1.getSprite());
        escena.physics.add.collider(objeto, player2.getSprite());
        world[fila][columna].ocupada = id;
    }

    function putTwoStaticTilesIntoTheWorld(fila, columna, nombre, id, flipX, flipY)
    {
        disconnectNeighbours(fila, columna);
        disconnectNeighbours(fila + 1, columna);
        var objeto = escena.physics.add.image(columna * 40, fila * 40, nombre).setOrigin(0, 0).setImmovable();
        objeto.flipX = flipX;
        objeto.flipY = flipY;
        escena.physics.add.collider(objeto, player1.getSprite());
        escena.physics.add.collider(objeto, player2.getSprite());
        world[fila][columna].ocupada = id;
        world[fila + 1][columna].ocupada = id;
    }

    function putOneDynamicTileIntoTheWorld(fila, columna, nombre, id, animationName, flipX, flipY)
    {
        disconnectNeighbours(fila, columna);
        var objeto = escena.physics.add.sprite(columna * 40, fila * 40, nombre).setOrigin(0, 0).setImmovable();
        objeto.flipX = flipX;
        objeto.flipY = flipY;
        escena.physics.add.collider(objeto, player1.getSprite());
        escena.physics.add.collider(objeto, player2.getSprite());
        world[fila][columna].ocupada = id;
        world[fila][columna].object = objeto;
    }

    function putTwoDynamicTilesIntoTheWorld(fila, columna, nombre, id, animationName, flipX, flipY)
    {
        disconnectNeighbours(fila, columna);
        disconnectNeighbours(fila + 1, columna);
        var objeto = escena.physics.add.sprite(columna * 40, fila * 40, nombre).setOrigin(0, 0).setImmovable();
        objeto.flipX = flipX;
        objeto.flipY = flipY;
        escena.physics.add.collider(objeto, player1.getSprite());
        escena.physics.add.collider(objeto, player2.getSprite());
        world[fila][columna].ocupada = id;
        world[fila + 1][columna].ocupada = id;
        world[fila + 1][columna].object = objeto;
        world[fila][columna].object = objeto;
    }

    function putThreeDynamicTilesIntoTheWorld(fila, columna, nombre, id, animationName, flipX, flipY)
    {
        disconnectNeighbours(fila, columna);
        disconnectNeighbours(fila + 1, columna);
        disconnectNeighbours(fila + 2, columna);
        var objeto = escena.physics.add.sprite(columna * 40, fila * 40, nombre).setOrigin(0, 0).setImmovable();
        objeto.play(animationName);
        objeto.flipX = flipX;
        objeto.flipY = flipY;
        escena.physics.add.collider(objeto, player1.getSprite());
        escena.physics.add.collider(objeto, player2.getSprite());
        world[fila][columna].ocupada = id;
        world[fila + 1][columna].ocupada = id;
        world[fila + 2][columna].ocupada = id;
    }

    function putFourDynamicTilesIntoTheWorld(fila, columna, nombre, id, animationName, flipX, flipY)
    {
        disconnectNeighbours(fila, columna);
        disconnectNeighbours(fila, columna + 1);
        disconnectNeighbours(fila + 1, columna);
        disconnectNeighbours(fila + 1, columna + 1);
        var objeto = escena.physics.add.image(columna * 40, fila * 40, nombre).setOrigin(0, 0).setImmovable();;
        if (nombre == "altar1")
        {            
            objeto.visible = true;            
        }
        else
        {
            objeto.visible = false;
        }
        escena.physics.add.collider(objeto, player1.getSprite());
        escena.physics.add.collider(objeto, player2.getSprite());
        world[fila][columna].object = objeto;
        world[fila][columna + 1].object = objeto;
        world[fila + 1][columna].object = objeto;
        world[fila + 1][columna + 1].object = objeto;
    }

    function putWall(fila, columna)
    {
        disconnectNeighbours(fila, columna);
        disconnectNeighbours(fila, columna + 1);
        disconnectNeighbours(fila, columna + 2);
    } 

    function addButton(fila, columna, nombre, id, flipX, flipY)
    {
        var objeto = escena.add.image(columna * 40, fila * 40, nombre).setOrigin(0, 0);
        objeto.flipX = flipX;
        objeto.flipY = flipY;
        world[fila][columna].ocupada = id;
    }

    // Desconectar los vecionos de un nodo del grafo
    function disconnectNeighbours(fila, columna)
    {
        var maxF = config.height / height, maxC = config.width / width;
        if (fila + 1 < maxF)
            adjacencyMatrix[fila + 1][columna][fila][columna] = INF;
        if (fila + 1 < maxF && columna + 1 < maxC)
            adjacencyMatrix[fila + 1][columna + 1][fila][columna] = INF;
        if (fila + 1 < maxF && columna - 1 >= 0)
            adjacencyMatrix[fila + 1][columna - 1][fila][columna] = INF;
        if (columna + 1 < maxC)
            adjacencyMatrix[fila][columna + 1][fila][columna] = INF;
        if (columna - 1 >= 0)
            adjacencyMatrix[fila][columna - 1][fila][columna] = INF;
        if (fila - 1 >= 0 && columna + 1 < maxC)
            adjacencyMatrix[fila - 1][columna + 1][fila][columna] = INF;
        if (fila - 1 >= 0)
            adjacencyMatrix[fila - 1][columna][fila][columna] = INF;
        if (fila - 1 >= 0 && columna - 1 >= 0) 
            adjacencyMatrix[fila - 1][columna - 1][fila][columna] = INF;
    }

    // Algoritmo de Dijkstra
    function dijkstra(start1, end1, start2, end2)
    {
        /* JUGADOR 1 */

        initDistances();
        graphics.clear();
        graphics.fillStyle(0x00ff07, 0.3);
        var compare = function(a, b) {return a.distance < b.distance};
        distances[start1.f][start1.c] = 0;
        var prio_queue = new PriorityQueue({comparator: compare});
        var prev = new Array();
        for (var i = 0; i < config.height / height; i++)
        {
            prev.push(new Array());
            for (var j = 0; j < config.width / width; j++)
            {
                prev[i].push(new Array());
                prev[i][j] = undefined;
            }
        }
        prio_queue.queue({startF: start1.f, startC: start1.c, distance: 0});
        while (prio_queue.length > 0)
        {
            var node = prio_queue.dequeue();            
            if (distances[node.startF][node.startC] >= node.distance)
            {
                for (var k = 0; k < config.height / height; k++)
                {
                    for (var l = 0; l < config.width / width; l++)
                    {
                        var peso = node.distance + adjacencyMatrix[node.startF][node.startC][k][l];
                        if (peso < distances[k][l])
                        {
                            prio_queue.queue({startF: k, startC: l, distance: peso});
                            distances[k][l] = peso;
                            prev[k][l] = {fila: node.startF, columna: node.startC};
                        }
                    }
                }
            }
        }   
        if (end1.c != 0 && end1.f != 0)
            graphics.fillRect(end1.c * width, end1.f * height, width, height);
        drawPath(prev, prev[end1.f][end1.c], {fila: start1.f, columna: start1.c});  

        /* JUGADOR 2 */

        initDistances();
        graphics.fillStyle(0x0000f7, 0.3);
        distances[start2.f][start2.c] = 0;
        prio_queue = new PriorityQueue({comparator: compare});
        prev = new Array();
        for (var i = 0; i < config.height / height; i++)
        {
            prev.push(new Array());
            for (var j = 0; j < config.width / width; j++)
            {
                prev[i].push(new Array());
                prev[i][j] = undefined;
            }
        }
        prio_queue.queue({startF: start2.f, startC: start2.c, distance: 0});
        while (prio_queue.length > 0)
        {
            var node = prio_queue.dequeue();            
            if (distances[node.startF][node.startC] >= node.distance)
            {
                for (var k = 0; k < config.height / height; k++)
                {
                    for (var l = 0; l < config.width / width; l++)
                    {
                        var peso = node.distance + adjacencyMatrix[node.startF][node.startC][k][l];
                        if (peso < distances[k][l])
                        {
                            prio_queue.queue({startF: k, startC: l, distance: peso});
                            distances[k][l] = peso;
                            prev[k][l] = {fila: node.startF, columna: node.startC};
                        }
                    }
                }
            }
        }
        if (end2.c != 0 && end2.f != 0)
            graphics.fillRect(end2.c * width, end2.f * height, width, height);
        drawPath(prev, prev[end2.f][end2.c], {fila: start2.f, columna: start2.c});     
    }    

    function updateReceta(cuadrado, id)
    {
        var pos = cuadrado.fromWorldToTile();
        var target_pos = cuadrado.getTargetPosition();
        var interaccion = cuadrado.recetas[0].pasos[0];        
        if (id == "jugador1")
        {
            if (martillazosJ1 > 0)
            {
                martillo1J1.visible = true;
                martillo2J1.visible = false;
            }
            if (numHornoJ1 > 0)
            {
                unodedosJ1.visible = true;
            }
            if (pos.fila == target_pos.filaJ1 && pos.columna == target_pos.columnaJ1)
            {
                if (cuadrado.interactuando)
                {
                    if (interaccion == "MetalAmarillo")
                    {
                        world[1][3].object.play("cajaMarron_abrir");
                        cuadrado.animacion = "yellowMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MetalGris")
                    {
                        world[1][4].object.play("cajaGris_abrir");
                        cuadrado.animacion = "greyMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MetalAzul")
                    {
                        world[1][5].object.play("cajaAzul_abrir");
                        cuadrado.animacion = "blueMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MeterHornoIndividual")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SacarHornoIndividual")
                    {
                        cartelOkJ1.x = 1 * 40;
                        cartelOkJ1.y = 3 * 40;
                        cartelOkJ1.visible = true;
                        escena.time.delayedCall(2000, () => 
                        {
                            cartelOkJ1.visible = false;
                        });                        
                        cuadrado.animacion = "hotMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SoltarMolde")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "UsarMolde")
                    {
                        cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre + "marron");
                        cartelOkJ1.x = 6 * 40;
                        cartelOkJ1.y = 2 * 40;
                        cartelOkJ1.visible = true;
                        escena.time.delayedCall(2000, () => 
                        {
                            cartelOkJ1.visible = false;
                        }); 
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SoltarYunqueIndividual")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MartillearYunqueIndividual")
                    {
                        martillazosJ1++;
                        martillo2J1.visible = true;
                        martillo1J1.x = 2 * 40;
                        martillo1J1.y = 8 * 40;
                        martillo2J1.x = 2 * 40;
                        martillo2J1.y = 8 * 40;
                        if (martillazosJ1 >= 100)
                        {
                            cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre + "marron");
                            martillo1J1.visible = false;
                            martillo2J1.visible = false;
                            martillazosJ1 = 0;
                            cuadrado.recetas[0].pasos.shift();
                        }                        
                    }
                    else if (interaccion == "SoltarTemplado")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "UsarTemplado")
                    {
                        cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre);
                        cartelOkJ1.x = 7 * 40;
                        cartelOkJ1.y = 4 * 40;
                        cartelOkJ1.visible = true;
                        escena.time.delayedCall(2000, () => 
                        {
                            cartelOkJ1.visible = false;
                        }); 
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "Monstruo")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas.shift();
                    }
                    else if (interaccion == "MeterHornoDoble")
                    {
                        numHornoJ1++;
                        if (numHornoJ1 >= 2)
                        {
                            cuadrado.animacion = "withoutObject";
                            cuadrado.recetas[0].pasos.shift();
                            numHornoJ1 = 0;
                            unodedosJ1.visible = false;
                        }                        
                    }
                    else if (interaccion == "SacarHornoDoble")
                    {
                        numHornoJ1 = 0;
                        cuadrado.animacion = "hotMetal";
                        cartelOkJ1.x = 1 * 40;
                        cartelOkJ1.y = 4 * 40;
                        cartelOkJ1.visible = true;
                        escena.time.delayedCall(2000, () =>
                        {
                            cartelOkJ1.visible = false;
                        });
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SoltarYunqueDoble")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MartillearYunqueDoble")
                    {
                        martillazosJ1++;
                        martillo2J1.visible = true;
                        martillo1J1.x = 4 * 40;
                        martillo1J1.y = 8 * 40;
                        martillo2J1.x = 4 * 40;
                        martillo2J1.y = 8 * 40;
                        if (martillazosJ1 >= 100)
                        {
                            cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre + "marron");
                            martillo1J1.visible = false;
                            martillo2J1.visible = false;
                            martillazosJ1 = 0;
                            cuadrado.recetas[0].pasos.shift();
                        }                        
                    }
                }
            }
        }
        else
        {
            if (martillazosJ2 > 0)
            {
                martillo1J2.visible = true;
                martillo2J2.visible = false;
            }
            if (numHornoJ2 > 0)
            {
                unodedosJ2.visible = true;
            }
            if (pos.fila == target_pos.filaJ2 && pos.columna == target_pos.columnaJ2)
            {
                if (cuadrado.interactuando)
                {
                    if (interaccion == "MetalAmarillo")
                    {
                        world[1][16].object.play("cajaMarron_abrir");
                        cuadrado.animacion = "yellowMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MetalGris")
                    {
                        world[1][15].object.play("cajaGris_abrir");
                        cuadrado.animacion = "greyMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MetalAzul")
                    {
                        world[1][14].object.play("cajaAzul_abrir");
                        cuadrado.animacion = "blueMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MeterHornoIndividual")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SacarHornoIndividual")
                    {
                        cartelOkJ2.x = 18 * 40;
                        cartelOkJ2.y = 3 * 40;
                        cartelOkJ2.visible = true;
                        escena.time.delayedCall(2000, () => 
                        {
                            cartelOkJ2.visible = false;
                        });                        
                        cuadrado.animacion = "hotMetal";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SoltarMolde")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "UsarMolde")
                    {
                        cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre + "marron");
                        cartelOkJ2.x = 13 * 40;
                        cartelOkJ2.y = 2 * 40;
                        cartelOkJ2.visible = true;
                        escena.time.delayedCall(2000, () => 
                        {
                            cartelOkJ2.visible = false;
                        }); 
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SoltarYunqueIndividual")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MartillearYunqueIndividual")
                    {
                        martillazosJ2++;
                        martillo2J2.visible = true;
                        martillo1J2.x = 17 * 40;
                        martillo1J2.y = 8 * 40;
                        martillo2J2.x = 17 * 40;
                        martillo2J2.y = 8 * 40;
                        if (martillazosJ2 >= 100)
                        {
                            cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre + "marron");
                            martillo1J2.visible = false;
                            martillo2J2.visible = false;
                            martillazosJ2 = 0;
                            cuadrado.recetas[0].pasos.shift();
                        }                        
                    }
                    else if (interaccion == "SoltarTemplado")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "UsarTemplado")
                    {
                        cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre);
                        cartelOkJ2.x = 12 * 40;
                        cartelOkJ2.y = 4 * 40;
                        cartelOkJ2.visible = true;
                        escena.time.delayedCall(2000, () => 
                        {
                            cartelOkJ2.visible = false;
                        }); 
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "Monstruo")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas.shift();
                    }
                    else if (interaccion == "MeterHornoDoble")
                    {
                        numHornoJ2++;
                        if (numHornoJ2 >= 2)
                        {
                            cuadrado.animacion = "withoutObject";
                            cuadrado.recetas[0].pasos.shift();
                            numHornoJ2 = 0;
                            unodedosJ2.visible = false;
                        }                        
                    }
                    else if (interaccion == "SacarHornoDoble")
                    {
                        numHornoJ2 = 0;
                        cuadrado.animacion = "hotMetal";
                        cartelOkJ2.x = 18 * 40;
                        cartelOkJ2.y = 4 * 40;
                        cartelOkJ2.visible = true;
                        escena.time.delayedCall(2000, () =>
                        {
                            cartelOkJ2.visible = false;
                        });
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "SoltarYunqueDoble")
                    {
                        cuadrado.animacion = "withoutObject";
                        cuadrado.recetas[0].pasos.shift();
                    }
                    else if (interaccion == "MartillearYunqueDoble")
                    {
                        martillazosJ2++;
                        martillo2J2.visible = true;
                        martillo1J2.x = 15 * 40;
                        martillo1J2.y = 8 * 40;
                        martillo2J2.x = 15 * 40;
                        martillo2J2.y = 8 * 40;
                        if (martillazosJ2 >= 100)
                        {
                            cuadrado.animacion = cuadrado.chooseObject(cuadrado.recetas[0].nombre + "marron");
                            martillo1J2.visible = false;
                            martillo2J2.visible = false;
                            martillazosJ2 = 0;
                            cuadrado.recetas[0].pasos.shift();
                        }                        
                    }
                }
            }
        }
    }  
    
    function updateTrampaPlayer(cuadrado, id)
    {
        var pos = cuadrado.fromWorldToTile();
        if (id == "jugador1")
        {
            if (pos.fila == 5 && pos.columna == 8 && cuadrado.interactuando)
            {
                if (tieneObjeto && cuadrado.trampa == undefined)
                {
                    if (objetoTrampa.width == 24) // RELOJ
                    {
                        cuadrado.trampa = "reloj";
                    }
                    else // MURO
                    {
                        cuadrado.trampa = "muro";
                    }   
                    defuseTrampa();                 
                }
            }
        }
        else
        {
            if (pos.fila == 5 && pos.columna == 11 && cuadrado.interactuando)
            {
                if (tieneObjeto && cuadrado.trampa == undefined)
                {
                    if (objetoTrampa.width == 24) // RELOJ
                    {
                        cuadrado.trampa = "reloj";
                    }
                    else // MURO
                    {
                        cuadrado.trampa = "muro";
                    }
                    defuseTrampa();
                }
            }
        }
    }
    
    function lanzarTramplaPlayer(cuadrado, id, enemigo)
    {       
        if (id == "jugador1")
        {
            if (cuadrado.lanzarTrampa)
            {
                if (cuadrado.trampa == "reloj")
                {
                    cuadrado.useTrampa();
                    enemigo.puedeMoverse = false;
                    enemigo.cuadrado.anims.stop();
                    escena.time.delayedCall(4000, () =>
                    {
                        enemigo.puedeMoverse = true;
                    });
                }
                else if (cuadrado.trampa != undefined)
                {
                    cuadrado.useTrampa();
                    var objeto = escena.physics.add.image(14 * 40, 5 * 40, "tripleMuro").setOrigin(0, 0).setImmovable();
                    putWall(5, 14);
                    escena.physics.add.collider(objeto, enemigo.getSprite());
                    dijkstraJ2 = false;
                    escena.time.delayedCall(15000, () =>
                    {
                        objeto.destroy();
                        objeto.visible = false;
                        dijkstraJ2 = true;
                    });
                }
            }
        } 
        else
        {
            if (cuadrado.lanzarTrampa)
            {
                if (cuadrado.trampa == "reloj")
                {
                    cuadrado.useTrampa();
                    enemigo.puedeMoverse = false;
                    enemigo.cuadrado.anims.stop();
                    escena.time.delayedCall(4000, () =>
                    {
                        enemigo.puedeMoverse = true;
                    });
                }
                else if (cuadrado.trampa != undefined)
                {
                    cuadrado.useTrampa();
                    var objeto = escena.physics.add.image(3 * 40, 5 * 40, "tripleMuro").setOrigin(0, 0).setImmovable();
                    putWall(5, 14);
                    escena.physics.add.collider(objeto, enemigo.getSprite());
                    dijkstraJ1 = false;
                    escena.time.delayedCall(15000, () =>
                    {
                        objeto.destroy();
                        objeto.visible = false;
                        dijkstraJ1 = true;
                    });
                }
            }
        }
    }
}

function Trampa(posX, posY, nombre, escena)
{
    // Posición x de la trampa
    this.posX = posX;

    // Posición y de la trampa
    this.posY = posY;

    // Nombre de la trampa
    this.nombre = nombre;

    // Si es visible o no
    this.visible = false;


}

function initGlobals(escena)
{
    cartelOkJ1 = escena.add.image(1 * 40, 2 * 40, "correcto");
    cartelOkJ1.visible = false;
    cartelOkJ2 = escena.add.image(0, 0, "correcto");
    cartelOkJ2.visible = false;

    martillo1J1 = escena.add.image(2 * 40, 8 * 40, "martillo1");
    martillo1J1.visible = false;
    martillo2J1 = escena.add.image(2 * 40, 8 * 40, "martillo2");
    martillo2J1.visible = false;
    martillo1J2 = escena.add.image(17 * 40, 8 * 40, "martillo1");
    martillo1J2.visible = false;
    martillo1J2.flipX = true;
    martillo2J2 = escena.add.image(17 * 40, 8 * 40, "martillo2");
    martillo2J2.visible = false;
    martillo2J2.flipX = true;

    unodedosJ1 = escena.add.image(1 * 40, 4 * 40, "unodedos");
    unodedosJ1.visible = false;
    unodedosJ2 = escena.add.image(1 * 40, 15 * 40, "unodedos");
    unodedosJ2.visible = false;
}