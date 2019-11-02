"use strict";

//Escena del menú principal
var sc_menuPrincipal = new Phaser.Scene('MenuPrincipal');

sc_menuPrincipal.preload = function() {
    
}

sc_menuPrincipal.create = function() {

    //Música. Si se añade más música es importante parar aquí toda la que haya
    mus_game.pause();
    mus_game.currentTime = 0;
    mus_menu.play();
}

sc_menuPrincipal.update = function() {
    if (sc_menuPrincipal.input.activePointer.isDown) {
        this.scene.start("JuegoLocal"); //Con este comando se cambia de escenas
    }
}