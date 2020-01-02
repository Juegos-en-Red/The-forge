"use strict";

//Inicialización de la escena del juego en local
var sc_juegoOnline = new Phaser.Scene('JuegoOnline');

const INF = 0X3F3F3F3F;

//Función preload: Aquí se cargan todos los sprites necesarios para el juego.
sc_juegoOnline.preload = function() {
    
}

//Función create: Aquí se inicializan todos los objetos del juego.
sc_juegoOnline.create = function() {
    console.log("Online game: begin.");

    sc_juegoOnline.gameStarted = false;

    onlineInitDistances();
    onlineInitGrafo();

    //Música. Si se añade más música es importante parar aquí toda la que haya
    mus_menu.onlinePause();
    mus_menu.currentTime = 0;


    //Aquí se carga el fondo del juego
    this.add.image(400, 300, 'sky');

    sc_juegoOnline.graphics = sc_juegoOnline.add.graphics();
    //Inicialización de animaciones
    initAnimations(this);

    //Inicialización de colisiones
    sc_juegoOnline.colisiones = this.physics.add.staticGroup();
    sc_juegoOnline.colisiones.create(40, 300, 'molde').setSize(80,600).setDisplaySize(80,600).setAlpha(0);
    sc_juegoOnline.colisiones.create(400, 40, 'molde').setSize(800,80).setDisplaySize(800,80).setAlpha(0);
    sc_juegoOnline.colisiones.create(720+40, 300, 'molde').setSize(80,600).setDisplaySize(80,600).setAlpha(0);
    sc_juegoOnline.colisiones.create(320+80, 180, 'molde').setSize(160,360).setDisplaySize(160,360).setAlpha(0);
    sc_juegoOnline.colisiones.create(360+40, 360+40, 'molde').setSize(80,80).setDisplaySize(80,80).setAlpha(0);
    sc_juegoOnline.colisiones.create(400, 440+80, 'molde').setSize(800,160).setDisplaySize(800,160).setAlpha(0);

    //Inicialización de cajones
    //Primero se crea un grupo de cajones para poder iterar y después se crean los cajones de ambos jugadores
    //La propiedad heldObject (que se repetirá mucho en el resto de objetos) guarda en forma de string el objeto que guarda el cajón
    sc_juegoOnline.cajonesMetal = this.physics.add.staticGroup();
    sc_juegoOnline.cajonesMetal.create(140, 46, 'cajon1').heldObject = "metal1"
    sc_juegoOnline.cajonesMetal.create(180, 46, 'cajon2').heldObject = "metal2"
    sc_juegoOnline.cajonesMetal.create(220, 46, 'cajon3').heldObject = "metal3"
    sc_juegoOnline.cajonesMetal.create(260, 46, 'cajon4').heldObject = "metal4"
    sc_juegoOnline.cajonesMetal.create(300, 46, 'cajon5').heldObject = "metal5"

    sc_juegoOnline.cajonesMetal.children.iterate(function(child) {
        child.player = 1;
    });

    sc_juegoOnline.cajonesMetal.create(500, 46, 'cajon1').heldObject = "metal1"
    sc_juegoOnline.cajonesMetal.create(540, 46, 'cajon2').heldObject = "metal2"
    sc_juegoOnline.cajonesMetal.create(580, 46, 'cajon3').heldObject = "metal3"
    sc_juegoOnline.cajonesMetal.create(620, 46, 'cajon4').heldObject = "metal4"
    sc_juegoOnline.cajonesMetal.create(660, 46, 'cajon5').heldObject = "metal5"
    
    sc_juegoOnline.cajonesMetal.children.iterate(function(child) {
        if (child.player != 1) child.player = 2;
    });

    sc_juegoOnline.cajonesMetal.children.iterate(function(child) {
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, false, true, true);
    });

    //Inicialización de basuras
    //La inicialización de las basuras no necesita la propiedad heldObject, ya que sólo sirven para que el jugador se deshaga de objetos no deseados.
    sc_juegoOnline.basuras = this.physics.add.staticGroup();
    sc_juegoOnline.basuras.create(340, 320, 'basura').player = 1;
    sc_juegoOnline.basuras.create(460, 320, 'basura').setFlipX(true);

    sc_juegoOnline.basuras.children.iterate(function(child) {
        if (child.player != 1) child.player = 2;
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
    });

    //Inicialización de hornos de 1 material
    //En las estaciones de trabajo se añaden varias propiedades además de heldObject. 
    //En este caso se añaden timer, que guarda el progreso del metal en su interior, y status, el sprite que mostrará el estado de la estación.
    sc_juegoOnline.hornos = this.physics.add.staticGroup();
    sc_juegoOnline.hornos.create( 60, 140, 'horno').player = 1;
    sc_juegoOnline.hornos.create(740, 140, 'horno').setFlipX(true);

    sc_juegoOnline.hornos.children.iterate(function(child){
        if (child.player != 1) child.player = 2;
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');
        child.anims.play('hornoA', true);
    });

    //Inicialización de barriles de templado
    sc_juegoOnline.barriles = this.physics.add.staticGroup();
    sc_juegoOnline.barriles.create(340, 179, 'barril de templado').player = 1;
    sc_juegoOnline.barriles.create(460, 179, 'barril de templado').player = 2;

    sc_juegoOnline.barriles.children.iterate(function(child){
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, false, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');
    });

    
    //Inicialización de moldes
    sc_juegoOnline.moldes = this.physics.add.staticGroup();
    sc_juegoOnline.moldes.create(340, 220, 'molde').player = 1;
    sc_juegoOnline.moldes.create(460, 220, 'molde').player = 2;

    sc_juegoOnline.moldes.children.iterate(function(child){
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');
    });

    //Inicialización de yunques de 1 material
    //Es idéntica a la de los hornos, pero también se añade la propiedad cooldown, que impide al jugador interactuar con más frecuencia de la deseada.
    sc_juegoOnline.yunques = this.physics.add.staticGroup();
    sc_juegoOnline.yunques.create(340, 260, 'yunque').player = 1;
    sc_juegoOnline.yunques.create(460, 260, 'yunque').player = 2;

    sc_juegoOnline.yunques.children.iterate(function(child){
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');
    });
    
    //Inicialización de  hornos de 2 materiales
    //En este caso hay dos heldObjects, ya que se trata de un horno doble. Lo mismo ocurrirá en los yunques dobles.
    sc_juegoOnline.hornosd = this.physics.add.staticGroup();
    sc_juegoOnline.hornosd.create( 60, 260, 'horno doble').player = 1;
    sc_juegoOnline.hornosd.create(740, 260, 'horno doble').setFlipX(true);

    sc_juegoOnline.hornosd.children.iterate(function(child){
        if (child.player != 1) child.player = 2;
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');
        child.anims.play("horno dobleA", false);
    });



    //Inicialización de yunques de 2 materiales
    sc_juegoOnline.yunquesd = this.physics.add.staticGroup();
    sc_juegoOnline.yunquesd.create( 53, 340, 'yunque doble').player = 1;
    sc_juegoOnline.yunquesd.create(747, 340, 'yunque doble').player = 2;

    sc_juegoOnline.yunquesd.children.iterate(function(child){
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');
    });

    //Inicialización de trampas
    sc_juegoOnline.altarTrampas = this.physics.add.staticSprite(400,  400, 'altar1');
    sc_juegoOnline.altarTrampas.trampa = "none";
    sc_juegoOnline.altarTrampas.timer = 0;
    sc_juegoOnline.altarTrampas.trampaSprite = sc_juegoOnline.add.image(sc_juegoOnline.altarTrampas.x, sc_juegoOnline.altarTrampas.y, 'empty');
    sc_juegoOnline.trampasb = this.physics.add.staticGroup();
    sc_juegoOnline.trampasb.create(340, 420, 'btnAltar');
    sc_juegoOnline.trampasb.create(460, 420, 'btnAltar');
    /*for (var i = 1; i < 10; i++) {
        for (var j = 9; i < 10; j++) {
            onlineDisconnectNeighbours(i,j, true, true, true, true);
        }
    }*/
    onlineDisconnectNeighbours(6,9, true, true, true, true);
    onlineDisconnectNeighbours(6,10, true, true, true, true);
    onlineDisconnectNeighbours(7,9, true, true, true, true);
    onlineDisconnectNeighbours(7,10, true, true, true, true);
    onlineDisconnectNeighbours(8,9, true, true, true, true);
    onlineDisconnectNeighbours(8,10, true, true, true, true);
    onlineDisconnectNeighbours(9,9, true, true, true, true);
    onlineDisconnectNeighbours(9,10, true, true, true, true);
    onlineDisconnectNeighbours(10,9, true, true, true, true);
    onlineDisconnectNeighbours(10,10, true, true, true, true);

    sc_juegoOnline.muros = this.physics.add.staticGroup();

    //Inicialización de jugadores
    sc_juegoOnline.players = this.physics.add.group();

    //En cont.p1.char y cont.p2.char se guarda el spritesheet del personaje de cada jugador
    //En la escena de selección de personaje se deberán cambiar estas variables
    sc_juegoOnline.player = sc_juegoOnline.players.create(210, 320, cont.p1.ch);
    sc_juegoOnline.player2 = sc_juegoOnline.players.create(590, 320, cont.p2.ch);

    //Inicialización de características comunes a ambos jugadores
    //Variable auxiliar that para hacer referencia a this
    var that = this;

    sc_juegoOnline.particles = sc_juegoOnline.add.particles('dust');

    //Al crear a los jugadores se inicializan una gran cantidad de variables
    sc_juegoOnline.players.children.iterate(function (child) {
        //spdX y spdY guardan la velocidad del jugador
        child.spdX = 0;
        child.spdY = 0;

        //heldObject funciona igual que en las estaciones de trabajo
        child.heldObject = "none";

        //dir guarda la dirección en la que está mirando el jugador, para facilitar el uso de animaciones
        child.dir = "Down";

        //defaultTexture guarda la textura del personaje para poder aplicar las animaciones correctas
        child.defaultTexture = child.texture;

        //hos es un grupo de objetos físicos que agrupa a heldObjectSprite y heldObjectSprite2.
        //Estos sprites son los que dibujan al jugador y al objeto que lleva, para poder aplicarle un tinte independiente a este último.
        child.hos = that.physics.add.group();
        child.heldObjectSprite = child.hos.create(child.x, child.y, child.texture);
        //Es importante que la textura del jugador esté vacía, para no crear efectos visuales no deseados
        child.setTexture('empty');
        child.heldObjectSprite2 = child.hos.create(child.x, child.y, 'empty');

        //El personaje debe colisionar con los bordes del mapa.
        child.setCollideWorldBounds(true);

        //Según el personaje seleccionado, se establecerá un tamaño de colisión u otro.
        switch(child.defaultTexture.key) {
            case 'SSHielo1':
                child.setSize(70, 58);
                break;
            case 'SSElfa1':
                child.setSize(61, 64);
                break;
            case 'SSFuego1':
                child.setSize(70, 58);
                break;
        }

        //interacted se activa al pulsar la tecla de interacción y se desactiva al levantarla.
        //Sirve para obligar al jugador a pulsar varias veces, ya que si no podría mantener el botón pulsado y se interactuaría constantemente.
        child.interacted = false;
        child.trampa = "none";
        child.tiempoInmovil = 0;

        child.status = sc_juegoOnline.add.image(child.x-6, child.y-25, 'empty');

        //Generadores de partículas
        child.emitter = sc_juegoOnline.particles.createEmitter({
            follow: child,
            followOffset: {
                y: child.height
            },
             radial: true,
             angle: { min: 0, max: 360 }, 
             alpha: {start: 1, end: 0}, 
            delay: 0,
            lifespan: 500,
            speed: {min: 25, max: 50},
            on: false,
            active: true,
        
        });

    });

    //Inicialización de mesas
    sc_juegoOnline.mesas = this.physics.add.staticGroup();
    sc_juegoOnline.mesas.create(180, 455, 'mesa').player = 1;
    sc_juegoOnline.mesas.create(220, 455, 'mesa').player = 1;
    sc_juegoOnline.mesas.create(260, 455, 'mesa').player = 1;

    sc_juegoOnline.mesas.create(620, 455, 'mesa').player = 2;
    sc_juegoOnline.mesas.create(580, 455, 'mesa').player = 2;
    sc_juegoOnline.mesas.create(540, 455, 'mesa').player = 2;

    sc_juegoOnline.mesas.children.iterate(function (child) {
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, false, true, true, true);
        child.heldObject = "none";
        child.heldObjectSprite = sc_juegoOnline.add.image(child.x, child.y, 'empty');
    });

    //Inicialización de monstruos
    sc_juegoOnline.monstruos = this.physics.add.staticGroup();
    var temp;
    if (cont.p1.ch.slice(2,3) == 'H') {
        temp = "Hielo";
    } else if (cont.p1.ch.slice(2,3) == 'F') {
        temp = "Fuego";
    } else {
        temp = "Elfo";
    }
    sc_juegoOnline.monstruo1 = sc_juegoOnline.monstruos.create(72, 433, 'M'+temp+'D');
    sc_juegoOnline.monstruo1.setSize(110,128);
    sc_juegoOnline.monstruo1.faction = temp;
    if (cont.p2.ch.slice(2,3) == 'H') {
        temp = "Hielo";
    } else if (cont.p2.ch.slice(2,3) == 'F') {
        temp = "Fuego";
    } else {
        temp = "Elfo";
    }
    sc_juegoOnline.monstruo2 = sc_juegoOnline.monstruos.create(728, 433, 'M'+temp+'D').setFlipX(true);
    sc_juegoOnline.monstruo1.setSize(110,128);
    sc_juegoOnline.monstruo2.faction = temp;

    //mejorar el disconnect para los monstruos no estaría de más
    sc_juegoOnline.monstruos.children.iterate(function (child) {
        onlineDisconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x);
        child.heldCasco = "none";
        child.heldPechera = "none";
        child.heldPiernas = "none";
        child.heldEspada = "none";
        child.heldCascoSprite = sc_juegoOnline.add.image(child.x, child.y, 'empty');
        child.heldPecheraSprite = sc_juegoOnline.add.image(child.x, child.y, 'empty');
        child.heldPiernasSprite = sc_juegoOnline.add.image(child.x, child.y, 'empty');
        child.heldEspadaSprite = sc_juegoOnline.add.image(child.x, child.y, 'empty');
    });
    sc_juegoOnline.monstruo2.heldCascoSprite.setFlipX(true);
    sc_juegoOnline.monstruo2.heldPecheraSprite.setFlipX(true);
    sc_juegoOnline.monstruo2.heldPiernasSprite.setFlipX(true);
    sc_juegoOnline.monstruo2.heldEspadaSprite.setFlipX(true);

    //Colisiones
    //Una vez están creados todos los objetos, se añade la colisión de cada jugador con cada grupo de objetos.
    sc_juegoOnline.players.children.iterate(function(child) {
        that.physics.add.collider(child, sc_juegoOnline.colisiones);
        that.physics.add.collider(child, sc_juegoOnline.muros);
        that.physics.add.collider(child, sc_juegoOnline.monstruos);
        that.physics.add.overlap(child, sc_juegoOnline.trampasb, onlineCogerTrampa, null, that);
    });

    //Esta función se ejecutará al dejar de pulsar una tecla
    //Se comprobarán las teclas definidas de forma global para realizar una acción u otra
    //En el caso de las teclas de dirección, si el jugador se estaba moviendo en esa dirección, deja de hacerlo
    //En el caso de la tecla de interacción, la variable interacted pasa a ser false
    this.input.keyboard.on('keyup', 
    function (event) {
        switch (event.keyCode) {
            case cont.p1.w:
                if (sc_juegoOnline.player.spdY <= 0) {
                    sc_juegoOnline.player.spdY = 0;
                }
            break;
            case cont.p1.s:
                if (sc_juegoOnline.player.spdY >= 0) {
                    sc_juegoOnline.player.spdY = 0;
                }
            break;
            case cont.p1.a:
                if (sc_juegoOnline.player.spdX <= 0) {
                    sc_juegoOnline.player.spdX = 0;
                }
            break;
            case cont.p1.d:
                if (sc_juegoOnline.player.spdX >= 0) {
                    sc_juegoOnline.player.spdX = 0;
                }
            break;
            case cont.p1.i1:
                sc_juegoOnline.player.interacted = false;
            break;
            case cont.p2.w:
                if (sc_juegoOnline.player2.spdY <= 0) {
                    sc_juegoOnline.player2.spdY = 0;
                }
            break;
            case cont.p2.s:
                if (sc_juegoOnline.player2.spdY >= 0) {
                    sc_juegoOnline.player2.spdY = 0;
                }
            break;
            case cont.p2.a:
                if (sc_juegoOnline.player2.spdX <= 0) {
                    sc_juegoOnline.player2.spdX = 0;
                }
            break;
            case cont.p2.d:
                if (sc_juegoOnline.player2.spdX >= 0) {
                    sc_juegoOnline.player2.spdX = 0;
                }
            break;
            case cont.p2.i1:
                sc_juegoOnline.player2.interacted = false;
            break;
        }
    });

    //Esta función se ejecutará mientras esté pulsada alguna tecla
    //Se comprobarán las teclas definidas de forma global para realizar una acción u otra
    //En el caso de las teclas de dirección, la velocidad del jugador en x o en y se actualiza al valor adecuado
    //En el caso de la tecla de interacción, se llama a la función interactuar y la variable interacted pasa a ser true
    this.input.keyboard.on('keydown', 
    function (event) { 
        //console.log(event.keyCode);
        switch (event.keyCode) {
            //jugador 1
            //movimiento
            case cont.p1.w:
                    sc_juegoOnline.player.spdY = -400;
            break;
            case cont.p1.s:
                    sc_juegoOnline.player.spdY = 400;
            break;
            case cont.p1.a:
                    sc_juegoOnline.player.spdX = -400;
            break;
            case cont.p1.d:
                    sc_juegoOnline.player.spdX = 400;
            break;
            case cont.p1.i1:
                onlineInteractuar(sc_juegoOnline.player);
                sc_juegoOnline.player.interacted = true;
            break;
            case cont.p1.i2:
                switch(sc_juegoOnline.player.trampa) {
                    case "trampaReloj":
                        sc_juegoOnline.player2.tiempoInmovil = 250;
                        sc_juegoOnline.player.trampa = "none";
                        break;
                    case "trampaMuro":
                        var muro = sc_juegoOnline.muros.create(540, 300, 'tripleMuro');
                        muro.timer = 1000;
                        muro.status = sc_juegoOnline.add.image(muro.x-6, muro.y-25, 'empty');
                        onlineDisconnectNeighbours(getCell(540,300).y,getCell(540,300).x, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(540,300).y,getCell(540,300).x+1, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(540,300).y,getCell(540,300).x-1, true, true, true, true);
                        sc_juegoOnline.player.trampa = "none";
                        break;
                }
            break;

            //jugador 2
            case cont.p2.w:
                    sc_juegoOnline.player2.spdY = -400;
            break;
            case cont.p2.s:
                    sc_juegoOnline.player2.spdY = 400;
            break;
            case cont.p2.a:
                    sc_juegoOnline.player2.spdX = -400;
            break;
            case cont.p2.d:
                    sc_juegoOnline.player2.spdX = 400;
            break;
            case cont.p2.i1:
                onlineInteractuar(sc_juegoOnline.player2);
                sc_juegoOnline.player2.interacted = true;
            break;
            case cont.p2.i2:
                switch(sc_juegoOnline.player2.trampa) {
                    case "trampaReloj":
                        sc_juegoOnline.player.tiempoInmovil = 250;
                        sc_juegoOnline.player2.trampa = "none";
                        break;
                    case "trampaMuro":
                        var muro = sc_juegoOnline.muros.create(260, 300, 'tripleMuro');
                        muro.timer = 1000;
                        muro.status = sc_juegoOnline.add.image(muro.x-6, muro.y-25, 'empty');
                        onlineDisconnectNeighbours(getCell(260,300).y,getCell(260,300).x, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(260,300).y,getCell(260,300).x+1, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(260,300).y,getCell(260,300).x-1, true, true, true, true);
                        sc_juegoOnline.player2.trampa = "none";
                        break;
                }
            break;
        }
    });

    //Inicializar recetas

    sc_juegoOnline.recetas1 = [];
    sc_juegoOnline.recetas2 = [];

    var aux1, aux2;

    //piernas
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoOnline.recetas1.push("metal"+aux1+"yunquetemplado");
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoOnline.recetas2.push("metal"+aux1+"yunquetemplado");

    //cascos
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoOnline.recetas1.push("metal"+aux1+"moldetemplado");
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoOnline.recetas2.push("metal"+aux1+"moldetemplado");

   //espadas
   aux1 = Phaser.Math.Between(1, 5);
   do {
    aux2 = Phaser.Math.Between(1, 5);
   } while (aux2 == aux1);
   if (aux2 < aux1) {
       var temp = aux2;
       aux2 = aux1;
       aux1 = temp;
   }
   sc_juegoOnline.recetas1.push("metal"+aux1+aux2+"espadatemplado");
   aux1 = Phaser.Math.Between(1, 5);
   do {
    aux2 = Phaser.Math.Between(1, 5);
   } while (aux2 == aux1);
   if (aux2 < aux1) {
       var temp = aux2;
       aux2 = aux1;
       aux1 = temp;
   }
   sc_juegoOnline.recetas2.push("metal"+aux1+aux2+"espadatemplado");

   //pecheras
   aux1 = Phaser.Math.Between(1, 5);
   do {
    aux2 = Phaser.Math.Between(1, 5);
   } while (aux2 == aux1);
   if (aux2 < aux1) {
       var temp = aux2;
       aux2 = aux1;
       aux1 = temp;
   }
   sc_juegoOnline.recetas1.push("metal"+aux1+aux2+"yunquetemplado");
   aux1 = Phaser.Math.Between(1, 5);
   do {
    aux2 = Phaser.Math.Between(1, 5);
   } while (aux2 == aux1);
   if (aux2 < aux1) {
       var temp = aux2;
       aux2 = aux1;
       aux1 = temp;
   }
   sc_juegoOnline.recetas2.push("metal"+aux1+aux2+"yunquetemplado");

    //Randomizar recetas
    Phaser.Utils.Array.Shuffle(sc_juegoOnline.recetas1);
    Phaser.Utils.Array.Shuffle(sc_juegoOnline.recetas2);

    //console.log(sc_juegoOnline.recetas1[0]+", "+sc_juegoOnline.recetas1[1]+", "+sc_juegoOnline.recetas1[2]+", "+sc_juegoOnline.recetas1[3]);
    //console.log(sc_juegoOnline.recetas2[0]+", "+sc_juegoOnline.recetas2[1]+", "+sc_juegoOnline.recetas2[2]+", "+sc_juegoOnline.recetas2[3]);


    //Guia visual al situar el ratón sobre un elemento de las recetas
    sc_juegoOnline.circuloGuia = sc_juegoOnline.add.image(0,0,'empty');

    sc_juegoOnline.recuadro1 = sc_juegoOnline.add.image(208, 537, 'recuadro');
    sc_juegoOnline.Rmetal21 = sc_juegoOnline.add.image(65, 522, 'Rmetal').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("metal21")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rmetal11 = sc_juegoOnline.add.image(65, 552, 'Rmetal').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("metal11")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rmetal1 = sc_juegoOnline.add.image(65, 537, 'Rmetal').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("metal1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rhd1 = sc_juegoOnline.add.image(110, 537, 'Rhorno doble').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("hornod1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rym1 = sc_juegoOnline.add.image(155, 537, 'Ryunque').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunque1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rhorno1 = sc_juegoOnline.add.image(200, 537, 'Rhorno').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("horno1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rbarril1 = sc_juegoOnline.add.image(245, 537, 'Rbarril').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("barril1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rpieza1 = sc_juegoOnline.add.image(290, 537, 'Rcasco');
    sc_juegoOnline.Rmonstruo1 = sc_juegoOnline.add.image(335, 537, 'RMonstruo' + cont.p1.ch.slice(2,3)).setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("monstruo1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});

    sc_juegoOnline.recuadro2 = sc_juegoOnline.add.image(592, 537, 'recuadro');
    sc_juegoOnline.Rmetal22 = sc_juegoOnline.add.image(455, 522, 'Rmetal').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("metal22")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rmetal12 = sc_juegoOnline.add.image(455, 552, 'Rmetal').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("metal12")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rmetal2 = sc_juegoOnline.add.image(455, 537, 'Rmetal').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("metal2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rhd2 = sc_juegoOnline.add.image(500, 537, 'Rhorno doble').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("hornod2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rym2 = sc_juegoOnline.add.image(545, 537, 'Ryunque').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunque2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});

    sc_juegoOnline.Rhorno2 = sc_juegoOnline.add.image(590, 537, 'Rhorno').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("horno2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rbarril2 = sc_juegoOnline.add.image(635, 537, 'Rbarril').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("barril2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
    sc_juegoOnline.Rpieza2 = sc_juegoOnline.add.image(680, 537, 'Rcasco');
    sc_juegoOnline.Rmonstruo2 = sc_juegoOnline.add.image(725, 537, 'RMonstruo' + cont.p2.ch.slice(2,3)).setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("monstruo2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});

   //Cosas del progreso
   sc_juegoOnline.progreso1 = sc_juegoOnline.add.image(355, 55, 'progreso0');
   sc_juegoOnline.progreso1.n = 0;
   sc_juegoOnline.progreso2 = sc_juegoOnline.add.image(445, 55, 'progreso0');
   sc_juegoOnline.progreso2.n = 0;

   //Interfaz de las trampas
   sc_juegoOnline.recuadroTrampa1 = sc_juegoOnline.add.image(50, 50, 'cuadroTrampa');
   sc_juegoOnline.iconoTrampa1 = sc_juegoOnline.add.image(50, 50, 'empty');

   sc_juegoOnline.recuadroTrampa2 = sc_juegoOnline.add.image(750, 50, 'cuadroTrampa');
   sc_juegoOnline.iconoTrampa2 = sc_juegoOnline.add.image(750, 50, 'empty');



    //Tiempo
    sc_juegoOnline.timerText = sc_juegoOnline.add.text(400, 20, "5:00", {fontSize: '24px', fontFamily: 'Bookman', color: '#ffffff', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);


    //Inicialización de elementos relativos al pausado del juego
    //Por un lado tenemos el overlay, que oscurecerá toda la pantalla cuando el juego esté pausado
    //Por otro lado tenemos el botón de pausa, el cual se podrá pulsar para activar o desactivar el pausado del juego.
    sc_juegoOnline.botonPausa = this.physics.add.sprite(400,537, 'botonPausa');
    sc_juegoOnline.pausedOverlay = sc_juegoOnline.add.image(400, 300, 'empty');
    sc_juegoOnline.botonPausa.paused = false;
    sc_juegoOnline.botonPausa.setInteractive({cursor: "pointer"});
    sc_juegoOnline.botonPausa.on('pointerup', function() {
        if (!sc_juegoOnline.botonPausa.paused) {
            onlinePause();
        } else {
            onlineUnPause();
        }
    });

    //Crear los objetos de pausa desactivados
    sc_juegoOnline.pausemenu = sc_juegoOnline.add.image(400, 300, 'pausemenu');
    sc_juegoOnline.pauseguidebutton = sc_juegoOnline.add.image(400, 200, 'pauseguidebutton');
    sc_juegoOnline.pausequitbutton = sc_juegoOnline.add.image(400, 300, 'pausequitbutton');
    sc_juegoOnline.pauseresumebutton = sc_juegoOnline.add.image(400, 400, 'pauseresumebutton');

    sc_juegoOnline.pausequitmenu = sc_juegoOnline.add.image(400, 300, 'pausequitmenu');
    sc_juegoOnline.pausequitbutton2 = sc_juegoOnline.add.image(400, 290, 'pausequitbutton');
    sc_juegoOnline.pausecancelbutton = sc_juegoOnline.add.image(400, 350, 'pausecancelbutton');

    sc_juegoOnline.pausemenu.setActive(false).setVisible(false);
    sc_juegoOnline.pauseguidebutton.setActive(false).setVisible(false).on('pointerup', onlineShowPauseGuide);
    sc_juegoOnline.pausequitbutton.setActive(false).setVisible(false).on('pointerup', onlineShowQuitMenu);
    sc_juegoOnline.pauseresumebutton.setActive(false).setVisible(false).on('pointerup', onlineUnPause);

    sc_juegoOnline.pausequitmenu.setActive(false).setVisible(false);
    sc_juegoOnline.pausequitbutton2.setActive(false).setVisible(false).on('pointerup', onlineQuitGame);
    sc_juegoOnline.pausecancelbutton.setActive(false).setVisible(false).on('pointerup', onlineHideQuitMenu);


    sc_juegoOnline.victory = undefined; //Importante

    //Empieza la cuenta atrás

    sc_juegoOnline.countdown = sc_juegoOnline.add.image(400, 300, 'countdown5');
    sc_juegoOnline.cdTween = sc_juegoOnline.tweens.add({
        targets: sc_juegoOnline.countdown,
        alpha: {from: 1, to: 0},
        scale: {from: 1.5, to: 1},
        ease: 'Linear',
        onComplete: function() {
            sc_juegoOnline.countdown.setTexture('countdown4');
            sc_juegoOnline.cdTween = sc_juegoOnline.tweens.add({
                targets: sc_juegoOnline.countdown,
                alpha: {from: 1, to: 0},
                scale: {from: 1.5, to: 1},
                ease: 'Linear',
                onComplete: function() {
                    sc_juegoOnline.countdown.setTexture('countdown3');
                    sc_juegoOnline.cdTween = sc_juegoOnline.tweens.add({
                        targets: sc_juegoOnline.countdown,
                        alpha: {from: 1, to: 0},
                        scale: {from: 1.5, to: 1},
                        ease: 'Linear',
                        onComplete: function() {
                            sc_juegoOnline.countdown.setTexture('countdown2');
                            sc_juegoOnline.cdTween = sc_juegoOnline.tweens.add({
                                targets: sc_juegoOnline.countdown,
                                alpha: {from: 1, to: 0},
                                scale: {from: 1.5, to: 1},
                                ease: 'Linear',
                                onComplete: function() {
                                    sc_juegoOnline.countdown.setTexture('countdown1');
                                    sc_juegoOnline.cdTween = sc_juegoOnline.tweens.add({
                                        targets: sc_juegoOnline.countdown,
                                        alpha: {from: 1, to: 0},
                                        scale: {from: 1.5, to: 1},
                                        ease: 'Linear',
                                        onComplete: function() {
                                            sc_juegoOnline.countdown.setTexture('countdown0');
                                            sc_juegoOnline.cdTween = sc_juegoOnline.tweens.add({
                                                targets: sc_juegoOnline.countdown,
                                                alpha: {from: 1, to: 0},
                                                scale: {from: 1.5, to: 1},
                                                ease: 'Linear',
                                                onComplete: function() {
                                                    sc_juegoOnline.countdown.setTexture('empty');
                                                    sc_juegoOnline.gameTime = 300000;
                                                    sc_juegoOnline.gameStarted = true;
                                                    mus_game.play();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });



}

//Función update: Aquí se maneja todo lo que ocurre durante la partida.
sc_juegoOnline.update = function(time, delta) {

    //Si el juego está pausado, la función no se ejecuta.
    if (sc_juegoOnline.botonPausa.paused) {
        return;
    }

    sc_juegoOnline.progreso1.setTexture('progreso' + (4-sc_juegoOnline.recetas1.length));
    sc_juegoOnline.progreso2.setTexture('progreso' + (4-sc_juegoOnline.recetas2.length));

    sc_juegoOnline.iconoTrampa1.setTexture((sc_juegoOnline.player.trampa=='none')?'empty':sc_juegoOnline.player.trampa);
    sc_juegoOnline.iconoTrampa2.setTexture((sc_juegoOnline.player2.trampa=='none')?'empty':sc_juegoOnline.player2.trampa);


    //var start = new Date().getTime();
    if (cont.lGuia) onlineDijkstra(getCell(sc_juegoOnline.player.x,sc_juegoOnline.player.y),onlineGetTargetCell(1),getCell(sc_juegoOnline.player2.x,sc_juegoOnline.player2.y),onlineGetTargetCell(2));
    //console.log(new Date().getTime() - start);
    onlineComprobarInteraccion(sc_juegoOnline.player, sc_juegoOnline.player2);

    //Llamar a onlineActualizarRecetas();
    onlineActualizarRecetas();

    if (!sc_juegoOnline.gameStarted) {
        return;
    }
    sc_juegoOnline.gameTime -= delta;
    sc_juegoOnline.minutesLeft = Math.max(Math.floor((sc_juegoOnline.gameTime/1000)/60),0);
    sc_juegoOnline.secondsLeft = Math.max(Math.floor((sc_juegoOnline.gameTime/1000)%60),0);
    
    sc_juegoOnline.timerText.setText(sc_juegoOnline.minutesLeft + ":" + ((sc_juegoOnline.secondsLeft<10)?"0":"") + sc_juegoOnline.secondsLeft);

    if (sc_juegoOnline.gameTime <= -1000) {
        var score1 = 4-sc_juegoOnline.recetas1.length;
        var score2 = 4-sc_juegoOnline.recetas2.length;
        if (score1 > score2) {
            onlineGameVictory(1);
        } else if (score2 > score1) {
            onlineGameVictory(2);
        } else {
            onlineGameVictory(0);
        }
        return;
    }

    //Altar trampas
    if (sc_juegoOnline.altarTrampas.timer >= 1000 && sc_juegoOnline.altarTrampas.trampa == "none") {
        //activar trampa
        if (Phaser.Math.Between(1, 2) == 2) {
            sc_juegoOnline.altarTrampas.trampa = "trampaReloj";
            sc_juegoOnline.altarTrampas.trampaSprite.setTexture("trampaReloj");
            sc_juegoOnline.altarTrampas.setTexture("altar2");
        } else {
            sc_juegoOnline.altarTrampas.trampa = "trampaMuro";
            sc_juegoOnline.altarTrampas.trampaSprite.setTexture("trampaMuro");
            sc_juegoOnline.altarTrampas.setTexture("altar2");
        }
        sc_juegoOnline.altarTrampas.timer+=(0.06*delta);
    } else if (sc_juegoOnline.altarTrampas.timer >= 2000) {
        //defusear trampa
        sc_juegoOnline.altarTrampas.trampa = "none";
        sc_juegoOnline.altarTrampas.trampaSprite.setTexture("empty");
        sc_juegoOnline.altarTrampas.setTexture("altar1");
        sc_juegoOnline.altarTrampas.timer = 0;
    } else {
        sc_juegoOnline.altarTrampas.timer+=(0.06*delta);
    }

    sc_juegoOnline.muros.children.iterate(function(child){
        if (child != undefined) {
            if (child.timer > 0) child.timer-=(0.06*delta);
            child.status.setTexture("reloj" + (Phaser.Math.CeilTo(child.timer/1000*9)-1));
            if (child.timer <= 0) {
                child.status.setTexture("empty");
                onlineDisconnectNeighbours(getCell(child.x, child.y).y,getCell(child.x, child.y).x, false, false, false, false);
                onlineDisconnectNeighbours(getCell(child.x, child.y).y,getCell(child.x, child.y).x+1, false, false, false, false);
                onlineDisconnectNeighbours(getCell(child.x, child.y).y,getCell(child.x, child.y).x-1, false, false, false, false);
                child.destroy();  
            }
        }
    });

    //Esta función afecta a todos los jugadores
    sc_juegoOnline.players.children.iterate(function(child){
        if (child.tiempoInmovil > 0) {
            child.spdX = 0;
            child.spdY = 0;
            child.tiempoInmovil-=(0.06*delta);
            //console.log(child.tiempoInmovil);
            child.status.x = child.x-6;
            child.status.y = child.y-25;
            child.status.setTexture("reloj" + (Phaser.Math.CeilTo(child.tiempoInmovil/250*8)));
        } else {
            child.status.setTexture("empty");
        }
        //Si el personaje no se está moviendo, sus animaciones paran
        if (child.spdX == 0 && child.spdY == 0) {
            child.emitter.on = false;
            child.heldObjectSprite.anims.stopOnRepeat();
            child.heldObjectSprite2.anims.stopOnRepeat();
        } else {
            child.emitter.on = true;
        }

        //Llamada a getAnim para actualizar las animaciones del jugador
        getAnim(child, true);

        //Ajustar la velocidad para que utilice delta
        if (child.spdX == 400 || child.spdX == -400) {
            child.spdX = (child.spdX/400)*(24*delta);
        }
        if (child.spdY == 400 || child.spdY == -400) {
            child.spdY = (child.spdY/400)*(24*delta);
        }


        //Aquí se ajusta la velocidad del jugador según su spdX y spdY. Si lleva un objeto, su velocidad se reduce a la mitad.
        if (child.heldObject == "none") {
            child.setVelocityY(child.spdY);
            child.setVelocityX(child.spdX);
        } else {
            
            child.setVelocityY(child.spdY/2);
            child.setVelocityX(child.spdX/2);
        }

        //Ajuste de la posición de heldObjectSprite y heldObjectSprite2 a la posición del jugador.
        child.heldObjectSprite.setX(child.x);
        child.heldObjectSprite.setY(child.y);

        child.heldObjectSprite2.setX(child.x);
        child.heldObjectSprite2.setY(child.y);

        

    });
    
    //Actualización de los sprites de las mesas
    sc_juegoOnline.mesas.children.iterate(function(child){
        getAnim(child, false);
    });
    
    //Actualización de los hornos según su timer
    //Aumenta timer cuando sea necesario, y cambia el gráfico de status al apropiado según el estado del horno.
    sc_juegoOnline.hornos.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=(0.02*delta);
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=(0.02*delta);
            child.status.setTexture("tic");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=(0.02*delta);
            child.status.setTexture("cruz");
        } else if (child.timer >= 200) {
            child.timer = -1;
            child.heldObject = "none";
        } else {
            child.status.setTexture("empty");
        }
    });

    //Actualización de los yunques
    //Si el yunque tiene un metal, saldrá el icono del martillo. Al interactuar con el yunque, se animará.
    sc_juegoOnline.yunques.children.iterate(function(child){
        if (child.cooldown > 0) {
            child.cooldown-=(0.06*delta);
        } else {
            child.cooldown = 0;
        }
        if (child.timer >= 0 && child.timer < 100) {
            if (child.cooldown > 0) {
                child.status.setTexture("martillo2" + Phaser.Math.CeilTo(child.timer/10));
            } else {
                child.status.setTexture("martillo" + Phaser.Math.CeilTo(child.timer/10));
            }
        } else if (child.timer >= 100) {
            child.status.setTexture("tic");
        }
    });

    //Actualización de los barriles
    //Similar a la de los hornos
    sc_juegoOnline.barriles.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=(0.033*delta);
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100) {
            child.status.setTexture("tic");
        } else {
            child.status.setTexture("empty");
        }
    });

    //Actualización de los moldes
    //Similar a la de los hornos
    sc_juegoOnline.moldes.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.setTexture("moldeU");
            child.timer+=(0.025*delta);
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100) {
            child.setTexture("moldeU");
            child.status.setTexture("tic");
        } else {
            child.setTexture("molde");
            child.status.setTexture("empty");
        }
    });

    //Actualización de los hornos dobles
    //Igual a la de los hornos, pero si sólo hay un metal dentro aparece un icono indicándolo
    sc_juegoOnline.hornosd.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=(0.01*delta);
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=(0.01*delta);
            child.status.setTexture("tic");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=(0.01*delta);
            child.status.setTexture("cruz");
        } else if (child.timer >= 200) {
            child.timer = -1;
            child.heldObject1 = "none";
            child.heldObject2 = "none";
        } else {
            if (child.heldObject1 != "none" && child.heldObject2 == "none") {
                child.status.setTexture("1de2");
            } else {
                child.status.setTexture("empty");
            }
        }
    });

    //Actualización de los yunques dobles
    //Igual a la de los yunques, pero si sólo hay un metal dentro aparece un icono indicándolo
    sc_juegoOnline.yunquesd.children.iterate(function(child){
        if (child.cooldown > 0) {
            child.cooldown-=(0.06*delta);
        } else {
            child.cooldown = 0;
        }
        if (child.timer >= 0 && child.timer < 100) {
            if (child.cooldown > 0) {
                child.status.setTexture("martillo2" + Phaser.Math.CeilTo(child.timer/10));
            } else {
                child.status.setTexture("martillo" + Phaser.Math.CeilTo(child.timer/10));
            }
        } else if (child.timer >= 100) {
            child.status.setTexture("tic");
        }
    });
    
}

function onlinePause() {
    sc_juegoOnline.cdTween.onlinePause();
    sc_juegoOnline.pausedOverlay.setTexture('pausedOverlay');
    
    sc_juegoOnline.pausemenu.setActive(true).setVisible(true);
    sc_juegoOnline.pauseguidebutton.setActive(true).setVisible(true).setInteractive({cursor: "pointer"});
    sc_juegoOnline.pausequitbutton.setActive(true).setVisible(true).setInteractive({cursor: "pointer"});
    sc_juegoOnline.pauseresumebutton.setActive(true).setVisible(true).setInteractive({cursor: "pointer"});

    sc_juegoOnline.botonPausa.paused = true;
}

function onlineShowQuitMenu() {
    sc_juegoOnline.pauseguidebutton.removeInteractive();
    sc_juegoOnline.pausequitbutton.removeInteractive();
    sc_juegoOnline.pauseresumebutton.removeInteractive();

    sc_juegoOnline.pausequitmenu.setActive(true).setVisible(true);
    sc_juegoOnline.pausequitbutton2.setActive(true).setVisible(true).setInteractive({cursor: "pointer"});
    sc_juegoOnline.pausecancelbutton.setActive(true).setVisible(true).setInteractive({cursor: "pointer"});
}

function onlineHideQuitMenu() {
    
    sc_juegoOnline.pauseguidebutton.setInteractive({cursor: "pointer"});
    sc_juegoOnline.pausequitbutton.setInteractive({cursor: "pointer"});
    sc_juegoOnline.pauseresumebutton.setInteractive({cursor: "pointer"});

    sc_juegoOnline.pausequitmenu.setActive(false).setVisible(false);
    sc_juegoOnline.pausequitbutton2.setActive(false).setVisible(false).removeInteractive();
    sc_juegoOnline.pausecancelbutton.setActive(false).setVisible(false).removeInteractive();
}

function onlineUnPause() {
    sc_juegoOnline.cdTween.resume();
    sc_juegoOnline.pausedOverlay.setTexture('empty');
        
    sc_juegoOnline.pausemenu.setActive(false).setVisible(false);
    sc_juegoOnline.pauseguidebutton.setActive(false).setVisible(false).removeInteractive();
    sc_juegoOnline.pausequitbutton.setActive(false).setVisible(false).removeInteractive();
    sc_juegoOnline.pauseresumebutton.setActive(false).setVisible(false).removeInteractive();

    sc_juegoOnline.pausequitmenu.setActive(false).setVisible(false);
    sc_juegoOnline.pausequitbutton2.setActive(false).setVisible(false).removeInteractive();
    sc_juegoOnline.pausecancelbutton.setActive(false).setVisible(false).removeInteractive();
    
    sc_juegoOnline.botonPausa.paused = false;
}

function onlineQuitGame() {
    sc_juegoOnline.scene.start("MenuPrincipal");
}

function onlineShowPauseGuide() {
    cont.guiaIngame = true;
    sc_juegoOnline.scene.switch('Guia');
}

//Función onlineInteractuar: comprueba la interacción del jugador con las estaciones de trabajo
//Cada función devuelve true si la interacción tuvo éxito, y false si no
//La función no es visualmente agradable, pero va comprobando en cadena cada interacción, y si no tuvo éxito, pasa a la siguiente.
function onlineInteractuar(p) {
    if (!onlineInteractuarCajones(p)) {
        if (!onlineInteractuarMesas(p)) {
            if (!onlineInteractuarHornos(p)) {
                if (!onlineInteractuarYunques(p)) {
                    if (!onlineInteractuarBarriles(p)) {
                        if (!onlineInteractuarMoldes(p)) {
                            if (!onlineInteractuarHornosd(p)) {
                                if (!onlineInteractuarYunquesd(p)) {
                                    if (!onlineInteractuarBasuras(p)) {
                                        onlineInteractuarMonstruos(p);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//Función onlineInteractuarCajones: Si el jugador está suficientemente cerca y no lleva objetos, pasa a tener el metal correspondiente al cajón
function onlineInteractuarCajones(p) {
    var result = false;
    sc_juegoOnline.cajonesMetal.children.iterate(function (child) {
        //if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
        if (isAdyacent(p.x,p.y,child.x,child.y)) {
            if (p.heldObject == "none") {
                p.heldObject = child.heldObject;
            }
            else if (p.heldObject == child.heldObject) {
                p.heldObject = "none";
            }
            result = true;
        }
    });
    return result;
}

//Función onlineInteractuarMesas: Si el jugador está suficientemente cerca, intercambia sus objetos con los de la mesa
function onlineInteractuarMesas(p) {
    var result = false;
    sc_juegoOnline.mesas.children.iterate(function (child) {
        if (isAdyacent(p.x,p.y,child.x,child.y)) {
            var temp = child.heldObject;
            child.heldObject = p.heldObject;
            p.heldObject = temp;
            result = true;
        }
    });
    return result;
}

//Función onlineInteractuarBasuras: Si el jugador está suficientemente cerca, se elimina el objeto que lleve
function onlineInteractuarBasuras(p) {
    var result = false;
    sc_juegoOnline.basuras.children.iterate(function (child) {
        if (isAdyacent(p.x,p.y,child.x,child.y)) {
            p.heldObject = "none";
            result = true;
        }
    });
    return result;
}
//Función onlineInteractuarHornos: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el horno acepta el objeto y timer pasa a valer 0.
//Si timer está entre 100 y 150, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function onlineInteractuarHornos(p) {
    var result = false;

    var tablaIO = [];
    tablaIO["metal1"] = "metal1rojo";
    tablaIO["metal2"] = "metal2rojo";
    tablaIO["metal3"] = "metal3rojo";
    tablaIO["metal4"] = "metal4rojo";
    tablaIO["metal5"] = "metal5rojo";

    tablaIO["metal1yunque"] = "metal1yunquepretemplado";
    tablaIO["metal2yunque"] = "metal2yunquepretemplado";
    tablaIO["metal3yunque"] = "metal3yunquepretemplado";
    tablaIO["metal4yunque"] = "metal4yunquepretemplado";
    tablaIO["metal5yunque"] = "metal5yunquepretemplado";
    tablaIO["metal1molde"] = "metal1moldepretemplado";
    tablaIO["metal2molde"] = "metal2moldepretemplado";
    tablaIO["metal3molde"] = "metal3moldepretemplado";
    tablaIO["metal4molde"] = "metal4moldepretemplado";
    tablaIO["metal5molde"] = "metal5moldepretemplado";

    tablaIO["metal12yunque"] = "metal12yunquepretemplado";
    tablaIO["metal13yunque"] = "metal13yunquepretemplado";
    tablaIO["metal14yunque"] = "metal14yunquepretemplado";
    tablaIO["metal15yunque"] = "metal15yunquepretemplado";
    
    tablaIO["metal23yunque"] = "metal23yunquepretemplado";
    tablaIO["metal24yunque"] = "metal24yunquepretemplado";
    tablaIO["metal25yunque"] = "metal25yunquepretemplado";
    
    tablaIO["metal34yunque"] = "metal34yunquepretemplado";
    tablaIO["metal35yunque"] = "metal35yunquepretemplado";
    
    tablaIO["metal45yunque"] = "metal45yunquepretemplado";

    tablaIO["metal12espada"] = "metal12espadapretemplado";
    tablaIO["metal13espada"] = "metal13espadapretemplado";
    tablaIO["metal14espada"] = "metal14espadapretemplado";
    tablaIO["metal15espada"] = "metal15espadapretemplado";
    
    tablaIO["metal23espada"] = "metal23espadapretemplado";
    tablaIO["metal24espada"] = "metal24espadapretemplado";
    tablaIO["metal25espada"] = "metal25espadapretemplado";
    
    tablaIO["metal34espada"] = "metal34espadapretemplado";
    tablaIO["metal35espada"] = "metal35espadapretemplado";
    
    tablaIO["metal45espada"] = "metal45espadapretemplado";

    //onlineInteractuarEstacion(p, sc_juegoOnline.hornos, tablaIO);

    if (p.interacted != true) {
        sc_juegoOnline.hornos.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
                if (isAdyacent(p.x,p.y,child.x,child.y)) {
                    if (child.heldObject == "none" && child.timer == -1 && (tablaIO[p.heldObject] != undefined)) {
                        child.heldObject = p.heldObject;
                        p.heldObject = "none";
                        child.timer = 0;
                        result = true;
                    } else {
                        if (p.heldObject == "none" && child.timer > 100 && child.heldObject != "none") {
                            if (tablaIO[child.heldObject] != undefined) {
                                p.heldObject = tablaIO[child.heldObject];
                            }
                            child.heldObject = "none";
                            child.timer = -1;
                            result = true;
                        }
                    }
                }
            }
        });
    }
    
    return result;
}

//Función onlineInteractuarYunques: Si el jugador está suficientemente cerca, y cooldown vale 0, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el yunque acepta el objeto y timer pasa a valer 0.
//Si timer está entre 0 y 100, timer aumenta en 5 y cooldown pasa a valer 15.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function onlineInteractuarYunques(p) {
    var result = false;
    
    var tablaIO = [];
    tablaIO["metal1rojo"] = "metal1yunque";
    tablaIO["metal2rojo"] = "metal2yunque";
    tablaIO["metal3rojo"] = "metal3yunque";
    tablaIO["metal4rojo"] = "metal4yunque";
    tablaIO["metal5rojo"] = "metal5yunque";
    
    tablaIO["metal12rojo"] = "metal12yunque"; //12 = a
    tablaIO["metal13rojo"] = "metal13yunque"; //13 = b
    tablaIO["metal14rojo"] = "metal14yunque"; //14 = c
    tablaIO["metal15rojo"] = "metal15yunque"; //15 = d
    
    tablaIO["metal23rojo"] = "metal23yunque"; //23 = e
    tablaIO["metal24rojo"] = "metal24yunque"; //24 = f
    tablaIO["metal25rojo"] = "metal25yunque"; //25 = g
    
    tablaIO["metal34rojo"] = "metal34yunque"; //34 = h
    tablaIO["metal35rojo"] = "metal35yunque"; //35 = i
    
    tablaIO["metal45rojo"] = "metal45yunque"; //45 = j

    sc_juegoOnline.yunques.children.iterate(function (child) {
        if (child.cooldown == 0 && p.interacted != true){
            if (isAdyacent(p.x,p.y,child.x,child.y)) {
                if (child.timer == -1 && child.heldObject == "none" && (tablaIO[p.heldObject] != undefined)) {
                    child.heldObject = p.heldObject;
                    p.heldObject = "none";
                    child.timer = 0;
                    child.cooldown = 5;
                } else if (child.timer >= 0 && child.timer < 100) {
                    child.timer += 5;
                    child.cooldown = 15;
                    snd_yunque.onlinePause();
                    snd_yunque.currentTime = 0;
                    snd_yunque.play();
                } else if (child.timer >= 100 && p.heldObject == "none") {
                    if (tablaIO[child.heldObject] != undefined) {
                        p.heldObject = tablaIO[child.heldObject];
                    }
                    child.heldObject = "none";
                    child.timer = -1;
                    child.status.setTexture("empty");
                }
            }
        }
    });
    
    return result;
}

//Función onlineInteractuarBarriles: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el barril acepta el objeto y timer pasa a valer 0.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function onlineInteractuarBarriles(p) {
    var result = false;
    
    var tablaIO = [];
    tablaIO["metal1yunquepretemplado"] = "metal1yunquetemplado";
    tablaIO["metal2yunquepretemplado"] = "metal2yunquetemplado";
    tablaIO["metal3yunquepretemplado"] = "metal3yunquetemplado";
    tablaIO["metal4yunquepretemplado"] = "metal4yunquetemplado";
    tablaIO["metal5yunquepretemplado"] = "metal5yunquetemplado";
    tablaIO["metal1moldepretemplado"] = "metal1moldetemplado";
    tablaIO["metal2moldepretemplado"] = "metal2moldetemplado";
    tablaIO["metal3moldepretemplado"] = "metal3moldetemplado";
    tablaIO["metal4moldepretemplado"] = "metal4moldetemplado";
    tablaIO["metal5moldepretemplado"] = "metal5moldetemplado";

    tablaIO["metal12yunquepretemplado"] = "metal12yunquetemplado";
    tablaIO["metal13yunquepretemplado"] = "metal13yunquetemplado";
    tablaIO["metal14yunquepretemplado"] = "metal14yunquetemplado";
    tablaIO["metal15yunquepretemplado"] = "metal15yunquetemplado";
    
    tablaIO["metal23yunquepretemplado"] = "metal23yunquetemplado";
    tablaIO["metal24yunquepretemplado"] = "metal24yunquetemplado";
    tablaIO["metal25yunquepretemplado"] = "metal25yunquetemplado";
    
    tablaIO["metal34yunquepretemplado"] = "metal34yunquetemplado";
    tablaIO["metal35yunquepretemplado"] = "metal35yunquetemplado";
    
    tablaIO["metal45yunquepretemplado"] = "metal45yunquetemplado";

    tablaIO["metal12espadapretemplado"] = "metal12espadatemplado";
    tablaIO["metal13espadapretemplado"] = "metal13espadatemplado";
    tablaIO["metal14espadapretemplado"] = "metal14espadatemplado";
    tablaIO["metal15espadapretemplado"] = "metal15espadatemplado";

    tablaIO["metal23espadapretemplado"] = "metal23espadatemplado";
    tablaIO["metal24espadapretemplado"] = "metal24espadatemplado";
    tablaIO["metal25espadapretemplado"] = "metal25espadatemplado";
    
    tablaIO["metal34espadapretemplado"] = "metal34espadatemplado";
    tablaIO["metal35espadapretemplado"] = "metal35espadatemplado";
    
    tablaIO["metal45espadapretemplado"] = "metal45espadatemplado";

    if (p.interacted != true) {
        sc_juegoOnline.barriles.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer >= 100))) {
                if (isAdyacent(p.x,p.y,child.x,child.y)) {
                    if (child.heldObject == "none" && child.timer == -1 && (tablaIO[p.heldObject] != undefined)) {
                        child.heldObject = p.heldObject;
                        p.heldObject = "none";
                        child.timer = 0;
                        result = true;
                    } else {
                        if (p.heldObject == "none" && child.timer >= 100 && child.heldObject != "none") {
                            if (tablaIO[child.heldObject] != undefined) {
                                p.heldObject = tablaIO[child.heldObject];
                            }
                            child.heldObject = "none";
                            child.timer = -1;
                            result = true;
                        }
                    }
                }
            }
        });
    }
    
    return result;
}

//Función onlineInteractuarMoldes: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el molde acepta el objeto y timer pasa a valer 0.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function onlineInteractuarMoldes(p) {
    var result = false;
    
    var tablaIO = [];
    tablaIO["metal1rojo"] = "metal1molde";
    tablaIO["metal2rojo"] = "metal2molde";
    tablaIO["metal3rojo"] = "metal3molde";
    tablaIO["metal4rojo"] = "metal4molde";
    tablaIO["metal5rojo"] = "metal5molde";

    if (p.interacted != true) {
        sc_juegoOnline.moldes.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer >= 100))) {
                if (isAdyacent(p.x,p.y,child.x,child.y)) {
                    if (child.heldObject == "none" && child.timer == -1 && (tablaIO[p.heldObject] != undefined)) {
                        child.heldObject = p.heldObject;
                        p.heldObject = "none";
                        child.timer = 0;
                        result = true;
                    } else {
                        if (p.heldObject == "none" && child.timer >= 100 && child.heldObject != "none") {
                            if (tablaIO[child.heldObject] != undefined) {
                                p.heldObject = tablaIO[child.heldObject];
                            }
                            child.heldObject = "none";
                            child.timer = -1;
                            result = true;
                        }
                    }
                }
            }
        });
    }
    
    return result;
}

//Función onlineInteractuarHornosd: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, el horno no tiene objetos, y el objeto que lleva el jugador se encuentra en la tablaIO, el horno acepta el objeto.
//Si timer vale -1 y el horno ya tiene un objeto, y el objeto que lleva el jugador se encuentra en la tablaIO, el horno acepta el objeto y timer pasa a valer 0.
//Si timer está entre 100 y 150, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function onlineInteractuarHornosd(p) {
    var result = false;
    
    var tablaInputsValidos = [];
    tablaInputsValidos["metal1"] = true;
    tablaInputsValidos["metal2"] = true;
    tablaInputsValidos["metal3"] = true;
    tablaInputsValidos["metal4"] = true;
    tablaInputsValidos["metal5"] = true;

    var tablaIO = [];
    tablaIO["metal1"] = [];
    tablaIO["metal1"]["metal2"] = "metal12rojo";
    tablaIO["metal1"]["metal3"] = "metal13rojo";
    tablaIO["metal1"]["metal4"] = "metal14rojo";
    tablaIO["metal1"]["metal5"] = "metal15rojo";
    
    tablaIO["metal2"] = [];
    tablaIO["metal2"]["metal1"] = "metal12rojo";
    tablaIO["metal2"]["metal3"] = "metal23rojo";
    tablaIO["metal2"]["metal4"] = "metal24rojo";
    tablaIO["metal2"]["metal5"] = "metal25rojo";
    
    tablaIO["metal3"] = [];
    tablaIO["metal3"]["metal1"] = "metal13rojo";
    tablaIO["metal3"]["metal2"] = "metal23rojo";
    tablaIO["metal3"]["metal4"] = "metal34rojo";
    tablaIO["metal3"]["metal5"] = "metal35rojo";
    
    tablaIO["metal4"] = [];
    tablaIO["metal4"]["metal1"] = "metal14rojo";
    tablaIO["metal4"]["metal2"] = "metal24rojo";
    tablaIO["metal4"]["metal3"] = "metal34rojo";
    tablaIO["metal4"]["metal5"] = "metal45rojo";
    
    tablaIO["metal5"] = [];
    tablaIO["metal5"]["metal1"] = "metal15rojo";
    tablaIO["metal5"]["metal2"] = "metal25rojo";
    tablaIO["metal5"]["metal3"] = "metal35rojo";
    tablaIO["metal5"]["metal4"] = "metal45rojo"; //hay un total de 10 metales mixtos

    if (p.interacted != true) {
        sc_juegoOnline.hornosd.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
                if (isAdyacent(p.x,p.y,child.x,child.y)) {
                    if (child.heldObject1 == "none" && child.heldObject2 == "none" && child.timer == -1 && (tablaInputsValidos[p.heldObject])) {
                        child.heldObject1 = p.heldObject;
                        p.heldObject = "none";
                        result = true;
                    } else if (child.heldObject1 != "none" && child.heldObject2 == "none" && child.timer == -1 && (tablaInputsValidos[p.heldObject]) && (p.heldObject != child.heldObject1)) {
                        child.heldObject2 = p.heldObject;
                        p.heldObject = "none";
                        child.timer = 0;
                        result = true;
                    } else if (p.heldObject == "none" && child.timer > 100 && child.heldObject1 != "none" && child.heldObject2 != "none") {
                        if (tablaIO[child.heldObject1][child.heldObject2] != undefined) {
                            p.heldObject = tablaIO[child.heldObject1][child.heldObject2];
                        }
                        
                        child.heldObject1 = "none";
                        child.heldObject2 = "none";
                        child.timer = -1;
                        result = true;
                    }
                }
            }
        });
    }
    
    return result;
}

