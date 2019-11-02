"use strict";

//Escena del menú principal
var sc_menuPrincipal = new Phaser.Scene('MenuPrincipal');

sc_menuPrincipal.preload = function() {
    
}

sc_menuPrincipal.create = function() {
    
}

sc_menuPrincipal.update = function() {
    if (sc_menuPrincipal.input.activePointer.isDown) {
        this.scene.start("JuegoLocal"); //Con este comando se cambia de escenas
    }
}