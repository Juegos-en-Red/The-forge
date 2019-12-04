"use strict";

var sc_lobby = new Phaser.Scene("Lobby");

sc_lobby.preload = function() {
    this.load.html('chatBox', '../src/chatBox.html');
    this.load.html('chatInput', '../src/chatInput.html');
    this.load.html('usersBox', '../src/usersBox.html');
}

sc_lobby.create = function() {
    this.bg = sc_lobby.add.image(400, 300, "fondo online-lobby");
    var disconnectButton = sc_lobby.add.sprite(79, 556, "botonDesconectar");
    var chatInput = sc_lobby.add.dom(355,557).createFromCache('chatInput');
    sc_lobby.chatBox = sc_lobby.add.dom(355,482).createFromCache('chatBox');
    sc_lobby.usersBox = sc_lobby.add.dom(355,241).createFromCache('usersBox');
    var sendButton = sc_lobby.add.sprite(591, 547, "botonEnviar");

    sc_lobby.chatBox.getChildByName('chatBox').value = "";
    sc_lobby.usersBox.getChildByName('usersBox').value = "";

    disconnectButton.setInteractive();
    disconnectButton.on('pointerdown', function (event) {
        $.ajax({
            method: "DELETE",
            url: "http://" + cont.server_ip + "/players/"+cont.id
        }).done(function (item) {
            cont.server_ip = null;
            cont.connected = false;
            cont.id = -1;
            cont.name = null;
            sc_lobby.scene.start("MenuPrincipal");
        }).error(function(item){
            console.log("Algo ha salido mal al desconectarte. Una pena que no vayas a saberlo porque esto es un console.log");
        });
    });

    sendButton.setInteractive();
    sendButton.on('pointerdown', function (event) {
        if (chatInput.getChildByName('chatField').value !== '') {
            $.ajax({
                method: "POST",
                    url: "http://" + cont.server_ip + "/chat/",
                    data: JSON.stringify({
                        sender: cont.name,
                        message: chatInput.getChildByName('chatField').value
                    }),
                    processData: false,
                    headers: {
                        "Content-type": "application/json"
                    },
                    success: function(item, textStatus, jqXHR) {
                        chatInput.getChildByName('chatField').value = "";
                    }
            });
        }
    })
}

sc_lobby.update = function() {
    while (unreadChatMessages.length != 0) {
        var msg = unreadChatMessages.pop();
        sc_lobby.chatBox.getChildByName('chatBox').value += "["+msg.time+"] "+msg.sender+": "+msg.message+"\n";
        if (document.activeElement !== sc_lobby.chatBox.getChildByName('chatBox')) {
            sc_lobby.chatBox.getChildByName('chatBox').scrollTop = sc_lobby.chatBox.getChildByName('chatBox').scrollHeight;
        }
    }
    sc_lobby.usersBox.getChildByName('usersBox').value = "USUARIOS CONECTADOS\n";
    for(var i = 0; i < onlineUsers.length; i++) {
        sc_lobby.usersBox.getChildByName('usersBox').value += onlineUsers[i]+"\n";
    }
       
}