//Función onlineInteractuarYunquesd: Si el jugador está suficientemente cerca, y cooldown vale 0, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, el yunque no tiene objetos, y el objeto que lleva el jugador se encuentra en la tablaIO, el yunque acepta el objeto.
//Si timer vale -1 y el yunque ya tiene un objeto, y el objeto que lleva el jugador se encuentra en la tablaIO, el yunque acepta el objeto y timer pasa a valer 0.
//Si timer está entre 0 y 100, timer aumenta en 5 y cooldown pasa a valer 15.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function onlineInteractuarYunquesd(p) {
    var result = false;
    
    var tablaInputsValidos = [];
    tablaInputsValidos["metal1rojo"] = true;
    tablaInputsValidos["metal2rojo"] = true;
    tablaInputsValidos["metal3rojo"] = true;
    tablaInputsValidos["metal4rojo"] = true;
    tablaInputsValidos["metal5rojo"] = true;

    var tablaIO = [];
    tablaIO["metal1rojo"] = [];
    tablaIO["metal1rojo"]["metal2rojo"] = "metal12espada";
    tablaIO["metal1rojo"]["metal3rojo"] = "metal13espada";
    tablaIO["metal1rojo"]["metal4rojo"] = "metal14espada";
    tablaIO["metal1rojo"]["metal5rojo"] = "metal15espada";

    tablaIO["metal2rojo"] = [];
    tablaIO["metal2rojo"]["metal1rojo"] = "metal12espada";
    tablaIO["metal2rojo"]["metal3rojo"] = "metal23espada";
    tablaIO["metal2rojo"]["metal4rojo"] = "metal24espada";
    tablaIO["metal2rojo"]["metal5rojo"] = "metal25espada";

    tablaIO["metal3rojo"] = [];
    tablaIO["metal3rojo"]["metal1rojo"] = "metal13espada";
    tablaIO["metal3rojo"]["metal2rojo"] = "metal23espada";
    tablaIO["metal3rojo"]["metal4rojo"] = "metal34espada";
    tablaIO["metal3rojo"]["metal5rojo"] = "metal35espada";

    tablaIO["metal4rojo"] = [];
    tablaIO["metal4rojo"]["metal1rojo"] = "metal14espada";
    tablaIO["metal4rojo"]["metal2rojo"] = "metal24espada";
    tablaIO["metal4rojo"]["metal3rojo"] = "metal34espada";
    tablaIO["metal4rojo"]["metal5rojo"] = "metal45espada";
    
    tablaIO["metal5rojo"] = [];
    tablaIO["metal5rojo"]["metal1rojo"] = "metal15espada";
    tablaIO["metal5rojo"]["metal2rojo"] = "metal25espada";
    tablaIO["metal5rojo"]["metal3rojo"] = "metal35espada";
    tablaIO["metal5rojo"]["metal4rojo"] = "metal45espada"; //hay un total de 10 espadas distintas
    sc_juegoOnline.yunquesd.children.iterate(function (child) {
        if (child.cooldown == 0 && p.interacted != true){
            if (isAdyacent(p.x,p.y,child.x,child.y)) {
                if (child.timer == -1 && child.heldObject1 == "none" && child.heldObject2 == "none" && (tablaInputsValidos[p.heldObject])) {
                    child.heldObject1 = p.heldObject;
                    p.heldObject = "none";
                    child.status.setTexture("1de2");
                } else if (child.timer == -1 && child.heldObject1 != "none" && child.heldObject2 == "none" && (tablaInputsValidos[p.heldObject]) && p.heldObject != child.heldObject1) {
                    child.heldObject2 = p.heldObject;
                    p.heldObject = "none";
                    child.timer = 0;
                    child.cooldown = 5;
                } else if (child.timer >= 0 && child.timer < 100) {
                    child.timer += 5;
                    child.cooldown = 15;
                    snd_yunque.onlinePause();
                    snd_yunque.currentTime = 0;
                    snd_yunque.play();
                } else if (child.timer >= 100 && p.heldObject == "none") {
                    if (tablaIO[child.heldObject1][child.heldObject2] != undefined) {
                        p.heldObject = tablaIO[child.heldObject1][child.heldObject2];
                    }
                    child.heldObject1 = "none";
                    child.heldObject2 = "none";
                    child.timer = -1;
                    child.status.setTexture("empty");
                }
            }
        }
    });
    
    return result;
}

