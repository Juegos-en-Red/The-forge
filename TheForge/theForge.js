"use strict";

//Variables globales




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
    sc_juegoLocal.player = this.physics.add.sprite(100, 450, 'dude');
    sc_juegoLocal.player.spdX = 0;
    sc_juegoLocal.player.spdY = 0;
    sc_juegoLocal.player.heldObject = "metal1";
    sc_juegoLocal.player.heldObjectSprite = this.add.image(sc_juegoLocal.player.body.x, sc_juegoLocal.player.y, null);
    
    sc_juegoLocal.player2 = this.physics.add.sprite(200, 450, 'dude');
    sc_juegoLocal.player2.spdX = 0;
    sc_juegoLocal.player2.spdY = 0;
    sc_juegoLocal.player2.heldObject = "none";

    //inicializar cajones
    sc_juegoLocal.cajonMetal1 = this.physics.add.staticSprite(50, 50, 'star');
    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.cajonMetal1);


    this.input.keyboard.on('keyup', 
    function (event) {
        switch (event.keyCode) {
            case 87:
                if (sc_juegoLocal.player.spdY <= 0) {
                    sc_juegoLocal.player.spdY = 0;
                }
            break;
            case 83:
                if (sc_juegoLocal.player.spdY >= 0) {
                    sc_juegoLocal.player.spdY = 0;
                }
            break;
            case 65:
                if (sc_juegoLocal.player.spdX <= 0) {
                    sc_juegoLocal.player.spdX = 0;
                }
            break;
            case 68:
                if (sc_juegoLocal.player.spdX >= 0) {
                    sc_juegoLocal.player.spdX = 0;
                }
            break;
            case 38:
                if (sc_juegoLocal.player2.spdY <= 0) {
                    sc_juegoLocal.player2.spdY = 0;
                }
            break;
            case 40:
                if (sc_juegoLocal.player2.spdY >= 0) {
                    sc_juegoLocal.player2.spdY = 0;
                }
            break;
            case 37:
                if (sc_juegoLocal.player2.spdX <= 0) {
                    sc_juegoLocal.player2.spdX = 0;
                }
            break;
            case 39:
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
            case 87:
                    sc_juegoLocal.player.spdY = -400;
            break;
            case 83:
                    sc_juegoLocal.player.spdY = 400;
            break;
            case 65:
                    sc_juegoLocal.player.spdX = -400;
            break;
            case 68:
                    sc_juegoLocal.player.spdX = 400;
            break;
            //interactuar con cajones y cosas
            case 69:
                    if (Phaser.Math.Distance.Between(sc_juegoLocal.player.x, sc_juegoLocal.player.y, sc_juegoLocal.cajonMetal1.x, sc_juegoLocal.cajonMetal1.y) < 40) {
                        if (sc_juegoLocal.player.heldObject == "none") {
                            sc_juegoLocal.player.heldObject = "metal1";
                        } else if (sc_juegoLocal.player.heldObject == "metal1") {
                            sc_juegoLocal.player.heldObject = "none";
                        }
                    }
            break;

            //jugador 2
            case 38:
                    sc_juegoLocal.player2.spdY = -400;
            break;
            case 40:
                    sc_juegoLocal.player2.spdY = 400;
            break;
            case 37:
                    sc_juegoLocal.player2.spdX = -400;
            break;
            case 39:
                    sc_juegoLocal.player2.spdX = 400;
            break;
        }
    });
}

sc_juegoLocal.update = function() {

    sc_juegoLocal.player.setVelocityY(sc_juegoLocal.player.spdY);
    sc_juegoLocal.player.setVelocityX(sc_juegoLocal.player.spdX);
    sc_juegoLocal.player2.setVelocityY(sc_juegoLocal.player2.spdY);
    sc_juegoLocal.player2.setVelocityX(sc_juegoLocal.player2.spdX);


    if (sc_juegoLocal.player.heldObject == "metal1") {

        sc_juegoLocal.player.heldObjectSprite.setTexture('metal1');
        sc_juegoLocal.player.heldObjectSprite.setX(sc_juegoLocal.player.x);
        sc_juegoLocal.player.heldObjectSprite.setY(sc_juegoLocal.player.y);
    } else {
        sc_juegoLocal.player.heldObjectSprite.setTexture(null);
    }
    
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

