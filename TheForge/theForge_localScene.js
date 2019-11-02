"use strict";

//Inicialización de la escena del juego en local
var sc_juegoLocal = new Phaser.Scene('JuegoLocal');

//Función preload: Aquí se cargan todos los sprites necesarios para el juego.
sc_juegoLocal.preload = function() {
    //Escenario
    this.load.image('sky', 'assets/sky.png');
    //Modificaciones de los metales 
    this.load.image('metal material', 'assets/metal material.png');
    this.load.image('metal caliente', 'assets/metal caliente.png');
    //Partes de la armadura
    this.load.image('casco', 'assets/casco.png');
    this.load.image('CascoElfoD', 'assets/CascoElfoD.png');
    this.load.image('CascoElfoI', 'assets/CascoElfoI.png');
    this.load.image('CascoHieloD', 'assets/CascoHieloD.png');
    this.load.image('CascoHieloI', 'assets/CascoHieloI.png');
    this.load.image('espada', 'assets/espada.png');
    this.load.image('EspadaElfoD', 'assets/EspadaElfoD.png');
    this.load.image('EspadaElfoI', 'assets/EspadaElfoI.png');
    this.load.image('EspadaHieloD', 'assets/EspadaHieloD.png');
    this.load.image('EspadaHieloI', 'assets/EspadaHieloI.png');
    this.load.image('pechera', 'assets/pechera.png');
    this.load.image('PecheraElfoD', 'assets/PecheraElfoD.png');
    this.load.image('PecheraElfoI', 'assets/PecheraElfoI.png');
    this.load.image('PecheraHieloD', 'assets/PecheraHieloD.png');
    this.load.image('PecheraHieloI', 'assets/PecheraHieloI.png');
    this.load.image('protecciones piernas', 'assets/protecciones piernas.png');
    this.load.image('ProtPiernasElfoD', 'assets/ProtPiernasElfoD.png');
    this.load.image('ProtPiernasElfoI', 'assets/ProtPiernasElfoI.png');
    this.load.image('ProtPiernasHieloD', 'assets/ProtPiernasHieloD.png');
    this.load.image('ProtPiernasHieloI', 'assets/ProtPiernasHieloI.png');
    //Elementos del escenario
    this.load.image('empty', 'assets/empty.png');
    this.load.image('cajon1', 'assets/cajon1.png');
    this.load.image('cajon2', 'assets/cajon2.png');
    this.load.image('cajon3', 'assets/cajon3.png');
    this.load.image('cajon4', 'assets/cajon4.png');
    this.load.image('cajon5', 'assets/cajon5.png');
    this.load.image('mesa', 'assets/mesa.png');
    this.load.image('horno', 'assets/horno.png');
    this.load.image('hornoU', 'assets/hornoU.png');
    this.load.image('horno doble', 'assets/horno doble.png');
    this.load.image('horno dobleU', 'assets/horno dobleU.png');
    this.load.image('yunque', 'assets/yunque.png');
    this.load.image('yunque doble', 'assets/yunque doble.png');
    this.load.image('barril de templado', 'assets/barril de templado.png');
    this.load.image('basura', 'assets/basura.png');
    this.load.image('molde', 'assets/molde.png');
    this.load.image('moldeU', 'assets/moldeU.png');
    this.load.image('barreras', 'assets/barreras.png');
    //Otros extras (trampas)
    this.load.image('barril explosivo', 'assets/barril explosivo.png');
    this.load.image('explosion', 'assets/explosion.png');
    this.load.image('reloj', 'assets/reloj.png');
    this.load.image('trampa muro', 'assets/trampa muro.png');
    //Monstruos
    this.load.image('MElfoD', 'assets/MElfoD.png');
    this.load.image('MElfoI', 'assets/MElfoI.png');
    this.load.image('MHieloD', 'assets/MHieloD.png');
    this.load.image('MHieloI', 'assets/MHieloI.png');
    //Interfaz
    this.load.image('martillo', 'assets/martillo.png');
    this.load.image('martillo2', 'assets/martillo2.png');
    this.load.image('relojinterfaz', 'assets/relojinterfaz.png');
    this.load.image('cruz', 'assets/cruz.png');
    this.load.image('tic', 'assets/tic.png');
    this.load.image('1de2', 'assets/1de2.png');
    this.load.image('botonPausa', 'assets/botonPausa.png');
    this.load.image('pausedOverlay', 'assets/pausedOverlay.png');
    //De aquí para abajo los spritesheet
    this.load.spritesheet('SSElfa1', 
        'assets/SSElfa1.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEmpty', 
        'assets/SSElfaOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaCasco', 
        'assets/SSElfaCasco.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaCascoOverlay', 
        'assets/SSElfaCascoOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEspada', 
        'assets/SSElfaEspada.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEspadaOverlay', 
        'assets/SSElfaEspadaOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetal', 
        'assets/SSElfaMetal.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetalOverlay', 
        'assets/SSElfaMetalOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetalCaliente', 
        'assets/SSElfaMetalCaliente.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaPechera', 
        'assets/SSElfaPechera.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaPecheraOverlay', 
        'assets/SSElfaPecheraOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaProtecPiernas', 
        'assets/SSElfaProtecPiernas.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaProtecPiernasOverlay', 
        'assets/SSElfaProtecPiernasOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSHielo1', 
        'assets/SSHielo1.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEmpty', 
        'assets/SSHieloEmpty.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloCasco', 
        'assets/SSHieloCasco.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloCascoOverlay', 
        'assets/SSHieloCascoOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEspada', 
        'assets/SSHieloEspada.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEspadaOverlay', 
        'assets/SSHieloEspadaOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetal', 
        'assets/SSHieloMetal.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetalOverlay', 
        'assets/SSHieloMetalOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetalCaliente', 
        'assets/SSHieloMetalCaliente.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloPechera', 
        'assets/SSHieloPechera.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloPecheraOverlay', 
        'assets/SSHieloPecheraOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloProtecPiernas', 
        'assets/SSHieloProtecPiernas.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloProtecPiernasOverlay', 
        'assets/SSHieloProtecPiernasOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
}

//Función create: Aquí se inicializan todos los objetos del juego.
sc_juegoLocal.create = function() {

    //Aquí se carga el fondo del juego
    this.add.image(400, 300, 'sky');

    //Inicialización de cajones
    //Primero se crea un grupo de cajones para poder iterar y después se crean los cajones de ambos jugadores
    //La propiedad heldObject (que se repetirá mucho en el resto de objetos) guarda en forma de string el objeto que guarda el cajón
    sc_juegoLocal.cajonesMetal = this.physics.add.staticGroup();
    sc_juegoLocal.cajonesMetal.create(80, 570, 'cajon1').heldObject = "metal1";
    sc_juegoLocal.cajonesMetal.create(140, 570, 'cajon2').heldObject = "metal2";
    sc_juegoLocal.cajonesMetal.create(200, 570, 'cajon3').heldObject = "metal3";
    sc_juegoLocal.cajonesMetal.create(260, 570, 'cajon4').heldObject = "metal4";
    sc_juegoLocal.cajonesMetal.create(320, 570, 'cajon5').heldObject = "metal5";
    sc_juegoLocal.cajonesMetal.create(720, 570, 'cajon1').heldObject = "metal1";
    sc_juegoLocal.cajonesMetal.create(660, 570, 'cajon2').heldObject = "metal2";
    sc_juegoLocal.cajonesMetal.create(600, 570, 'cajon3').heldObject = "metal3";
    sc_juegoLocal.cajonesMetal.create(540, 570, 'cajon4').heldObject = "metal4";
    sc_juegoLocal.cajonesMetal.create(480, 570, 'cajon5').heldObject = "metal5";
    

    //Inicialización de basuras
    //La inicialización de las basuras no necesita la propiedad heldObject, ya que sólo sirven para que el jugador se deshaga de objetos no deseados.
    sc_juegoLocal.basuras = this.physics.add.staticGroup();
    sc_juegoLocal.basuras.create(103, 400, 'basura');
    sc_juegoLocal.basuras.create(697, 400, 'basura');

    //Inicialización de hornos de 1 material
    //En las estaciones de trabajo se añaden varias propiedades además de heldObject. 
    //En este caso se añaden timer, que guarda el progreso del metal en su interior, y status, el sprite que mostrará el estado de la estación.
    sc_juegoLocal.hornos = this.physics.add.staticGroup();
    sc_juegoLocal.hornos.create(70, 40, 'horno');
    sc_juegoLocal.hornos.create(730, 40, 'horno');

    sc_juegoLocal.hornos.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });


    //Inicialización de yunques de 1 material
    //Es idéntica a la de los hornos, pero también se añade la propiedad cooldown, que impide al jugador interactuar con más frecuencia de la deseada.
    sc_juegoLocal.yunques = this.physics.add.staticGroup();
    sc_juegoLocal.yunques.create(283, 300, 'yunque');
    sc_juegoLocal.yunques.create(517, 300, 'yunque');

    sc_juegoLocal.yunques.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });


    //Inicialización de barriles de templado
    sc_juegoLocal.barriles = this.physics.add.staticGroup();
    sc_juegoLocal.barriles.create(283, 218, 'barril de templado');
    sc_juegoLocal.barriles.create(517, 218, 'barril de templado');

    sc_juegoLocal.barriles.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });

    
    //Inicialización de moldes
    sc_juegoLocal.moldes = this.physics.add.staticGroup();
    sc_juegoLocal.moldes.create(283, 400, 'molde');
    sc_juegoLocal.moldes.create(517, 400, 'molde');

    sc_juegoLocal.moldes.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });

    
    //Inicialización de  hornos de 2 materiales
    //En este caso hay dos heldObjects, ya que se trata de un horno doble. Lo mismo ocurrirá en los yunques dobles.
    sc_juegoLocal.hornosd = this.physics.add.staticGroup();
    sc_juegoLocal.hornosd.create(200, 39, 'horno doble');
    sc_juegoLocal.hornosd.create(600, 39, 'horno doble');

    sc_juegoLocal.hornosd.children.iterate(function(child){
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });



    //Inicialización de yunques de 2 materiales
    sc_juegoLocal.yunquesd = this.physics.add.staticGroup();
    sc_juegoLocal.yunquesd.create(283, 125, 'yunque doble');
    sc_juegoLocal.yunquesd.create(517, 125, 'yunque doble');

    sc_juegoLocal.yunquesd.children.iterate(function(child){
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.status = sc_juegoLocal.add.image(child.x-6, child.y-25, 'empty');
    });

    //Inicialización de jugadores
    sc_juegoLocal.players = this.physics.add.group();

    //En cont.p1.char y cont.p2.char se guarda el spritesheet del personaje de cada jugador
    //En la escena de selección de personaje se deberán cambiar estas variables
    sc_juegoLocal.player = sc_juegoLocal.players.create(100, 450, cont.p1.ch);
    sc_juegoLocal.player2 = sc_juegoLocal.players.create(200, 450, cont.p2.ch);

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
    });
    
    //Inicialización de mesas
    sc_juegoLocal.mesas = this.physics.add.staticGroup();
    sc_juegoLocal.mesas.create(103, 268, 'mesa');
    sc_juegoLocal.mesas.create(697, 268, 'mesa');

    sc_juegoLocal.mesas.children.iterate(function (child) {
        child.heldObject = "none";
        child.heldObjectSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
    });

    //Inicialización de elementos relativos al pausado del juego
    //Por un lado tenemos el overlay, que oscurecerá toda la pantalla cuando el juego esté pausado
    //Por otro lado tenemos el botón de pausa, el cual se podrá pulsar para activar o desactivar el pausado del juego.
    sc_juegoLocal.pausedOverlay = sc_juegoLocal.add.image(400, 300, 'empty');
    sc_juegoLocal.botonPausa = this.physics.add.sprite(400,585, 'botonPausa');
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

    //Colisiones
    //Una vez están creados todos los objetos, se añade la colisión de cada jugador con cada grupo de objetos.
    sc_juegoLocal.players.children.iterate(function(child) {

        that.physics.add.collider(child, sc_juegoLocal.mesas);
        that.physics.add.collider(child, sc_juegoLocal.basuras);
        that.physics.add.collider(child, sc_juegoLocal.cajonesMetal);
        that.physics.add.collider(child, sc_juegoLocal.hornos);
        that.physics.add.collider(child, sc_juegoLocal.yunques);
        that.physics.add.collider(child, sc_juegoLocal.barriles);
        that.physics.add.collider(child, sc_juegoLocal.moldes);
        that.physics.add.collider(child, sc_juegoLocal.hornosd);
        that.physics.add.collider(child, sc_juegoLocal.yunquesd);
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
        }
    });

    //Inicialización de animaciones
    initAnimations(this);

}

