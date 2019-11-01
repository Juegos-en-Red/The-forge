"use strict";

//Escena del juego en local
var sc_juegoLocal = new Phaser.Scene('JuegoLocal');

sc_juegoLocal.preload = function() {
    //Escenario
    this.load.image('sky', 'assets/sky.png');
    //Modificaciones de los metales 
    this.load.image('metal material', 'assets/metal material.png');
    this.load.image('metal2', 'assets/metal2.png');
    this.load.image('metal1rojo', 'assets/metal1rojo.png');
    this.load.image('metal2rojo', 'assets/metal2rojo.png');
    this.load.image('metal1yunque', 'assets/metal1yunque.png'); 
    this.load.image('metal2yunque', 'assets/metal2yunque.png'); 
    this.load.image('metal1yunquetemplado', 'assets/metal1yunquetemplado.png'); 
    this.load.image('metal2yunquetemplado', 'assets/metal2yunquetemplado.png'); 
    this.load.image('metal1molde', 'assets/metal1molde.png'); 
    this.load.image('metal2molde', 'assets/metal2molde.png'); 
    this.load.image('metal1moldetemplado', 'assets/metal1moldetemplado.png'); 
    this.load.image('metal2moldetemplado', 'assets/metal2moldetemplado.png'); 
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
    //De aquí para abajo los spritesheet
    /*this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );*/
    this.load.spritesheet('SSElfa1', 
        'assets/SSElfa1.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaEmpty', 
        'assets/SSElfaOverlay.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaCasco', 
        'assets/SSElfaCasco.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaEspada', 
        'assets/SSElfaEspada.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaMetal', 
        'assets/SSElfaMetal.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaMetalOverlay', 
        'assets/SSElfaMetalOverlay.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaMetalCaliente', 
        'assets/SSElfaMetalCaliente.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaPechera', 
        'assets/SSElfaPechera.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaProtecPiernas', 
        'assets/SSElfaProtecPiernas.png',
        { frameWidth: 122, frameHeight: 128 }
    );
    this.load.spritesheet('SSHielo1', 
        'assets/SSHielo1.png',
        { frameWidth: 90, frameHeight: 92 }
    );
    this.load.spritesheet('SSHieloCasco', 
        'assets/SSHieloCasco.png',
        { frameWidth: 90, frameHeight: 92 }
    );
    this.load.spritesheet('SSHieloEspada', 
        'assets/SSHieloEspada.png',
        { frameWidth: 90, frameHeight: 92 }
    );
    this.load.spritesheet('SSHieloMetal', 
        'assets/SSHieloMetal.png',
        { frameWidth: 90, frameHeight: 92 }
    );
    this.load.spritesheet('SSHieloMetalCaliente', 
        'assets/SSHieloMetalCaliente.png',
        { frameWidth: 90, frameHeight: 92 }
    );
    this.load.spritesheet('SSHieloPechera', 
        'assets/SSHieloPechera.png',
        { frameWidth: 90, frameHeight: 92 }
    );
    this.load.spritesheet('SSHieloProtecPiernas', 
        'assets/SSHieloProtecPiernas.png',
        { frameWidth: 90, frameHeight: 92 }
    );
}

