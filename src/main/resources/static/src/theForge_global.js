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
    server_ip: null,
    connected: false, 
    id: -1,
    ch: 'SSHielo1'
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

var snd_yunque = new Audio();
snd_yunque.src = "../assets/audio/snd_yunque.ogg";
snd_yunque.loop = false;
snd_yunque.volume = cont.snd_vol;

function contactServer() {
    if (cont.connected) {
        console.log(cont.id);
        $.ajax({
            method: "PUT",
            url: "http://" + cont.server_ip + "/reminder/"+cont.id,
            data: JSON.stringify({timeout: 10}),
            processData: false,
            headers: {
                "Content-type": "application/json"
            }
        }).done(function (item) {
            console.log("Item updated: " + JSON.stringify(item));
        });
        setTimeout(contactServer, 3000)
    }
}