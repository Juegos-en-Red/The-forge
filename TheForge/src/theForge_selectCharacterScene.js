"use strict";

var sc_SeleccionPersonaje = new Phaser.Scene("SeleccionPersonaje");

var seleccion = new MenuSeleccion(sc_SeleccionPersonaje);

var player1;
var player2;

/* CORE */

sc_SeleccionPersonaje.create = function()
{
    seleccion.create();
}

sc_SeleccionPersonaje.update = function(time, delta)
{
    seleccion.update(time, delta);
}

/* OBJETOS */

// Menú de selección de personaje
function MenuSeleccion(escena)
{
    /* VARIABLES */

    // Nombre del botón de hielo
    this.nombreBtnHielo = "btn_hielo";

    // Nombre del botón de elfa
    this.nombreBtnElfo = "btn_elfo";

    // Nombre del sprite de fondo
    this.nombreBg = "fondo";

    // Nombre del sprite de texto
    this.nombreTexto = "elige";

    // Personaje de hielo que renderizaremos
    this.hieloPlayer = new playerHielo(escena);

    // Persona elfo que renderizaremos
    this.elfoPlayer = new playerElfo(escena);

    /* FUNCIONES PÚBLICAS */

    this.create = function()
    {
        /* ILUMINACIÓN DE LA ESCENA */        

        // Activamos la iluminación
        escena.lights.enable();    
        
        //Añadimos una luz
        this.light = escena.lights.addLight(-200, 400, 250, 0xffffff, 2);
        
        // Ponemos como ambientación de fondo un color gris
        escena.lights.setAmbientColor(0x000000);

        /* FONDO */

        // Fondo de la escena
        this.bg = escena.add.tileSprite(0, 0, 800, 600, this.nombreBg).setPipeline('Light2D');
        // Cambiamos el origen
        this.bg.setOrigin(0, 0);

        /* BOTONES */

        // Botón de hielo
        this.btnHielo = escena.add.image((config.width / 2) / 2 -100, 100, this.nombreBtnHielo);
        // Cambiamos el origen
        this.btnHielo.setOrigin(0, 0);
        // Cambiamos el alpha del botón
        this.btnHielo.alpha = 0.7;

        // Botón de elfa
        this.btnElfa = escena.add.image((config.width / 2) + ((config.width / 2) / 2) - 100, 100 , this.nombreBtnElfo);
        // Cambiamos el origen
        this.btnElfa.setOrigin(0, 0);
        // Cambiamos el alpha del botón
        this.btnElfa.alpha = 0.7;

        /* PERSONAJES */

        //Personaje de hielo
        this.hieloPlayer.create();

        //Personaje elfo
        this.elfoPlayer.create();

        /* TEXTO DE LA ESCENA */

        //Sprite de texto de elegir personaje
        this.texto = escena.add.image(400, 50, this.nombreTexto);

    }    

    this.update = function(time, delta)
    {
        /* ANIMACIÓN LUCES Y COLISIÓN BOTONES */

        this.btnHielo.alpha = 0.6;
        this.btnElfa.alpha = 0.6;
        if (isColliding(this.btnHielo))
        {
            if (this.light.x < this.btnHielo.x + 120)
                this.light.x += 1 * delta;   
            if (this.light.x > this.btnHielo.x + 120)
                this.light.x -= 1 * delta;
            this.btnHielo.alpha = 1;
            this.btnHielo.setInteractive().on("pointerdown", function(pointer)
            {
                player1 = "hielo";
                player2 = "elfo";
                escena.scene.start("JuegoLocal");
            });
        }
        if (isColliding(this.btnElfa))
        {
            if (this.light.x < this.btnElfa.x + 100)
                this.light.x += 1 * delta;   
            this.btnElfa.alpha = 1;
            this.btnElfa.setInteractive().on("pointerdown", function(pointer)
            {
                player1 = "elfo";
                player2 = "hielo";
                escena.scene.start("JuegoLocal");
            });
        }
        
        /* ANIMACIÓN DEL FONDO */

        this.bg.tilePositionY += 0.4 * delta;
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

// Jugador de hielo
function playerHielo(escena)
{
    /* VARIABLES */

    // Nombre interno del sprite
    this.nombre = "hielo";

    // Nombre de la plataforma
    this.nombrePlatform = "platform1";

    /* FUNCIONES PÚBLICAS */

    this.create = function()
    {
        //Añadimos la imagen de la plataforma a la escena
        this.platform = escena.add.image((config.width / 2) / 2 + 10, 500, this.nombrePlatform).setPipeline('Light2D');

        // Añadimos la imagen del personaje a la escena
        this.character = escena.add.image((config.width / 2) / 2, 400, this.nombre).setPipeline('Light2D');
        // Cambiamos la escala del personaje
        this.character.setScale(0.9);        
    }
}

// Jugador elfo
function playerElfo(escena)
{
    /* VARIABLES */

    // Nombre interno del sprite
    this.nombre = "elfa";

    // Nombre de la plataforma
    this.nombrePlatform = "platform2";

    /* FUNCIONES PÚBLICAS */

    this.create = function()
    {
        //Añadimos la imagen de la plataforma a la escena
        this.platform = escena.add.image((config.width / 2) + ((config.width / 2) / 2) + 5, 500, this.nombrePlatform).setPipeline('Light2D');

        // Añadimos la imagen a la escena
        this.character = escena.add.image((config.width / 2) + ((config.width / 2) / 2), 400, this.nombre).setPipeline('Light2D');
    }
}