function onlineActualizarRecetas() {
    var ho = sc_juegoOnline.recetas1[0];
    var tint1 = 0xFF0000, tint2 = 0xFF0000;
    switch(ho.slice(5,6)) {
        case "1":
            tint1 = 0xD5AC21;
            break;
        case "2":
            tint1 = 0xD521CD;
            break;
        case "3":
            tint1 = 0x16DF29;
            break;
        case "4":
            tint1 = 0x2125D5;
            break;
        case "5":
            tint1 = 0xA7AA9D;
            break;
    }
    if (isNaN(ho.slice(6,7)) || (ho.slice(6,7) == "")) {
        sc_juegoOnline.Rmetal21.setTexture('empty').removeInteractive();
        sc_juegoOnline.Rmetal11.setTexture('empty').removeInteractive();
        sc_juegoOnline.Rmetal1.setTexture('Rmetal').setInteractive({cursor: "help"});
        sc_juegoOnline.Rmetal1.setTint(tint1);
        sc_juegoOnline.Rhd1.setTexture('Rhorno').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("horno1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
        switch (ho.slice(6)) {
            case "yunquetemplado":
                sc_juegoOnline.Rym1.setTexture('Ryunque').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunque1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza1.setTexture('Rpiernas');
                sc_juegoOnline.Rpieza1.setTint(tint1);
                break;
            case "moldetemplado":
                sc_juegoOnline.Rym1.setTexture('Rmolde').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("molde1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza1.setTexture('Rcasco');
                sc_juegoOnline.Rpieza1.setTint(tint1);
                break;
        }
    } else {
        switch(ho.slice(6,7)) {
            case "1":
                tint2 = 0xD5AC21;
                break;
            case "2":
                tint2 = 0xD521CD;
                break;
            case "3":
                tint2 = 0x16DF29;
                break;
            case "4":
                tint2 = 0x2125D5;
                break;
            case "5":
                tint2 = 0xA7AA9D;
                break;
        }
        sc_juegoOnline.Rmetal21.setTexture('Rmetal').setInteractive({cursor: "help"});
        sc_juegoOnline.Rmetal21.setTint(tint2);
        sc_juegoOnline.Rmetal11.setTexture('Rmetal').setInteractive({cursor: "help"});
        sc_juegoOnline.Rmetal11.setTint(tint1);
        sc_juegoOnline.Rmetal1.setTexture('empty').removeInteractive();
        switch(ho.slice(7)) {
            case "yunquetemplado":
                sc_juegoOnline.Rhd1.setTexture('Rhorno doble').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("hornod1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rym1.setTexture('Ryunque').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunque1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza1.setTexture('Rpechera');
                sc_juegoOnline.Rpieza1.setTint(tint1, tint1, tint2, tint2);
                break;
            case "espadatemplado":
                sc_juegoOnline.Rhd1.setTexture('Rhorno').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("horno1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rym1.setTexture('Ryunque doble').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunqued1")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza1.setTexture('Respada');
                sc_juegoOnline.Rpieza1.setTint(tint1, tint1, tint2, tint2);
                break;
        }
    }

    ho = sc_juegoOnline.recetas2[0];

    switch(ho.slice(5,6)) {
        case "1":
            tint1 = 0xD5AC21;
            break;
        case "2":
            tint1 = 0xD521CD;
            break;
        case "3":
            tint1 = 0x16DF29;
            break;
        case "4":
            tint1 = 0x2125D5;
            break;
        case "5":
            tint1 = 0xA7AA9D;
            break;
    }
    if (isNaN(ho.slice(6,7)) || (ho.slice(6,7) == "")) {
        sc_juegoOnline.Rmetal22.setTexture('empty').removeInteractive();
        sc_juegoOnline.Rmetal12.setTexture('empty').removeInteractive();
        sc_juegoOnline.Rmetal2.setTexture('Rmetal').setInteractive({cursor: "help"});
        sc_juegoOnline.Rmetal2.setTint(tint1);
        sc_juegoOnline.Rhd2.setTexture('Rhorno').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("horno2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
        switch (ho.slice(6)) {
            case "yunquetemplado":
                sc_juegoOnline.Rym2.setTexture('Ryunque').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunque2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza2.setTexture('Rpiernas');
                sc_juegoOnline.Rpieza2.setTint(tint1);
                break;
            case "moldetemplado":
                sc_juegoOnline.Rym2.setTexture('Rmolde').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("molde2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza2.setTexture('Rcasco');
                sc_juegoOnline.Rpieza2.setTint(tint1);
                break;
        }
    } else {
        switch(ho.slice(6,7)) {
            case "1":
                tint2 = 0xD5AC21;
                break;
            case "2":
                tint2 = 0xD521CD;
                break;
            case "3":
                tint2 = 0x16DF29;
                break;
            case "4":
                tint2 = 0x2125D5;
                break;
            case "5":
                tint2 = 0xA7AA9D;
                break;
        }
        sc_juegoOnline.Rmetal22.setTexture('Rmetal').setInteractive({cursor: "help"});
        sc_juegoOnline.Rmetal22.setTint(tint2);
        sc_juegoOnline.Rmetal12.setTexture('Rmetal').setInteractive({cursor: "help"});
        sc_juegoOnline.Rmetal12.setTint(tint1);
        sc_juegoOnline.Rmetal2.setTexture('empty').removeInteractive();
        switch(ho.slice(7)) {
            case "yunquetemplado":
                sc_juegoOnline.Rhd2.setTexture('Rhorno doble').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("hornod2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rym2.setTexture('Ryunque').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunque2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza2.setTexture('Rpechera');
                sc_juegoOnline.Rpieza2.setTint(tint1, tint1, tint2, tint2);
                break;
            case "espadatemplado":
                sc_juegoOnline.Rhd2.setTexture('Rhorno').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("horno2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rym2.setTexture('Ryunque doble').setInteractive({cursor: "help"}).on("pointerover", function(pointer){onlineGuiaApuntar("yunqued2")}).on("pointerout", function(pointer){onlineGuiaApuntar("none")});
                sc_juegoOnline.Rpieza2.setTexture('Respada');
                sc_juegoOnline.Rpieza2.setTint(tint1, tint1, tint2, tint2);
                break;
        }
    }
}

function onlineInteractuarMonstruos(p) {
    var result = false;

    if (sc_juegoOnline.victory != undefined) {return false;}

    //console.log(sc_juegoOnline.recetas1[0] + ", " + p.heldObject);
    if (sc_juegoOnline.recetas1[0] == p.heldObject) {
        if (Phaser.Math.Distance.Between(p.x, p.y, sc_juegoOnline.monstruo1.x, sc_juegoOnline.monstruo1.y) < 0.75*Math.max(sc_juegoOnline.monstruo1.body.width, sc_juegoOnline.monstruo1.body.height)+0.75*Math.max(p.body.width, p.body.height)) {
            onlineArmarMonstruo(sc_juegoOnline.monstruo1, p.heldObject)
            p.heldObject = "none";
            getAnim(p, true);
            result = true;
            sc_juegoOnline.recetas1.splice(0,1);

            if (sc_juegoOnline.recetas1[0] == undefined) {
                onlineGameVictory(1);
            }
        }
    }
    if (sc_juegoOnline.recetas2[0] == p.heldObject) {
        if (Phaser.Math.Distance.Between(p.x, p.y, sc_juegoOnline.monstruo2.x, sc_juegoOnline.monstruo2.y) < 0.75*Math.max(sc_juegoOnline.monstruo2.body.width, sc_juegoOnline.monstruo2.body.height)+0.75*Math.max(p.body.width, p.body.height)) {
            onlineArmarMonstruo(sc_juegoOnline.monstruo2, p.heldObject)
            p.heldObject = "none";
            getAnim(p, true);
            result = true;
            sc_juegoOnline.recetas2.splice(0,1);
            
            if (sc_juegoOnline.recetas2[0] == undefined) {
                onlineGameVictory(2);
            }
        }
    }

    sc_juegoOnline.progreso1.setTexture('progreso' + (4-sc_juegoOnline.recetas1.length));
    sc_juegoOnline.progreso2.setTexture('progreso' + (4-sc_juegoOnline.recetas2.length));
    return result;
}


function onlineGameVictory(player) {
    var ch;
    if (player == 1) {
        ch = cont.p1.ch;
    } else if (player == 2) {
        ch = cont.p2.ch;
    }

    sc_juegoOnline.botonPausa.paused = true;
    sc_juegoOnline.pausedOverlay.setTexture('pausedOverlay');
    sc_juegoOnline.botonPausa.removeInteractive();
    if (player == 0) {
        mus_game.onlinePause();
        mus_game.currentTime = 0;
        mus_defeat.play();
        sc_juegoOnline.victory = sc_juegoOnline.add.image(400, 100, 'empate'); //TIE

        if (cont.p1.ch == "SSHielo1") {
            sc_juegoOnline.add.image(200, 375, 'hieloTriste'); //PERSONAJES TRISTES
        }
        else if (cont.p1.ch == "SSFuego1") {
            sc_juegoOnline.add.image(200, 375, 'fuegoTriste');
        }
        else {
            sc_juegoOnline.add.image(200, 375, 'elfaTriste');
        }

        if (cont.p2.ch == "SSHielo1") {
            sc_juegoOnline.add.image(600, 375, 'hieloTriste');
        }
        else if (cont.p2.ch == "SSFuego1") {
            sc_juegoOnline.add.image(600, 375, 'fuegoTriste');
        }
        else {
            sc_juegoOnline.add.image(600, 375, 'elfaTriste');
        }

    } else {
        mus_game.onlinePause();
        mus_game.currentTime = 0;
        mus_victory.play();
        sc_juegoOnline.victory = sc_juegoOnline.add.image(400, 100, 'victoria');
        if (ch == "SSHielo1") {
            sc_juegoOnline.winner = sc_juegoOnline.add.image(400, 375, 'hielo');
        }
        else if (ch == "SSFuego1") {
            sc_juegoOnline.winner = sc_juegoOnline.add.image(400, 375, 'fuego');
        }
        else {
            sc_juegoOnline.winner = sc_juegoOnline.add.image(400, 375, 'elfa');
        }
    }
    
    sc_juegoOnline.botonSalir = sc_juegoOnline.add.image(400, 550, 'botonSalir');
    sc_juegoOnline.botonSalir.setInteractive({ cursor: "pointer" });
    sc_juegoOnline.botonSalir.on('pointerup', function () {
        sc_juegoOnline.scene.start("MenuPrincipal");
    });
}

function onlineArmarMonstruo(m, ho) {
    var tint1 = 0xFF0000, tint2 = 0xFF0000;
    switch(ho.slice(5,6)) {
        case "1":
            tint1 = 0xD5AC21;
            break;
        case "2":
            tint1 = 0xD521CD;
            break;
        case "3":
            tint1 = 0x16DF29;
            break;
        case "4":
            tint1 = 0x2125D5;
            break;
        case "5":
            tint1 = 0xA7AA9D;
            break;
    }
    if (isNaN(ho.slice(6,7)) || (ho.slice(6,7) == "")) {
        sc_juegoOnline.Rmetal1.setTint(tint1);
        switch (ho.slice(6)) {
            case "yunquetemplado":
                m.heldPiernas = ho;
                m.heldPiernasSprite.setTexture("ProtPiernas"+m.faction+"D")
                m.heldPiernasSprite.setTint(tint1);
                break;
            case "moldetemplado":
                m.heldCascoSprite.setTexture("Casco"+m.faction+"D")
                m.heldCascoSprite.setTint(tint1);
                sc_juegoOnline.Rpieza1.setTint(tint1);
                break;
        }
    } else {
        switch(ho.slice(6,7)) {
            case "1":
                tint2 = 0xD5AC21;
                break;
            case "2":
                tint2 = 0xD521CD;
                break;
            case "3":
                tint2 = 0x16DF29;
                break;
            case "4":
                tint2 = 0x2125D5;
                break;
            case "5":
                tint2 = 0xA7AA9D;
                break;
        }
        sc_juegoOnline.Rmetal21.setTint(tint2);
        sc_juegoOnline.Rmetal11.setTint(tint1);
        switch(ho.slice(7)) {
            case "yunquetemplado":
                m.heldPecheraSprite.setTexture("Pechera"+m.faction+"D")
                m.heldPecheraSprite.setTint(tint1, tint1, tint2, tint2);
                break;
            case "espadatemplado":
                    m.heldEspadaSprite.setTexture("Espada"+m.faction+"D")
                    m.heldEspadaSprite.setTint(tint1, tint1, tint2, tint2);
                break;
        }
    }
}

function onlineCogerTrampa(p, t) {
    if (sc_juegoOnline.altarTrampas.trampa == "none") return;
    p.trampa = sc_juegoOnline.altarTrampas.trampa;
    sc_juegoOnline.altarTrampas.trampa = "none";
    sc_juegoOnline.altarTrampas.timer = 0;
    sc_juegoOnline.altarTrampas.trampaSprite.setTexture("empty");
    sc_juegoOnline.altarTrampas.setTexture("altar1");
}

function onlineGetTargetCell(player) {
    var cellX, cellY, x, y;
    var found = false, finished = false, split = false, nextSplit = false, double = "", target = "monstruo";
    var recetas, p;
    if (player == 1) {
        recetas = sc_juegoOnline.recetas1;
        p = sc_juegoOnline.player;
    } else {
        recetas = sc_juegoOnline.recetas2;
        p = sc_juegoOnline.player2;
    }
    var curItem = recetas[0], lastItem = "";

    while (!found && !finished) {
        if (curItem == lastItem) {
            if (nextSplit) {
                split = true;
            } else {
                split = false;
            }
            //Probar con el anterior objeto
            if (curItem.slice(-8) == "templado") {
                if (curItem.slice(-11,-8) == "pre") {
                    curItem = curItem.slice(0,-11);
                    target = "horno";
                } else {
                    curItem = curItem.slice(0,-8) + "pretemplado";
                    target = "barril";
                }
            } else if (curItem.slice(-6) == "yunque") {
                curItem = curItem.slice(0,-6) + "rojo";
                nextSplit = true;
                double = "yunque";
                target = "yunque";
            } else if (curItem.slice(-6) == "espada") {
                curItem = curItem.slice(0,-6) + "rojo";
                split = true;
                nextSplit = true;
                double = "espada";
                target = "yunqued";
            } else if (curItem.slice(-5) == "molde") {
                curItem = curItem.slice(0,-5) + "rojo";
                target = "molde";
            } else if (curItem.slice(-4) == "rojo") {
                curItem = curItem.slice(0,-4);
                target = "horno";
                finished = true;
            }
        }

        /*if (curItem == p.heldObject) {
            //Si si, ver a donde lo tiene que llevar
            found = true;
            x = 0;
            y = 0;
        } else {*/
            //Si no, iterar por todos los contenedores cuyo player sea el mismo que se le ha pasado a la función
            var foundConstruct = onlineLookFor(curItem, player, p, split, double, target);
            found = foundConstruct.found;
            if (found) {
                x = foundConstruct.x;
                y = foundConstruct.y;
            }
        //}
        lastItem = curItem;
    }

    if (!found) {
        x = p.x;
        y = p.y;
    }

    cellX = Math.floor(x/40);
    cellY = Math.floor(y/40);
    return ({x: cellX, y: cellY});
}

function onlineLookFor(item, player, p, split, dStation, target) {
    var found = false, double = false, held = false, x = 0, y = 0;
    var item1 = "", item2 = "", foundItem1 = false;
    
    if (split && !(isNaN(item.slice(6,7)) || (item.slice(6,7) == ""))) { 
        double = true;
        if (item.slice(-4) == "rojo") {
            item1 = item.slice(0,-5)+"rojo";
            item2 = "metal"+item.slice(-5)
        } else {
            item1 = item.slice(0,-1);
            item2 = "metal"+item.slice(-1)
        }
    }

    //
    if (double) {
        if (dStation == "yunque") {
            if (target == "horno") target = "hornod";
            sc_juegoOnline.hornosd.children.iterate(function (child) {
                if (child.player == player) {
                    if (child.heldObject2 == "none") {
                        if (child.heldObject1 == item1) {
                            foundItem1 = true;
                        }
                    } else {
                        if ((child.heldObject1 == item1 && child.heldObject2 == item2) || (child.heldObject2 == item1 && child.heldObject1 == item2)) {
                            found = true;
                            x = child.x;
                            y = child.y;
                        }
                    }
                }
            });
        } else if (dStation == "espada") {
            sc_juegoOnline.yunquesd.children.iterate(function (child) {
                if (child.player == player) {
                    if (child.heldObject2 == "none") {
                        if (child.heldObject1 == item1) {
                            foundItem1 = true;
                        }
                    } else {
                        if ((child.heldObject1 == item1 && child.heldObject2 == item2) || (child.heldObject2 == item1 && child.heldObject1 == item2)) {
                            found = true;
                            x = child.x;
                            y = child.y;
                        }
                    }
                }
            });

            sc_juegoOnline.hornos.children.iterate(function (child) {
                if (child.player == player) {
                    if (!foundItem1) {
                        if (item1.slice(-4) == "rojo") {
                            if (child.heldObject == item1.slice(0,-4)) {
                                found = true;
                                x = child.x;
                                y = child.y;
                            }
                        } else {
                            if (child.heldObject == item1) {
                                found = true;
                                x = child.x;
                                y = child.y;
                            }
                        }
                    } else {
                        if (item2.slice(-4) == "rojo") {
                            if (child.heldObject == item2.slice(0,-4)) {
                                found = true;
                                x = child.x;
                                y = child.y;
                            } else if (item2 != p.heldObject) {
                                item2 = item2.slice(0,-4);
                                if (target == "yunqued") {
                                    target = "horno";
                                }
                            }
                        } else {
                            if (child.heldObject == item2) {
                                found = true;
                                x = child.x;
                                y = child.y;
                            } else {
                                target = "horno";
                            }
                        }
                    }
                }
            });


        }
    

        if (foundItem1) {
            item = item2;
        } else {
            item = item1;
        }

    }
    
    if (item == p.heldObject) {
        found = true;
        held = true;

        var iterator = undefined;
        switch (target) {
            case "horno":
                iterator = sc_juegoOnline.hornos;
            break;
            case "yunque":
                iterator = sc_juegoOnline.yunques;
            break;
            case "molde":
                iterator = sc_juegoOnline.moldes;
            break;
            case "hornod":
                iterator = sc_juegoOnline.hornosd;
            break;
            case "yunqued":
                iterator = sc_juegoOnline.yunquesd;
            break;
            case "barril":
                iterator = sc_juegoOnline.barriles;
            break;
            case "monstruo":
                if (player == 1) {
                    iterator = sc_juegoOnline.monstruo1;
                } else {
                    iterator = sc_juegoOnline.monstruo2;
                }
                x = iterator.x;
                y = iterator.y;
                iterator = undefined;
            break;
        }
        if (iterator != undefined) {
            iterator.children.iterate(function(child){
                if (child.player == player) {
                    x = child.x;
                    y = child.y;
                }
            });
        }
    }




    if (!double && !held) {
        sc_juegoOnline.hornos.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });

        sc_juegoOnline.yunques.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });

        sc_juegoOnline.barriles.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });

        sc_juegoOnline.moldes.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });
    }

    sc_juegoOnline.mesas.children.iterate(function (child) {
        if (child.player == player && child.heldObject == item && !found) {
            found = true;
            x = child.x;
            y = child.y;
        }
    });

    sc_juegoOnline.cajonesMetal.children.iterate(function (child) {
        if (child.player == player && child.heldObject == item && !found) {
            found = true;
            x = child.x;
            y = child.y;
        }
    });
    //

    return {found: found, x: x, y: y};
}

