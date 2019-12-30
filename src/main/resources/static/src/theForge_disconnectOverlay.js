"use strict";


var sc_disconnectOverlay = new Phaser.Scene('DisconnectOverlay');

sc_disconnectOverlay.preload = function() {
}

sc_disconnectOverlay.create = function() {

    this.black = sc_disconnectOverlay.add.image(400, 300, "pausedOverlay");
    this.bg = sc_disconnectOverlay.add.image(400, 300, "pausemenu");

    var disconnectButton = sc_disconnectOverlay.add.sprite(550, 350, "botonDesconectar");
    disconnectButton.setInteractive({cursor: "pointer"});
    disconnectButton.on('pointerdown', function (event) {
        sc_disconnectOverlay.scene.stop(cont.prevSceneName);
        cont.disconnecting = false;
        cont.connected = false;
        cont.id = -1;
        cont.name = null;
        cont.lastChatMessage = -1;
        sc_disconnectOverlay.scene.start("MenuPrincipal");
    });

    sc_disconnectOverlay.textInfo = sc_disconnectOverlay.add.text(400, 150, "CONNECTION LOST", {fontSize: '30px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'center'}).setOrigin(0.5, 0.5);
    sc_disconnectOverlay.textInfo2 = sc_disconnectOverlay.add.text(400, 250, "Attempting to reconnect...", {fontSize: '30px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'center'}).setOrigin(0.5, 0.5);
    
}

sc_disconnectOverlay.update = function() {
}