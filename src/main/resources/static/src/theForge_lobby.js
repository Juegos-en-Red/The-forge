"use strict";

var sc_lobby = new Phaser.Scene("Lobby");

sc_lobby.preload = function() {
}

sc_lobby.create = function() {

    mus_game.pause();
    mus_game.currentTime = 0;
    mus_victory.pause();
    mus_victory.currentTime = 0;
    mus_defeat.pause();
    mus_defeat.currentTime = 0;
    mus_menu.play();

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
            cont.connection = undefined;
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
                cont.connection.onclose = function(e) {
                    cont.connection = undefined;
                    console.log("Websocket closed.");
                    /*if ((sc_juegoOnline.scene.isActive() || sc_Guia.scene.isActive()) && onlineUsers[cont.id].inGame) { //Esto debería cubrir todos los casos en los que el jugador pueda desconectarse
                        sc_juegoOnline.scene.start("Lobby");
                    }*/ //hay que pulirlo un poquitillo más igual
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
        console.log("let's begin that game now");
        cont.victoryState = -1;
        if (message.player_1 == cont.name) {
            sc_lobby.playercontrolling = 1;
        } else {
            sc_lobby.playercontrolling = 2;
        }
        cont.p1.ch = message.p2_character;
        cont.p2.ch = message.p1_character;
        sc_lobby.scene.stop("Lobby");
        sc_lobby.scene.stop("SeleccionPersonajeOnline");
        game.scene.stop("JuegoOnline");
        game.scene.start("JuegoOnline");
    } else {
        if (sc_juegoOnline.scene.isActive()) { //No debería hacer falta, espero. Bueno venga vale, igual sí.
            switch(message.message_type) {
                case "game_time":
                    sc_juegoOnline.gameTime = message.game_time;
                break;
                case "trap_change":
                    if (message.altarTrap == "none") {
                        sc_juegoOnline.altarTrampas.setTexture("altar1");
                    } else {
                        sc_juegoOnline.altarTrampas.setTexture("altar2");
                    }
                    //cambiar la trampa del altar
                    sc_juegoOnline.altarTrampas.trampa = message.altarTrap
                    //cambiar la trampa que lleva el jugador 2 (viene del servidor como el 1)
                    sc_juegoOnline.player2.trampa = message.p1Trap;
                    //cambiar la trampa que lleva el jugador 1 (viene del servidor como el 2)
                    sc_juegoOnline.player.trampa = message.p2Trap;
                break;
                case "player_move":
                    sc_juegoOnline.player.x = message.player2_x;
                    sc_juegoOnline.player.y = message.player2_y;
                    sc_juegoOnline.player2.x = message.player1_x;
                    sc_juegoOnline.player2.y = message.player1_y;
                    break;
                case "player_move_single":
                    if (message.player == 1) {
                        //console.log("SE MUEVE EL DE LA DERECHA");
                        sc_juegoOnline.player2.x = message.player_x;
                        sc_juegoOnline.player2.y = message.player_y;
                        sc_juegoOnline.player2.spdX = message.player_spdx;
                        sc_juegoOnline.player2.spdY = message.player_spdy;
                        sc_juegoOnline.player2.dir = message.player_direction;
                    } else {
                        //console.log("SE MUEVE EL DE LA IZQUIERDA");
                        sc_juegoOnline.player.x = message.player_x;
                        sc_juegoOnline.player.y = message.player_y;
                        sc_juegoOnline.player.spdX = message.player_spdx;
                        sc_juegoOnline.player.spdY = message.player_spdy;
                        sc_juegoOnline.player.dir = message.player_direction;
                    }
                    break;
                case "recetas":
                    sc_juegoOnline.recetas1 = [message.receta_p1_0,message.receta_p1_1,message.receta_p1_2,message.receta_p1_3];
                    sc_juegoOnline.recetas2 = [message.receta_p2_0,message.receta_p2_1,message.receta_p2_2,message.receta_p2_3];
                    for (var i = 3; i >= 0; i--) { //esto debería funcionar
                        if (sc_juegoOnline.recetas1[i] == "none") {
                            sc_juegoOnline.recetas1.splice(i,i+1);
                        }
                        
                        if (sc_juegoOnline.recetas2[i] == "none") {
                            sc_juegoOnline.recetas2.splice(i,i+1);
                        }
                    }
                    break;
                case "estaciones":
                    sc_juegoOnline.player.heldObject = message.p2_ho;
                    sc_juegoOnline.player2.heldObject = message.p1_ho;

                    sc_juegoOnline.hornos.children.iterate(function (child) {
                        if (child.player == 1) {
                            child.timer = message.horno1time;
                            child.heldObject = message.horno1ho;
                        } else {
                            child.timer = message.horno2time;
                            child.heldObject = message.horno2ho;
                        }
                    });
                    sc_juegoOnline.hornosd.children.iterate(function (child) {
                        if (child.player == 1) {
                            child.timer = message.hornod1time;
                            child.heldObject1 = message.hornod1ho;
                            child.heldObject2 = message.hornod1ho2;
                        } else {
                            child.timer = message.hornod2time;
                            child.heldObject1 = message.hornod2ho;
                            child.heldObject2 = message.hornod2ho2;
                        }
                    });
                    sc_juegoOnline.yunques.children.iterate(function (child) {
                        if (child.player == 1) {
                            if (child.timer != message.yunque1time) {
                                snd_yunque.pause();
                                snd_yunque.currentTime = 0;
                                snd_yunque.play();
                            }
                            child.timer = message.yunque1time;
                            child.heldObject = message.yunque1ho;
                        } else {
                            if (child.timer != message.yunque2time) {
                                snd_yunque.pause();
                                snd_yunque.currentTime = 0;
                                snd_yunque.play();
                            }
                            child.timer = message.yunque2time;
                            child.heldObject = message.yunque2ho;
                        }
                    });
                    sc_juegoOnline.yunquesd.children.iterate(function (child) {
                        if (child.player == 1) {
                            if (child.timer != message.yunqued1time) {
                                snd_yunque.pause();
                                snd_yunque.currentTime = 0;
                                snd_yunque.play();
                            }
                            child.timer = message.yunqued1time;
                            child.heldObject1 = message.yunqued1ho;
                            child.heldObject2 = message.yunqued1ho2;
                        } else {
                            if (child.timer != message.yunqued2time) {
                                snd_yunque.pause();
                                snd_yunque.currentTime = 0;
                                snd_yunque.play();
                            }
                            child.timer = message.yunqued2time;
                            child.heldObject1 = message.yunqued2ho;
                            child.heldObject2 = message.yunqued2ho2;
                        }
                    });
                    sc_juegoOnline.barriles.children.iterate(function (child) {
                        if (child.player == 1) {
                            child.timer = message.barril1time;
                            child.heldObject = message.barril1ho;
                        } else {
                            child.timer = message.barril2time;
                            child.heldObject = message.barril2ho;
                        }
                    });
                    sc_juegoOnline.moldes.children.iterate(function (child) {
                        if (child.player == 1) {
                            child.timer = message.molde1time;
                            child.heldObject = message.molde1ho;
                        } else {
                            child.timer = message.molde2time;
                            child.heldObject = message.molde2ho;
                        }
                    });
                    sc_juegoOnline.mesas.children.entries[0].heldObject = message.mesa11ho;
                    sc_juegoOnline.mesas.children.entries[1].heldObject = message.mesa21ho;
                    sc_juegoOnline.mesas.children.entries[2].heldObject = message.mesa31ho;
                    
                    sc_juegoOnline.mesas.children.entries[3].heldObject = message.mesa12ho;
                    sc_juegoOnline.mesas.children.entries[4].heldObject = message.mesa22ho;
                    sc_juegoOnline.mesas.children.entries[5].heldObject = message.mesa32ho;
                    //gestionar las trampas de muro y de reloj
                    sc_juegoOnline.player.tiempoInmovil = message.trampareloj2time;
                    sc_juegoOnline.player2.tiempoInmovil = message.trampareloj1time;

                    var muro1 = false, muro2 = false;
                    sc_juegoOnline.muros.children.iterate(function(child) {
                        if (child.player == 1) {
                            muro1 = true;
                            child.timer = message.trampamuro2time;
                        } else if (child.player == 2) {
                            muro2 = true;
                            child.timer = message.trampamuro1time;
                        }
                    });
                    if (!muro1 && message.trampamuro2time > 0) {
                        var muro = sc_juegoOnline.muros.create(260, 300, 'tripleMuro');
                        muro.timer = message.trampamuro2time;
                        muro.player = 1;
                        muro.status = sc_juegoOnline.add.image(muro.x-6, muro.y-25, 'empty');
                        onlineDisconnectNeighbours(getCell(260,300).y,getCell(260,300).x, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(260,300).y,getCell(260,300).x+1, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(260,300).y,getCell(260,300).x-1, true, true, true, true);
                    }
                    if (!muro2 && message.trampamuro1time > 0) {
                        var muro = sc_juegoOnline.muros.create(540, 300, 'tripleMuro');
                        muro.timer = message.trampamuro1time;
                        muro.player = 2;
                        muro.status = sc_juegoOnline.add.image(muro.x-6, muro.y-25, 'empty');
                        onlineDisconnectNeighbours(getCell(540,300).y,getCell(540,300).x, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(540,300).y,getCell(540,300).x+1, true, true, true, true);
                        onlineDisconnectNeighbours(getCell(540,300).y,getCell(540,300).x-1, true, true, true, true);
                    }
                    //sc_juegoOnline.player.tiempoInmovil = message.trampamuro2time;
                    //sc_juegoOnline.player2.tiempoInmovil = message.trampamuro1time;

                    //gestionar los objetos de los monstruos (visual)
                    if (message.p1m_ho1 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo1, message.p1m_ho1);}
                    if (message.p1m_ho2 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo1, message.p1m_ho2);}
                    if (message.p1m_ho3 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo1, message.p1m_ho3);}
                    if (message.p1m_ho4 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo1, message.p1m_ho4);}
                    if (message.p2m_ho1 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo2, message.p2m_ho1);}
                    if (message.p2m_ho2 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo2, message.p2m_ho2);}
                    if (message.p2m_ho3 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo2, message.p2m_ho3);}
                    if (message.p2m_ho4 != "none") {onlineArmarMonstruo(sc_juegoOnline.monstruo2, message.p2m_ho4);}
                    break;
            }
        } else {
            switch(message.message_type) {
                case "game_time":
                    sc_juegoOnline.gameTime = message.game_time;
                break;
                case "trap_change":
                    //Cambiar la trampa del altar
                    cont.trampa = message.altarTrap;
                    //cambiar la trampa que lleva el jugador 2 (viene del servidor como el 1)
                    cont.p2.trampa = message.p1Trap;
                    //cambiar la trampa que lleva el jugador 1 (viene del servidor como el 2)
                    cont.p1.trampa = message.p2Trap;
                break;
                case "player_move":
                    console.log(message.player2_x + ", " + message.player2_y + ", " + message.player1_x + ", " + message.player1_y);
                    cont.p1.x = message.player2_x;
                    cont.p1.y = message.player2_y;
                    cont.p2.x = message.player1_x;
                    cont.p2.y = message.player1_y;
                    break;
                case "player_move_single":
                    if (message.player == 1) {
                        cont.p2.x = message.player_x;
                        cont.p2.y = message.player_y;
                    } else {
                        cont.p1.x = message.player_x;
                        cont.p1.y = message.player_y;
                    }
                    break;
            }
        }
        if (message.message_type == "timeout") {
            cont.opTimeOut = message.op_timeout;
            if (cont.opTimeout == -1) {
                cont.opTimedOut = false;
            } else {
                cont.opTimedOut = true;
            }
        }
        if (message.message_type == "winner") {
            cont.connection.close();
            cont.connection = undefined;
            if (message.winner == "none") {
                cont.victoryState = 0;
                //Enviarle un mensaje a API REST diciendo que no ha ganado nadie y que ya no estáis en partida y eso
                $.ajax({
                    method: "PUT",
                    url: cont.server_ip + "gameEnd/"+cont.id,
                    timeout: 3000,
                    data: "none",
                    processData: false,
                    headers: {
                        "Content-type": "application/json"
                    },
                });

            } else {
                if (message.winner == cont.name) {
                    cont.victoryState = 1;
                    //Enviar el mensaje de API REST diciendo que has ganado
                    $.ajax({
                        method: "PUT",
                        url: cont.server_ip + "gameEnd/"+cont.id,
                        timeout: 3000,
                        data: cont.name,
                        processData: false,
                        headers: {
                            "Content-type": "application/json"
                        },
                    });
                } else {
                    cont.victoryState = 2;
                }
            }
        }
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