//Función update: Aquí se maneja todo lo que ocurre durante la partida.
sc_juegoLocal.update = function() {

    //Si el juego está pausado, la función no se ejecuta.
    if (sc_juegoLocal.botonPausa.paused) {
        return;
    }

    //Esta función afecta a todos los jugadores
    sc_juegoLocal.players.children.iterate(function(child){
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
            child.setTexture("hornoU");
            child.timer+=0.125;
            child.status.setTexture("relojinterfaz");
        } else if (child.timer >= 100 && child.timer < 150) {
            child.setTexture("hornoU");
            child.timer+=0.125;
            child.status.setTexture("tic");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.setTexture("hornoU");
            child.timer+=0.125;
            child.status.setTexture("cruz");
        } else if (child.timer >= 200) {
            child.setTexture("hornoU");
            child.timer = -1;
            child.heldObject = "none";
        } else {
            child.setTexture("horno");
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
                child.status.setTexture("martillo2");
            } else {
                child.status.setTexture("martillo");
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
            child.status.setTexture("relojinterfaz");
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
            child.status.setTexture("relojinterfaz");
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
            child.setTexture("horno dobleU");
            child.timer+=0.125;
            child.status.setTexture("relojinterfaz");
        } else if (child.timer >= 100 && child.timer < 150) {
            child.setTexture("horno dobleU");
            child.timer+=0.125;
            child.status.setTexture("tic");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.setTexture("horno dobleU");
            child.timer+=0.125;
            child.status.setTexture("cruz");
        } else if (child.timer >= 200) {
            child.setTexture("horno dobleU");
            child.timer = -1;
            child.heldObject1 = "none";
            child.heldObject2 = "none";
        } else {
            child.setTexture("horno doble");
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
                child.status.setTexture("martillo2");
            } else {
                child.status.setTexture("martillo");
            }
        } else if (child.timer >= 100) {
            child.status.setTexture("tic");
        }
    });
}

