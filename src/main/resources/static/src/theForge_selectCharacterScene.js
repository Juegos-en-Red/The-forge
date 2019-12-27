"use strict";

var sc_SeleccionPersonaje = new Phaser.Scene("SeleccionPersonaje");

var seleccion = new MenuSeleccion(sc_SeleccionPersonaje);

/*var player1;
var player2;*/

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

        this.choosingStage = 1;

        this.botonBack = escena.add.image((config.width / 2), 550, "botonBack");
        this.botonBack.setInteractive({cursor: "pointer"}).on("pointerdown",clickBack);


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
                if (seleccion.choosingStage == 1) {
                    seleccion.choosingStage = 2;
                    cont.p1.ch = 'SSHielo1';
                    seleccion.texto.setTexture("elige2");
                } else {
                    cont.p2.ch = 'SSHielo1';
                    escena.scene.start("JuegoLocal");
                }
            });

        this.btnElfa.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
        {
            if (seleccion.choosingStage == 1) {
                seleccion.choosingStage = 2;
                cont.p1.ch = 'SSElfa1';
                seleccion.texto.setTexture("elige2");
            } else {
                cont.p2.ch = 'SSElfa1';
                escena.scene.start("JuegoLocal");
            }
        });

        this.btnFuego.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
        {
            if (seleccion.choosingStage == 1) {
                seleccion.choosingStage = 2;
                cont.p1.ch = 'SSFuego1';
                seleccion.texto.setTexture("elige2");
            } else {
                cont.p2.ch = 'SSFuego1';
                escena.scene.start("JuegoLocal");
            }
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
        this.platform = escena.add.image((config.width / 2) / 2 + 10-50, 450, this.nombrePlatform).setPipeline('Light2D');

        // Añadimos la imagen del personaje a la escena
        this.character = escena.add.image((config.width / 2) / 2 -50, 350, this.nombre).setPipeline('Light2D');
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
        this.platform = escena.add.image((config.width / 2) + ((config.width / 2) / 2) + 5+50, 450, this.nombrePlatform).setPipeline('Light2D');

        // Añadimos la imagen a la escena
        this.character = escena.add.image((config.width / 2) + ((config.width / 2) / 2 +50), 350, this.nombre).setPipeline('Light2D');
    }
}

// Jugador de fuego
function playerFuego(escena)
{
    /* VARIABLES */

    // Nombre interno del sprite
    this.nombre = "fuego";

    // Nombre de la plataforma
    this.nombrePlatform = "platform3";

    /* FUNCIONES PÚBLICAS */

    this.create = function()
    {
        //Añadimos la imagen de la plataforma a la escena
        this.platform = escena.add.image((config.width / 2)  + 10, 450, this.nombrePlatform).setPipeline('Light2D');

        // Añadimos la imagen del personaje a la escena
        this.character = escena.add.image((config.width / 2) , 350, this.nombre).setPipeline('Light2D');
        // Cambiamos la escala del personaje
        this.character.setScale(0.9);        
    }
}

function clickBack() {
    if (seleccion.choosingStage == 2) {
        seleccion.choosingStage = 1;
        seleccion.texto.setTexture("elige");
    } else {
        sc_SeleccionPersonaje.scene.start("MenuPrincipal");
    }
}