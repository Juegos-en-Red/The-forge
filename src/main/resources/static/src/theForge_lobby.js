"use strict";

var sc_lobby = new Phaser.Scene("Lobby");

sc_lobby.preload = function() {
}

sc_lobby.create = function() {
    sc_lobby.openEnemyName = "none";
    sc_lobby.userBoxOpen = false;
    sc_lobby.userChallenging = false;
    cont.lastChatMessage = -1;
    cont.prevScene = sc_lobby;
    cont.prevSceneName = "Lobby"; //Importante cambiarlo en cada escena en la que se pueda ir la conexión
    cont.connection = undefined;
    this.bg = sc_lobby.add.image(400, 300, "fondo online-lobby");
    var disconnectButton = sc_lobby.add.sprite(85, 556, "botonDesconectar");
    sc_lobby.chatInput = sc_lobby.add.dom(355,557).createFromCache('chatInput');
    sc_lobby.chatBox = sc_lobby.add.dom(355,481).createFromCache('chatBox');
    sc_lobby.usersBox = sc_lobby.add.dom(355,241).createFromCache('usersBox');
    var sendButton = sc_lobby.add.sprite(610, 557, "botonEnviar");

    sc_lobby.pingText = sc_lobby.add.text(790, 10, "Ping: 0", {fontSize: '12px', fontFamily: 'Bookman', color: '#ffffff', stroke: '#000000', strokeThickness: 2, align: 'center'});
    sc_lobby.pingText.setOrigin(1, 0);

    sc_lobby.chatBox.getChildByName('chatBox').value = "";

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
        if (cont.connection != undefined) {
            cont.connection.close();
        }
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
    });

    //Perfil de otro jugador
    sc_lobby.enemyProfileBG = sc_lobby.add.sprite(449, 100, "recuadroPje");
    sc_lobby.enemyProfileBG.setOrigin(0,0);
    sc_lobby.enemyProfileText = sc_lobby.add.text(464, 115, "", {fontSize: '20px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'left'});
    sc_lobby.enemyProfileText.setOrigin(0, 0);
    sc_lobby.challengeButton = sc_lobby.add.sprite(464, 210, "botonChallenge");
    sc_lobby.challengeButton.setOrigin(0, 0);
    sc_lobby.challengeButton.setInteractive({cursor: "pointer"});
    sc_lobby.challengeButton.on('pointerdown', function (event) {
        //Decirle al servidor que quieres desafiar a tal persona
        //AJAX (PUT) CON:
        // cont.id en la url
        // sc_lobby.openEnemyName como data
        //Si te dice que todo bien, pues te toca esperar a que te acepte o no.
        //En el servidor debería actualizar los datos de un jugador en los del otro y viceversa (si es que se puede, claro)
        console.log(sc_lobby.openEnemyName);
        $.ajax({
            method: "PUT",
            url: cont.server_ip + "challenge/"+cont.id,
            timeout: 3000,
            data: sc_lobby.openEnemyName,
            processData: false,
            headers: {
                "Content-type": "application/json"
            },
        }).success(function (item) {
            console.log("Challenge sent.");
        }).error(function(e) {
            console.log("Couldn't challenge that player.");
            console.log(e);
        });   
    });
    sc_lobby.enemyCross = sc_lobby.add.sprite(597, 115, "cruz3");
    sc_lobby.enemyCross.setOrigin(0, 0);
    sc_lobby.enemyCross.setInteractive({cursor: "pointer"});
    
    sc_lobby.enemyProfileBG.setVisible(false);
    sc_lobby.enemyProfileText.setVisible(false);
    sc_lobby.challengeButton.setVisible(false);
    sc_lobby.enemyCross.setVisible(false);

    sc_lobby.enemyCross.on('pointerdown', function (event) {
        sc_lobby.enemyProfileBG.setVisible(false);
        sc_lobby.enemyProfileText.setVisible(false);
        sc_lobby.challengeButton.setVisible(false);
        sc_lobby.challengeButton.removeInteractive();
        sc_lobby.enemyCross.setVisible(false);
        sc_lobby.enemyCross.removeInteractive();
        sc_lobby.userBoxOpen = false;
    });

    //Cuadro de que te están desafiando
    sc_lobby.challengeBG = sc_lobby.add.sprite(560, 230, "recuadroDesafio");
    sc_lobby.challengeText = sc_lobby.add.text(560, 160, "\nWants to fight!", {fontSize: '24px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'center'});
    sc_lobby.challengeText.setOrigin(0.5,0.5);
    sc_lobby.acceptButton = sc_lobby.add.sprite(560, 230, "botonAccept");
    sc_lobby.declineButton = sc_lobby.add.sprite(560, 300, "botonDecline");

    //Hacer que no se vean
    sc_lobby.challengeBG.setVisible(false);
    sc_lobby.challengeText.setVisible(false);
    sc_lobby.acceptButton.setVisible(false);
    sc_lobby.declineButton.setVisible(false);

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

            if (onlineUsers[i].inGame && cont.connection == undefined) { 
                //Si tenemos que estar en partida, abrimos websocket
                sc_lobby.opponentName = onlineUsers[i].opponentName;
                var wsUrl;
                if (cont.server_ip.slice(0,4) == "http") {
                    wsUrl = cont.server_ip.slice(4);
                } else if (cont.server_ip.slice(0,5) == "https") {
                    wsUrl = cont.server_ip.slice(5);
                }
                cont.connection = new WebSocket("ws"+wsUrl+"echo");
                cont.connection.onopen = function() {
                    console.log("Websocket opened");
                    cont.connection.send(JSON.stringify({
                        message_type: "OPEN2",
                        opponent_name: sc_lobby.opponentName,
                        player_name: cont.name,
                        player_character: cont.ch
                    }));
                }
                cont.connection.onerror = function(e) {
                    console.log("WS error: " + e);
                }
                cont.connection.onmessage = function(msg) {
                    websocketOnMessage(msg);
                }
                cont.connection.onclose = function() {
                    console.log("Websocket closed.");
                }
            }


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

            //Si nos están desafiando, que salga la caja
            if (onlineUsers[i].opponentName != "" && !onlineUsers[i].sendingChallenge) {
                if (!sc_lobby.challengeBG.visible) {
                    sc_lobby.challengeBG.setVisible(true);
                    sc_lobby.challengeText.setVisible(true);
                    sc_lobby.challengeText.setText(onlineUsers[i].opponentName+"\nWants to fight!");
                    sc_lobby.acceptButton.setVisible(true);
                    sc_lobby.acceptButton.setInteractive({cursor: "pointer"});

                    sc_lobby.acceptButton.on('pointerdown', function (event) {

                        //Primero mandar una petición ajax diciendo que entramos en partida para que el otro jugador se pueda enterar
                        $.ajax({
                            method: "PUT",
                            url: cont.server_ip + "beginGame/"+cont.id,
                            timeout: 3000,
                            data: cont.name,
                            processData: false,
                            headers: {
                                "Content-type": "application/json"
                            },
                        }).success(function (item) {
                            console.log("Challenge accepted.");
                            var wsUrl;
                            if (cont.server_ip.slice(0,4) == "http") {
                                wsUrl = cont.server_ip.slice(4);
                            } else if (cont.server_ip.slice(0,5) == "https") {
                                wsUrl = cont.server_ip.slice(5);
                            }
                            cont.connection = new WebSocket("ws"+wsUrl+"echo");
                            cont.connection.onopen = function() {
                                console.log("Websocket opened");
                                cont.connection.send(JSON.stringify({
                                    message_type: "OPEN",
                                    opponent_name: sc_lobby.declineButton.opponentName,
                                    player_name: cont.name,
                                    player_character: cont.ch,//cambiarlo en el otro sitio tambien
                                }));
                            }
                            cont.connection.onerror = function(e) {
                                console.log("WS error: " + e);
                            }
                            cont.connection.onmessage = function(msg) {
                                websocketOnMessage(msg);
                            }
                            cont.connection.onclose = function() {
                                console.log("Websocket closed.");
                            }
                        }).error(function(e) {
                            console.log("Couldn't accept that challenge.");
                        });   


                        
                    });

                    sc_lobby.declineButton.setVisible(true);
                    sc_lobby.declineButton.setInteractive({cursor: "pointer"});
                    sc_lobby.declineButton.opponentName = onlineUsers[i].opponentName;

                    sc_lobby.declineButton.on('pointerdown', function (event) {
                        $.ajax({
                            method: "DELETE",
                            url: cont.server_ip + "challenge/"+cont.id,
                            timeout: 3000,
                            data: sc_lobby.declineButton.opponentName,
                            processData: false,
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).done(function (item) {
                            console.log("Challenge declined");
                        }).error(function(item){
                            console.log("Challenge couldn't be declined");
                        });
                    });

                    if (sc_lobby.userBoxOpen) {
                        sc_lobby.enemyCross.removeInteractive();
                        if (sc_lobby.challengeButton.visible) {
                            sc_lobby.challengeButton.removeInteractive();
                        }
                    }
                }
            } else {
                if (sc_lobby.challengeBG.visible) {
                    sc_lobby.challengeBG.setVisible(false);
                    sc_lobby.challengeText.setVisible(false);
                    sc_lobby.acceptButton.setVisible(false);
                    sc_lobby.acceptButton.removeInteractive();
                    sc_lobby.declineButton.setVisible(false);
                    sc_lobby.declineButton.removeInteractive();
                    if (sc_lobby.userBoxOpen) {
                        sc_lobby.enemyCross.setInteractive({cursor: "pointer"});
                        if (sc_lobby.challengeButton.visible) {
                            sc_lobby.challengeButton.setInteractive({cursor: "pointer"});
                        }
                    }
                }
            }

            //Si estamos desafiando a alguien, que no podamos intentar desafiar a otro
            if (onlineUsers[i].opponentName != "") {
                sc_lobby.userChallenging = true;
            } else {
                sc_lobby.userChallenging = false;
            }
            
        }




        if (onlineUsers[i].timeout > -10) {
            usersList +="<tr onmousedown='showUserProfile(onlineUsers["+i+"])'><td id='row'  style='cursor:pointer;width:200px;border:1px solid black; background-image:url(../assets/online/chatBoxBG.png);'>" + onlineUsers[i].name;
            
            if (onlineUsers[i].inGame) {
                usersList += " (vs. " + onlineUsers[i].opponentName + ")";
            } else if (onlineUsers[i].opponentName != "") {
                if (onlineUsers[i].sendingChallenge) {
                    usersList += " (Challenging " + onlineUsers[i].opponentName + "...)";
                } else {
                    usersList += " (Challenged by " + onlineUsers[i].opponentName + "...)";
                }
            }

            if (onlineUsers[i].timeout < 0) {
                usersList += " (Away)";
            }

            usersList += "</td></tr>"; 
        }
    }
    sc_lobby.usersBox.getChildByID('tabla').innerHTML = usersList;
    updateEnemyProfile();
}

function websocketOnMessage(msg) {
    var message = JSON.parse(msg.data);
    if (message.message_type == "begin_game") {
        if (message.player_1 == cont.name) {
            sc_lobby.playercontrolling = 1;
        } else {
            sc_lobby.playercontrolling = 2;
        }
        cont.p1.ch = message.p2_character;
        cont.p2.ch = message.p1_character;
        sc_lobby.scene.start("JuegoOnline");
    } else {
        //if (sc_juegoOnline.scene.isActive()) { //No debería hacer falta, espero
            switch(message.message_type) {
                case "game_time":
                    sc_juegoOnline.gameTime = message.game_time;
                break;
                case "trap_change":
                    if (message.target == "altar") {
                        if (message.trap == "none") {
                            sc_juegoOnline.altarTrampas.setTexture("altar1");
                        } else {
                            sc_juegoOnline.altarTrampas.setTexture("altar2");
                        }
                        sc_juegoOnline.altarTrampas.trampa = message.trap;
                    } else {
                        if (message.target == cont.name) {
                            //cambiar la trampa que lleva el jugador
                        } else {
                            //cambiar la trampa que lleva el oponente
                        }
                    }
                break;
            }
        /*} else {
            console.log("Received WebSocket message, but game scene isn't loaded.");
        }*/
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
    sc_lobby.usersBox.getChildByID('usersBox').style.visibility = "hidden";
    sc_lobby.chatInput.getChildByName('chatField').style.visibility = "hidden";
}
function showLobbyDom() {
    sc_lobby.chatBox.getChildByName('chatBox').style.visibility = "visible";
    sc_lobby.usersBox.getChildByID('usersBox').style.visibility = "visible";
    sc_lobby.chatInput.getChildByName('chatField').style.visibility = "visible";
}

function showUserProfile(player) {
    sc_lobby.openEnemyName = player.name;
    sc_lobby.enemyProfileBG.setVisible(true);
    sc_lobby.enemyProfileText.setVisible(true);
    sc_lobby.enemyCross.setVisible(true);
    sc_lobby.enemyCross.setInteractive({cursor: "pointer"});
    sc_lobby.userBoxOpen = true;

    if (player.name != cont.name) {
        sc_lobby.challengeButton.setVisible(true);
        sc_lobby.challengeButton.setInteractive({cursor: "pointer"});
        sc_lobby.challengeButton.setAlpha(1);
    } else {
        sc_lobby.challengeButton.setVisible(false);
        sc_lobby.challengeButton.removeInteractive();
    }

    var text = player.name + "\nWins: " + player.wins + "\nLosses: " + player.losses + "\nCharacter: ";
        cont.ch = player.character;
        switch (player.character.slice(2,3)) {
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
    sc_lobby.enemyProfileText.setText(text);
}

function updateEnemyProfile() {
    if (sc_lobby.openEnemyName == "none") {
        return;
    } else {
        var player = undefined;
        for (var i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].name == sc_lobby.openEnemyName) {
                player = onlineUsers[i];
            }
        }
        if (player != undefined) {
            if (player.timeout < 0 || player.inGame || player.opponentName != "" || sc_lobby.userChallenging) {
                sc_lobby.challengeButton.setAlpha(0.5);
                sc_lobby.challengeButton.removeInteractive();
            } else {
                if (sc_lobby.challengeButton.visible) {
                    sc_lobby.challengeButton.setAlpha(1);
                    sc_lobby.challengeButton.setInteractive({cursor: "pointer"});
                }
            }
            if (player.timeout < -10) {
                player = undefined;
            }
        }
        if (player == undefined) {
            sc_lobby.enemyProfileBG.setVisible(false);
            sc_lobby.enemyProfileText.setVisible(false);
            sc_lobby.challengeButton.setVisible(false);
            sc_lobby.challengeButton.removeInteractive();
            sc_lobby.enemyCross.setVisible(false);
            sc_lobby.enemyCross.removeInteractive();
            sc_lobby.userBoxOpen = false;
            return;
        }
    
        var text = player.name;

        /*if (player.inGame) {
            text += " (vs. " + player.opponentName + ")";
        } else if (player.opponentName != "") {
            if (player.sendingChallenge) {
                text += " (Challenging " + player.opponentName + "...)";
            } else {
                text += " (Waiting for " + player.opponentName + "...)";
            }
        }

        if (player.timeout < 0) {
            text += " (Away)";
        }*/
        
        text += "\nWins: " + player.wins + "\nLosses: " + player.losses + "\nCharacter: ";
            //cont.ch = player.character;
            switch (player.character.slice(2,3)) {
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
        sc_lobby.enemyProfileText.setText(text);
    }
}