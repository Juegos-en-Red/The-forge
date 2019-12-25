"use strict";

//Inicialización de la escena del juego en local
var sc_juegoLocal = new Phaser.Scene('JuegoLocal');

const INF = 0X3F3F3F3F;

//Función preload: Aquí se cargan todos los sprites necesarios para el juego.
sc_juegoLocal.preload = function() {
    
}

//Función create: Aquí se inicializan todos los objetos del juego.
sc_juegoLocal.create = function() {

    initDistances();
    initGrafo();

    //Música. Si se añade más música es importante parar aquí toda la que haya
    mus_menu.pause();
    mus_menu.currentTime = 0;
    mus_game.play();


    //Aquí se carga el fondo del juego
    this.add.image(400, 300, 'sky');

    sc_juegoLocal.graphics = sc_juegoLocal.add.graphics();
    //Inicialización de animaciones
    initAnimations(this);

    //Inicialización de colisiones
    sc_juegoLocal.colisiones = this.physics.add.staticGroup();
    sc_juegoLocal.colisiones.create(40, 300, 'molde').setSize(80,600).setDisplaySize(80,600).setAlpha(0);
    sc_juegoLocal.colisiones.create(400, 40, 'molde').setSize(800,80).setDisplaySize(800,80).setAlpha(0);
    sc_juegoLocal.colisiones.create(720+40, 300, 'molde').setSize(80,600).setDisplaySize(80,600).setAlpha(0);
    sc_juegoLocal.colisiones.create(320+80, 180, 'molde').setSize(160,360).setDisplaySize(160,360).setAlpha(0);
    sc_juegoLocal.colisiones.create(360+40, 360+40, 'molde').setSize(80,80).setDisplaySize(80,80).setAlpha(0);
    sc_juegoLocal.colisiones.create(400, 440+80, 'molde').setSize(800,160).setDisplaySize(800,160).setAlpha(0);

    //Inicialización de cajones
    //Primero se crea un grupo de cajones para poder iterar y después se crean los cajones de ambos jugadores
    //La propiedad heldObject (que se repetirá mucho en el resto de objetos) guarda en forma de string el objeto que guarda el cajón
    sc_juegoLocal.cajonesMetal = this.physics.add.staticGroup();
    sc_juegoLocal.cajonesMetal.create(140, 46, 'cajon1').heldObject = "metal1"
    sc_juegoLocal.cajonesMetal.create(180, 46, 'cajon2').heldObject = "metal2"
    sc_juegoLocal.cajonesMetal.create(220, 46, 'cajon3').heldObject = "metal3"
    sc_juegoLocal.cajonesMetal.create(260, 46, 'cajon4').heldObject = "metal4"
    sc_juegoLocal.cajonesMetal.create(300, 46, 'cajon5').heldObject = "metal5"

    sc_juegoLocal.cajonesMetal.children.iterate(function(child) {
        child.player = 1;
    });

    sc_juegoLocal.cajonesMetal.create(500, 46, 'cajon1').heldObject = "metal1"
    sc_juegoLocal.cajonesMetal.create(540, 46, 'cajon2').heldObject = "metal2"
    sc_juegoLocal.cajonesMetal.create(580, 46, 'cajon3').heldObject = "metal3"
    sc_juegoLocal.cajonesMetal.create(620, 46, 'cajon4').heldObject = "metal4"
    sc_juegoLocal.cajonesMetal.create(660, 46, 'cajon5').heldObject = "metal5"
    
    sc_juegoLocal.cajonesMetal.children.iterate(function(child) {
        if (child.player != 1) child.player = 2;
    });

    sc_juegoLocal.cajonesMetal.children.iterate(function(child) {
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, false, true, true);
    });

    //Inicialización de basuras
    //La inicialización de las basuras no necesita la propiedad heldObject, ya que sólo sirven para que el jugador se deshaga de objetos no deseados.
    sc_juegoLocal.basuras = this.physics.add.staticGroup();
    sc_juegoLocal.basuras.create(340, 320, 'basura').player = 1;
    sc_juegoLocal.basuras.create(460, 320, 'basura').setFlipX(true).player = 2;

    sc_juegoLocal.basuras.children.iterate(function(child) {
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
    });

    //Inicialización de hornos de 1 material
    //En las estaciones de trabajo se añaden varias propiedades además de heldObject. 
    //En este caso se añaden timer, que guarda el progreso del metal en su interior, y status, el sprite que mostrará el estado de la estación.
    sc_juegoLocal.hornos = this.physics.add.staticGroup();
    sc_juegoLocal.hornos.create( 60, 140, 'horno').player = 1;
    sc_juegoLocal.hornos.create(740, 140, 'horno').setFlipX(true).player = 2;

    sc_juegoLocal.hornos.children.iterate(function(child){
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
        child.anims.play('hornoA', true);
    });

    //Inicialización de barriles de templado
    sc_juegoLocal.barriles = this.physics.add.staticGroup();
    sc_juegoLocal.barriles.create(340, 179, 'barril de templado').player = 1;
    sc_juegoLocal.barriles.create(460, 179, 'barril de templado').player = 2;

    sc_juegoLocal.barriles.children.iterate(function(child){
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, false, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });

    
    //Inicialización de moldes
    sc_juegoLocal.moldes = this.physics.add.staticGroup();
    sc_juegoLocal.moldes.create(340, 220, 'molde').player = 1;
    sc_juegoLocal.moldes.create(460, 220, 'molde').player = 2;

    sc_juegoLocal.moldes.children.iterate(function(child){
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });

    //Inicialización de yunques de 1 material
    //Es idéntica a la de los hornos, pero también se añade la propiedad cooldown, que impide al jugador interactuar con más frecuencia de la deseada.
    sc_juegoLocal.yunques = this.physics.add.staticGroup();
    sc_juegoLocal.yunques.create(340, 260, 'yunque').player = 1;
    sc_juegoLocal.yunques.create(460, 260, 'yunque').player = 2;

    sc_juegoLocal.yunques.children.iterate(function(child){
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });
    
    //Inicialización de  hornos de 2 materiales
    //En este caso hay dos heldObjects, ya que se trata de un horno doble. Lo mismo ocurrirá en los yunques dobles.
    sc_juegoLocal.hornosd = this.physics.add.staticGroup();
    sc_juegoLocal.hornosd.create( 60, 260, 'horno doble').player = 1;
    sc_juegoLocal.hornosd.create(740, 260, 'horno doble').setFlipX(true).player = 2;

    sc_juegoLocal.hornosd.children.iterate(function(child){
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
        child.anims.play("horno dobleA", false);
    });



    //Inicialización de yunques de 2 materiales
    sc_juegoLocal.yunquesd = this.physics.add.staticGroup();
    sc_juegoLocal.yunquesd.create( 53, 340, 'yunque doble').player = 1;
    sc_juegoLocal.yunquesd.create(747, 340, 'yunque doble').player = 2;

    sc_juegoLocal.yunquesd.children.iterate(function(child){
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, true, true, false, false);
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });

    //Inicialización de trampas
    sc_juegoLocal.altarTrampas = this.physics.add.staticSprite(400,  400, 'altar1');
    sc_juegoLocal.altarTrampas.trampa = "none";
    sc_juegoLocal.altarTrampas.timer = 0;
    sc_juegoLocal.altarTrampas.trampaSprite = sc_juegoLocal.add.image(sc_juegoLocal.altarTrampas.x, sc_juegoLocal.altarTrampas.y, 'empty');
    sc_juegoLocal.trampasb = this.physics.add.staticGroup();
    sc_juegoLocal.trampasb.create(340, 420, 'btnAltar');
    sc_juegoLocal.trampasb.create(460, 420, 'btnAltar');
    /*for (var i = 1; i < 10; i++) {
        for (var j = 9; i < 10; j++) {
            disconnectNeighbours(i,j, true, true, true, true);
        }
    }*/
    disconnectNeighbours(6,9, true, true, true, true);
    disconnectNeighbours(6,10, true, true, true, true);
    disconnectNeighbours(7,9, true, true, true, true);
    disconnectNeighbours(7,10, true, true, true, true);
    disconnectNeighbours(8,9, true, true, true, true);
    disconnectNeighbours(8,10, true, true, true, true);
    disconnectNeighbours(9,9, true, true, true, true);
    disconnectNeighbours(9,10, true, true, true, true);
    disconnectNeighbours(10,9, true, true, true, true);
    disconnectNeighbours(10,10, true, true, true, true);

    sc_juegoLocal.muros = this.physics.add.staticGroup();

    //Inicialización de jugadores
    sc_juegoLocal.players = this.physics.add.group();

    //En cont.p1.char y cont.p2.char se guarda el spritesheet del personaje de cada jugador
    //En la escena de selección de personaje se deberán cambiar estas variables
    sc_juegoLocal.player = sc_juegoLocal.players.create(210, 320, cont.p1.ch);
    sc_juegoLocal.player2 = sc_juegoLocal.players.create(590, 320, cont.p2.ch);

    //Inicialización de características comunes a ambos jugadores
    //Variable auxiliar that para hacer referencia a this
    var that = this;

    //Al crear a los jugadores se inicializan una gran cantidad de variables
    sc_juegoLocal.players.children.iterate(function (child) {
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
        }

        //interacted se activa al pulsar la tecla de interacción y se desactiva al levantarla.
        //Sirve para obligar al jugador a pulsar varias veces, ya que si no podría mantener el botón pulsado y se interactuaría constantemente.
        child.interacted = false;
        child.trampa = "none";
        child.tiempoInmovil = 0;
    });
    
    //Inicialización de mesas
    sc_juegoLocal.mesas = this.physics.add.staticGroup();
    sc_juegoLocal.mesas.create(180, 455, 'mesa').player = 1;
    sc_juegoLocal.mesas.create(220, 455, 'mesa').player = 1;
    sc_juegoLocal.mesas.create(260, 455, 'mesa').player = 1;

    sc_juegoLocal.mesas.create(620, 455, 'mesa').player = 2;
    sc_juegoLocal.mesas.create(580, 455, 'mesa').player = 2;
    sc_juegoLocal.mesas.create(540, 455, 'mesa').player = 2;

    sc_juegoLocal.mesas.children.iterate(function (child) {
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x, false, true, true, true);
        child.heldObject = "none";
        child.heldObjectSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
    });

    //Inicialización de monstruos
    sc_juegoLocal.monstruos = this.physics.add.staticGroup();
    var temp;
    if (cont.p1.ch.slice(2,3) == 'H') {
        temp = "Hielo";
    } else {
        temp = "Elfo";
    }
    sc_juegoLocal.monstruo1 = sc_juegoLocal.monstruos.create(72, 433, 'M'+temp+'D');
    sc_juegoLocal.monstruo1.faction = temp;
    if (cont.p2.ch.slice(2,3) == 'H') {
        temp = "Hielo";
    } else {
        temp = "Elfo";
    }
    sc_juegoLocal.monstruo2 = sc_juegoLocal.monstruos.create(728, 433, 'M'+temp+'D').setFlipX(true);
    sc_juegoLocal.monstruo2.faction = temp;

    //mejorar el disconnect para los monstruos no estaría de más
    sc_juegoLocal.monstruos.children.iterate(function (child) {
        disconnectNeighbours(getCell(child.x,child.y).y,getCell(child.x,child.y).x);
        child.heldCasco = "none";
        child.heldPechera = "none";
        child.heldPiernas = "none";
        child.heldEspada = "none";
        child.heldCascoSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
        child.heldPecheraSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
        child.heldPiernasSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
        child.heldEspadaSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
    });
    sc_juegoLocal.monstruo2.heldCascoSprite.setFlipX(true);
    sc_juegoLocal.monstruo2.heldPecheraSprite.setFlipX(true);
    sc_juegoLocal.monstruo2.heldPiernasSprite.setFlipX(true);
    sc_juegoLocal.monstruo2.heldEspadaSprite.setFlipX(true);

    //Colisiones
    //Una vez están creados todos los objetos, se añade la colisión de cada jugador con cada grupo de objetos.
    sc_juegoLocal.players.children.iterate(function(child) {
        that.physics.add.collider(child, sc_juegoLocal.colisiones);
        that.physics.add.collider(child, sc_juegoLocal.muros);
        that.physics.add.collider(child, sc_juegoLocal.monstruos);
        that.physics.add.overlap(child, sc_juegoLocal.trampasb, cogerTrampa, null, that);
    });

    //Esta función se ejecutará al dejar de pulsar una tecla
    //Se comprobarán las teclas definidas de forma global para realizar una acción u otra
    //En el caso de las teclas de dirección, si el jugador se estaba moviendo en esa dirección, deja de hacerlo
    //En el caso de la tecla de interacción, la variable interacted pasa a ser false
    this.input.keyboard.on('keyup', 
    function (event) {
        switch (event.keyCode) {
            case cont.p1.w:
                if (sc_juegoLocal.player.spdY <= 0) {
                    sc_juegoLocal.player.spdY = 0;
                }
            break;
            case cont.p1.s:
                if (sc_juegoLocal.player.spdY >= 0) {
                    sc_juegoLocal.player.spdY = 0;
                }
            break;
            case cont.p1.a:
                if (sc_juegoLocal.player.spdX <= 0) {
                    sc_juegoLocal.player.spdX = 0;
                }
            break;
            case cont.p1.d:
                if (sc_juegoLocal.player.spdX >= 0) {
                    sc_juegoLocal.player.spdX = 0;
                }
            break;
            case cont.p1.i1:
                sc_juegoLocal.player.interacted = false;
            break;
            case cont.p2.w:
                if (sc_juegoLocal.player2.spdY <= 0) {
                    sc_juegoLocal.player2.spdY = 0;
                }
            break;
            case cont.p2.s:
                if (sc_juegoLocal.player2.spdY >= 0) {
                    sc_juegoLocal.player2.spdY = 0;
                }
            break;
            case cont.p2.a:
                if (sc_juegoLocal.player2.spdX <= 0) {
                    sc_juegoLocal.player2.spdX = 0;
                }
            break;
            case cont.p2.d:
                if (sc_juegoLocal.player2.spdX >= 0) {
                    sc_juegoLocal.player2.spdX = 0;
                }
            break;
            case cont.p2.i1:
                sc_juegoLocal.player2.interacted = false;
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
                    sc_juegoLocal.player.spdY = -400;
            break;
            case cont.p1.s:
                    sc_juegoLocal.player.spdY = 400;
            break;
            case cont.p1.a:
                    sc_juegoLocal.player.spdX = -400;
            break;
            case cont.p1.d:
                    sc_juegoLocal.player.spdX = 400;
            break;
            case cont.p1.i1:
                interactuar(sc_juegoLocal.player);
                sc_juegoLocal.player.interacted = true;
            break;
            case cont.p1.i2:
                switch(sc_juegoLocal.player.trampa) {
                    case "trampaReloj":
                        sc_juegoLocal.player2.tiempoInmovil = 250;
                        sc_juegoLocal.player.trampa = "none";
                        break;
                    case "trampaMuro":
                        sc_juegoLocal.muros.create(540, 300, 'tripleMuro').timer = 1000;
                        disconnectNeighbours(getCell(540,300).y,getCell(540,300).x, true, true, true, true);
                        disconnectNeighbours(getCell(540,300).y,getCell(540,300).x+1, true, true, true, true);
                        disconnectNeighbours(getCell(540,300).y,getCell(540,300).x-1, true, true, true, true);
                        sc_juegoLocal.player.trampa = "none";
                        break;
                }
            break;

            //jugador 2
            case cont.p2.w:
                    sc_juegoLocal.player2.spdY = -400;
            break;
            case cont.p2.s:
                    sc_juegoLocal.player2.spdY = 400;
            break;
            case cont.p2.a:
                    sc_juegoLocal.player2.spdX = -400;
            break;
            case cont.p2.d:
                    sc_juegoLocal.player2.spdX = 400;
            break;
            case cont.p2.i1:
                interactuar(sc_juegoLocal.player2);
                sc_juegoLocal.player2.interacted = true;
            break;
            case cont.p2.i2:
                switch(sc_juegoLocal.player2.trampa) {
                    case "trampaReloj":
                        sc_juegoLocal.player.tiempoInmovil = 250;
                        sc_juegoLocal.player2.trampa = "none";
                        break;
                    case "trampaMuro":
                        sc_juegoLocal.muros.create(260, 300, 'tripleMuro').timer = 1000;
                        disconnectNeighbours(getCell(260,300).y,getCell(260,300).x, true, true, true, true);
                        disconnectNeighbours(getCell(260,300).y,getCell(260,300).x+1, true, true, true, true);
                        disconnectNeighbours(getCell(260,300).y,getCell(260,300).x-1, true, true, true, true);
                        sc_juegoLocal.player2.trampa = "none";
                        break;
                }
            break;
        }
    });

    //Inicializar recetas

    sc_juegoLocal.recetas1 = [];
    sc_juegoLocal.recetas2 = [];

    var aux1, aux2;

    //piernas
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoLocal.recetas1.push("metal"+aux1+"yunquetemplado");
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoLocal.recetas2.push("metal"+aux1+"yunquetemplado");

    //cascos
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoLocal.recetas1.push("metal"+aux1+"moldetemplado");
    aux1 = Phaser.Math.Between(1, 5);
    sc_juegoLocal.recetas2.push("metal"+aux1+"moldetemplado");

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
   sc_juegoLocal.recetas1.push("metal"+aux1+aux2+"espadatemplado");
   aux1 = Phaser.Math.Between(1, 5);
   do {
    aux2 = Phaser.Math.Between(1, 5);
   } while (aux2 == aux1);
   if (aux2 < aux1) {
       var temp = aux2;
       aux2 = aux1;
       aux1 = temp;
   }
   sc_juegoLocal.recetas2.push("metal"+aux1+aux2+"espadatemplado");

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
   sc_juegoLocal.recetas1.push("metal"+aux1+aux2+"yunquetemplado");
   aux1 = Phaser.Math.Between(1, 5);
   do {
    aux2 = Phaser.Math.Between(1, 5);
   } while (aux2 == aux1);
   if (aux2 < aux1) {
       var temp = aux2;
       aux2 = aux1;
       aux1 = temp;
   }
   sc_juegoLocal.recetas2.push("metal"+aux1+aux2+"yunquetemplado");

    //Randomizar recetas
    Phaser.Utils.Array.Shuffle(sc_juegoLocal.recetas1);
    Phaser.Utils.Array.Shuffle(sc_juegoLocal.recetas2);

    //console.log(sc_juegoLocal.recetas1[0]+", "+sc_juegoLocal.recetas1[1]+", "+sc_juegoLocal.recetas1[2]+", "+sc_juegoLocal.recetas1[3]);
    //console.log(sc_juegoLocal.recetas2[0]+", "+sc_juegoLocal.recetas2[1]+", "+sc_juegoLocal.recetas2[2]+", "+sc_juegoLocal.recetas2[3]);

    sc_juegoLocal.recuadro1 = sc_juegoLocal.add.image(208, 537, 'recuadro');
    sc_juegoLocal.Rmetal21 = sc_juegoLocal.add.image(65, 522, 'Rmetal');
    sc_juegoLocal.Rmetal11 = sc_juegoLocal.add.image(65, 552, 'Rmetal');
    sc_juegoLocal.Rmetal1 = sc_juegoLocal.add.image(65, 537, 'Rmetal');
    sc_juegoLocal.Rhd1 = sc_juegoLocal.add.image(110, 537, 'Rhorno doble');
    sc_juegoLocal.Rym1 = sc_juegoLocal.add.image(155, 537, 'Ryunque');
    sc_juegoLocal.Rhorno1 = sc_juegoLocal.add.image(200, 537, 'Rhorno');
    sc_juegoLocal.Rbarril1 = sc_juegoLocal.add.image(245, 537, 'Rbarril');
    sc_juegoLocal.Rpieza1 = sc_juegoLocal.add.image(290, 537, 'Rcasco');
    sc_juegoLocal.Rmonstruo1 = sc_juegoLocal.add.image(335, 537, 'RMonstruo' + cont.p1.ch.slice(2,3));

    sc_juegoLocal.recuadro2 = sc_juegoLocal.add.image(592, 537, 'recuadro');
    sc_juegoLocal.Rmetal22 = sc_juegoLocal.add.image(455, 522, 'Rmetal');
    sc_juegoLocal.Rmetal12 = sc_juegoLocal.add.image(455, 552, 'Rmetal');
    sc_juegoLocal.Rmetal2 = sc_juegoLocal.add.image(455, 537, 'Rmetal');
    sc_juegoLocal.Rhd2 = sc_juegoLocal.add.image(500, 537, 'Rhorno doble');
    sc_juegoLocal.Rym2 = sc_juegoLocal.add.image(545, 537, 'Ryunque');

    sc_juegoLocal.Rhorno2 = sc_juegoLocal.add.image(590, 537, 'Rhorno');
    sc_juegoLocal.Rbarril2 = sc_juegoLocal.add.image(635, 537, 'Rbarril');
    sc_juegoLocal.Rpieza2 = sc_juegoLocal.add.image(680, 537, 'Rcasco');
    sc_juegoLocal.Rmonstruo2 = sc_juegoLocal.add.image(725, 537, 'RMonstruo' + cont.p2.ch.slice(2,3));

    //Inicialización de elementos relativos al pausado del juego
    //Por un lado tenemos el overlay, que oscurecerá toda la pantalla cuando el juego esté pausado
    //Por otro lado tenemos el botón de pausa, el cual se podrá pulsar para activar o desactivar el pausado del juego.
    sc_juegoLocal.pausedOverlay = sc_juegoLocal.add.image(400, 300, 'empty');
    sc_juegoLocal.botonPausa = this.physics.add.sprite(400,555, 'botonPausa');
    sc_juegoLocal.botonPausa.paused = false;
    sc_juegoLocal.botonPausa.setInteractive();
    sc_juegoLocal.botonPausa.on('pointerup', function() {
        if (!sc_juegoLocal.botonPausa.paused) {
            sc_juegoLocal.pausedOverlay.setTexture('pausedOverlay');
            sc_juegoLocal.botonPausa.paused = true;
        } else {
            sc_juegoLocal.pausedOverlay.setTexture('empty');
            sc_juegoLocal.botonPausa.paused = false;}
    });
}

