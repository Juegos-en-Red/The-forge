"use strict";

//Configuración de Phaser
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,    
    parent: "game",
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [sc_Preloader, sc_menuPrincipal, sc_Guia, sc_menuAjustes, sc_SeleccionPersonaje, sc_juegoLocal, sc_onlineIP, sc_lobby] //Importante meter todas las escenas aquí
};


var game = new Phaser.Game(config);