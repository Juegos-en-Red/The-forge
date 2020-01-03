"use strict";

//Variables globales

var cont = {
    p1: {
        //controles
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        i1: 69,
        i2: 81, //cambiar más adelante
        //personaje seleccionado
        ch: 'SSHielo1'
    },
    p2: {
        //controles
        w: 38,
        a: 37,
        s: 40,
        d: 39,
        i1: 80, //cambiar más adelante
        i2: 79, //cambiar más adelante
        //personaje seleccionado
        ch: 'SSElfa1'
    },
    mus_vol: 0.5,
    snd_vol: 0.5,
    online: true,
    server_ip: window.location.href,
    connected: false, 
    id: -1,
    ch: 'SSHielo1',
    name: null,
    lastChatMessage: -1,
    lGuia: true,
    guiaIngame: false,
    guiaOnline: false,
    disconnecting: false,
    prevScene: undefined,
    prevSceneName: "",
    ping: 0,
    connection: undefined
}

//funciones de música por aquí

var mus_menu = new Audio();
mus_menu.src = "../assets/audio/mus_menu.ogg";
mus_menu.loop = true;
mus_menu.volume = cont.mus_vol;

var mus_game = new Audio();
mus_game.src = "../assets/audio/mus_game.ogg";
mus_game.loop = true;
mus_game.volume = cont.mus_vol;

var mus_victory = new Audio();
mus_victory.src = "../assets/audio/mus_victory.ogg";
mus_victory.loop = false;
mus_victory.volume = cont.mus_vol;

var mus_defeat = new Audio();
mus_defeat.src = "../assets/audio/mus_defeat.ogg";
mus_defeat.loop = false;
mus_defeat.volume = cont.mus_vol;

var snd_yunque = new Audio();
snd_yunque.src = "../assets/audio/snd_yunque.ogg";
snd_yunque.loop = false;
snd_yunque.volume = cont.snd_vol;

var unreadChatMessages = [];
var onlineUsers = [];
function fetchChat() {
    if (cont.connected) {
        var start = new Date().getTime();
        $.ajax({
            method: "PUT",
            url: cont.server_ip + "reminder/"+cont.id,
            timeout: 3000,
            data: cont.name,
            processData: false,
            headers: {
                "Content-type": "application/json"
            },
        }).success(function (item) {
            if (cont.disconnecting) {
                cont.disconnecting = false;
            }
            if (cont.prevScene.scene.isActive("DisconnectOverlay")) {
                console.log("Connection restored.");
                if (cont.prevScene == sc_lobby) {
                    showLobbyDom();
                }
                cont.prevScene.scene.stop("DisconnectOverlay");
                cont.prevScene.scene.resume(cont.prevSceneName);
            }
        }).error(function(e,r,t) {
            cont.disconnecting = true;
            setTimeout(function() {
                if (cont.disconnecting && cont.prevSceneName != "MenuPrincipal") {
                    if (cont.prevScene.scene.isActive(cont.prevSceneName)) {
                        if (cont.prevScene == sc_lobby) {
                            hideLobbyDom();
                        }
                        cont.prevScene.scene.pause(cont.prevSceneName);
                        cont.prevScene.scene.launch("DisconnectOverlay");
                        sc_disconnectOverlay.scene.bringToTop();
                    }
                }
            }, 2000);
        });    
        cont.ping = (new Date().getTime() - start);


        if (cont.connection != undefined) {
            //Enviar mensaje de websocket para resetear el timeout
        }

        $.ajax({
            method: "GET",
            url: cont.server_ip + "chat/"+cont.lastChatMessage
        }).success(function (item) {
            //console.log("Último mensaje del chat recibido: " + JSON.stringify(item));
            if (item != undefined) {
                //console.log(item);
                while (item.length != 0)
                    unreadChatMessages.unshift(item.shift());
                
                cont.lastChatMessage = unreadChatMessages[0].id;
            }
            
        });

        $.ajax({
            method: "GET",
            url: cont.server_ip + "users/"
        }).success(function (item) {
            if (item != undefined) {
                //console.log(item);
                onlineUsers = item;
            }
            
        });

        setTimeout(fetchChat, 500);
    }  
}