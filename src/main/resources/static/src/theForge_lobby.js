"use strict";

var sc_lobby = new Phaser.Scene("Lobby");

sc_lobby.preload = function() {
}

sc_lobby.create = function() {
    cont.prevScene = sc_lobby;
    cont.prevSceneName = "Lobby"; //Importante cambiarlo en cada escena en la que se pueda ir la conexión
    this.bg = sc_lobby.add.image(400, 300, "fondo online-lobby");
    var disconnectButton = sc_lobby.add.sprite(79, 556, "botonDesconectar");
    sc_lobby.chatInput = sc_lobby.add.dom(355,557).createFromCache('chatInput');
    sc_lobby.chatBox = sc_lobby.add.dom(355,481).createFromCache('chatBox');
    sc_lobby.usersBox = sc_lobby.add.dom(355,241).createFromCache('usersBox');
    var sendButton = sc_lobby.add.sprite(591, 547, "botonEnviar");

    sc_lobby.chatBox.getChildByName('chatBox').value = "";
    sc_lobby.usersBox.getChildByName('usersBox').value = "";

    disconnectButton.setInteractive();
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
            console.log("Algo ha salido mal al desconectarte, pero creo que ya te has dado cuenta de eso.");
        });
    });

    sendButton.setInteractive();
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


}

sc_lobby.update = function() {
    while (unreadChatMessages.length != 0) {
        var msg = unreadChatMessages.pop();
        sc_lobby.chatBox.getChildByName('chatBox').value += "["+msg.time+"] "+msg.sender+": "+msg.message+"\n";
        sc_lobby.chatBox.getChildByName('chatBox').scrollTop = sc_lobby.chatBox.getChildByName('chatBox').scrollHeight;
    }
    sc_lobby.usersBox.getChildByName('usersBox').value = "USUARIOS CONECTADOS\n";
    for(var i = 0; i < onlineUsers.length; i++) {
        sc_lobby.usersBox.getChildByName('usersBox').value += onlineUsers[i]+"\n";
    }
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
    sc_lobby.usersBox.getChildByName('usersBox').style.visibility = "hidden";
    sc_lobby.chatInput.getChildByName('chatField').style.visibility = "hidden";
}
function showLobbyDom() {
    sc_lobby.chatBox.getChildByName('chatBox').style.visibility = "visible";
    sc_lobby.usersBox.getChildByName('usersBox').style.visibility = "visible";
    sc_lobby.chatInput.getChildByName('chatField').style.visibility = "visible";
}