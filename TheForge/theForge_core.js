"use strict";

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
    scene: [sc_menuPrincipal, sc_juegoLocal] //Importante meter todas las escenas aquí
};


var game = new Phaser.Game(config);