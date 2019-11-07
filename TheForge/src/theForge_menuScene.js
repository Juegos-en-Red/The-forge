"use strict";

var sc_menuPrincipal = new Phaser.Scene("MenuPrincipal");

var menu = new Menu(sc_menuPrincipal);

sc_menuPrincipal.create = function()
{
    menu.create();
}

sc_menuPrincipal.update = function(time, delta)
{
    menu.update(time, delta);
}

function Menu(escena)
{
    /* VARIABLES */

    var pressed = false;

    /* FUNCIONES PÚBLICAS */

    this.create = function()
    {
        /* PONEMOS LUCES EN LA ESCENA */

        // Activamos la iluminación
        escena.lights.enable();

        // Ponemos un foco en la posicón (300, 300) de radio 500, de iluminación naranja (0xdf6a08) y con una intensidad de 1
        this.light = escena.lights.addLight(300, 300, 500, 0xdf6a08, 1);
        
        // Ponemos como ambientación de fondo un color gris
        escena.lights.setAmbientColor(0xc7c7c7);        

        /* IMAGENES PREDETERMINADAS */

        // Fondo del menú
        this.bg = escena.add.image(0, 0, "bg_Menu").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0, 0)
        this.bg.setOrigin(0, 0);

        // Título del juego
        this.titulo = escena.add.image(config.width / 2, 100, "titulo_Menu").setPipeline('Light2D');
        // Cambiamos la escala
        this.titulo.setScale(0.3);
        // Cambiamos el origen
        this.titulo.setOrigin(0.5, 0.5)        

        // Botón de local
        this.local = escena.add.sprite(config.width / 2, 200, "local_btn").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.local.setOrigin(0.5, 0);
        
        
        // Botón de online
        this.online = escena.add.sprite(config.width / 2, 300, "online_btn").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.online.setOrigin(0.5, 0);
        // Cambiamos el alpha de este botón para indicar que no está disponible
        this.online.alpha = 0.2;

        // Botón de ajustes
        this.ajustes = escena.add.sprite(config.width / 2, 400, "ajustes_btn").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.ajustes.setOrigin(0.5, 0);

        // Botón de guía
        this.guia = escena.add.sprite(config.width / 2, 500, "guia_btn").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.guia.setOrigin(0.5, 0);   

        /* IMAGENES PRESSED */

        // Botón de local
        this.localPress = escena.add.sprite(config.width / 2, 200, "local_btnPressed").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.local.setOrigin(0.5, 0.5);
        // Lo ponemos invisible
        this.localPress.visible = false;
        
        // Botón de online
        this.onlinePress = escena.add.sprite(config.width / 2, 300, "online_btnPressed").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.online.setOrigin(0.5, 0.5);
        // Lo ponemos invisible
        this.onlinePress.visible = false;    
        // Cambiamos el alpha de este botón para indicar que no está disponible
        this.onlinePress.alpha = 0.2;    

        // Botón de ajustes
        this.ajustesPress = escena.add.sprite(config.width / 2, 400, "ajustes_btnPressed").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.ajustes.setOrigin(0.5, 0.5);
        // Lo ponemos invisible
        this.ajustesPress.visible = false;

        // Botón de guía
        this.guiaPress = escena.add.sprite(config.width / 2, 500, "guia_btnPressed").setPipeline('Light2D');
        // Cambiamos el origen de coordenadas al punto (0.5, 0)
        this.guia.setOrigin(0.5, 0.5); 
        // Lo ponemos invisible
        this.guiaPress.visible = false;
    }

    this.update = function(time, delta)
    {
        /* ILUMINACIÓN */

        // Movemos la luz en función de dónde esté el ratón
        updateLights(this.light);

        /* MOUSE CLICK DE BOTONES */

        // Botón de local
        mouseClick(this.local, this.localPress, "local");

        // Botón de ajustes
        mouseClick(this.ajustes, this.ajustesPress, "ajustes");

        // Botón de guía

        mouseClick(this.guia, this.guiaPress, "guia");

        /* MOUSE OVER DE BOTONES */

        // Botón de local
        mouseBg(this.localPress, this.bg);

        // Botón de ajustes
        mouseBg(this.ajustesPress, this.bg);

        // Botón de guía
        mouseBg(this.guiaPress, this.bg);
        if (this.pressed == true)
            console.log(this.pressed);

    }   

    /* FUNCIONES PRIVADAS */
    function mouseBg(buttonPress, bg)
    {
        bg.setInteractive().on("pointerover", function(pointer)
        {
            buttonPress.visible = false;
            pressed = false;
        });
    }


    function mouseClick(button, buttonPress, type)
    {
        button.setInteractive().on("pointerdown", function(pointer)
        {
            buttonPress.visible = true;
            pressed = true;
        });

        button.setInteractive().on("pointerup", function(pointer)
        {
            buttonPress.visible = false;
            if (type == "local" && pressed === true)
                escena.scene.start("SeleccionPersonaje");

            if (type == "guia" && pressed === true)
            {                
                escena.scene.start("Guia");
            }
            pressed = false;
        });
    }

    function updateLights(light)
    {
        light.x = game.input.mousePointer.x;
        light.y = game.input.mousePointer.y;
    }
}