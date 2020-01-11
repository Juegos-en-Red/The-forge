"use strict";

var sc_SeleccionPersonajeOnline = new Phaser.Scene("SeleccionPersonajeOnline");

var seleccionOnline = new MenuSeleccionOnline(sc_SeleccionPersonajeOnline);

/* CORE */

sc_SeleccionPersonajeOnline.create = function()
{
    seleccionOnline.create();
}

sc_SeleccionPersonajeOnline.update = function(time, delta)
{
    seleccionOnline.update(time, delta);
}

/* OBJETOS */

// Menú de selección de personaje
function MenuSeleccionOnline(escena)
{
    /* VARIABLES */

    // Nombre del botón de hielo
    this.nombreBtnHielo = "btn_hielo";

    // Nombre del botón de elfa
    this.nombreBtnElfo = "btn_elfo";

    // Nombre del botón de fuego
    this.nombreBtnFuego = "btn_fuego";

    // Nombre del sprite de fondo
    this.nombreBg = "fondo";

    // Nombre del sprite de texto
    this.nombreTexto = "elige";

    // Personaje de hielo que renderizaremos
    this.hieloPlayer = new playerHielo(escena);

    // Persona elfo que renderizaremos
    this.elfoPlayer = new playerElfo(escena);

    // Personaje de fuego que renderizaremos
    this.fuegoPlayer = new playerFuego(escena);

    /* FUNCIONES PÚBLICAS */

    this.create = function()
    {
        cont.prevScene = sc_SeleccionPersonajeOnline;
        cont.prevSceneName = "SeleccionPersonajeOnline";

        /* ILUMINACIÓN DE LA ESCENA */        

        // Activamos la iluminación
        escena.lights.enable();    
        
        //Añadimos una luz
        this.light = escena.lights.addLight(-200, 400, 250, 0xffffff, 2);
        switch(cont.ch) {
            case "SSHielo1":
                this.light.x = ((config.width / 2) / 2 -50);
            break;
            
            case "SSElfa1":
                this.light.x = ((config.width / 2) + ((config.width / 2) / 2 +50));
            break;
            
            case "SSFuego1":
                this.light.x = ((config.width / 2) );
            break;
        }
        
        // Ponemos como ambientación de fondo un color gris
        escena.lights.setAmbientColor(0x000000);

        /* FONDO */

        // Fondo de la escena
        this.bg = escena.add.tileSprite(0, 0, 800, 600, this.nombreBg).setPipeline('Light2D');
        // Cambiamos el origen
        this.bg.setOrigin(0, 0);

        /* BOTONES */

        // Botón de hielo
        this.btnHielo = escena.add.image((config.width / 2) / 2 -150, 100, this.nombreBtnHielo);
        // Cambiamos el origen
        this.btnHielo.setOrigin(0, 0);
        // Cambiamos el alpha del botón
        this.btnHielo.alpha = 0.7;

        // Botón de elfa
        this.btnElfa = escena.add.image((config.width / 2) + ((config.width / 2) / 2) - 50, 100 , this.nombreBtnElfo);
        // Cambiamos el origen
        this.btnElfa.setOrigin(0, 0);
        // Cambiamos el alpha del botón
        this.btnElfa.alpha = 0.7;

        // Botón de fuego
        this.btnFuego = escena.add.image((config.width / 2)  -100, 100, this.nombreBtnFuego);
        // Cambiamos el origen
        this.btnFuego.setOrigin(0, 0);
        // Cambiamos el alpha del botón
        this.btnFuego.alpha = 0.7;

        //Botones de la interfaz

        this.botonBack = escena.add.image((config.width / 2), 550, "botonBack");
        this.botonBack.setInteractive({cursor: "pointer"}).on("pointerdown",clickBackOnline);


        /* PERSONAJES */

        //Personaje de hielo
        this.hieloPlayer.create();

        //Personaje elfo
        this.elfoPlayer.create();

        //Personaje de fuego
        this.fuegoPlayer.create();

        /* TEXTO DE LA ESCENA */

        //Sprite de texto de elegir personaje
        this.texto = escena.add.image(400, 50, this.nombreTexto);

        this.btnHielo.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
        {
            cont.ch = 'SSHielo1';
            $.ajax({
                method: "PUT",
                url: cont.server_ip + "character/"+cont.id,
                timeout: 3000,
                data: cont.ch,
                processData: false,
                headers: {
                    "Content-type": "application/json"
                },
            }).success(function (item) {
                console.log("Character changed.");
                sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                sc_SeleccionPersonajeOnline.scene.start("Lobby");
            }).error(function(e) {
                console.log("Character couldn't be changed.");
                sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                sc_SeleccionPersonajeOnline.scene.start("Lobby");
            });   
            
        });

        this.btnElfa.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
        {
            cont.ch = 'SSElfa1';
            $.ajax({
                method: "PUT",
                url: cont.server_ip + "character/"+cont.id,
                timeout: 3000,
                data: cont.ch,
                processData: false,
                headers: {
                    "Content-type": "application/json"
                },
            }).success(function (item) {
                console.log("Character changed.");
                sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                sc_SeleccionPersonajeOnline.scene.start("Lobby");
            }).error(function(e) {
                console.log("Character couldn't be changed.");
                sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                sc_SeleccionPersonajeOnline.scene.start("Lobby");
            });
        });

        this.btnFuego.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
        {
            cont.ch = 'SSFuego1';
            $.ajax({
                method: "PUT",
                url: cont.server_ip + "character/"+cont.id,
                timeout: 3000,
                data: cont.ch,
                processData: false,
                headers: {
                    "Content-type": "application/json"
                },
            }).success(function (item) {
                console.log("Character changed.");
                sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                sc_SeleccionPersonajeOnline.scene.start("Lobby");
            }).error(function(e) {
                console.log("Character couldn't be changed.");
                sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                sc_SeleccionPersonajeOnline.scene.start("Lobby");
            });
        });

    }    

    this.update = function(time, delta)
    {
        /* ANIMACIÓN LUCES Y COLISIÓN BOTONES */

        this.btnHielo.alpha = 0.6;
        this.btnElfa.alpha = 0.6;
        this.btnFuego.alpha = 0.6;
        if (isColliding(this.btnHielo))
        {
            if (this.light.x < this.btnHielo.x + 120)
                this.light.x += 1 * delta;   
            if (this.light.x > this.btnHielo.x + 120)
                this.light.x -= 1 * delta;
            this.btnHielo.alpha = 1;
            
        }
        if (isColliding(this.btnElfa))
        {
            if (this.light.x < this.btnElfa.x + 100)
                this.light.x += 1 * delta;   
            this.btnElfa.alpha = 1;
            
        }
        if (isColliding(this.btnFuego))
        {
            if (this.light.x < this.btnFuego.x + 120)
                this.light.x += 1 * delta;   
            if (this.light.x > this.btnFuego.x + 120)
                this.light.x -= 1 * delta;
            this.btnFuego.alpha = 1;
            
        }
        
        /* ANIMACIÓN DEL FONDO */

        this.bg.tilePositionY += 0.4 * delta;

        //Comprobar si han aceptado una invitación
        for(var i = 0; i < onlineUsers.length; i++) {

            if (onlineUsers[i].id == cont.id) {
    
                if (onlineUsers[i].inGame && cont.connection == undefined) { 
                    sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
                    sc_SeleccionPersonajeOnline.scene.start("Lobby");
                }
            }
        }

    }

    /* FUNCIONES PRIVADAS */
    
    function isColliding(button)
    {
        var mouse = game.input.mousePointer;
        if (mouse.x >= button.x + 20 && mouse.x <= button.x + button.width - 20
            && mouse.y >= button.y - 20 && mouse.y <= button.y + button.height + 20)
        {
            return true;
        }    
        return false;
    }
}

function clickBackOnline() {
    sc_SeleccionPersonajeOnline.scene.stop("SeleccionPersonajeOnline");
    sc_SeleccionPersonajeOnline.scene.start("Lobby");
}