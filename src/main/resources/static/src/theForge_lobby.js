"use strict";

var sc_lobby = new Phaser.Scene("Lobby");

sc_lobby.preload = function() {
}

sc_lobby.create = function() {
    cont.lastChatMessage = -1;
    cont.prevScene = sc_lobby;
    cont.prevSceneName = "Lobby"; //Importante cambiarlo en cada escena en la que se pueda ir la conexión
    this.bg = sc_lobby.add.image(400, 300, "fondo online-lobby");
    var disconnectButton = sc_lobby.add.sprite(85, 556, "botonDesconectar");
    sc_lobby.chatInput = sc_lobby.add.dom(355,557).createFromCache('chatInput');
    sc_lobby.chatBox = sc_lobby.add.dom(355,481).createFromCache('chatBox');
    sc_lobby.usersBox = sc_lobby.add.dom(355,241).createFromCache('usersBox');
    var sendButton = sc_lobby.add.sprite(610, 557, "botonEnviar");

    sc_lobby.pingText = sc_lobby.add.text(790, 10, "Ping: 0", {fontSize: '12px', fontFamily: 'Bookman', color: '#ffffff', stroke: '#000000', strokeThickness: 2, align: 'center'});
    sc_lobby.pingText.setOrigin(1, 0);

    sc_lobby.chatBox.getChildByName('chatBox').value = "";
    //sc_lobby.usersBox.getChildByName('usersBox').value = "";

    disconnectButton.setInteractive({cursor: "pointer"});
    disconnectButton.on('pointerdown', function (event) {
        $.ajax({
            method: "DELETE",
            url: cont.server_ip + "players/"+cont.id
        }).done(function (item) {
            cont.connected = false;
            cont.id = -1;
            cont.name = null;
            cont.lastChatMessage = -1;
            sc_lobby.scene.start("MenuPrincipal");
        }).error(function(item){
            console.log("Something went wrong when disconnecting, but I think you already noticed that.");
        });
    });

    sendButton.setInteractive({cursor: "pointer"});
    sendButton.on('pointerdown', function (event) {
        sendChatMessage();
    });

    //Lo de darle al enter
    this.input.keyboard.on('keyup', 
    function (event) {
        if (event.keyCode == 13 && document.activeElement == sc_lobby.chatInput.getChildByName('chatField')) {
            sendChatMessage();
        }
    });

    //Perfil del usuario
    sc_lobby.profileBG = sc_lobby.add.sprite(5, 5, "recuadroPje");
    sc_lobby.profileBG.setOrigin(0,0);
    sc_lobby.profileText = sc_lobby.add.text(20, 20, "", {fontSize: '20px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'left'});
    sc_lobby.profileText.setOrigin(0, 0);
    sc_lobby.changeCharacterButton = sc_lobby.add.sprite(20, 115, "botonChange");
    sc_lobby.changeCharacterButton.setOrigin(0, 0);
    sc_lobby.changeCharacterButton.setInteractive({cursor: "pointer"});
    sc_lobby.changeCharacterButton.on('pointerdown', function (event) {
        //Cambio de personaje
        sc_lobby.scene.start('SeleccionPersonajeOnline');
        //hideLobbyDom();
    });

}

sc_lobby.update = function() {
    sc_lobby.pingText.setText("Ping: " + cont.ping);

    while (unreadChatMessages.length != 0) {
        var msg = unreadChatMessages.pop();
        if (sc_lobby.chatBox.getChildByName('chatBox').value != "") {
            sc_lobby.chatBox.getChildByName('chatBox').value += "\n";
        }
        sc_lobby.chatBox.getChildByName('chatBox').value += "["+msg.time+"] "+msg.sender+": "+msg.message;
        sc_lobby.chatBox.getChildByName('chatBox').scrollTop = sc_lobby.chatBox.getChildByName('chatBox').scrollHeight;
    }


    var usersList = ""
    for(var i = 0; i < onlineUsers.length; i++) {

        if (onlineUsers[i].id == cont.id) {
            //Este es nuestro perfil, así que vamos a mostrar la información necesaria
            var text = onlineUsers[i].name + "\nWins: " + onlineUsers[i].wins + "\nLosses: " + onlineUsers[i].losses + "\nCharacter: ";
            cont.ch = onlineUsers[i].character;
            switch (onlineUsers[i].character.slice(2,3)) {
                case "H":
                    text += "Ice";
                break;
                case "E":
                    text += "Elf";
                break;
                case "F":
                    text += "Fire";
                break;
            }
            sc_lobby.profileText.setText(text);
        }




        if (onlineUsers[i].timeout > -10) {
            usersList +="<tr><td style='width:200px;border:1px solid black; background-image:url(../assets/online/chatBoxBG.png);'>" + onlineUsers[i].name;
            
            if (onlineUsers[i].inGame) {
                usersList += " (vs. " + onlineUsers[i].opponentName + ")";
            }

            if (onlineUsers[i].timeout < 0) {
                usersList += " (Away)";
            }

            usersList += "</td></tr>"; 
        }
    }
    sc_lobby.usersBox.getChildByID('tabla').innerHTML = usersList;
}

function sendChatMessage() {
    if (sc_lobby.chatInput.getChildByName('chatField').value !== '') {
        $.ajax({
            method: "POST",
            url: cont.server_ip + "chat/",
            data: JSON.stringify({
                sender: cont.name,
                message: sc_lobby.chatInput.getChildByName('chatField').value
            }),
            processData: false,
            headers: {
                "Content-type": "application/json"
            },
            success: function (item, textStatus, jqXHR) {
                sc_lobby.chatInput.getChildByName('chatField').value = "";
            }
        });
    }
}

function hideLobbyDom() {
    sc_lobby.chatBox.getChildByName('chatBox').style.visibility = "hidden";
    sc_lobby.usersBox.getChildByID('usersBox').style.visibility = "hidden";
    sc_lobby.chatInput.getChildByName('chatField').style.visibility = "hidden";
}
function showLobbyDom() {
    sc_lobby.chatBox.getChildByName('chatBox').style.visibility = "visible";
    sc_lobby.usersBox.getChildByID('usersBox').style.visibility = "visible";
    sc_lobby.chatInput.getChildByName('chatField').style.visibility = "visible";
}