function onlineComprobarInteraccion(p1,p2) {

    sc_juegoOnline.cajonesMetal.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
            if (child.texture.key.slice(-1) != "I") {
                child.setTexture(child.texture.key+"I");
            }
        } else {
            child.setTint(0xFFFFFF);
            if (child.texture.key.slice(-1) == "I") {
                child.setTexture(child.texture.key.slice(0,-1));
            }
        }
    });

    sc_juegoOnline.mesas.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.hornos.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.yunques.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.barriles.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.moldes.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.hornosd.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.yunquesd.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoOnline.basuras.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
            if (child.texture.key.slice(-1) != "I") {
                child.setTexture(child.texture.key+"I");
            }
        } else {
            child.setTint(0xFFFFFF);
            if (child.texture.key.slice(-1) == "I") {
                child.setTexture(child.texture.key.slice(0,-1));
            }
        }
    });
}


// Algoritmo de Dijkstra
function onlineDijkstra(start1, end1, start2, end2)
{
    /* JUGADOR 1 */

    onlineResetDistances();
    sc_juegoOnline.graphics.clear();
    sc_juegoOnline.graphics.fillStyle(0x00ff07, 0.3);
    var compare = function(a, b) {return a.distance < b.distance};
    sc_juegoOnline.distances[start1.y][start1.x] = 0;
    var prio_queue = new PriorityQueue({comparator: compare});
    var prev = new Array();
    for (var i = 0; i < config.height / 40; i++)
    {
        prev.push(new Array());
        for (var j = 0; j < config.width / 40; j++)
        {
            prev[i].push(new Array());
            prev[i][j] = undefined;
        }
    }
    prio_queue.queue({startF: start1.y, startC: start1.x, distance: 0});
    while (prio_queue.length > 0)
    {
        var node = prio_queue.dequeue();            
        if (sc_juegoOnline.distances[node.startF][node.startC] >= node.distance)
        {
            for (var k = 0; k < config.height / 40; k++)
            {
                for (var l = 0; l < config.width / 80; l++)
                {
                    var peso = node.distance + sc_juegoOnline.adjacencyMatrix[node.startF][node.startC][k][l];
                    if (peso < sc_juegoOnline.distances[k][l])
                    {
                        prio_queue.queue({startF: k, startC: l, distance: peso});
                        sc_juegoOnline.distances[k][l] = peso;
                        prev[k][l] = {fila: node.startF, columna: node.startC};
                    }
                }
            }
        }
    }   

    var curva = new Array();
    var inicio = prev[end1.y][end1.x];
    var final = {fila: start1.y, columna: start1.x};

    curva.push(20+(end1.x*40));
    curva.push(20+(end1.y*40));
    while (inicio != undefined && final != undefined) {
        curva.push(20+(inicio.columna*40));
        curva.push(20+(inicio.fila*40));
        inicio = prev[inicio.fila][inicio.columna];
    }
    sc_juegoOnline.graphics.lineStyle(4,0x000000,1);
    if (curva.length == 2) {
        curva.push(20+(start1.x*40));
        curva.push(20+(start1.y*40));
    }
    var curve = new Phaser.Curves.Spline(curva);
    if (curva.length >= 4)
        curve.draw(sc_juegoOnline.graphics, 64);
    
    /* JUGADOR 2 */

    onlineResetDistances();
    sc_juegoOnline.distances[start2.y][start2.x] = 0;
    prio_queue = new PriorityQueue({comparator: compare});
    prev = new Array();
    for (var i = 0; i < config.height / 40; i++)
    {
        prev.push(new Array());
        for (var j = 0; j < config.width / 40; j++)
        {
            prev[i].push(new Array());
            prev[i][j] = undefined;
        }
    }
    prio_queue.queue({startF: start2.y, startC: start2.x, distance: 0});
    while (prio_queue.length > 0)
    {
        var node = prio_queue.dequeue();            
        if (sc_juegoOnline.distances[node.startF][node.startC] >= node.distance)
        {
            for (var k = 0; k < config.height / 40; k++)
            {
                for (var l = config.width / 80; l < config.width / 40; l++)
                {
                    var peso = node.distance + sc_juegoOnline.adjacencyMatrix[node.startF][node.startC][k][l];
                    if (peso < sc_juegoOnline.distances[k][l])
                    {
                        prio_queue.queue({startF: k, startC: l, distance: peso});
                        sc_juegoOnline.distances[k][l] = peso;
                        prev[k][l] = {fila: node.startF, columna: node.startC};
                    }
                }
            }
        }
    }   

    curva = new Array();
    inicio = prev[end2.y][end2.x];
    final = {fila: start2.y, columna: start2.x};

    curva.push(20+(end2.x*40));
    curva.push(20+(end2.y*40));
    while (inicio != undefined && final != undefined) {
        curva.push(20+(inicio.columna*40));
        curva.push(20+(inicio.fila*40));
        inicio = prev[inicio.fila][inicio.columna];
    }
    sc_juegoOnline.graphics.lineStyle(4,0x000000,1);
    if (curva.length == 2) {
        curva.push(20+(start2.x*40));
        curva.push(20+(start2.y*40));
    }
    curve = new Phaser.Curves.Spline(curva);
    if (curva.length >= 4)
        curve.draw(sc_juegoOnline.graphics, 64);

}   