//Función update: Aquí se maneja todo lo que ocurre durante la partida.
sc_juegoLocal.update = function() {



    //Si el juego está pausado, la función no se ejecuta.
    if (sc_juegoLocal.botonPausa.paused) {
        return;
    }

    dijkstra(getCell(sc_juegoLocal.player.x,sc_juegoLocal.player.y),getTargetCell(1),getCell(sc_juegoLocal.player2.x,sc_juegoLocal.player2.y),getTargetCell(2));

    comprobarInteraccion(sc_juegoLocal.player, sc_juegoLocal.player2);

    //Llamar a actualizarRecetas();
    actualizarRecetas();

    //Altar trampas
    if (sc_juegoLocal.altarTrampas.timer == 1000) {
        //activar trampa
        if (Phaser.Math.Between(1, 2) == 2) {
            sc_juegoLocal.altarTrampas.trampa = "trampaReloj";
            sc_juegoLocal.altarTrampas.trampaSprite.setTexture("trampaReloj");
            sc_juegoLocal.altarTrampas.setTexture("altar2");
        } else {
            sc_juegoLocal.altarTrampas.trampa = "trampaMuro";
            sc_juegoLocal.altarTrampas.trampaSprite.setTexture("trampaMuro");
            sc_juegoLocal.altarTrampas.setTexture("altar2");
        }
        sc_juegoLocal.altarTrampas.timer++;
    } else if (sc_juegoLocal.altarTrampas.timer >= 2000) {
        //defusear trampa
        sc_juegoLocal.altarTrampas.trampa = "none";
        sc_juegoLocal.altarTrampas.trampaSprite.setTexture("empty");
        sc_juegoLocal.altarTrampas.setTexture("altar1");
        sc_juegoLocal.altarTrampas.timer = 0;
    } else {
        sc_juegoLocal.altarTrampas.timer++;
    }

    sc_juegoLocal.muros.children.iterate(function(child){
        if (child != undefined) {
            if (child.timer > 0) child.timer--;
            if (child.timer == 0) {
                disconnectNeighbours(getCell(child.x, child.y).y,getCell(child.x, child.y).x, false, false, false, false);
                disconnectNeighbours(getCell(child.x, child.y).y,getCell(child.x, child.y).x+1, false, false, false, false);
                disconnectNeighbours(getCell(child.x, child.y).y,getCell(child.x, child.y).x-1, false, false, false, false);
                child.destroy();  
            }
        }
    });

    //Esta función afecta a todos los jugadores
    sc_juegoLocal.players.children.iterate(function(child){
        if (child.tiempoInmovil > 0) {
            child.spdX = 0;
            child.spdY = 0;
            child.tiempoInmovil--;
            //console.log(child.tiempoInmovil);
        }
        //Si el personaje no se está moviendo, sus animaciones paran
        if (child.spdX == 0 && child.spdY == 0) {
            child.heldObjectSprite.anims.stopOnRepeat();
            child.heldObjectSprite2.anims.stopOnRepeat();
        }

        //Llamada a getAnim para actualizar las animaciones del jugador
        getAnim(child, true);

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
    sc_juegoLocal.mesas.children.iterate(function(child){
        getAnim(child, false);
    });
    
    //Actualización de los hornos según su timer
    //Aumenta timer cuando sea necesario, y cambia el gráfico de status al apropiado según el estado del horno.
    sc_juegoLocal.hornos.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=0.25;
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=0.25;
            child.status.setTexture("tic");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=0.25;
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
    sc_juegoLocal.yunques.children.iterate(function(child){
        if (child.cooldown > 0) {
            child.cooldown--;
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
    sc_juegoLocal.barriles.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=0.5;
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100) {
            child.status.setTexture("tic");
        } else {
            child.status.setTexture("empty");
        }
    });

    //Actualización de los moldes
    //Similar a la de los hornos
    sc_juegoLocal.moldes.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.setTexture("moldeU");
            child.timer+=0.25;
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
    sc_juegoLocal.hornosd.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=0.125;
            child.status.setTexture("reloj" + Phaser.Math.CeilTo(child.timer/100*8));
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=0.125;
            child.status.setTexture("tic");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=0.125;
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
    sc_juegoLocal.yunquesd.children.iterate(function(child){
        if (child.cooldown > 0) {
            child.cooldown--;
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

//Función initAnimations: Aquí se inicializan todas las animaciones de los personajes.
function initAnimations(that) {
    //Animaciones de los objetos
    //Animaciones del horno
    that.anims.create({
        key: 'hornoA',
        frames: that.anims.generateFrameNumbers('horno', { start: 0, end: 4 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'horno dobleA',
        frames: that.anims.generateFrameNumbers('horno doble', { start: 0, end: 4 }),
        frameRate: 7,
        repeat: -1
    });


    //Animaciones de la elfa
    //Sin objetos
    that.anims.create({
        key: 'pEDown',
        frames: that.anims.generateFrameNumbers('SSElfa1', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUp',
        frames: that.anims.generateFrameNumbers('SSElfa1', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeft',
        frames: that.anims.generateFrameNumbers('SSElfa1', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERight',
        frames: that.anims.generateFrameNumbers('SSElfa1', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal
    that.anims.create({
        key: 'pEDownM',
        frames: that.anims.generateFrameNumbers('SSElfaMetal', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUpM',
        frames: that.anims.generateFrameNumbers('SSElfaMetal', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeftM',
        frames: that.anims.generateFrameNumbers('SSElfaMetal', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERightM',
        frames: that.anims.generateFrameNumbers('SSElfaMetal', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal caliente
    that.anims.create({
        key: 'pEDownMC',
        frames: that.anims.generateFrameNumbers('SSElfaMetalCaliente', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUpMC',
        frames: that.anims.generateFrameNumbers('SSElfaMetalCaliente', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeftMC',
        frames: that.anims.generateFrameNumbers('SSElfaMetalCaliente', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERightMC',
        frames: that.anims.generateFrameNumbers('SSElfaMetalCaliente', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //casco
    that.anims.create({
        key: 'pEDownC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUpC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeftC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERightC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //pechera
    that.anims.create({
        key: 'pEDownP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUpP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeftP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERightP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //piernas
    that.anims.create({
        key: 'pEDownI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUpI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeftI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERightI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //espada
    that.anims.create({
        key: 'pEDownE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pEUpE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pELeftE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pERightE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });

//OBJETOS de la elfa
    //Sin objetos
    that.anims.create({
        key: 'iEDown',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUp',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeft',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERight',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal
    that.anims.create({
        key: 'iEDownM',
        frames: that.anims.generateFrameNumbers('SSElfaMetalOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpM',
        frames: that.anims.generateFrameNumbers('SSElfaMetalOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftM',
        frames: that.anims.generateFrameNumbers('SSElfaMetalOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightM',
        frames: that.anims.generateFrameNumbers('SSElfaMetalOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal caliente
    that.anims.create({
        key: 'iEDownMC',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpMC',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftMC',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightMC',
        frames: that.anims.generateFrameNumbers('SSElfaEmpty', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //casco
    that.anims.create({
        key: 'iEDownC',
        frames: that.anims.generateFrameNumbers('SSElfaCascoOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpC',
        frames: that.anims.generateFrameNumbers('SSElfaCascoOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftC',
        frames: that.anims.generateFrameNumbers('SSElfaCascoOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightC',
        frames: that.anims.generateFrameNumbers('SSElfaCascoOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //pechera
    that.anims.create({
        key: 'iEDownP',
        frames: that.anims.generateFrameNumbers('SSElfaPecheraOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpP',
        frames: that.anims.generateFrameNumbers('SSElfaPecheraOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftP',
        frames: that.anims.generateFrameNumbers('SSElfaPecheraOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightP',
        frames: that.anims.generateFrameNumbers('SSElfaPecheraOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //piernas
    that.anims.create({
        key: 'iEDownI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernasOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernasOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernasOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernasOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //espada
    that.anims.create({
        key: 'iEDownE',
        frames: that.anims.generateFrameNumbers('SSElfaEspadaOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpE',
        frames: that.anims.generateFrameNumbers('SSElfaEspadaOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftE',
        frames: that.anims.generateFrameNumbers('SSElfaEspadaOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightE',
        frames: that.anims.generateFrameNumbers('SSElfaEspadaOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });

    //Animaciones del de hielo
    //Sin objetos
    that.anims.create({
        key: 'pHDown',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUp',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeft',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRight',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal
    that.anims.create({
        key: 'pHDownM',
        frames: that.anims.generateFrameNumbers('SSHieloMetal', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpM',
        frames: that.anims.generateFrameNumbers('SSHieloMetal', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftM',
        frames: that.anims.generateFrameNumbers('SSHieloMetal', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightM',
        frames: that.anims.generateFrameNumbers('SSHieloMetal', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal caliente
    that.anims.create({
        key: 'pHDownMC',
        frames: that.anims.generateFrameNumbers('SSHieloMetalCaliente', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpMC',
        frames: that.anims.generateFrameNumbers('SSHieloMetalCaliente', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftMC',
        frames: that.anims.generateFrameNumbers('SSHieloMetalCaliente', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightMC',
        frames: that.anims.generateFrameNumbers('SSHieloMetalCaliente', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //casco
    that.anims.create({
        key: 'pHDownC',
        frames: that.anims.generateFrameNumbers('SSHieloCasco', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpC',
        frames: that.anims.generateFrameNumbers('SSHieloCasco', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftC',
        frames: that.anims.generateFrameNumbers('SSHieloCasco', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightC',
        frames: that.anims.generateFrameNumbers('SSHieloCasco', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //pechera
    that.anims.create({
        key: 'pHDownP',
        frames: that.anims.generateFrameNumbers('SSHieloPechera', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpP',
        frames: that.anims.generateFrameNumbers('SSHieloPechera', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftP',
        frames: that.anims.generateFrameNumbers('SSHieloPechera', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightP',
        frames: that.anims.generateFrameNumbers('SSHieloPechera', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //piernas
    that.anims.create({
        key: 'pHDownI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernas', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernas', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernas', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernas', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //espada
    that.anims.create({
        key: 'pHDownE',
        frames: that.anims.generateFrameNumbers('SSHieloEspada', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpE',
        frames: that.anims.generateFrameNumbers('SSHieloEspada', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftE',
        frames: that.anims.generateFrameNumbers('SSHieloEspada', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightE',
        frames: that.anims.generateFrameNumbers('SSHieloEspada', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });

//OBJETOS del de hielo
    //Sin objetos
    that.anims.create({
        key: 'iHDown',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUp',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeft',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRight',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal
    that.anims.create({
        key: 'iHDownM',
        frames: that.anims.generateFrameNumbers('SSHieloMetalOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUpM',
        frames: that.anims.generateFrameNumbers('SSHieloMetalOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeftM',
        frames: that.anims.generateFrameNumbers('SSHieloMetalOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRightM',
        frames: that.anims.generateFrameNumbers('SSHieloMetalOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //Metal caliente
    that.anims.create({
        key: 'iHDownMC',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUpMC',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeftMC',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRightMC',
        frames: that.anims.generateFrameNumbers('SSHieloEmpty', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //casco
    that.anims.create({
        key: 'iHDownC',
        frames: that.anims.generateFrameNumbers('SSHieloCascoOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUpC',
        frames: that.anims.generateFrameNumbers('SSHieloCascoOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeftC',
        frames: that.anims.generateFrameNumbers('SSHieloCascoOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRightC',
        frames: that.anims.generateFrameNumbers('SSHieloCascoOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //pechera
    that.anims.create({
        key: 'iHDownP',
        frames: that.anims.generateFrameNumbers('SSHieloPecheraOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUpP',
        frames: that.anims.generateFrameNumbers('SSHieloPecheraOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeftP',
        frames: that.anims.generateFrameNumbers('SSHieloPecheraOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRightP',
        frames: that.anims.generateFrameNumbers('SSHieloPecheraOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //piernas
    that.anims.create({
        key: 'iHDownI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernasOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUpI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernasOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeftI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernasOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRightI',
        frames: that.anims.generateFrameNumbers('SSHieloProtecPiernasOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //espada
    that.anims.create({
        key: 'iHDownE',
        frames: that.anims.generateFrameNumbers('SSHieloEspadaOverlay', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHUpE',
        frames: that.anims.generateFrameNumbers('SSHieloEspadaOverlay', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHLeftE',
        frames: that.anims.generateFrameNumbers('SSHieloEspadaOverlay', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iHRightE',
        frames: that.anims.generateFrameNumbers('SSHieloEspadaOverlay', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
}

//Función interactuar: comprueba la interacción del jugador con las estaciones de trabajo
//Cada función devuelve true si la interacción tuvo éxito, y false si no
//La función no es visualmente agradable, pero va comprobando en cadena cada interacción, y si no tuvo éxito, pasa a la siguiente.
function interactuar(p) {
    if (!interactuarCajones(p)) {
        if (!interactuarMesas(p)) {
            if (!interactuarHornos(p)) {
                if (!interactuarYunques(p)) {
                    if (!interactuarBarriles(p)) {
                        if (!interactuarMoldes(p)) {
                            if (!interactuarHornosd(p)) {
                                if (!interactuarYunquesd(p)) {
                                    if (!interactuarBasuras(p)) {
                                        interactuarMonstruos(p);
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

//Esta es la base de la unificación de todas las funciones de interacción. Se mejorará en un futuro.
function superInteract(p, group, metal, swap, destroy, tablaIO, checkInteracted, horno, yunque, checkCooldown, barril, molde, hornod, yunqued, tablaInputsValidos) {
    var result = false;
    var proceed = true;
    if (checkInteracted) {
        proceed = !p.interacted;
    }

    if (proceed) {
        group.children.iterate(function (child) {
            if (checkCooldown) { if (child.cooldown != 0) {proceed = false;} }
            if (proceed) {
                if (isAdyacent(p.x,p.y,child.x,child.y)) {
                    if (metal) {
                        if (p.heldObject == "none") {
                            p.heldObject = child.heldObject;
                        }
                        else if (p.heldObject == child.heldObject) {
                            p.heldObject = "none";
                        }
                        result = true;
                    } else if (swap) {
                        var temp = child.heldObject;
                        child.heldObject = p.heldObject;
                        p.heldObject = temp;
                        result = true;
                    } else if (destroy) {
                        p.heldObject = "none";
                        result = true;
                    } else if (horno) {
                        if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
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
                    } else if (yunque) {
                        if (child.timer == -1 && child.heldObject == "none" && (tablaIO[p.heldObject] != undefined)) {
                            child.heldObject = p.heldObject;
                            p.heldObject = "none";
                            child.timer = 0;
                            child.cooldown = 5;
                        } else if (child.timer >= 0 && child.timer < 100) {
                            child.timer += 5;
                            child.cooldown = 15;
                            snd_yunque.pause();
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
                    } else if (barril || molde) { 
                        if ((child.timer == -1 || (child.timer >= 100))) {
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
                    } else if (hornod) {
                        if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
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
                    } else if (yunqued) {
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
                            snd_yunque.pause();
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
            }
        });
    }

    return result;
}

//Función interactuarCajones: Si el jugador está suficientemente cerca y no lleva objetos, pasa a tener el metal correspondiente al cajón
function interactuarCajones(p) {
    var result = false;
    sc_juegoLocal.cajonesMetal.children.iterate(function (child) {
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

//Función interactuarMesas: Si el jugador está suficientemente cerca, intercambia sus objetos con los de la mesa
function interactuarMesas(p) {
    var result = false;
    sc_juegoLocal.mesas.children.iterate(function (child) {
        if (isAdyacent(p.x,p.y,child.x,child.y)) {
            var temp = child.heldObject;
            child.heldObject = p.heldObject;
            p.heldObject = temp;
            result = true;
        }
    });
    return result;
}

//Función interactuarBasuras: Si el jugador está suficientemente cerca, se elimina el objeto que lleve
function interactuarBasuras(p) {
    var result = false;
    sc_juegoLocal.basuras.children.iterate(function (child) {
        if (isAdyacent(p.x,p.y,child.x,child.y)) {
            p.heldObject = "none";
            result = true;
        }
    });
    return result;
}
//Función interactuarHornos: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el horno acepta el objeto y timer pasa a valer 0.
//Si timer está entre 100 y 150, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function interactuarHornos(p) {
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

    //interactuarEstacion(p, sc_juegoLocal.hornos, tablaIO);

    if (p.interacted != true) {
        sc_juegoLocal.hornos.children.iterate(function (child) {
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

//Función interactuarYunques: Si el jugador está suficientemente cerca, y cooldown vale 0, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el yunque acepta el objeto y timer pasa a valer 0.
//Si timer está entre 0 y 100, timer aumenta en 5 y cooldown pasa a valer 15.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function interactuarYunques(p) {
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

    sc_juegoLocal.yunques.children.iterate(function (child) {
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
                    snd_yunque.pause();
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

//Función interactuarBarriles: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el barril acepta el objeto y timer pasa a valer 0.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function interactuarBarriles(p) {
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
        sc_juegoLocal.barriles.children.iterate(function (child) {
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

//Función interactuarMoldes: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, y el objeto que lleva el jugador se encuentra en la tablaIO, el molde acepta el objeto y timer pasa a valer 0.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function interactuarMoldes(p) {
    var result = false;
    
    var tablaIO = [];
    tablaIO["metal1rojo"] = "metal1molde";
    tablaIO["metal2rojo"] = "metal2molde";
    tablaIO["metal3rojo"] = "metal3molde";
    tablaIO["metal4rojo"] = "metal4molde";
    tablaIO["metal5rojo"] = "metal5molde";

    if (p.interacted != true) {
        sc_juegoLocal.moldes.children.iterate(function (child) {
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

//Función interactuarHornosd: Si el jugador está suficientemente cerca, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, el horno no tiene objetos, y el objeto que lleva el jugador se encuentra en la tablaIO, el horno acepta el objeto.
//Si timer vale -1 y el horno ya tiene un objeto, y el objeto que lleva el jugador se encuentra en la tablaIO, el horno acepta el objeto y timer pasa a valer 0.
//Si timer está entre 100 y 150, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function interactuarHornosd(p) {
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
        sc_juegoLocal.hornosd.children.iterate(function (child) {
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

//Función interactuarYunquesd: Si el jugador está suficientemente cerca, y cooldown vale 0, ocurrirá una cosa diferente según el valor de timer:
//Si timer vale -1, el yunque no tiene objetos, y el objeto que lleva el jugador se encuentra en la tablaIO, el yunque acepta el objeto.
//Si timer vale -1 y el yunque ya tiene un objeto, y el objeto que lleva el jugador se encuentra en la tablaIO, el yunque acepta el objeto y timer pasa a valer 0.
//Si timer está entre 0 y 100, timer aumenta en 5 y cooldown pasa a valer 15.
//Si timer vale más de 100, y el jugador no lleva ningún objeto, el jugador obtiene el objeto correspondiente según tablaIO.
function interactuarYunquesd(p) {
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
    sc_juegoLocal.yunquesd.children.iterate(function (child) {
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
                    snd_yunque.pause();
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

//Función getAnim: Asigna las animaciones correctas al jugador proporcionado si isPlayer vale true, o a la mesa proporcionada si isPlayer vale false
function getAnim(p, isPlayer) {
    //Las siguientes variables guardarán partes del nombre de la animación que se ejecutará
    //Index guarda el caracter que define el objeto que lleva el personaje
    var index = "";

    //animKey guarda el caracter que define el personaje en cuestión, sólo si se trata de un personaje
    var animKey = "";
    if (isPlayer) {
        animKey = p.defaultTexture.key.slice(2,3);
    }

    //anim guarda los caracteres que definen la dirección del jugador
    var anim = p.dir;

    //tint1 y tint2 definen el tinte que se aplicará al objeto que lleve el personaje
    var tint1 = 0xFFFFFF;
    var tint2 = 0xFFFFFF;

    //red indica si se trata de un objeto terminado pero todavía caliente, por lo que se le aplicará otro tinte
    var red = -1;

    //Si el jugador no lleva ningún objeto, no hace falta cambiar las variables anteriormente definidas
    if (p.heldObject != "none") {
        //Según el quinto caracter del objeto se tratará de un metal u otro, por lo que se asignará un color de tinte diferente
        var ho = p.heldObject;
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
            //Si el sexto caracter no es un número, no hay mezcla de metales
            //Al no haber mezcla de metales, el segundo color de tinte es igual al primero
            tint2 = tint1;

            //Según la terminación de la cadena, se asignará un valor apropiado a index
            switch (ho.slice(6)) {
                case "":
                    index = "M";
                    break;
                case "rojo":
                    index = "MC";
                    break;
                case "yunque":
                    index = "I";
                    red = 0;
                    break;
                case "yunquetemplado":
                    index = "I";
                    break;
                case "yunquepretemplado":
                    index = "I";
                    red = 1;
                    break;
                case "molde":
                    index = "C";
                    red = 0;
                    break;
                case "moldetemplado":
                    index = "C";
                    break;
                case "moldepretemplado":
                    index = "C";
                    red = 1;
                    break;
            }
        } else {
            //Si el sexto caracter es un número, hay mezcla de metales
            //El segundo color de tinte será el apropiado para cada metal
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

            //Según la terminación de la cadena, se asignará un valor apropiado a index
            switch (ho.slice(7)) {
                case "":
                    index = "M";
                    break;
                case "rojo":
                    index = "MC";
                    break;
                case "yunque":
                    index = "P";
                    red = 0;
                    break;
                case "yunquetemplado":
                    index = "P";
                    break;
                case "yunquepretemplado":
                    index = "P";
                    red = 1;
                    break;
                case "espada":
                    index = "E";
                    red = 0;
                    break;
                case "espadatemplado":
                    index = "E";
                    break;
                case "espadapretemplado":
                    index = "E";
                    red = 1;
                    break;
            }
        }
    }
    if (!isPlayer) {
        //Si no se trata de un jugador, se trata de una mesa. En vez de aplicar animaciones, aplicamos cambio de texturas.
        switch (index) {
            case "":
                p.heldObjectSprite.setTexture('empty');
                break;
            case "M":
                p.heldObjectSprite.setTexture('metal material');
                break;
            case "MC":
                p.heldObjectSprite.setTexture('metal caliente');
                break;
            case "I":
                p.heldObjectSprite.setTexture('protecciones piernas');
                break;
            case "C":
                p.heldObjectSprite.setTexture('casco');
                break;
            case "P":
                p.heldObjectSprite.setTexture('pechera');
                break;
            case "E":
                p.heldObjectSprite.setTexture('espada');
                break;

        }
        if (index == "MC") {
            //Si el objeto es metal caliente, no se aplica tinte
            p.heldObjectSprite.setTint(0xFFFFFF);
        } else if (red == 0) {
            //Si el objeto es terminado pero caliente, se aplica un tinte diferente
            p.heldObjectSprite.setTint(0xFF6600, 0xFF6600, 0xFF6600, 0xFF6600);
        } else if (red == 1) {
            //Si el objeto es terminado pero caliente, se aplica un tinte diferente
            p.heldObjectSprite.setTint(0xFF2200, 0xFF2200, 0xFF2200, 0xFF2200);
        } else {
            //En otro caso, se aplica el tinte normalmente
            p.heldObjectSprite.setTint(tint1, tint1, tint2, tint2);
        }

        //La función acaba, ya que el resto del código es válido únicamente para jugadores
        return;
    }

    //Según la velocidad del jugador, se aplicará la animación en una dirección o en otra.
    if (p.spdY == 0 && p.spdX != 0) {
        if (p.spdX < 0) {
            anim = "Left";
        } else {
            anim = "Right";
        }
    } else if (p.spdY > 0) {
        anim = "Down";
    } else if (p.spdY < 0) {
        anim = "Up";
    }

    //Se actualiza dir para que el jugador se quede mirando en la dirección correcta-.
    p.dir = anim;

    //Se unen todas las cadenas para aplicar la animación correspondiente.
    //El primer caracter indica si se trata del jugador (p) o del objeto que lleva (i)
    p.heldObjectSprite.anims.play("p"+animKey+anim+index, true);
    p.heldObjectSprite2.anims.play("i"+animKey+anim+index, true);
    
    //Si el jugador no se está moviendo, la animación para.
    if (p.spdX == 0 && p.spdY == 0) {
        p.heldObjectSprite.anims.stop();
        p.heldObjectSprite2.anims.stop();
    }

    //Finalmente se aplica el tinte.
    if (index == "MC") {
        //Si el objeto es metal caliente, no se aplica tinte
        p.heldObjectSprite2.setTint(0xFFFFFF);
    } else {
        if (red == 0) {
            //Si el objeto es terminado pero caliente, se aplica un tinte diferente
            p.heldObjectSprite2.setTint(0xFF6600, 0xFF6600, 0xFF6600, 0xFF6600);
        } else if (red == 1) {
            //Si el objeto es terminado pero caliente, se aplica un tinte diferente
            p.heldObjectSprite2.setTint(0xFF2200, 0xFF2200, 0xFF2200, 0xFF2200);
        } else {
            //En otro caso, se aplica el tinte normalmente
            p.heldObjectSprite2.setTint(tint1, tint1, tint2, tint2);
        }
    }
}

function actualizarRecetas() {
    var ho = sc_juegoLocal.recetas1[0];
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
        sc_juegoLocal.Rmetal21.setTexture('empty');
        sc_juegoLocal.Rmetal11.setTexture('empty');
        sc_juegoLocal.Rmetal1.setTexture('Rmetal');
        sc_juegoLocal.Rmetal1.setTint(tint1);
        sc_juegoLocal.Rhd1.setTexture('Rhorno');
        switch (ho.slice(6)) {
            case "yunquetemplado":
                sc_juegoLocal.Rym1.setTexture('Ryunque');
                sc_juegoLocal.Rpieza1.setTexture('Rpiernas');
                sc_juegoLocal.Rpieza1.setTint(tint1);
                break;
            case "moldetemplado":
                sc_juegoLocal.Rym1.setTexture('Rmolde');
                sc_juegoLocal.Rpieza1.setTexture('Rcasco');
                sc_juegoLocal.Rpieza1.setTint(tint1);
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
        sc_juegoLocal.Rmetal21.setTexture('Rmetal');
        sc_juegoLocal.Rmetal21.setTint(tint2);
        sc_juegoLocal.Rmetal11.setTexture('Rmetal');
        sc_juegoLocal.Rmetal11.setTint(tint1);
        sc_juegoLocal.Rmetal1.setTexture('empty');
        switch(ho.slice(7)) {
            case "yunquetemplado":
                sc_juegoLocal.Rhd1.setTexture('Rhorno doble');
                sc_juegoLocal.Rym1.setTexture('Ryunque');
                sc_juegoLocal.Rpieza1.setTexture('Rpechera');
                sc_juegoLocal.Rpieza1.setTint(tint1, tint1, tint2, tint2);
                break;
            case "espadatemplado":
                sc_juegoLocal.Rhd1.setTexture('Rhorno');
                sc_juegoLocal.Rym1.setTexture('Ryunque doble');
                sc_juegoLocal.Rpieza1.setTexture('Respada');
                sc_juegoLocal.Rpieza1.setTint(tint1, tint1, tint2, tint2);
                break;
        }
    }

    ho = sc_juegoLocal.recetas2[0];

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
        sc_juegoLocal.Rmetal22.setTexture('empty');
        sc_juegoLocal.Rmetal12.setTexture('empty');
        sc_juegoLocal.Rmetal2.setTexture('Rmetal');
        sc_juegoLocal.Rmetal2.setTint(tint1);
        sc_juegoLocal.Rhd2.setTexture('Rhorno');
        switch (ho.slice(6)) {
            case "yunquetemplado":
                sc_juegoLocal.Rym2.setTexture('Ryunque');
                sc_juegoLocal.Rpieza2.setTexture('Rpiernas');
                sc_juegoLocal.Rpieza2.setTint(tint1);
                break;
            case "moldetemplado":
                sc_juegoLocal.Rym2.setTexture('Rmolde');
                sc_juegoLocal.Rpieza2.setTexture('Rcasco');
                sc_juegoLocal.Rpieza2.setTint(tint1);
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
        sc_juegoLocal.Rmetal22.setTexture('Rmetal');
        sc_juegoLocal.Rmetal22.setTint(tint2);
        sc_juegoLocal.Rmetal12.setTexture('Rmetal');
        sc_juegoLocal.Rmetal12.setTint(tint1);
        sc_juegoLocal.Rmetal2.setTexture('empty');
        switch(ho.slice(7)) {
            case "yunquetemplado":
                sc_juegoLocal.Rhd2.setTexture('Rhorno doble');
                sc_juegoLocal.Rym2.setTexture('Ryunque');
                sc_juegoLocal.Rpieza2.setTexture('Rpechera');
                sc_juegoLocal.Rpieza2.setTint(tint1, tint1, tint2, tint2);
                break;
            case "espadatemplado":
                sc_juegoLocal.Rhd2.setTexture('Rhorno');
                sc_juegoLocal.Rym2.setTexture('Ryunque doble');
                sc_juegoLocal.Rpieza2.setTexture('Respada');
                sc_juegoLocal.Rpieza2.setTint(tint1, tint1, tint2, tint2);
                break;
        }
    }
}

function interactuarMonstruos(p) {
    var result = false;

    //console.log(sc_juegoLocal.recetas1[0] + ", " + p.heldObject);
    if (sc_juegoLocal.recetas1[0] == p.heldObject) {
        if (Phaser.Math.Distance.Between(p.x, p.y, sc_juegoLocal.monstruo1.x, sc_juegoLocal.monstruo1.y) < 0.75*Math.max(sc_juegoLocal.monstruo1.body.width, sc_juegoLocal.monstruo1.body.height)+0.75*Math.max(p.body.width, p.body.height)) {
            armarMonstruo(sc_juegoLocal.monstruo1, p.heldObject)
            p.heldObject = "none";
            getAnim(p, true);
            result = true;
            sc_juegoLocal.recetas1.splice(0,1);
            if (sc_juegoLocal.recetas1[0] == undefined) {
                sc_juegoLocal.botonPausa.paused = true;
                sc_juegoLocal.pausedOverlay.setTexture('pausedOverlay');
                sc_juegoLocal.botonPausa.removeInteractive();
                sc_juegoLocal.pausedOverlay.setInteractive();
                sc_juegoLocal.that = this;
                sc_juegoLocal.pausedOverlay.on('pointerup', function() {
                    sc_juegoLocal.scene.start("MenuPrincipal");
                });
                sc_juegoLocal.victory = sc_juegoLocal.add.image(400, 200, 'victoria');
                if (cont.p1.ch == "SSHielo1") {
                    sc_juegoLocal.winner = sc_juegoLocal.add.image(400, 400, 'hielo');
                } else {
                sc_juegoLocal.winner = sc_juegoLocal.add.image(400, 400, 'elfa');
                }
            }
        }
    }
    if (sc_juegoLocal.recetas2[0] == p.heldObject) {
        if (Phaser.Math.Distance.Between(p.x, p.y, sc_juegoLocal.monstruo2.x, sc_juegoLocal.monstruo2.y) < 0.75*Math.max(sc_juegoLocal.monstruo2.body.width, sc_juegoLocal.monstruo2.body.height)+0.75*Math.max(p.body.width, p.body.height)) {
            armarMonstruo(sc_juegoLocal.monstruo2, p.heldObject)
            p.heldObject = "none";
            getAnim(p, true);
            result = true;
            sc_juegoLocal.recetas2.splice(0,1);
            if (sc_juegoLocal.recetas2[0] == undefined) {
                sc_juegoLocal.botonPausa.paused = true;
                sc_juegoLocal.pausedOverlay.setTexture('pausedOverlay');
                sc_juegoLocal.botonPausa.removeInteractive();
                sc_juegoLocal.pausedOverlay.setInteractive();
                sc_juegoLocal.that = this;
                sc_juegoLocal.pausedOverlay.on('pointerup', function() {
                    sc_juegoLocal.scene.start("MenuPrincipal");
                });
                sc_juegoLocal.victory = sc_juegoLocal.add.image(400, 200, 'victoria');
                if (cont.p2.ch == "SSHielo1") {
                    sc_juegoLocal.winner = sc_juegoLocal.add.image(400, 400, 'hielo');
                } else {
                sc_juegoLocal.winner = sc_juegoLocal.add.image(400, 400, 'elfa');
                }
            }
        }
    }

    return result;
}


function armarMonstruo(m, ho) {
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
        sc_juegoLocal.Rmetal1.setTint(tint1);
        switch (ho.slice(6)) {
            case "yunquetemplado":
                m.heldPiernas = ho;
                m.heldPiernasSprite.setTexture("ProtPiernas"+m.faction+"D")
                m.heldPiernasSprite.setTint(tint1);
                break;
            case "moldetemplado":
                m.heldCascoSprite.setTexture("Casco"+m.faction+"D")
                m.heldCascoSprite.setTint(tint1);
                sc_juegoLocal.Rpieza1.setTint(tint1);
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
        sc_juegoLocal.Rmetal21.setTint(tint2);
        sc_juegoLocal.Rmetal11.setTint(tint1);
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

function cogerTrampa(p, t) {
    if (sc_juegoLocal.altarTrampas.trampa == "none") return;
    p.trampa = sc_juegoLocal.altarTrampas.trampa;
    sc_juegoLocal.altarTrampas.trampa = "none";
    sc_juegoLocal.altarTrampas.timer = 0;
    sc_juegoLocal.altarTrampas.trampaSprite.setTexture("empty");
    sc_juegoLocal.altarTrampas.setTexture("altar1");
}

function operatorXor(a, b) {
    return ((a || b) && !(a && b));
}

function getCell(x,y) {
    var cellX, cellY;
    cellX = Math.floor(x/40);
    cellY = Math.floor(y/40);
    return ({x: cellX, y: cellY});
}

function getTargetCell(player) {
    var cellX, cellY, x, y;
    var found = false, finished = false, split = false, nextSplit = false, double = "", target = "monstruo";
    var recetas, p;
    if (player == 1) {
        recetas = sc_juegoLocal.recetas1;
        p = sc_juegoLocal.player;
    } else {
        recetas = sc_juegoLocal.recetas2;
        p = sc_juegoLocal.player2;
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
            var foundConstruct = lookFor(curItem, player, p, split, double, target);
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

function lookFor(item, player, p, split, dStation, target) {
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
            sc_juegoLocal.hornosd.children.iterate(function (child) {
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
            });
        } else if (dStation == "espada") {
            sc_juegoLocal.yunquesd.children.iterate(function (child) {
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
            });

            sc_juegoLocal.hornos.children.iterate(function (child) {

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
                iterator = sc_juegoLocal.hornos;
            break;
            case "yunque":
                iterator = sc_juegoLocal.yunques;
            break;
            case "molde":
                iterator = sc_juegoLocal.moldes;
            break;
            case "hornod":
                iterator = sc_juegoLocal.hornosd;
            break;
            case "yunqued":
                iterator = sc_juegoLocal.yunquesd;
            break;
            case "barril":
                iterator = sc_juegoLocal.barriles;
            break;
            case "monstruo":
                if (player == 1) {
                    iterator = sc_juegoLocal.monstruo1;
                } else {
                    iterator = sc_juegoLocal.monstruo2;
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
        sc_juegoLocal.hornos.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });

        sc_juegoLocal.yunques.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });

        sc_juegoLocal.barriles.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });

        sc_juegoLocal.moldes.children.iterate(function (child) {
            if (child.player == player && child.heldObject == item && !found) {
                found = true;
                x = child.x;
                y = child.y;
            }
        });
    }

    sc_juegoLocal.mesas.children.iterate(function (child) {
        if (child.player == player && child.heldObject == item && !found) {
            found = true;
            x = child.x;
            y = child.y;
        }
    });

    sc_juegoLocal.cajonesMetal.children.iterate(function (child) {
        if (child.player == player && child.heldObject == item && !found) {
            found = true;
            x = child.x;
            y = child.y;
        }
    });
    //

    return {found: found, x: x, y: y};
}

function isAdyacent(px,py,cx,cy) {
    var pCell = getCell(px,py);
    var cCell = getCell(cx,cy);
    if ( operatorXor( ((Math.abs(pCell.x - cCell.x) == 1) && (Math.abs(pCell.y - cCell.y) == 0 )) , ((Math.abs(pCell.x - cCell.x) == 0) && (Math.abs(pCell.y - cCell.y) == 1 )) ) ) {
        return true;
    } else {
        return false;
    }
}

function comprobarInteraccion(p1,p2) {

    sc_juegoLocal.cajonesMetal.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.mesas.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.hornos.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.yunques.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.barriles.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.moldes.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.hornosd.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.yunquesd.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });

    sc_juegoLocal.basuras.children.iterate(function (child) {
        if (isAdyacent(p1.x,p1.y,child.x,child.y) || isAdyacent(p2.x,p2.y,child.x,child.y)) {
            child.setTint(0xFFFF00);
        } else {
            child.setTint(0xFFFFFF);
        }
    });
}


// Algoritmo de Dijkstra
function dijkstra(start1, end1, start2, end2)
{
    /* JUGADOR 1 */

    initDistances();
    sc_juegoLocal.graphics.clear();
    sc_juegoLocal.graphics.fillStyle(0x00ff07, 0.3);
    var compare = function(a, b) {return a.distance < b.distance};
    sc_juegoLocal.distances[start1.y][start1.x] = 0;
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
        if (sc_juegoLocal.distances[node.startF][node.startC] >= node.distance)
        {
            for (var k = 0; k < config.height / 40; k++)
            {
                for (var l = 0; l < config.width / 40; l++)
                {
                    var peso = node.distance + sc_juegoLocal.adjacencyMatrix[node.startF][node.startC][k][l];
                    if (peso < sc_juegoLocal.distances[k][l])
                    {
                        prio_queue.queue({startF: k, startC: l, distance: peso});
                        sc_juegoLocal.distances[k][l] = peso;
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
    sc_juegoLocal.graphics.lineStyle(4,0x000000,1);
    if (curva.length == 2) {
        curva.push(20+(start1.x*40));
        curva.push(20+(start1.y*40));
    }
    var curve = new Phaser.Curves.Spline(curva);
    if (curva.length >= 4)
        curve.draw(sc_juegoLocal.graphics, 64);
    
    /* JUGADOR 2 */

    initDistances();
    sc_juegoLocal.distances[start2.y][start2.x] = 0;
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
        if (sc_juegoLocal.distances[node.startF][node.startC] >= node.distance)
        {
            for (var k = 0; k < config.height / 40; k++)
            {
                for (var l = 0; l < config.width / 40; l++)
                {
                    var peso = node.distance + sc_juegoLocal.adjacencyMatrix[node.startF][node.startC][k][l];
                    if (peso < sc_juegoLocal.distances[k][l])
                    {
                        prio_queue.queue({startF: k, startC: l, distance: peso});
                        sc_juegoLocal.distances[k][l] = peso;
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
    sc_juegoLocal.graphics.lineStyle(4,0x000000,1);
    if (curva.length == 2) {
        curva.push(20+(start2.x*40));
        curva.push(20+(start2.y*40));
    }
    curve = new Phaser.Curves.Spline(curva);
    if (curva.length >= 4)
        curve.draw(sc_juegoLocal.graphics, 64);

}   

function initDistances()
{
    sc_juegoLocal.distances = new Array();
    for (var i = 0; i < config.height / 40; i++)
    {
        sc_juegoLocal.distances.push(new Array());
        for (var j = 0; j < config.width / 40; j++)
        {
            sc_juegoLocal.distances[i].push(new Array());
            sc_juegoLocal.distances[i][j] = INF;
        }
    }
}

// Función para crear nuestro grafo predeterminado
function initGrafo()
{
    /* ARRAY 4-DIMENSIONAL de i = 15, j = 20, k = 15, l = 20 */
    sc_juegoLocal.adjacencyMatrix = new Array();

    for (var i = 0; i < config.height / 40; i++)
    {
        sc_juegoLocal.adjacencyMatrix.push(new Array());
        for (var j = 0; j < config.width / 40; j++)
        {
            sc_juegoLocal.adjacencyMatrix[i].push(new Array());
            for (var k = 0; k < config.height / 40; k++)
            {
                sc_juegoLocal.adjacencyMatrix[i][j].push(new Array());
                for (var l = 0; l < config.width / 40; l++)
                {
                    sc_juegoLocal.adjacencyMatrix[i][j][k].push(new Array());
                    sc_juegoLocal.adjacencyMatrix[i][j][k][l] = INF;
                    // Unión izda-derecha derecha-izda
                    if ((i == k && l == j + 1) || (i == k && l == j - 1))
                    {
                        sc_juegoLocal.adjacencyMatrix[i][j][k][l] = 1;
                    }                        
                    // Unión arriba-abajo abajo-arriba
                    if ((j == l && k == i + 1) || (j == l && k == i - 1))
                    {
                        sc_juegoLocal.adjacencyMatrix[i][j][k][l] = 1;
                    }
                }
            }
        }
    }
}

// Desconectar los vecionos de un nodo del grafo
function disconnectNeighbours(fila, columna, up, down, left, right)
{
    var maxF = config.height / 40, maxC = config.width / 40;
    if (fila + 1 < maxF) {
        if (down) {
            sc_juegoLocal.adjacencyMatrix[fila + 1][columna][fila][columna] = INF;
        } else {
            sc_juegoLocal.adjacencyMatrix[fila + 1][columna][fila][columna] = 1;
        }
    }
        
    if (fila + 1 < maxF && columna + 1 < maxC)
        sc_juegoLocal.adjacencyMatrix[fila + 1][columna + 1][fila][columna] = INF;

    if (fila + 1 < maxF && columna - 1 >= 0)
        sc_juegoLocal.adjacencyMatrix[fila + 1][columna - 1][fila][columna] = INF;

    if (columna + 1 < maxC) {
        if (right) {
            sc_juegoLocal.adjacencyMatrix[fila][columna + 1][fila][columna] = INF;
        } else {
            sc_juegoLocal.adjacencyMatrix[fila][columna + 1][fila][columna] = 1;
        }
    }
        
    if (columna - 1 >= 0) {
        if (left) {
            sc_juegoLocal.adjacencyMatrix[fila][columna - 1][fila][columna] = INF;
        } else {
            sc_juegoLocal.adjacencyMatrix[fila][columna - 1][fila][columna] = 1;
        }
    }
        
    if (fila - 1 >= 0 && columna + 1 < maxC)
        sc_juegoLocal.adjacencyMatrix[fila - 1][columna + 1][fila][columna] = INF;

    if (fila - 1 >= 0) {
        if (up) {
            sc_juegoLocal.adjacencyMatrix[fila - 1][columna][fila][columna] = INF;
        } else {
            sc_juegoLocal.adjacencyMatrix[fila - 1][columna][fila][columna] = 1;
        }
    }
        
    if (fila - 1 >= 0 && columna - 1 >= 0)
        sc_juegoLocal.adjacencyMatrix[fila - 1][columna - 1][fila][columna] = INF;
}