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
    /*this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');*/
    this.load.image('metal1', 'assets/metal1.png');
    this.load.image('metal2', 'assets/metal2.png');
    this.load.image('metal1rojo', 'assets/metal1rojo.png');
    this.load.image('metal2rojo', 'assets/metal2rojo.png');
    this.load.image('empty', 'assets/empty.png');
    this.load.image('cajon', 'assets/cajon.png');
    this.load.image('mesa', 'assets/mesa.png');
    this.load.image('horno', 'assets/horno.png');
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
        child.heldObjectSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
        child.setCollideWorldBounds(true);
    });
    

    //inicializar cajones
    sc_juegoLocal.cajonesMetal = this.physics.add.staticGroup();
    sc_juegoLocal.cajonesMetal.create(50, 50, 'cajon').heldObject = "metal1";
    sc_juegoLocal.cajonesMetal.create(150, 50, 'cajon').heldObject = "metal2";
    
    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.cajonesMetal);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.cajonesMetal);

    //inicializar mesas
    sc_juegoLocal.mesas = this.physics.add.staticGroup();
    sc_juegoLocal.mesas.create(100, 50, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(200, 50, 'mesa').heldObject = "none";

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.mesas);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.mesas);

    //inicializar hornos de 1 material
    sc_juegoLocal.hornos = this.physics.add.staticGroup();
    sc_juegoLocal.hornos.create(250, 50, 'horno');

    sc_juegoLocal.hornos.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.hornos);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.hornos); //en un futuro todos los colliders deberían estar agrupados

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
                if (!interactuarCajones(sc_juegoLocal.player)) {
                    if (!interactuarMesas(sc_juegoLocal.player)) {
                        interactuarHornos(sc_juegoLocal.player);
                    }
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
                if (!interactuarCajones(sc_juegoLocal.player2)) {
                    if (!interactuarMesas(sc_juegoLocal.player2)) {
                        interactuarHornos(sc_juegoLocal.player2);
                    }
                }
            break;
        }
    });
}

sc_juegoLocal.update = function() {

    sc_juegoLocal.players.children.iterate(function(child){
        if (child.heldObject == "none") {
            child.setVelocityY(child.spdY);
            child.setVelocityX(child.spdX);
        } else {
            
            child.setVelocityY(child.spdY/2);
            child.setVelocityX(child.spdX/2);
        }

        if (child.heldObject == "none") {
            child.heldObjectSprite.setTexture('empty');
        } else {
            child.heldObjectSprite.setTexture(child.heldObject); //de momento
            child.heldObjectSprite.setX(child.x);
            child.heldObjectSprite.setY(child.y);
        }
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
            child.timer+=0.125;
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 100 && child.timer < 150) {
            child.timer+=0.125;
            child.text.setText("100%");
        } else if (child.timer >= 150 && child.timer < 200) {
            child.timer+=0.125;
            child.text.setText("QUEMADO");
        } else if (child.timer >= 200) {
            child.timer = -1;
            child.heldObject = "none";
        } else {
            child.text.setText(child.timer);
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
    var result = false;
    sc_juegoLocal.cajonesMetal.children.iterate(function (child) {
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
            var temp = child.heldObject;
            child.heldObject = p.heldObject;
            p.heldObject = temp;
            result = true;
        }
    });
    return result;
}

function interactuarHornos(p) {
    var result = false;
    sc_juegoLocal.hornos.children.iterate(function (child) {
        if ((child.timer == -1 || (child.timer > 100 && child.timer < 150))) {
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
                if (child.heldObject == "none" && child.timer == -1 && (p.heldObject == "metal1" || p.heldObject == "metal2")) {
                    child.heldObject = p.heldObject;
                    p.heldObject = "none";
                    child.timer = 0;
                    result = true;
                } else {
                    if (p.heldObject == "none" && child.timer > 100 && child.heldObject != "none") {
                        switch (child.heldObject) {
                            case "metal1":
                                p.heldObject = "metal1rojo";
                            break;
                            case "metal2":
                                p.heldObject = "metal2rojo";
                            break;
                            default:
                                    p.heldObject = "none";
                            break;
                        }
                        child.heldObject = "none";
                        child.timer = -1;
                        result = true;
                    }
                }
            }
        }
    });
    
    return result;
}