sc_juegoLocal.create = function() {
    this.add.image(400, 300, 'sky');



    //inicializar cajones
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
    

    //inicializar mesas
    sc_juegoLocal.mesas = this.physics.add.staticGroup();
    sc_juegoLocal.mesas.create(103, 268, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(103, 400, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(697, 268, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(697, 400, 'mesa').heldObject = "none";


    //inicializar hornos de 1 material
    sc_juegoLocal.hornos = this.physics.add.staticGroup();
    sc_juegoLocal.hornos.create(70, 40, 'horno');
    sc_juegoLocal.hornos.create(730, 40, 'horno');

    sc_juegoLocal.hornos.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });


    //inicializar yunques de 1 material
    sc_juegoLocal.yunques = this.physics.add.staticGroup();
    sc_juegoLocal.yunques.create(283, 300, 'yunque');
    sc_juegoLocal.yunques.create(517, 300, 'yunque');

    sc_juegoLocal.yunques.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });


    //inicializar barriles de templado
    sc_juegoLocal.barriles = this.physics.add.staticGroup();
    sc_juegoLocal.barriles.create(283, 218, 'barril de templado');
    sc_juegoLocal.barriles.create(517, 218, 'barril de templado');

    sc_juegoLocal.barriles.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    
    //inicializar moldes
    sc_juegoLocal.moldes = this.physics.add.staticGroup();
    sc_juegoLocal.moldes.create(283, 400, 'molde');
    sc_juegoLocal.moldes.create(517, 400, 'molde');

    sc_juegoLocal.moldes.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    
    //inicializar hornos de 2 materiales
    sc_juegoLocal.hornosd = this.physics.add.staticGroup();
    sc_juegoLocal.hornosd.create(200, 39, 'horno doble');
    sc_juegoLocal.hornosd.create(600, 39, 'horno doble');

    sc_juegoLocal.hornosd.children.iterate(function(child){
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });



    //inicializar yunques de 2 materiales
    sc_juegoLocal.yunquesd = this.physics.add.staticGroup();
    sc_juegoLocal.yunquesd.create(283, 125, 'yunque doble');
    sc_juegoLocal.yunquesd.create(517, 125, 'yunque doble');

    sc_juegoLocal.yunquesd.children.iterate(function(child){
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    //inicializar jugadores
    sc_juegoLocal.players = this.physics.add.group();

    sc_juegoLocal.player = sc_juegoLocal.players.create(100, 450, 'SSHielo1');
    sc_juegoLocal.player2 = sc_juegoLocal.players.create(200, 450, 'SSElfa1');

    //inicializar características comunes a ambos jugadores
    var that = this;
    sc_juegoLocal.players.children.iterate(function (child) {
        child.spdX = 0;
        child.spdY = 0;
        child.heldObject = "none";
        child.defaultTexture = child.texture;
        child.hos = that.physics.add.group();
        //child.heldObjectSprite = sc_juegoLocal.add.image(child.x, child.y, child.texture);
        child.heldObjectSprite = child.hos.create(child.x, child.y, child.texture);
        child.setTexture('empty');
       // child.heldObjectSprite2 = sc_juegoLocal.add.image(child.x, child.y, 'empty');
       child.heldObjectSprite2 = child.hos.create(child.x, child.y, 'empty');
        child.setCollideWorldBounds(true);
        //child.heldObjectSprite.setCollideWorldBounds(true);
        //child.heldObjectSprite2.setCollideWorldBounds(true);
        //alert(child.defaultTexture);
        switch(child.defaultTexture.key) {
            case 'SSHielo1':
                child.setSize(90, 93); //cambiar este tamaño por favor
                break;
            case 'SSElfa1':
                child.setSize(90, 128); //cambiar este tamaño por favor
                break;
        }
        //child.heldObjectSprite.setSize(121, 128);
        child.interacted = false;
        child.chocado = false;
    });
    

    //añadir colisiones a los jugadores
    var that = this;
    sc_juegoLocal.players.children.iterate(function(child) {

        that.physics.add.collider(child, sc_juegoLocal.mesas);
        that.physics.add.collider(child, sc_juegoLocal.cajonesMetal);
        that.physics.add.collider(child, sc_juegoLocal.hornos);
        that.physics.add.collider(child, sc_juegoLocal.yunques);
        that.physics.add.collider(child, sc_juegoLocal.barriles);
        that.physics.add.collider(child, sc_juegoLocal.moldes);
        that.physics.add.collider(child, sc_juegoLocal.hornosd);
        that.physics.add.collider(child, sc_juegoLocal.yunquesd);

        /*that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.mesas);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.cajonesMetal);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.hornos);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.yunques);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.barriles);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.moldes);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.hornosd);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.yunquesd);*/
    });


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
        getAnim(sc_juegoLocal.player);
        getAnim(sc_juegoLocal.player2);
    });

    this.input.keyboard.on('keydown', 
    function (event) { 
        //console.log(event.keyCode);
        switch (event.keyCode) {
            //jugador 1
            //movimiento
            case cont.p1.w:
                    sc_juegoLocal.player.spdY = -400;
                    //sc_juegoLocal.player.heldObjectSprite.anims.play('pHUpM', true);
            break;
            case cont.p1.s:
                    sc_juegoLocal.player.spdY = 400;
                    //sc_juegoLocal.player.heldObjectSprite.anims.play('pHDownM', true);
            break;
            case cont.p1.a:
                    sc_juegoLocal.player.spdX = -400;
                    //sc_juegoLocal.player.heldObjectSprite.anims.play('pHLeftM', true);
            break;
            case cont.p1.d:
                    sc_juegoLocal.player.spdX = 400;
                    //sc_juegoLocal.player.heldObjectSprite.anims.play('pHRightM', true);
            break;
            case cont.p1.i1:
                interactuar(sc_juegoLocal.player);
                sc_juegoLocal.player.interacted = true;
            break;

            //jugador 2
            case cont.p2.w:
                    sc_juegoLocal.player2.spdY = -400;
                    //sc_juegoLocal.player2.heldObjectSprite.anims.play('pEUpM', true); //getAnim(player2, 0);
            break;
            case cont.p2.s:
                    sc_juegoLocal.player2.spdY = 400;
                    //sc_juegoLocal.player2.heldObjectSprite.anims.play('pEDownM', true);
            break;
            case cont.p2.a:
                    sc_juegoLocal.player2.spdX = -400;
                    //sc_juegoLocal.player2.heldObjectSprite.anims.play('pELeftM', true);
            break;
            case cont.p2.d:
                    sc_juegoLocal.player2.spdX = 400;
                    //sc_juegoLocal.player2.heldObjectSprite.anims.play('pERightM', true);
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

sc_juegoLocal.update = function(time, delta) {

    sc_juegoLocal.players.children.iterate(function(child){
        if (child.spdX == 0 && child.spdY == 0) {
            child.heldObjectSprite.anims.stopOnRepeat();
            child.heldObjectSprite2.anims.stopOnRepeat();
        }
        getAnim(child);
        //var hoSpdX, hoSpdY;
        if (child.heldObject == "none") {
            child.setVelocityY(child.spdY);
            child.setVelocityX(child.spdX);
            //hoSpdX = child.spdX;
            //hoSpdY = child.spdY;
        } else {
            
            child.setVelocityY(child.spdY/2);
            child.setVelocityX(child.spdX/2);
            //hoSpdX = child.spdX/2;
            //hoSpdY = child.spdY/2;
        }
        child.heldObjectSprite.setX(child.x);
        child.heldObjectSprite.setY(child.y);

        child.heldObjectSprite2.setX(child.x);
        child.heldObjectSprite2.setY(child.y);

        /*if (child.heldObject == "none") {
            //child.heldObjectSprite.setTexture(child.defaultTexture); //quitar esta linea por favor
            child.heldObjectSprite2.setTexture('empty');
        } else {
            //child.heldObjectSprite.setTexture(child.heldObject); //de momento
            child.heldObjectSprite.setTexture('SSHieloCasco'); //quitar esta linea por favor
            child.heldObjectSprite2.setTexture(child.heldObject);
        }
        switch (child.heldObject) {
            case "":
                break;
        }*/
    });
    
    sc_juegoLocal.mesas.children.iterate(function(child){
        if (child.heldObject == "none") {
            child.setTexture('mesa');
        } else {
            child.setTexture(child.heldObject);
        }
    });
    
    sc_juegoLocal.hornos.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=/*0.125*/0.5;
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=/*0.125*/0.5;
            child.text.setText("100%");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=/*0.125*/0.5;
            child.text.setText("QUEMADO");
        } else if (child.timer >= 200) {
            child.timer = -1;
            child.heldObject = "none";
        } else {
            child.text.setText("");
        }
    });

    sc_juegoLocal.yunques.children.iterate(function(child){
        if (child.cooldown > 0) {
            child.cooldown--;
        }
        if (child.timer >= 0 && child.timer <= 100) {
            child.text.setText(Math.floor(child.timer) + "%");
        }
    });

    sc_juegoLocal.barriles.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=0.5;
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 100) {
            child.text.setText("100%");
        } else {
            child.text.setText("");
        }
    });

    sc_juegoLocal.moldes.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=0.25;
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 100) {
            child.text.setText("100%");
        } else {
            child.text.setText("");
        }
    });

    sc_juegoLocal.hornosd.children.iterate(function(child){
        if (child.timer >= 0 && child.timer < 100) {
            child.timer+=/*0.125*/0.5;
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=/*0.125*/0.5;
            child.text.setText("100%");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=/*0.125*/0.5;
            child.text.setText("QUEMADO");
        } else if (child.timer >= 200) {
            child.timer = -1;
            child.heldObject1 = "none";
            child.heldObject2 = "none";
        } else {
            child.text.setText("");
        }
    });

    sc_juegoLocal.yunquesd.children.iterate(function(child){
        if (child.cooldown > 0) {
            child.cooldown--;
        }
        if (child.timer >= 0 && child.timer <= 100) {
            child.text.setText(Math.floor(child.timer) + "%");
        }
    });



    /*sc_juegoLocal.players.children.iterate(function (child) {
        child.chocado = false;
    });*/
}

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
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightC',
        frames: that.anims.generateFrameNumbers('SSElfaCasco', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //pechera
    that.anims.create({
        key: 'iEDownP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightP',
        frames: that.anims.generateFrameNumbers('SSElfaPechera', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //piernas
    that.anims.create({
        key: 'iEDownI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightI',
        frames: that.anims.generateFrameNumbers('SSElfaProtecPiernas', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
    //espada
    that.anims.create({
        key: 'iEDownE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iEUpE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iELeftE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'iERightE',
        frames: that.anims.generateFrameNumbers('SSElfaEspada', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });

    //Hielo
    that.anims.create({
        key: 'pHDownM',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHUpM',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 4, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHLeftM',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 8, end: 11 }),
        frameRate: 7,
        repeat: -1
    });
    that.anims.create({
        key: 'pHRightM',
        frames: that.anims.generateFrameNumbers('SSHielo1', { start: 12, end: 15 }),
        frameRate: 7,
        repeat: -1
    });
}

function interactuar(p) {
    if (!interactuarCajones(p)) {
        if (!interactuarMesas(p)) {
            if (!interactuarHornos(p)) {
                if (!interactuarYunques(p)) {
                    if (!interactuarBarriles(p)) {
                        if (!interactuarMoldes(p)) {
                            if (!interactuarHornosd(p)) {
                                interactuarYunquesd(p);
                            }
                        }
                    }
                }
            }
        }
    }
}

/*function interactuarEstacion(p, estacion, tablaIO, tablaInputsValidos) {
    var result = false;
    estacion.children.iterate(function (child) {
        if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.body.width, child.body.height)+0.75*Math.max(p.body.width, p.body.height)) {
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
}*/

/*function cambiarObjetos(cond1, cond2, child, p){
    var result = false;
    if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.body.width, child.body.height)+0.75*Math.max(p.body.width, p.body.height)) {
        if (cond1) {
            child.heldObject = p.heldObject;
            p.heldObject = "none";
            child.timer = 0;
            result = true;
        } else if (cond2) {
            if (tablaIO[child.heldObject] != undefined) {
                p.heldObject = tablaIO[child.heldObject];
            }
            child.heldObject = "none";
            child.timer = -1;
            result = true;
        }
    }
    return result;
}*/


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

//todas estas funciones en un futuro se podrán agrupar probablemente

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
                    child.text.setText("");
                }
            }
        }
    });
    
    return result;
}

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
                        //console.log(p.heldObject);
                    }
                    child.heldObject1 = "none";
                    child.heldObject2 = "none";
                    child.timer = -1;
                    child.text.setText("");
                }
            }
        }
    });
    
    return result;
}

function chocar(p, e) {
    p.chocado = true;
}

function getAnim(p) {
    var index = "";
    var tint1 = 0xFFFFFF;
    var tint2 = 0xFFFFFF;
    var red = false;
    var anim = "Down";
    var animKey = p.defaultTexture.key.slice(2,3);
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
    "metal1-5";  //1
    "metal1-5rojo"; //2
    "metal12-45rojo"; //2
    "metal1-5yunque"; //3
    "metal12-45yunque"; //7
    "metal1-5yunquetemplado"; //4
    "metal12-45yunquetemplado"; //8
    "metal1-5molde"; //5
    "metal1-5moldetemplado"; //6
    "metal12-45espada"; //9
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
            tint1*=0xFF0000;
            tint2*=0xFF0000;
        }
        p.heldObjectSprite2.setTint(tint1, tint1, tint2, tint2);
    }
}