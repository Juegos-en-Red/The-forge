/*
La licencia irá aquí si no me equivoco
*/
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

//Carga de los assets
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
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaCasco', 
        'assets/SSElfaCasco.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaEspada', 
        'assets/SSElfaEspada.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaMetal', 
        'assets/SSElfaMetal.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaMetalCaliente', 
        'assets/SSElfaMetalCaliente.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaPechera', 
        'assets/SSElfaPechera.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSElfaProtecPiernas', 
        'assets/SSElfaProtecPiernas.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHielo1', 
        'assets/SSHielo1.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloCasco', 
        'assets/SSHieloCasco.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloEspada', 
        'assets/SSHieloEspada.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloMetal', 
        'assets/SSHieloMetal.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloMetalCaliente', 
        'assets/SSHieloMetalCaliente.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloPechera', 
        'assets/SSHieloPechera.png',
        { frameWidth: 117, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloProtecPiernas', 
        'assets/SSHieloProtecPiernas.png',
        { frameWidth: 117, frameHeight: 128 }
    );
}

sc_juegoLocal.create = function() {
    this.add.image(400, 300, 'sky');

    //inicializar jugadores
    sc_juegoLocal.players = this.physics.add.group();

    sc_juegoLocal.player = sc_juegoLocal.players.create(100, 450, 'SSElfa1');
    sc_juegoLocal.player2 = sc_juegoLocal.players.create(200, 450, 'SSHielo1');

    //inicializar características comunes a ambos jugadores
    sc_juegoLocal.players.children.iterate(function (child) {
        child.spdX = 0;
        child.spdY = 0;
        child.heldObject = "none";
        child.heldObjectSprite = sc_juegoLocal.add.image(child.x, child.y, 'empty');
        child.setCollideWorldBounds(true);
        child.interacted = false;
    });
    
    //De las posiciones ya hablaremos luego
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
    
    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.cajonesMetal);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.cajonesMetal);

    //inicializar mesas
    sc_juegoLocal.mesas = this.physics.add.staticGroup();
    sc_juegoLocal.mesas.create(103, 218, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(103, 400, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(667, 218, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(667, 400, 'mesa').heldObject = "none";

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.mesas);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.mesas);

    //inicializar hornos de 1 material
    sc_juegoLocal.hornos = this.physics.add.staticGroup();
    sc_juegoLocal.hornos.create(70, 40, 'horno');
    sc_juegoLocal.hornos.create(140, 40, 'horno doble');
    sc_juegoLocal.hornos.create(670, 40, 'horno');
    sc_juegoLocal.hornos.create(600, 40, 'horno doble');

    sc_juegoLocal.hornos.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.hornos);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.hornos);

    //inicializar yunques de 1 material
    sc_juegoLocal.yunques = this.physics.add.staticGroup();
    sc_juegoLocal.yunques.create(283, 300, 'yunque');
    sc_juegoLocal.yunques.create(283, 125, 'yunque doble');
    sc_juegoLocal.yunques.create(517, 300, 'yunque');
    sc_juegoLocal.yunques.create(517, 125, 'yunque doble');

    sc_juegoLocal.yunques.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.yunques);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.yunques); 

    //inicializar barriles de templado
    sc_juegoLocal.barriles = this.physics.add.staticGroup();
    sc_juegoLocal.barriles.create(283, 218, 'barril de templado');
    sc_juegoLocal.barriles.create(517, 218, 'barril de templado');

    sc_juegoLocal.barriles.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.barriles);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.barriles); 
    
    //inicializar moldes
    sc_juegoLocal.moldes = this.physics.add.staticGroup();
    sc_juegoLocal.moldes.create(283, 400, 'molde');
    sc_juegoLocal.moldes.create(517, 400, 'molde');

    sc_juegoLocal.moldes.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    this.physics.add.collider(sc_juegoLocal.player, sc_juegoLocal.moldes);
    this.physics.add.collider(sc_juegoLocal.player2, sc_juegoLocal.moldes); //en un futuro todos los colliders deberían estar agrupados
    
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
                        if (!interactuarHornos(sc_juegoLocal.player)) {
                            if (!interactuarYunques(sc_juegoLocal.player)) {
                                if (!interactuarBarriles(sc_juegoLocal.player)) {
                                    interactuarMoldes(sc_juegoLocal.player);
                                }
                            }
                        }
                    }
                }
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
                if (!interactuarCajones(sc_juegoLocal.player2)) {
                    if (!interactuarMesas(sc_juegoLocal.player2)) {
                        if (!interactuarHornos(sc_juegoLocal.player2)) {
                            if (!interactuarYunques(sc_juegoLocal.player2)) {
                                if (!interactuarBarriles(sc_juegoLocal.player2)) {
                                    interactuarMoldes(sc_juegoLocal.player2);
                                }
                            }
                        }
                    }
                }
                sc_juegoLocal.player2.interacted = true;
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
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 100 && child.timer < 200) {
            child.timer+=0.25;
            child.text.setText(Math.floor(child.timer) + "%");
        } else if (child.timer >= 200) {
            child.text.setText("200%");
        } else {
            child.text.setText("");
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

//todas estas funciones en un futuro se podrán agrupar probablemente

function interactuarHornos(p) {
    var result = false;
    if (p.interacted != true) {
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
    }
    
    return result;
}

function interactuarYunques(p) {
    var result = false;
    sc_juegoLocal.yunques.children.iterate(function (child) {
        if (child.cooldown == 0 && p.interacted != true){
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
                if (child.timer == -1 && child.heldObject == "none" && (p.heldObject == "metal1rojo" || p.heldObject == "metal2rojo")) {
                    child.heldObject = p.heldObject;
                    p.heldObject = "none";
                    child.timer = 0;
                    child.cooldown = 5;
                } else if (child.timer >= 0 && child.timer < 100) {
                    child.timer += 5;
                    child.cooldown = 15;
                } else if (child.timer >= 100 && p.heldObject == "none") {
                    switch (child.heldObject) {
                        case "metal1rojo":
                            p.heldObject = "metal1yunque";
                        break;
                        case "metal2rojo":
                            p.heldObject = "metal2yunque";
                        break;
                        default:
                                p.heldObject = "none";
                        break;
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
    if (p.interacted != true) {
        sc_juegoLocal.barriles.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer >= 100))) {
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
                    if (child.heldObject == "none" && child.timer == -1 && (p.heldObject == "metal1yunque" || p.heldObject == "metal2yunque" || p.heldObject == "metal1molde" || p.heldObject == "metal2molde")) {
                        child.heldObject = p.heldObject;
                        p.heldObject = "none";
                        child.timer = 0;
                        result = true;
                    } else {
                        if (p.heldObject == "none" && child.timer >= 100 && child.heldObject != "none") {
                            switch (child.heldObject) {
                                case "metal1yunque":
                                    p.heldObject = "metal1yunquetemplado";
                                break;
                                case "metal2yunque":
                                    p.heldObject = "metal2yunquetemplado";
                                break;
                                case "metal1molde":
                                    p.heldObject = "metal1moldetemplado";
                                break;
                                case "metal2molde":
                                    p.heldObject = "metal2moldetemplado";
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
    }
    
    return result;
}

function interactuarMoldes(p) {
    var result = false;
    sc_juegoLocal.moldes.children.iterate(function (child) {
        if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
            if (child.timer == -1 && child.heldObject == "none" && (p.heldObject == "metal1rojo" || p.heldObject == "metal2rojo")) {
                child.heldObject = p.heldObject;
                p.heldObject = "none";
                child.timer = 0;
            } else if (child.timer >= 0 && child.timer < 100) {
                child.timer += 1;
            } else if (child.timer >= 200 && p.heldObject == "none") {
                switch (child.heldObject) {
                    case "metal1rojo":
                        p.heldObject = "metal1molde";
                    break;
                    case "metal2rojo":
                        p.heldObject = "metal2molde";
                    break;
                    default:
                            p.heldObject = "none";
                    break;
                }
                child.heldObject = "none";
                child.timer = -1;
                child.text.setText("");
            }
        }
    });
    
    return result;
}