//Función initAnimations: Aquí se inicializan todas las animaciones de los personajes.
function initAnimations(that) {
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
                                    interactuarBasuras(p);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//Función interactuarCajones: Si el jugador está suficientemente cerca y no lleva objetos, pasa a tener el metal correspondiente al cajón
function interactuarCajones(p) {
    var result = false;
    sc_juegoLocal.cajonesMetal.children.iterate(function (child) {
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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

    //interactuarEstacion(p, sc_juegoLocal.hornos, tablaIO);

    if (p.interacted != true) {
        sc_juegoLocal.hornos.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
                if (child.timer == -1 && child.heldObject == "none" && (tablaIO[p.heldObject] != undefined)) {
                    child.heldObject = p.heldObject;
                    p.heldObject = "none";
                    child.timer = 0;
                    child.cooldown = 5;
                } else if (child.timer >= 0 && child.timer < 100) {
                    child.timer += 5;
                    child.cooldown = 15;
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
    tablaIO["metal1yunque"] = "metal1yunquetemplado";
    tablaIO["metal2yunque"] = "metal2yunquetemplado";
    tablaIO["metal3yunque"] = "metal3yunquetemplado";
    tablaIO["metal4yunque"] = "metal4yunquetemplado";
    tablaIO["metal5yunque"] = "metal5yunquetemplado";
    tablaIO["metal1molde"] = "metal1moldetemplado";
    tablaIO["metal2molde"] = "metal2moldetemplado";
    tablaIO["metal3molde"] = "metal3moldetemplado";
    tablaIO["metal4molde"] = "metal4moldetemplado";
    tablaIO["metal5molde"] = "metal5moldetemplado";

    tablaIO["metal12yunque"] = "metal12yunquetemplado";
    tablaIO["metal13yunque"] = "metal13yunquetemplado";
    tablaIO["metal14yunque"] = "metal14yunquetemplado";
    tablaIO["metal15yunque"] = "metal15yunquetemplado";
    
    tablaIO["metal23yunque"] = "metal23yunquetemplado";
    tablaIO["metal24yunque"] = "metal24yunquetemplado";
    tablaIO["metal25yunque"] = "metal25yunquetemplado";
    
    tablaIO["metal34yunque"] = "metal34yunquetemplado";
    tablaIO["metal35yunque"] = "metal35yunquetemplado";
    
    tablaIO["metal45yunque"] = "metal45yunquetemplado";

    tablaIO["metal12espada"] = "metal12espadatemplado";
    tablaIO["metal13espada"] = "metal13espadatemplado";
    tablaIO["metal14espada"] = "metal14espadatemplado";
    tablaIO["metal15espada"] = "metal15espadatemplado";
    
    tablaIO["metal23espada"] = "metal23espadatemplado";
    tablaIO["metal24espada"] = "metal24espadatemplado";
    tablaIO["metal25espada"] = "metal25espadatemplado";
    
    tablaIO["metal34espada"] = "metal34espadatemplado";
    tablaIO["metal35espada"] = "metal35espadatemplado";
    
    tablaIO["metal45espada"] = "metal45espadatemplado";

    if (p.interacted != true) {
        sc_juegoLocal.barriles.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer >= 100))) {
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.55*Math.max(child.body.width, child.body.height)+0.55*Math.max(p.body.width, p.body.height)) {
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

function getAnim(p, isPlayer) {
    var index = "";
    var tint1 = 0xFFFFFF;
    var tint2 = 0xFFFFFF;
    var red = false;
    var anim = p.dir;
    var animKey = "";
    if (isPlayer) {
        animKey = p.defaultTexture.key.slice(2,3);
    }
    if (p.heldObject != "none") {
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
            tint2 = tint1;
            switch (ho.slice(6)) {
                case "":
                    index = "M";
                    break;
                case "rojo":
                    index = "MC";
                    break;
                case "yunque":
                    index = "I";
                    red = true;
                    break;
                case "yunquetemplado":
                    index = "I";
                    break;
                case "molde":
                    index = "C";
                    red = true;
                    break;
                case "moldetemplado":
                    index = "C";
                    break;
            }
        } else {
            //Si el sexto caracter es un número, hay mezcla de metales
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
            switch (ho.slice(7)) {
                case "":
                    index = "M";
                    break;
                case "rojo":
                    index = "MC";
                    break;
                case "yunque":
                    index = "P";
                    red = true;
                    break;
                case "yunquetemplado":
                    index = "P";
                    break;
                case "espada":
                    index = "E";
                    red = true;
                    break;
                case "espadatemplado":
                    index = "E";
                    break;
            }
        }
    }
    if (!isPlayer) {
        if (ho == "none") {
            p.heldObjectSprite.setTexture('empty');
        } else {
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
        }
        if (index == "MC") {
            p.heldObjectSprite.setTint(0xFFFFFF);
        } else if (red) {
            p.heldObjectSprite.setTint(tint1, 0xFF0000, tint2, 0xFF0000);
        } else {
            p.heldObjectSprite.setTint(tint1, tint1, tint2, tint2);
        }
        return;
    }
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
    p.dir = anim;
    //if (p.spdX != 0 || p.spdY != 0) {
        //console.log("p"+animKey+anim+index);
        p.heldObjectSprite.anims.play("p"+animKey+anim+index, true);
        p.heldObjectSprite2.anims.play("i"+animKey+anim+index, true);
        if (p.spdX == 0 && p.spdY == 0) {
            p.heldObjectSprite.anims.stop();
            p.heldObjectSprite2.anims.stop();
        }
    //}
    if (index == "MC") {
        p.heldObjectSprite2.setTint(0xFFFFFF);
    } else {
        if (red) {
            p.heldObjectSprite2.setTint(tint1, 0xFF0000, tint2, 0xFF0000);
        } else {
            p.heldObjectSprite2.setTint(tint1, tint1, tint2, tint2);
        }
    }
}