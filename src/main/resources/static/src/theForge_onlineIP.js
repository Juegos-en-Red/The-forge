"use strict";

//https://labs.phaser.io/view.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js

var sc_onlineIP = new Phaser.Scene('OnlineIP');

sc_onlineIP.preload = function() {
    this.load.html('input', '../src/input.html');
    this.load.html('login', '../src/login.html');
}

sc_onlineIP.create = function() {

    sc_onlineIP.textInfo = sc_onlineIP.add.text(400, 200, "\nIntroduce la dirección del servidor", {fontSize: '30px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2, align: 'center'}).setOrigin(0.5, 0.5);
    var input = this.add.dom(400,300).createFromCache('input');

    input.on('click', function (event) {
        if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            if (inputText.value !== '') {

                sc_onlineIP.fadeOutTween.play();

                sc_onlineIP.textInfo.setText("\nConectando a " + inputText.value + "...");
                console.log("Connecting to " + inputText.value + "...");

                cont.server_ip = inputText.value;

                $.ajax({
                    url: 'http://' + cont.server_ip + '/freeSlots/',
                    timeout: 5000,
                    success: function(item, textStatus, jqXHR) {
                        console.log("Slots available: " + JSON.stringify(item));
                        console.log("Status: " + jqXHR.status + " " + textStatus);
                        if (jqXHR.status === 200) {
                            showLoginPrompt();


                            /*$.ajax({
                                method: "POST",
                                url: "http://" + cont.server_ip + "/players/",
                                data: JSON.stringify({
                                    name: "PACO",
                                    timeout: 10
                                }),
                                processData: false,
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).success(function (item) {
                                cont.id = item;
                                console.log(item);
                                //console.log("Item created: " + JSON.stringify(item));
                                cont.connected = true;
                                contactServer();
                            }).error(function (jqXhr, textStatus, errorMessage) {
                                console.log("Error: " + errorMessage);
                                console.log("TEXT STATUS: " + textStatus);
                                sc_onlineIP.fadeOutTween.stop();
                                sc_onlineIP.tweens.add({
                                    targets: input,
                                    alpha: {from: 0, to: 1},
                                    ease: 'Linear',
                                    onStart: function() {
                                        input.setVisible(true);
                                        input.addListener('click');
                                    }
                                });
                            });*/
                        }
                    },
                    error: function(jqXhr, textStatus, errorMessage){
                        sc_onlineIP.textInfo.setText("Error en la conexión.\nVuelva a introducir la dirección del servidor.");
                        console.log("Error: " + errorMessage);
                        console.log("TEXT STATUS: " + textStatus);
                        //sc_onlineIP.fadeInTween.restart();
                        sc_onlineIP.fadeOutTween.stop();
                        sc_onlineIP.tweens.add({
                            targets: input,
                            alpha: {from: 0, to: 1},
                            ease: 'Linear',
                            onStart: function() {
                                input.setVisible(true);
                                input.addListener('click');
                            }
                        });
                        //sc_onlineIP.fadeInTween.play();
                    }
                });

            }
        }
    });
    sc_onlineIP.fadeInTween = sc_onlineIP.tweens.add({
        targets: input,
        alpha: {from: 0, to: 1},
        ease: 'Linear',
        onStart: function() {
            input.setVisible(true);
            input.addListener('click');
        }
    });

    sc_onlineIP.fadeOutTween = sc_onlineIP.tweens.add({
        targets: input,
        alpha: {from: 1, to: 0},
        ease: 'Linear',
        onComplete: function() {
            input.setVisible(false);
            input.removeListener('click');
        }
    });
    sc_onlineIP.fadeOutTween.stop();
}

sc_onlineIP.update = function() {
    
}

function showLoginPrompt() {
    var login = sc_onlineIP.add.dom(400,300).createFromCache('login');
    sc_onlineIP.textInfo.setText("\nIntroduzca su nombre de usuario y contraseña");

    var loginFadeIn = sc_onlineIP.tweens.add({
        targets: login,
        alpha: {from: 0, to: 1},
        ease: 'Linear',
        onStart: function() {
            login.setVisible(true);
            login.addListener('click');
        }
    });

    var loginFadeOut = sc_onlineIP.tweens.add({
        targets: login,
        alpha: {from: 1, to: 0},
        ease: 'Linear',
        onComplete: function() {
            login.setVisible(false);
            login.removeListener('click');
        }
    });
    loginFadeOut.stop();

    login.on('click', function (event) {
        if (event.target.name === 'loginButton') {
            var inputText = this.getChildByName('nameField');
            var inputPassword = this.getChildByName('passwordField');
            if (inputText.value !== '' && inputPassword.value !== '') {
                loginFadeOut.play();
                sc_onlineIP.textInfo.setText("\nIniciando sesión...");
                $.ajax({
                    method: "POST",
                    url: "http://" + cont.server_ip + "/login/",
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
                            case 200:
                                sc_onlineIP.textInfo.setText("\nHas iniciado sesión con éxito");
                                console.log(item);
                                cont.id = item;
                                cont.connected = true;
                                contactServer();
                                break;
                        }
                    },
                    error: function(jqXhr, textStatus, errorMessage){
                        switch(jqXhr.status) {
                            case 401:
                                sc_onlineIP.textInfo.setText("La contraseña es incorrecta\nIntroduzca su nombre de usuario y contraseña");
                                break;
                            case 404:
                                sc_onlineIP.textInfo.setText("El usuario no existe\nIntroduzca su nombre de usuario y contraseña");
                                break;
                            default:
                                sc_onlineIP.textInfo.setText("No se ha logrado contactar con el servidor\nIntroduzca su nombre de usuario y contraseña");
                                break;
                        }
                        loginFadeOut.stop();
                        sc_onlineIP.tweens.add({
                            targets: login,
                            alpha: {from: 0, to: 1},
                            ease: 'Linear',
                            onStart: function() {
                                login.setVisible(true);
                                login.addListener('click');
                            }
                        });
                    }
                });

            }
        } else if (event.target.name === 'registerButton') {
            var inputText = this.getChildByName('nameField');
            var inputPassword = this.getChildByName('passwordField');
            if (inputText.value !== '' && inputPassword.value !== '') {
                loginFadeOut.play();
                sc_onlineIP.textInfo.setText("\nRegistrando usuario...");
                $.ajax({
                    method: "POST",
                    url: "http://" + cont.server_ip + "/register/",
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
                                sc_onlineIP.textInfo.setText("Se ha creado un nuevo usuario\nIniciando sesión...");
                                console.log(item);
                                cont.id = item;
                                cont.connected = true;
                                contactServer();
                                break;
                        }
                    },
                    error: function(jqXhr, textStatus, errorMessage){
                        switch(jqXhr.status) {
                            case 409:
                                sc_onlineIP.textInfo.setText("El usuario ya existe\nIntroduzca su nombre de usuario y contraseña");
                                break;
                            default:
                                sc_onlineIP.textInfo.setText("No se ha logrado contactar con el servidor\nIntroduzca su nombre de usuario y contraseña");
                                break;
                        }
                        console.log(jqXhr.status);
                        loginFadeOut.stop();
                        sc_onlineIP.tweens.add({
                            targets: login,
                            alpha: {from: 0, to: 1},
                            ease: 'Linear',
                            onStart: function() {
                                login.setVisible(true);
                                login.addListener('click');
                            }
                        });
                    }
                });

            }
        }
    });
}