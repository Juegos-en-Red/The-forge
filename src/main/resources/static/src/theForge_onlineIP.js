"use strict";

//https://labs.phaser.io/view.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
//Este ejemplo nos ha ayudado mucho en esta fase.

var sc_onlineIP = new Phaser.Scene('OnlineIP');

sc_onlineIP.preload = function() {
}

sc_onlineIP.create = function() {
    //console.log(window.location.href);
    cont.server_ip = window.location.href;
    



    this.bg = sc_onlineIP.add.image(400, 300, "fondo online-lobby");

    var disconnectButton = sc_onlineIP.add.sprite(90, 556, "botonSalir");
    disconnectButton.setInteractive();
    disconnectButton.on('pointerdown', function (event) {
            cont.connected = false;
            cont.id = -1;
            cont.name = null;
            cont.lastChatMessage = -1;
            sc_onlineIP.scene.start("MenuPrincipal");
    });

    sc_onlineIP.inputButton = sc_onlineIP.add.sprite(400, 350, "botonConectar");
    sc_onlineIP.inputButton.alpha = 0;
    sc_onlineIP.inputButton2 = sc_onlineIP.add.sprite(400, 200, "botonReconectar");
    sc_onlineIP.inputButton2.alpha = 0;

    sc_onlineIP.textInfo = sc_onlineIP.add.text(400, 200, "Attempting to connect...", {fontSize: '30px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'center'}).setOrigin(0.5, 0.5);
    sc_onlineIP.inputBox = this.add.dom(400,300).createFromCache('input');
    sc_onlineIP.inputBox.alpha = 0;

    //intentar conectar, y si no se puede volvemos a lo de siempre pero con alguna cosa nueva o algo

    defaultConnection();

    //


    
    sc_onlineIP.fadeInTween = sc_onlineIP.tweens.add({
        targets: [sc_onlineIP.inputBox,sc_onlineIP.inputButton,sc_onlineIP.inputButton2],
        alpha: {from: 0, to: 1},
        ease: 'Linear',
        onStart: function() {
            sc_onlineIP.inputBox.setVisible(true);
            sc_onlineIP.inputButton.setVisible(true);
            sc_onlineIP.inputButton.setInteractive();
            sc_onlineIP.inputButton2.setVisible(true);
            sc_onlineIP.inputButton2.setInteractive();
        }
    });
    sc_onlineIP.fadeInTween.stop();

    sc_onlineIP.fadeOutTween = sc_onlineIP.tweens.add({
        targets: [sc_onlineIP.inputBox,sc_onlineIP.inputButton,sc_onlineIP.inputButton2],
        alpha: {from: 1, to: 0},
        ease: 'Linear',
        onStart: function() {
            sc_onlineIP.inputButton.removeInteractive(); 
            sc_onlineIP.inputButton2.removeInteractive(); 
        },
        onComplete: function() {
            sc_onlineIP.inputBox.setVisible(false);
            sc_onlineIP.inputButton.setVisible(false);
            sc_onlineIP.inputButton2.setVisible(false);
        }
    });
    sc_onlineIP.fadeOutTween.stop();

    //Lo de darle al enter
    this.input.keyboard.on('keyup', 
    function (event) {
        if (event.keyCode == 13) {
            switch (document.activeElement) {
                case sc_onlineIP.inputBox.getChildByName('nameField'):
                    inputButtonFunction();
                    break;
                case sc_onlineIP.login.getChildByName('nameField'):
                case sc_onlineIP.login.getChildByName('passwordField'):
                    loginFunction();
                    break;
            }
        }
    });


}

sc_onlineIP.update = function() {
    
}

function defaultConnection() {
    sc_onlineIP.textInfo.setText("Attempting to connect...");
    $.ajax({
        url: cont.server_ip + 'freeSlots/',
        timeout: 5000,
        success: function (item, textStatus, jqXHR) {
            console.log("Slots available: " + JSON.stringify(item));
            console.log("Status: " + jqXHR.status + " " + textStatus);
            if (jqXHR.status === 200 && item > 0) {
                showLoginPrompt();
            }
            else if (item == 0) {
                sc_onlineIP.textInfo.setText("Error: Server is full\nPlease try again later");
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            sc_onlineIP.tweens.add({
                targets: [sc_onlineIP.inputBox, sc_onlineIP.inputButton, sc_onlineIP.inputButton2],
                alpha: { from: 0, to: 1 },
                ease: 'Linear',
                onStart: function () {
                    sc_onlineIP.inputBox.setVisible(true);
                    sc_onlineIP.inputButton.setVisible(true);
                    sc_onlineIP.inputButton.setInteractive();
                    sc_onlineIP.inputButton2.setVisible(true);
                    sc_onlineIP.inputButton2.setInteractive();
                }
            });
            sc_onlineIP.textInfo.setText("Connection error. Please try to reconnect.\n\n\nIf you wish, you can try to directly connect to a different server:");
            sc_onlineIP.inputButton2.on('pointerdown', function() {sc_onlineIP.fadeOutTween.play();defaultConnection()});
            
            sc_onlineIP.inputButton.on('pointerdown', inputButtonFunction);
        }
    });
}

function inputButtonFunction() {
    var inputText = sc_onlineIP.inputBox.getChildByName('nameField');
    if (inputText.value !== '') {
        sc_onlineIP.tweens.add({
            targets: [sc_onlineIP.inputBox, sc_onlineIP.inputButton, sc_onlineIP.inputButton2],
            alpha: { from: 1, to: 0 },
            ease: 'Linear',
            onStart: function() {
                sc_onlineIP.inputButton.removeInteractive(); 
                sc_onlineIP.inputButton2.removeInteractive(); 
            },
            onComplete: function() {
                sc_onlineIP.inputBox.setVisible(false);
                sc_onlineIP.inputButton.setVisible(false);
                sc_onlineIP.inputButton2.setVisible(false);
            }
        });
        sc_onlineIP.textInfo.setText("\nAttempting to connect to " + inputText.value + "...");
        console.log("Connecting to " + inputText.value + "...");
        cont.server_ip = 'http://' + inputText.value + '/';
        $.ajax({
            url: cont.server_ip + 'freeSlots/',
            timeout: 5000,
            success: function (item, textStatus, jqXHR) {
                //console.log("Slots available: " + JSON.stringify(item));
                //console.log("Status: " + jqXHR.status + " " + textStatus);
                if (jqXHR.status === 200 && item > 0) {
                    showLoginPrompt();
                }
                else if (item == 0) {
                    sc_onlineIP.textInfo.setText("Error: Server is full\nPlease try again later");
                }
            },
            error: function (jqXhr, textStatus, errorMessage) {
                sc_onlineIP.textInfo.setText("Connection error. Please try to reconnect.\n\n\nIf you wish, you can try to directly connect to a different server:");
                //console.log("Error: " + errorMessage);
                //console.log("TEXT STATUS: " + textStatus);
                sc_onlineIP.fadeOutTween.stop();
                sc_onlineIP.tweens.add({
                    targets: [sc_onlineIP.inputBox, sc_onlineIP.inputButton, sc_onlineIP.inputButton2],
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',
                    onStart: function () {
                        sc_onlineIP.inputBox.setVisible(true);
                        sc_onlineIP.inputButton.setVisible(true);
                        sc_onlineIP.inputButton.setInteractive();
                        sc_onlineIP.inputButton2.setVisible(true);
                        sc_onlineIP.inputButton2.setInteractive();
                    }
                });
            }
        });
    }
}

function showLoginPrompt() {
    sc_onlineIP.login = sc_onlineIP.add.dom(400,300).createFromCache('login');
    sc_onlineIP.loginButton = sc_onlineIP.add.sprite(300, 400, "botonIniciarSesion");
    sc_onlineIP.registerButton = sc_onlineIP.add.sprite(500, 400, "botonRegistrarse");
    sc_onlineIP.textInfo.setText("\nPlease enter your username and password");

    sc_onlineIP.loginFadeIn = sc_onlineIP.tweens.add({
        targets: [sc_onlineIP.login,sc_onlineIP.loginButton,sc_onlineIP.registerButton],
        alpha: {from: 0, to: 1},
        ease: 'Linear',
        onStart: function() {
            sc_onlineIP.login.setVisible(true);
            sc_onlineIP.loginButton.setVisible(true);
            sc_onlineIP.registerButton.setVisible(true);
            sc_onlineIP.loginButton.setInteractive();
            sc_onlineIP.registerButton.setInteractive();
        }
    });

    sc_onlineIP.loginFadeOut = sc_onlineIP.tweens.add({
        targets: [sc_onlineIP.login,sc_onlineIP.loginButton,sc_onlineIP.registerButton],
        alpha: {from: 1, to: 0},
        ease: 'Linear',
        onStart: function() {
            sc_onlineIP.loginButton.removeInteractive(); 
            sc_onlineIP.registerButton.removeInteractive(); 
        },
        onComplete: function() {
            sc_onlineIP.login.setVisible(false);
            sc_onlineIP.loginButton.setVisible(false);
            sc_onlineIP.registerButton.setVisible(false);
        }
    });
    sc_onlineIP.loginFadeOut.stop();

    sc_onlineIP.loginButton.on('pointerdown',loginFunction);

    sc_onlineIP.registerButton.on('pointerdown', function (event) {
        var inputText = sc_onlineIP.login.getChildByName('nameField');
        var inputPassword = sc_onlineIP.login.getChildByName('passwordField');
        if (inputText.value !== '' && inputPassword.value !== '') {
            sc_onlineIP.loginFadeOut.play();
            sc_onlineIP.textInfo.setText("\nRegistering user...");
            $.ajax({
                method: "POST",
                url: cont.server_ip + "register/",
                data: JSON.stringify({
                    name: inputText.value,
                    password: inputPassword.value,
                    timeout: 10
                }),
                processData: false,
                headers: {
                    "Content-type": "application/json"
                },
                success: function(item, textStatus, jqXHR) {
                    switch(jqXHR.status) {
                        case 201:
                            sc_onlineIP.textInfo.setText("A new user has been created\nLogging in...");
                            console.log(item);
                            cont.id = item;
                            cont.connected = true;
                            cont.name = inputText.value;
                            fetchChat();
                            sc_onlineIP.scene.start("Lobby");
                            break;
                    }
                },
                error: function(jqXhr, textStatus, errorMessage){
                    switch(jqXhr.status) {
                        case 409:
                            sc_onlineIP.textInfo.setText("That user is already registered\nPlease enter your username and password");
                            break;
                        case 417:
                            sc_onlineIP.textInfo.setText("No spaces allowed in your username or password\nPlease enter your username and password");
                            break;
                        default:
                            sc_onlineIP.textInfo.setText("Connection error\nPlease enter your username and password");
                            break;
                    }
                    console.log(jqXhr.status);
                    sc_onlineIP.loginFadeOut.stop();
                    sc_onlineIP.tweens.add({
                        targets: [sc_onlineIP.login,sc_onlineIP.loginButton,sc_onlineIP.registerButton],
                        alpha: {from: 0, to: 1},
                        ease: 'Linear',
                        onStart: function() {
                            sc_onlineIP.login.setVisible(true);
                            sc_onlineIP.loginButton.setVisible(true);
                            sc_onlineIP.registerButton.setVisible(true);
                            sc_onlineIP.loginButton.setInteractive();
                            sc_onlineIP.registerButton.setInteractive();
                        }
                    });
                }
            });

        }
    });
}

function loginFunction() {
    var inputText = sc_onlineIP.login.getChildByName('nameField');
    var inputPassword = sc_onlineIP.login.getChildByName('passwordField');
    if (inputText.value !== '' && inputPassword.value !== '') {
        sc_onlineIP.loginFadeOut.play();
        sc_onlineIP.textInfo.setText("\nLogging in...");
        $.ajax({
            method: "POST",
            url: cont.server_ip + "login/",
            data: JSON.stringify({
                name: inputText.value,
                password: inputPassword.value,
                timeout: 10
            }),
            processData: false,
            headers: {
                "Content-type": "application/json"
            },
            success: function (item, textStatus, jqXHR) {
                switch (jqXHR.status) {
                    case 200:
                        sc_onlineIP.textInfo.setText("\nYou successfully logged in");
                        console.log(item);
                        cont.id = item;
                        cont.connected = true;
                        cont.name = inputText.value;
                        fetchChat();
                        sc_onlineIP.scene.start("Lobby");
                        break;
                }
            },
            error: function (jqXhr, textStatus, errorMessage) {
                switch (jqXhr.status) {
                    case 401:
                        sc_onlineIP.textInfo.setText("Wrong Password\nPlease enter your username and password");
                        break;
                    case 404:
                        sc_onlineIP.textInfo.setText("That user doesn't exist\nPlease enter your username and password");
                        break;
                    case 409:
                        sc_onlineIP.textInfo.setText("That user is already logged in\nPlease enter your username and password");
                        break;
                    case 417:
                        sc_onlineIP.textInfo.setText("No spaces allowed in your username or password\nPlease enter your username and password");
                        break;
                    default:
                        sc_onlineIP.textInfo.setText("Connection error\nPlease enter your username and password");
                        break;
                }
                sc_onlineIP.loginFadeOut.stop();
                sc_onlineIP.tweens.add({
                    targets: [sc_onlineIP.login, sc_onlineIP.loginButton, sc_onlineIP.registerButton],
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',
                    onStart: function () {
                        sc_onlineIP.login.setVisible(true);
                        sc_onlineIP.loginButton.setVisible(true);
                        sc_onlineIP.registerButton.setVisible(true);
                        sc_onlineIP.loginButton.setInteractive();
                        sc_onlineIP.registerButton.setInteractive();
                    }
                });
            }
        });
    }
}
