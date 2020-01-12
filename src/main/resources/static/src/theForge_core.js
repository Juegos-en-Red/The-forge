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
    scene: [sc_Preloader,  sc_disconnectOverlay,sc_menuPrincipal, sc_Creditos, sc_Guia, sc_Tutorial, sc_menuAjustes, sc_SeleccionPersonaje, sc_juegoLocal, sc_onlineIP, sc_lobby, sc_disconnect, sc_SeleccionPersonajeOnline, sc_juegoOnline] //Importante meter todas las escenas aquí
};


var game = new Phaser.Game(config);