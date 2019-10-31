"use strict";

//Escena del juego en local
var sc_juegoLocal = new Phaser.Scene('JuegoLocal');

sc_juegoLocal.preload = function() {
    this.load.image('sky', 'assets/sky.png');
    /*this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');*/
    this.load.image('metal1', 'assets/metal1.png');
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
    this.load.image('empty', 'assets/empty.png');
    this.load.image('cajon', 'assets/cajon.png');
    this.load.image('mesa', 'assets/mesa.png');
    this.load.image('horno', 'assets/horno.png');
    this.load.image('yunque', 'assets/yunque.png');
    this.load.image('barril', 'assets/barril.png');
    this.load.image('molde', 'assets/molde.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('SSHielo1', 
        'assets/SSHielo1.png',
        { frameWidth: 121, frameHeight: 128 }
    );
    this.load.spritesheet('SSHieloCasco', 
        'assets/SSHieloCasco.png',
        { frameWidth: 121, frameHeight: 128 }
    );
}

sc_juegoLocal.create = function() {
    this.add.image(400, 300, 'sky');

    //inicializar jugadores
    sc_juegoLocal.players = this.physics.add.group();

    sc_juegoLocal.player = sc_juegoLocal.players.create(100, 450, 'SSHielo1');
    sc_juegoLocal.player2 = sc_juegoLocal.players.create(200, 450, 'dude');

    //inicializar características comunes a ambos jugadores
    var that = this;
    sc_juegoLocal.players.children.iterate(function (child) {
        child.spdX = 0;
        child.spdY = 0;
        child.heldObject = "none";
        child.hos = that.physics.add.group();
        child.heldObjectSprite = child.hos.create(child.x, child.y, 'empty');
        child.setCollideWorldBounds(true);
        child.heldObjectSprite.setCollideWorldBounds(true);
        child.setSize(121, 128);
        child.heldObjectSprite.setSize(121, 128);
        child.interacted = false;
        child.chocado = false;
    });
    

    //inicializar cajones
    sc_juegoLocal.cajonesMetal = this.physics.add.staticGroup();
    sc_juegoLocal.cajonesMetal.create(50, 50, 'cajon').heldObject = "metal1";
    sc_juegoLocal.cajonesMetal.create(150, 50, 'cajon').heldObject = "metal2";
    

    //inicializar mesas
    sc_juegoLocal.mesas = this.physics.add.staticGroup();
    sc_juegoLocal.mesas.create(100, 50, 'mesa').heldObject = "none";
    sc_juegoLocal.mesas.create(200, 50, 'mesa').heldObject = "none";


    //inicializar hornos de 1 material
    sc_juegoLocal.hornos = this.physics.add.staticGroup();
    sc_juegoLocal.hornos.create(250, 50, 'horno');

    sc_juegoLocal.hornos.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });


    //inicializar yunques de 1 material
    sc_juegoLocal.yunques = this.physics.add.staticGroup();
    sc_juegoLocal.yunques.create(300, 50, 'yunque');

    sc_juegoLocal.yunques.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });


    //inicializar barriles de templado
    sc_juegoLocal.barriles = this.physics.add.staticGroup();
    sc_juegoLocal.barriles.create(350, 50, 'barril');

    sc_juegoLocal.barriles.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    
    //inicializar moldes
    sc_juegoLocal.moldes = this.physics.add.staticGroup();
    sc_juegoLocal.moldes.create(400, 50, 'molde');

    sc_juegoLocal.moldes.children.iterate(function(child){
        child.heldObject = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });

    
    //inicializar hornos de 2 materiales
    sc_juegoLocal.hornosd = this.physics.add.staticGroup();
    sc_juegoLocal.hornosd.create(450, 50, 'horno');

    sc_juegoLocal.hornosd.children.iterate(function(child){
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
    });



    //inicializar yunques de 2 materiales
    sc_juegoLocal.yunquesd = this.physics.add.staticGroup();
    sc_juegoLocal.yunquesd.create(500, 50, 'yunque');

    sc_juegoLocal.yunquesd.children.iterate(function(child){
        child.heldObject1 = "none";
        child.heldObject2 = "none";
        child.timer = -1;
        child.cooldown = 0;
        child.text = sc_juegoLocal.add.text(child.x-20, child.y-40, "", {color: '#000'});
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

        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.mesas);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.cajonesMetal);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.hornos);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.yunques);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.barriles);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.moldes);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.hornosd);
        that.physics.add.collider(child.heldObjectSprite, sc_juegoLocal.yunquesd);
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
}

sc_juegoLocal.update = function(time, delta) {

    sc_juegoLocal.players.children.iterate(function(child){
        var hoSpdX, hoSpdY;
        if (child.heldObject == "none") {
            child.setVelocityY(child.spdY);
            child.setVelocityX(child.spdX);
            hoSpdX = child.spdX;
            hoSpdY = child.spdY;
        } else {
            
            child.setVelocityY(child.spdY/2);
            child.setVelocityX(child.spdX/2);
            hoSpdX = child.spdX/2;
            hoSpdY = child.spdY/2;
        }
        child.heldObjectSprite.setVelocityX(hoSpdX);
        child.heldObjectSprite.setVelocityY(hoSpdY);
        if (child.heldObjectSprite.x != child.x) {child.heldObjectSprite.setX(child.x);child.heldObjectSprite.setVelocityX(0);}
        if (child.heldObjectSprite.y != child.y) {child.heldObjectSprite.setY(child.y);child.heldObjectSprite.setVelocityY(0);}

        if (child.heldObject == "none") {
            child.heldObjectSprite.setTexture('empty');
            //child.heldObjectSprite.setTexture('SSHieloCasco'); //quitar esta linea por favor
        } else {
            child.heldObjectSprite.setTexture(child.heldObject); //de momento
        }
        switch (child.heldObject) {
            case "":
                break;
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
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
    if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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

    if (p.interacted != true) {
        sc_juegoLocal.barriles.children.iterate(function (child) {
            if ((child.timer == -1 || (child.timer >= 100))) {
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
                if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
            if (Phaser.Math.Distance.Between(p.x, p.y, child.x, child.y) < 0.5*Math.max(child.displayWidth, child.displayHeight)+0.75*Math.max(p.displayWidth, p.displayHeight)) {
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
                        console.log(p.heldObject);
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