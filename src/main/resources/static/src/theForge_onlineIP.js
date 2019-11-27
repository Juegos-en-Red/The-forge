"use strict";

//https://labs.phaser.io/view.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js

var sc_onlineIP = new Phaser.Scene('OnlineIP');

sc_onlineIP.preload = function() {
    this.load.html('input', '../src/input.html');
}

sc_onlineIP.create = function() {

    var input = this.add.dom(400,300).createFromCache('input');

    input.on('click', function (event) {
        if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            if (inputText.value !== '') {

                sc_onlineIP.fadeOutTween.play();

                console.log("Connecting to " + inputText.value + "...");

                cont.server_ip = inputText.value;

                $.ajax({
                    url: 'http://' + cont.server_ip + '/freeSlots/',
                    timeout: 5000,
                    success: function(item, textStatus, jqXHR) {
                        console.log("Item created: " + JSON.stringify(item));
                        console.log("Status: " + jqXHR.status + " " + textStatus);
                        if (jqXHR.status == 200) {
                            $.ajax({
                                method: "POST",
                                url: "http://" + cont.server_ip + ":8080/players/",
                                data: JSON.stringify({
                                    name: "PACO",
                                    timeout: 10
                                })
                            }).done(function (item) {
                                console.log("Item created: " + JSON.stringify(item));
                                callback(item);
                            });
                            cont.connected = true;
                            contactServer();
                        }
                    },
                    error: function(jqXhr, textStatus, errorMessage){
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