function onlineInitDistances()
{
    sc_juegoOnline.distances = new Array();
    for (var i = 0; i < config.height / 40; i++)
    {
        sc_juegoOnline.distances.push(new Array());
        for (var j = 0; j < config.width / 40; j++)
        {
            sc_juegoOnline.distances[i].push(new Array());
            sc_juegoOnline.distances[i][j] = INF;
        }
    }
}
function onlineResetDistances()
{
    for (var i = 0; i < config.height / 40; i++)
    {
        for (var j = 0; j < config.width / 40; j++)
        {
            sc_juegoOnline.distances[i][j] = INF; 
        }
    }
}

// Función para crear nuestro grafo predeterminado
function onlineInitGrafo()
{
    /* ARRAY 4-DIMENSIONAL de i = 15, j = 20, k = 15, l = 20 */
    sc_juegoOnline.adjacencyMatrix = new Array();

    for (var i = 0; i < config.height / 40; i++)
    {
        sc_juegoOnline.adjacencyMatrix.push(new Array());
        for (var j = 0; j < config.width / 40; j++)
        {
            sc_juegoOnline.adjacencyMatrix[i].push(new Array());
            for (var k = 0; k < config.height / 40; k++)
            {
                sc_juegoOnline.adjacencyMatrix[i][j].push(new Array());
                for (var l = 0; l < config.width / 40; l++)
                {
                    sc_juegoOnline.adjacencyMatrix[i][j][k].push(new Array());
                    sc_juegoOnline.adjacencyMatrix[i][j][k][l] = INF;
                    // Unión izda-derecha derecha-izda
                    if ((i == k && l == j + 1) || (i == k && l == j - 1))
                    {
                        sc_juegoOnline.adjacencyMatrix[i][j][k][l] = 1;
                    }                        
                    // Unión arriba-abajo abajo-arriba
                    if ((j == l && k == i + 1) || (j == l && k == i - 1))
                    {
                        sc_juegoOnline.adjacencyMatrix[i][j][k][l] = 1;
                    }
                }
            }
        }
    }
}

