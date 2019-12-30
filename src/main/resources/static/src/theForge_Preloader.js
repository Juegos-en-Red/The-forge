"use strict";

var sc_Preloader = new Phaser.Scene("Preloader");

sc_Preloader.preload = function()
{

    /*this.load.image('carga', '../assets/game/carga.png');
    this.add.image(400, 300, 'carga');*/


    //Muchos agradecimientos a https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/ por este tutorial de pantalla de carga
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var loadingText = this.make.text({
        x: 400,
        y: 250,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
        x: 400,
        y: 295,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
        percentText.setText(parseInt(value * 100) + '%');
    });
                
    this.load.on('fileprogress', function (file) {
        loadingText.setText('Loading ' + file.key);
    });
     
    this.load.on('complete', function () {
        /*progressBar.destroy();
        progressBox.destroy();	
        loadingText.destroy();
        percentText.destroy();*/
        loadingText.setText("Loading complete. Please click to continue.")
    });
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

    // Botón de créditos
    this.load.image("creditos_btn", ["../assets/menu/creditos.png", "../assets/menu/creditos-normal.png"]);

    // Botón de próximamente
    this.load.image("next_btn", ["../assets/menu/next.png", "../assets/menu/next-normal.png"]);


    /* IMAGENES PRESSED */

    // Botón de local
    this.load.image("local_btnPressed", ["../assets/menu/localPress.png", "../assets/menu/localPress-normal.png"]);

    // Botón de online
    this.load.image("online_btnPressed", ["../assets/menu/onlinePress.png", "../assets/menu/onlinePress-normal.png"]);

    // Botón de ajustes
    this.load.image("ajustes_btnPressed", ["../assets/menu/ajustesPress.png", "../assets/menu/ajustesPress-normal.png"]);

    // Botón de guía
    this.load.image("guia_btnPressed", ["../assets/menu/guiaPress.png", "../assets/menu/guiaPress-normal.png"]);

    // Botón de créditos
    this.load.image("creditos_btnPressed", ["../assets/menu/creditosPress.png", "../assets/menu/creditosPress-normal.png"]);

    // Botón de próximamente
    this.load.image("next_btnPressed", ["../assets/menu/nextPress.png", "../assets/menu/nextPress-normal.png"]);

    /**** SELECCIÓN DE PERSONAJE ****/

    /* BACKGROUND */

    this.load.image("fondo", ["../assets/seleccionPersonaje/fondosp.png", "../assets/seleccionPersonaje/fondosp-normal.png"]);

    /* BOTONES Y PLATAFORMAS */

    // Botón de hielo
    this.load.image("btn_hielo", "../assets/seleccionPersonaje/botonHielo.png");

    // Botón de elfo
    this.load.image("btn_elfo", "../assets/seleccionPersonaje/botonElfo.png");
    
    // Botón de fuego
    this.load.image("btn_fuego", "../assets/seleccionPersonaje/botonFuego.png");

    // Botones de la interfaz
    this.load.image("botonBack", "../assets/seleccionPersonaje/botonBack.png");

    /* TEXTO */

    // Sprite de texto de elegir personaje
    this.load.image("elige", "../assets/seleccionPersonaje/elige.png");
    this.load.image("elige2", "../assets/seleccionPersonaje/elige2.png");

    /* PERSONAJES */

    // Hielo

    // Cargamos la imagen del personaje
    this.load.image("hielo", ["../assets/seleccionPersonaje/hieloPlayer.png", "../assets/seleccionPersonaje/hieloPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform1", ["../assets/seleccionPersonaje/plataformaSeleccion.png", "../assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);
    
    // Cargamos la imagen del personaje triste
    this.load.image("hieloTriste", ["../assets/seleccionPersonaje/hieloPlayerTriste.png", "../assets/seleccionPersonaje/hieloPlayer-normal.png"]);

    // Elfo

    // Cargamos la imagen del personaje
    this.load.image("elfa", ["../assets/seleccionPersonaje/elfaPlayer.png", "../assets/seleccionPersonaje/elfaPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform2", ["../assets/seleccionPersonaje/plataformaSeleccion.png", "../assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);

    // Cargamos la imagen del personaje triste
    this.load.image("elfaTriste", ["../assets/seleccionPersonaje/elfaPlayerTriste.png", "../assets/seleccionPersonaje/elfaPlayer-normal.png"]);

    // Fuego

    // Cargamos la imagen del personaje
    this.load.image("fuego", ["../assets/seleccionPersonaje/fuegoPlayer.png", "../assets/seleccionPersonaje/fuegoPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform3", ["../assets/seleccionPersonaje/plataformaSeleccion.png", "../assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);

    // Cargamos la imagen del personaje triste
    this.load.image("fuegoTriste", ["../assets/seleccionPersonaje/fuegoPlayerTriste.png", "../assets/seleccionPersonaje/fuegoPlayer-normal.png"]);


    //Escenario
    this.load.image('sky', '../assets/game/sky.png');
    //Modificaciones de los metales 
    this.load.image('metal material', '../assets/game/metal material.png');
    this.load.image('metal caliente', '../assets/game/metal caliente.png');
    //Partes de la armadura
    this.load.image('casco', '../assets/game/casco.png');
    this.load.image('CascoElfoD', '../assets/game/CascoElfoD.png');
    this.load.image('CascoHieloD', '../assets/game/CascoHieloD.png');
    this.load.image('CascoFuegoD', '../assets/game/CascoFuegoD.png');
    this.load.image('espada', '../assets/game/espada.png');
    this.load.image('EspadaElfoD', '../assets/game/EspadaElfoD.png');
    this.load.image('EspadaHieloD', '../assets/game/EspadaHieloD.png');
    this.load.image('EspadaFuegoD', '../assets/game/EspadaFuegoD.png');
    this.load.image('pechera', '../assets/game/pechera.png');
    this.load.image('PecheraElfoD', '../assets/game/PecheraElfoD.png');
    this.load.image('PecheraHieloD', '../assets/game/PecheraHieloD.png');
    this.load.image('PecheraFuegoD', '../assets/game/PecheraFuegoD.png');
    this.load.image('protecciones piernas', '../assets/game/protecciones piernas.png');
    this.load.image('ProtPiernasElfoD', '../assets/game/ProtPiernasElfoD.png');
    this.load.image('ProtPiernasHieloD', '../assets/game/ProtPiernasHieloD.png');
    this.load.image('ProtPiernasFuegoD', '../assets/game/ProtPiernasFuegoD.png');
    //Elementos del escenario
    this.load.image('empty', '../assets/game/empty.png');
    this.load.image('cajon1', '../assets/game/cajon1.png');
    this.load.image('cajon2', '../assets/game/cajon2.png');
    this.load.image('cajon3', '../assets/game/cajon3.png');
    this.load.image('cajon4', '../assets/game/cajon4.png');
    this.load.image('cajon5', '../assets/game/cajon5.png');
    this.load.image('mesa', '../assets/game/mesa.png');
    this.load.spritesheet('horno', 
        '../assets/game/horno.png',
        { frameWidth: 40, frameHeight: 120 }
    );
    this.load.spritesheet('horno doble', 
        '../assets/game/horno doble.png',
        { frameWidth: 40, frameHeight: 172 }
    );
    this.load.image('yunque', '../assets/game/yunque.png');
    this.load.image('yunque doble', '../assets/game/yunque doble.png');
    this.load.image('barril de templado', '../assets/game/barril de templado.png');
    this.load.image('basura', '../assets/game/basura.png');
    this.load.image('molde', '../assets/game/molde.png');
    this.load.image('moldeU', '../assets/game/moldeU.png');
    this.load.image('barreras', '../assets/game/barreras.png');
    //Otros extras (trampas)
    this.load.image('reloj', '../assets/game/reloj.png');
    this.load.image('trampa muro', '../assets/game/trampa muro.png');
    //Partículas
    this.load.image('dust', '../assets/game/dust.png');
    //Monstruos
    this.load.image('MElfoD', '../assets/game/MElfoD.png');
    this.load.image('MHieloD', '../assets/game/MHieloD.png');
    this.load.image('MFuegoD', '../assets/game/MFuegoD.png');
    //Interfaz
    this.load.image('victoria', '../assets/game/victoria.png');
    this.load.image('derrota', '../assets/game/derrota.png');
    this.load.image('empate', '../assets/game/empate.png');
    this.load.image('martillo', '../assets/game/martillo.png');
    this.load.image('martillo0', '../assets/game/martillo.png');
    this.load.image('martillo20', '../assets/game/martillo.png');
    this.load.image('martillo1', '../assets/game/martillo1.png');
    this.load.image('martillo2', '../assets/game/martillo2.png');
    this.load.image('martillo3', '../assets/game/martillo3.png');
    this.load.image('martillo4', '../assets/game/martillo4.png');
    this.load.image('martillo5', '../assets/game/martillo5.png');
    this.load.image('martillo6', '../assets/game/martillo6.png');
    this.load.image('martillo7', '../assets/game/martillo7.png');
    this.load.image('martillo8', '../assets/game/martillo8.png');
    this.load.image('martillo9', '../assets/game/martillo9.png');
    this.load.image('martillo10', '../assets/game/martillo10.png');
    this.load.image('martillo21', '../assets/game/martillo21.png');
    this.load.image('martillo22', '../assets/game/martillo22.png');
    this.load.image('martillo23', '../assets/game/martillo23.png');
    this.load.image('martillo24', '../assets/game/martillo24.png');
    this.load.image('martillo25', '../assets/game/martillo25.png');
    this.load.image('martillo26', '../assets/game/martillo26.png');
    this.load.image('martillo27', '../assets/game/martillo27.png');
    this.load.image('martillo28', '../assets/game/martillo28.png');
    this.load.image('martillo29', '../assets/game/martillo29.png');
    this.load.image('martillo210', '../assets/game/martillo210.png');
    this.load.image('relojinterfaz', '../assets/game/relojinterfaz.png');
    this.load.image('reloj0', '../assets/game/relojinterfaz.png');
    this.load.image('reloj1', '../assets/game/reloj1.png');
    this.load.image('reloj2', '../assets/game/reloj2.png');
    this.load.image('reloj3', '../assets/game/reloj3.png');
    this.load.image('reloj4', '../assets/game/reloj4.png');
    this.load.image('reloj5', '../assets/game/reloj5.png');
    this.load.image('reloj6', '../assets/game/reloj6.png');
    this.load.image('reloj7', '../assets/game/reloj7.png');
    this.load.image('reloj8', '../assets/game/reloj8.png');
    this.load.image('reloj9', '../assets/game/reloj8.png');
    this.load.image('cruz', '../assets/game/cruz.png');
    this.load.image('tic', '../assets/game/tic.png');
    this.load.image('1de2', '../assets/game/1de2.png');
    this.load.image('botonPausa', '../assets/game/botonPausa.png');
    this.load.image('pausedOverlay', '../assets/game/pausedOverlay.png');
    this.load.image('pausemenu', '../assets/game/pausemenu.png');
    this.load.image('pausequitmenu', '../assets/game/pausequitmenu.png');
    this.load.image('pauseguidebutton', '../assets/game/pauseguidebutton.png');
    this.load.image('pausequitbutton', '../assets/game/pausequitbutton.png');
    this.load.image('pauseresumebutton', '../assets/game/pauseresumebutton.png');
    this.load.image('pausecancelbutton', '../assets/game/pausecancelbutton.png');

    this.load.image('guideMarker', '../assets/game/guideMarker.png');

    this.load.image('countdown5', '../assets/game/countdown5.png');
    this.load.image('countdown4', '../assets/game/countdown4.png');
    this.load.image('countdown3', '../assets/game/countdown3.png');
    this.load.image('countdown2', '../assets/game/countdown2.png');
    this.load.image('countdown1', '../assets/game/countdown1.png');
    this.load.image('countdown0', '../assets/game/countdown0.png');
    //De aquí para abajo los spritesheet
    this.load.spritesheet('SSElfa1', 
        '../assets/game/SSElfa1.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEmpty', 
        '../assets/game/SSElfaOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaCasco', 
        '../assets/game/SSElfaCasco.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaCascoOverlay', 
        '../assets/game/SSElfaCascoOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEspada', 
        '../assets/game/SSElfaEspada.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEspadaOverlay', 
        '../assets/game/SSElfaEspadaOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetal', 
        '../assets/game/SSElfaMetal.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetalOverlay', 
        '../assets/game/SSElfaMetalOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetalCaliente', 
        '../assets/game/SSElfaMetalCaliente.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaPechera', 
        '../assets/game/SSElfaPechera.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaPecheraOverlay', 
        '../assets/game/SSElfaPecheraOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaProtecPiernas', 
        '../assets/game/SSElfaProtecPiernas.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaProtecPiernasOverlay', 
        '../assets/game/SSElfaProtecPiernasOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSHielo1', 
        '../assets/game/SSHielo1.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEmpty', 
        '../assets/game/SSHieloEmpty.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloCasco', 
        '../assets/game/SSHieloCasco.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloCascoOverlay', 
        '../assets/game/SSHieloCascoOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEspada', 
        '../assets/game/SSHieloEspada.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEspadaOverlay', 
        '../assets/game/SSHieloEspadaOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetal', 
        '../assets/game/SSHieloMetal.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetalOverlay', 
        '../assets/game/SSHieloMetalOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetalCaliente', 
        '../assets/game/SSHieloMetalCaliente.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloPechera', 
        '../assets/game/SSHieloPechera.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloPecheraOverlay', 
        '../assets/game/SSHieloPecheraOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloProtecPiernas', 
        '../assets/game/SSHieloProtecPiernas.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloProtecPiernasOverlay', 
        '../assets/game/SSHieloProtecPiernasOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );

    this.load.spritesheet('SSFuego1', 
    '../assets/game/SSFuego1.png',
    { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoEmpty', 
        '../assets/game/SSFuegoEmpty.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoCasco', 
        '../assets/game/SSFuegoCasco.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoCascoOverlay', 
        '../assets/game/SSFuegoCascoOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoEspada', 
        '../assets/game/SSFuegoEspada.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoEspadaOverlay', 
        '../assets/game/SSFuegoEspadaOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoMetal', 
        '../assets/game/SSFuegoMetal.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoMetalOverlay', 
        '../assets/game/SSFuegoMetalOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoMetalCaliente', 
        '../assets/game/SSFuegoMetalCaliente.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoPechera', 
        '../assets/game/SSFuegoPechera.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoPecheraOverlay', 
        '../assets/game/SSFuegoPecheraOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoProtecPiernas', 
        '../assets/game/SSFuegoProtecPiernas.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoProtecPiernasOverlay', 
        '../assets/game/SSFuegoProtecPiernasOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );

    //Menú ajustes
    this.load.image('fondo menu ajustes', '../assets/game/fondo menu ajustes.png');
    this.load.image('botonTecla', '../assets/game/botonTecla.png');
    this.load.image('botonSalir', '../assets/game/botonSalir.png');
    this.load.image('botonRestablecer', '../assets/game/botonRestablecer.png');
    this.load.image('botonAplicar', '../assets/game/botonAplicar.png');
    this.load.image('icono menos', '../assets/game/icono menos.png');
    this.load.image('icono mas', '../assets/game/icono mas.png');
    this.load.image('botonLGuiaE', '../assets/game/botonLGuiaE.png');
    this.load.image('botonLGuiaD', '../assets/game/botonLGuiaD.png');

    //RECETAS
    this.load.image('recuadro', '../assets/game/recuadro.png');
    this.load.image('Rbarril', '../assets/game/Rbarril.png');
    this.load.image('Rcasco', '../assets/game/Rcasco.png');
    this.load.image('Respada', '../assets/game/Respada.png');
    this.load.image('Rhorno', '../assets/game/Rhorno.png');
    this.load.image('Rhorno doble', '../assets/game/Rhorno doble.png');
    this.load.image('Rmetal', '../assets/game/Rmetal.png');
    this.load.image('Rmolde', '../assets/game/Rmolde.png');
    this.load.image('RMonstruoE', '../assets/game/RMonstruoE.png');
    this.load.image('RMonstruoH', '../assets/game/RMonstruoH.png');
    this.load.image('RMonstruoF', '../assets/game/RMonstruoF.png');
    this.load.image('Rpechera', '../assets/game/Rpechera.png');
    this.load.image('Rpiernas', '../assets/game/Rpiernas.png');
    this.load.image('Ryunque', '../assets/game/Ryunque.png');
    this.load.image('Ryunque doble', '../assets/game/Ryunque doble.png');

    // Altar sin iluminar de las trampas
    this.load.image("altar1", "../assets/game/altar1.png");

    // Altar iluminado de las trampas
    this.load.image("altar2", "../assets/game/altar2.png");

    // Botón del altar
    this.load.image("btnAltar", "../assets/game/botonAltar.png");

    // Trampa de reloj
    this.load.image("trampaReloj", "../assets/game/reloj.png");

    // Trampa del muro
    this.load.image("trampaMuro", "../assets/game/muro.png");

    // Interfaz de las trampas
    this.load.image("cuadroTrampa", "../assets/game/cuadroTrampa.png");

    // Triple cartel de prohibido
    this.load.image("tripleMuro", "../assets/game/prohibido3.png");

    // Progreso de los monstruos
    this.load.image("progreso0", "../assets/game/progreso0.png");
    this.load.image("progreso1", "../assets/game/progreso1.png");
    this.load.image("progreso2", "../assets/game/progreso2.png");
    this.load.image("progreso3", "../assets/game/progreso3.png");
    this.load.image("progreso4", "../assets/game/progreso4.png");

    // Imágenes de la guía
    this.load.image("botonDer", "../assets/guia/botonDer.png");

    this.load.image("botonIzda", "../assets/guia/botonIzda.png");

    this.load.image("historia", "../assets/guia/historia.png");

    this.load.image("controles", "../assets/guia/controles.png");

    this.load.image("cajones", "../assets/guia/cajones.png");

    this.load.image("hornos", "../assets/guia/hornos.png");

    this.load.image("moldeguia", "../assets/guia/moldeGuia.png");

    this.load.image("yunques", "../assets/guia/yunques.png");

    this.load.image("mesaguia", "../assets/guia/mesaGuia.png");

    this.load.image("barrilTemp", "../assets/guia/barrilTemp.png");

    this.load.image("monstruo", "../assets/guia/monstruo.png");

    this.load.image("basuraguia", "../assets/guia/basuraGuia.png");

    this.load.image("trampas", "../assets/guia/trampas.png");

    this.load.image("cruz2", "../assets/guia/cruz2.png");

   /**** ESCENA DE LOS CRÉDITOS ****/

   this.load.image("creditos", "../assets/creditos/creditos.png");

   /**** ESCENA DE PRÓXIMAMENTE ****/

   this.load.image("next", "../assets/next/next.png");

    //ONLINE
    
    this.load.image("fondo online-lobby", "../assets/online/fondo online-lobby.png");
    this.load.image("botonConectar", "../assets/online/botonConectar.png");
    this.load.image("botonReconectar", "../assets/online/botonReconectar.png");
    this.load.image("botonDesconectar", "../assets/online/botonDesconectar.png");
    this.load.image("botonIniciarSesion", "../assets/online/botonIniciarSesion.png");
    this.load.image("botonRegistrarse", "../assets/online/botonRegistrarse.png");
    this.load.image("botonEnviar", "../assets/online/botonEnviar.png");
    this.load.image("recuadroPje", "../assets/online/recuadroPje.png");
    this.load.image("botonChange", "../assets/online/botonChange.png");

    //Elementos HTML
    
    this.load.html('input', '../src/input.html');
    this.load.html('login', '../src/login.html');
    
    this.load.html('chatBox', '../src/chatBox.html');
    this.load.html('chatInput', '../src/chatInput.html');
    this.load.html('usersBox', '../src/usersBox.html');

}

sc_Preloader.create = function()
{      
    sc_Preloader.input.on('pointerdown', function(pointer){
        sc_Preloader.scene.start("MenuPrincipal");
     });
}

sc_Preloader.update = function()
{

}