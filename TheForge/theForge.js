"use strict";

//Variables globales

var cont = {
    p1: {
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        i1: 69,
        i2: 81 //cambiar más adelante
    },
    p2: {
        w: 38,
        a: 37,
        s: 40,
        d: 39,
        i1: 80, //cambiar más adelante
        i2: 79 //cambiar más adelante
    }
}


//Escena del juego en local
var sc_juegoLocal = new Phaser.Scene('Game');

sc_juegoLocal.preload = function() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('metal1', 'assets/metal1.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

sc_juegoLocal.create = function() {
    this.add.image(400, 300, 'sky');

    //inicializar jugadores
    sc_juegoLocal.players = this.physics.add.group();

    sc_juegoLocal.player = sc_juegoLocal.players.create(100, 450, 'dude');
    sc_juegoLocal.player2 = sc_juegoLocal.players.create(200, 450, 'dude');

    //inicializar características comunes a ambos jugadores
    sc_juegoLocal.players.children.iterate(function (child) {
        child.spdX = 0;
        child.spdY = 0;
        child.heldObject = "none";
        child.heldObjectSprite = sc_juegoLocal.add.image(child.x, child.y, 'bomb');
        child.setCollideWorldBounds(true);
    });
    

    //inicializar cajones
    sc_juegoLocal.cajonesMetal = this.physics.add.staticGroup();
    sc_juegoLocal.cajonesMetal.create(50, 50, 'star').heldObject = "metal1";
    sc_juegoLocal.cajonesMetal.create(50, 100, 'star').heldObject = "metal1";
    
    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.cajonesMetal);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.cajonesMetal);

    //sc_juegoLocal.cajonMetal1 = this.physics.add.staticSprite(50, 50, 'star');
    //this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.cajonMetal1);


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
        }
    });

    this.input.keyboard.on('keydown', 
    function (event) { 
        console.log(event.keyCode);
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
                interactuarCajones(sc_juegoLocal.player);
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
                interactuarCajones(sc_juegoLocal.player2);
            break;
        }
    });
}

sc_juegoLocal.update = function() {

    sc_juegoLocal.players.children.iterate(function(child){
        child.setVelocityY(child.spdY);
        child.setVelocityX(child.spdX);

        if (child.heldObject == "metal1") {
            child.heldObjectSprite.setTexture('metal1');
            child.heldObjectSprite.setX(child.x);
            child.heldObjectSprite.setY(child.y);
        } else {
            child.heldObjectSprite.setTexture('bomb');
        }
    });
    
    
}

//Configuración de Phaser
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: sc_juegoLocal
};


var game = new Phaser.Game(config);

function interactuarCajones(p) {
    sc_juegoLocal.cajonesMetal.children.iterate(function (child) {
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 40) {
            if (p.heldObject == "none") {
                p.heldObject = child.heldObject;
            }
            else if (p.heldObject == child.heldObject) {
                p.heldObject = "none";
            }
        }
    });
}