// Desconectar los vecionos de un nodo del grafo
function onlineDisconnectNeighbours(fila, columna, up, down, left, right)
{
    var maxF = config.height / 40, maxC = config.width / 40;
    if (fila + 1 < maxF) {
        if (down) {
            sc_juegoOnline.adjacencyMatrix[fila + 1][columna][fila][columna] = INF;
        } else {
            sc_juegoOnline.adjacencyMatrix[fila + 1][columna][fila][columna] = 1;
        }
    }
        
    if (fila + 1 < maxF && columna + 1 < maxC)
        sc_juegoOnline.adjacencyMatrix[fila + 1][columna + 1][fila][columna] = INF;

    if (fila + 1 < maxF && columna - 1 >= 0)
        sc_juegoOnline.adjacencyMatrix[fila + 1][columna - 1][fila][columna] = INF;

    if (columna + 1 < maxC) {
        if (right) {
            sc_juegoOnline.adjacencyMatrix[fila][columna + 1][fila][columna] = INF;
        } else {
            sc_juegoOnline.adjacencyMatrix[fila][columna + 1][fila][columna] = 1;
        }
    }
        
    if (columna - 1 >= 0) {
        if (left) {
            sc_juegoOnline.adjacencyMatrix[fila][columna - 1][fila][columna] = INF;
        } else {
            sc_juegoOnline.adjacencyMatrix[fila][columna - 1][fila][columna] = 1;
        }
    }
        
    if (fila - 1 >= 0 && columna + 1 < maxC)
        sc_juegoOnline.adjacencyMatrix[fila - 1][columna + 1][fila][columna] = INF;

    if (fila - 1 >= 0) {
        if (up) {
            sc_juegoOnline.adjacencyMatrix[fila - 1][columna][fila][columna] = INF;
        } else {
            sc_juegoOnline.adjacencyMatrix[fila - 1][columna][fila][columna] = 1;
        }
    }
        
    if (fila - 1 >= 0 && columna - 1 >= 0)
        sc_juegoOnline.adjacencyMatrix[fila - 1][columna - 1][fila][columna] = INF;
}

