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
    guiaIngame: false
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

        $.ajax({
            method: "PUT",
            url: cont.server_ip + "reminder/"+cont.id,
            timeout: 3000
        }).done(function (item) {
            //console.log("Nuevo timeout: " + JSON.stringify(item));
        }).error(function(e) {
            cont.connected = false;
            sc_lobby.scene.start("Disconnect");
        });

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