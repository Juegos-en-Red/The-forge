"use strict";

//https://labs.phaser.io/view.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js

var sc_onlineIP = new Phaser.Scene('OnlineIP');

sc_onlineIP.preload = function() {
    this.load.html('input', '../src/input.html');
}

sc_onlineIP.create = function() {


    var input = this.add.dom(400,300).createFromCache('input');
    
    input.addListener('click');

    input.on('click', function (event) {
        if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            if (inputText.value !== '') {
                this.removeListener('click');
                this.setVisible(false);
                console.log("Connecting to " + inputText.value + "...");
                cont.server_ip = inputText.value;
                $.ajax({
                    method: "POST",
                    url: 'http://' + cont.server_ip + '/players/',
                    data: JSON.stringify({
                        "name": "Paco",
                        "timeout": 10
                    }),
                    processData: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).done(function(item) {
                    console.log("Item created: " + JSON.stringify(item));
                })
            }
        }
    });
}

sc_onlineIP.update = function() {
    
}