function onlineGuiaApuntar(objetivo) {
    if (objetivo == "none") {
        sc_juegoOnline.circuloGuia.setTexture("empty");
    } else {
        var player = objetivo.slice(-1);
        var target;
        var iterator;
        var recetas = sc_juegoOnline.recetas2;
        if (player == 1) {
            recetas = sc_juegoOnline.recetas1;
        }
        sc_juegoOnline.circuloGuia.x = 0;
        sc_juegoOnline.circuloGuia.y = 0;

        sc_juegoOnline.circuloGuia.setTexture("guideMarker");
        switch (objetivo.slice(0,-1)) {
            case "metal1":
            case "metal":
                target = "metal"+recetas[0].slice(5,6);
                iterator = sc_juegoOnline.cajonesMetal;
                sc_juegoOnline.circuloGuia.y = 15;
                break;
            case "metal2": 
                target = "metal"+recetas[0].slice(6,7);
                iterator = sc_juegoOnline.cajonesMetal;
                sc_juegoOnline.circuloGuia.y = 15;
                break;
            case "horno":
                target = undefined;
                iterator = sc_juegoOnline.hornos;
                break;
            case "hornod":
                target = undefined;
                iterator = sc_juegoOnline.hornosd;
                break;
            case "molde":
                target = undefined;
                iterator = sc_juegoOnline.moldes;
                break;
            case "yunque":
                target = undefined;
                iterator = sc_juegoOnline.yunques;
                break;
            case "yunqued":
                target = undefined;
                iterator = sc_juegoOnline.yunquesd;
                break;
            case "barril":
                target = undefined;
                iterator = sc_juegoOnline.barriles;
                break;
            case "monstruo":
                iterator = undefined;
                if (player == 1) {
                    sc_juegoOnline.circuloGuia.x = sc_juegoOnline.monstruo1.x;
                    sc_juegoOnline.circuloGuia.y = sc_juegoOnline.monstruo1.y;
                } else {
                    sc_juegoOnline.circuloGuia.x = sc_juegoOnline.monstruo2.x;
                    sc_juegoOnline.circuloGuia.y = sc_juegoOnline.monstruo2.y;
                }
                break;
        }
        if (iterator != undefined) {
            iterator.children.iterate(function(child){
                if (child.player == player){
                    if (child.heldObject == target || target == undefined) {
                        sc_juegoOnline.circuloGuia.x += child.x;
                        sc_juegoOnline.circuloGuia.y += child.y;
                    }
                }
            });
        }
    }
}