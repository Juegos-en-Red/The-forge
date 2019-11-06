"use strict";

var sc_Preloader = new Phaser.Scene("Preloader");

sc_Preloader.preload = function()
{
    /**** MENÚ PRINCIPAL ****/

    /* IMAGENES PREDETERMINADAS */

    // Fondo del menú
    this.load.image("bg_Menu", ["../assets/menu/menus.png", "../assets/menu/menus-normal.png"]);

    //Título del juego
    this.load.image("titulo_Menu", ["../assets/menu/titulo.png", "../assets/menu/titulo-normal.png"])

    // Botón de local
    this.load.image("local_btn", ["../assets/menu/local.png", "../assets/menu/local-normal.png"]);

    // Botón de online
    this.load.image("online_btn", ["../assets/menu/online.png", "../assets/menu/online-normal.png"]);

    // Botón de ajustes
    this.load.image("ajustes_btn", ["../assets/menu/ajustes.png", "../assets/menu/ajustes-normal.png"]);

    // Botón de guía
    this.load.image("guia_btn", ["../assets/menu/guia.png", "../assets/menu/guia-normal.png"]);

    /* IMAGENES PRESSED */

    // Botón de local
    this.load.image("local_btnPressed", ["../assets/menu/localPress.png", "../assets/menu/localPress-normal.png"]);

    // Botón de online
    this.load.image("online_btnPressed", ["../assets/menu/onlinePress.png", "../assets/menu/onlinePress-normal.png"]);

    // Botón de ajustes
    this.load.image("ajustes_btnPressed", ["../assets/menu/ajustesPress.png", "../assets/menu/ajustesPress-normal.png"]);

    // Botón de guía
    this.load.image("guia_btnPressed", ["../assets/menu/guiaPress.png", "../assets/menu/guiaPress-normal.png"]);

    /**** SELECCIÓN DE PERSONAJE ****/

    /* BACKGROUND */

    this.load.image("fondo", ["../assets/seleccionPersonaje/fondosp.png", "../assets/seleccionPersonaje/fondosp-normal.png"]);

    /* BOTONES Y PLATAFORMAS */

    // Botón de hielo
    this.load.image("btn_hielo", "../assets/seleccionPersonaje/botonHielo.png");

    // Botón de elfo
    this.load.image("btn_elfo", "../assets/seleccionPersonaje/botonElfo.png");

    /* TEXTO */

    // Sprite de texto de elegir personaje
    this.load.image("elige", "../assets/seleccionPersonaje/elige.png");

    /* PERSONAJES */

    // Hielo

    // Cargamos la imagen del personaje
    this.load.image("hielo", ["../assets/seleccionPersonaje/hieloPlayer.png", "../assets/seleccionPersonaje/hieloPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform1", ["../assets/seleccionPersonaje/plataformaSeleccion.png", "../assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);

    // Elfo

    // Cargamos la imagen
    this.load.image("elfa", ["../assets/seleccionPersonaje/elfaPlayer.png", "../assets/seleccionPersonaje/elfaPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform2", ["../assets/seleccionPersonaje/plataformaSeleccion.png", "../assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);

    /**** JUEGO ****/

    // Cuadrado de prueba
    this.load.image("cuadrado", "../assets/mundo/jugador.png");

    // Background del escenario
    this.load.image("escenario", "../assets/mundo/escenario.png");

    // Yunque del escenario
    this.load.image("yunquePequeño", "../assets/mundo/yunquePequeño.png");

    // Mesa del escenario
    this.load.image("mesa", "../assets/mundo/mesa.png");

    // Wall collider del escenario
    this.load.image("wallCollider", "../assets/mundo/transparency.png");

    // Horno grande del escenario
    this.load.spritesheet("hornoGrande", "../assets/mundo/hornoGrande.png", 
                         {frameWidth: 40, frameHeight: 120, spacing: 40});

    // Horno pequeño del escenario
    this.load.spritesheet("hornoPequeño", "../assets/mundo/hornoPequeño.png", 
                         {frameWidth: 40, frameHeight: 120, spacing: 40});

    // Caja marrón del escenario
    this.load.spritesheet("cajaMarron", "../assets/mundo/CajaMarron.png",
                         {frameWidth: 40, frameHeight: 80, spacing: 40});

    // Caja gris del escenario
    this.load.spritesheet("cajaGris", "../assets/mundo/CajaGris.png",
                         {frameWidth: 40, frameHeight: 80, spacing: 40});
    
    // Caja azul del escenario
    this.load.spritesheet("cajaAzul", "../assets/mundo/CajaAzul.png",
                         {frameWidth: 40, frameHeight: 80, spacing: 40});
    
    // Molde del escenario
    this.load.spritesheet("molde", "../assets/mundo/molde.png",
                         {frameWidth: 40, frameHeight: 40, spacing: 40});

    // Barril de templado del escenario
    this.load.image("barril", "../assets/mundo/barril.png");

    // Yunque grande del escenario
    this.load.image("yunqueGrande", "../assets/mundo/yunqueGrande.png");

    // Señal de prohibido
    this.load.image("prohibido", "../assets/mundo/prohibido.png");

    // Basura
    this.load.spritesheet("basura", "../assets/mundo/basura.png",
                         {frameWidth: 40, frameHeight: 80, spacing: 40});

    // Doble prohibido
    this.load.image("dobleProhibido", "../assets/mundo/dobleProhibido.png");

    // Skyline
    this.load.image("sky", "../assets/mundo/sky.png");

    // Personaje de hielo
    this.load.spritesheet("perHielo", "../assets/mundo/ssHielo.png",
                         {frameWidth: 40, frameHeight: 40});

    // Persoanje elfo
    this.load.spritesheet("perElfa", "../assets/mundo/ssElfa.png",
                         {frameWidth: 40, frameHeight: 80});

    // Martillo 1
    this.load.image("martillo1", "../assets/mundo/martillo.png");

    // Martillo 2
    this.load.image("martillo2", "../assets/mundo/martillo2.png");

    // OK
    this.load.image("correcto", "../assets/mundo/tic.png");

    // 1 de 2
    this.load.image("unodedos", "../assets/mundo/1de2.png");

    // Monstruo hielo
    this.load.image("monstruohielo", "../assets/mundo/monstruoHielo.png");

    // Monstruo elfo
    this.load.image("monstruoelfo", "../assets/mundo/monstruoElfo.png");
}

sc_Preloader.create = function()
{      

    this.scene.start("MenuPrincipal");
}

sc_Preloader.update = function()
{

}