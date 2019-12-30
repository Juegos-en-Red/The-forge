"use strict";


var sc_disconnect = new Phaser.Scene('Disconnect');

sc_disconnect.preload = function() {
}

sc_disconnect.create = function() {

    this.bg = sc_disconnect.add.image(400, 300, "fondo online-lobby");

    var disconnectButton = sc_disconnect.add.sprite(90, 556, "botonSalir");
    disconnectButton.setInteractive({cursor: "pointer"});
    disconnectButton.on('pointerdown', function (event) {
            cont.connected = false;
            cont.id = -1;
            cont.name = null;
            cont.lastChatMessage = -1;
            sc_disconnect.scene.start("MenuPrincipal");
    });

    sc_disconnect.textInfo = sc_disconnect.add.text(400, 200, "Se ha interrumpido la conexión con el servidor", {fontSize: '30px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'center'}).setOrigin(0.5, 0.5);
    
}

sc_disconnect.update = function() {
    
}
