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
        },
        fps: 50
    },
    scene: [sc_Preloader, sc_menuPrincipal, sc_SeleccionPersonaje, sc_Game, sc_Guia] //Importante meter todas las escenas aquí
};


var game = new Phaser.Game(config);