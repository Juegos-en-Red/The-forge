"use strict";

var sc_Preloader = new Phaser.Scene("Preloader");

sc_Preloader.preload = function()
{

    /*this.load.image('carga', 'src/assets/game/carga.png');
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
    this.load.image("bg_Menu", ["src/assets/menu/menus.png", "src/assets/menu/menus-normal.png"]);

    //Título del juego
    this.load.image("titulo_Menu", ["src/assets/menu/titulo.png", "src/assets/menu/titulo-normal.png"])

    // Botón de local
    this.load.image("local_btn", ["src/assets/menu/local.png", "src/assets/menu/local-normal.png"]);

    // Botón de online
    this.load.image("online_btn", ["src/assets/menu/online.png", "src/assets/menu/online-normal.png"]);

    // Botón de ajustes
    this.load.image("ajustes_btn", ["src/assets/menu/ajustes.png", "src/assets/menu/ajustes-normal.png"]);

    // Botón de guía
    this.load.image("guia_btn", ["src/assets/menu/guia.png", "src/assets/menu/guia-normal.png"]);

    // Botón de créditos
    this.load.image("creditos_btn", ["src/assets/menu/creditos.png", "src/assets/menu/creditos-normal.png"]);

    // Botón de próximamente
    this.load.image("next_btn", ["src/assets/menu/next.png", "src/assets/menu/next-normal.png"]);


    /* IMAGENES PRESSED */

    // Botón de local
    this.load.image("local_btnPressed", ["src/assets/menu/localPress.png", "src/assets/menu/localPress-normal.png"]);

    // Botón de online
    this.load.image("online_btnPressed", ["src/assets/menu/onlinePress.png", "src/assets/menu/onlinePress-normal.png"]);

    // Botón de ajustes
    this.load.image("ajustes_btnPressed", ["src/assets/menu/ajustesPress.png", "src/assets/menu/ajustesPress-normal.png"]);

    // Botón de guía
    this.load.image("guia_btnPressed", ["src/assets/menu/guiaPress.png", "src/assets/menu/guiaPress-normal.png"]);

    // Botón de créditos
    this.load.image("creditos_btnPressed", ["src/assets/menu/creditosPress.png", "src/assets/menu/creditosPress-normal.png"]);

    // Botón de próximamente
    this.load.image("next_btnPressed", ["src/assets/menu/nextPress.png", "src/assets/menu/nextPress-normal.png"]);

    /**** SELECCIÓN DE PERSONAJE ****/

    /* BACKGROUND */

    this.load.image("fondo", ["src/assets/seleccionPersonaje/fondosp.png", "src/assets/seleccionPersonaje/fondosp-normal.png"]);

    /* BOTONES Y PLATAFORMAS */

    // Botón de hielo
    this.load.image("btn_hielo", "src/assets/seleccionPersonaje/botonHielo.png");

    // Botón de elfo
    this.load.image("btn_elfo", "src/assets/seleccionPersonaje/botonElfo.png");
    
    // Botón de fuego
    this.load.image("btn_fuego", "src/assets/seleccionPersonaje/botonFuego.png");

    // Botones de la interfaz
    this.load.image("botonBack", "src/assets/seleccionPersonaje/botonBack.png");

    /* TEXTO */

    // Sprite de texto de elegir personaje
    this.load.image("elige", "src/assets/seleccionPersonaje/elige.png");
    this.load.image("elige2", "src/assets/seleccionPersonaje/elige2.png");

    /* PERSONAJES */

    // Hielo

    // Cargamos la imagen del personaje
    this.load.image("hielo", ["src/assets/seleccionPersonaje/hieloPlayer.png", "src/assets/seleccionPersonaje/hieloPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform1", ["src/assets/seleccionPersonaje/plataformaSeleccion.png", "src/assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);
    
    // Cargamos la imagen del personaje triste
    this.load.image("hieloTriste", ["src/assets/seleccionPersonaje/hieloPlayerTriste.png", "src/assets/seleccionPersonaje/hieloPlayer-normal.png"]);

    // Elfo

    // Cargamos la imagen del personaje
    this.load.image("elfa", ["src/assets/seleccionPersonaje/elfaPlayer.png", "src/assets/seleccionPersonaje/elfaPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform2", ["src/assets/seleccionPersonaje/plataformaSeleccion.png", "src/assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);

    // Cargamos la imagen del personaje triste
    this.load.image("elfaTriste", ["src/assets/seleccionPersonaje/elfaPlayerTriste.png", "src/assets/seleccionPersonaje/elfaPlayer-normal.png"]);

    // Fuego

    // Cargamos la imagen del personaje
    this.load.image("fuego", ["src/assets/seleccionPersonaje/fuegoPlayer.png", "src/assets/seleccionPersonaje/fuegoPlayer-normal.png"]);

    // Cargamos la imagen de la plataforma
    this.load.image("platform3", ["src/assets/seleccionPersonaje/plataformaSeleccion.png", "src/assets/seleccionPersonaje/plataformaSeleccion-normal.png"]);

    // Cargamos la imagen del personaje triste
    this.load.image("fuegoTriste", ["src/assets/seleccionPersonaje/fuegoPlayerTriste.png", "src/assets/seleccionPersonaje/fuegoPlayer-normal.png"]);


    //Escenario
    this.load.image('sky', 'src/assets/game/sky.png');
    //Modificaciones de los metales 
    this.load.image('metal material', 'src/assets/game/metal material.png');
    this.load.image('metal caliente', 'src/assets/game/metal caliente.png');
    //Partes de la armadura
    this.load.image('casco', 'src/assets/game/casco.png');
    this.load.image('CascoElfoD', 'src/assets/game/CascoElfoD.png');
    this.load.image('CascoHieloD', 'src/assets/game/CascoHieloD.png');
    this.load.image('CascoFuegoD', 'src/assets/game/CascoFuegoD.png');
    this.load.image('espada', 'src/assets/game/espada.png');
    this.load.image('EspadaElfoD', 'src/assets/game/EspadaElfoD.png');
    this.load.image('EspadaHieloD', 'src/assets/game/EspadaHieloD.png');
    this.load.image('EspadaFuegoD', 'src/assets/game/EspadaFuegoD.png');
    this.load.image('pechera', 'src/assets/game/pechera.png');
    this.load.image('PecheraElfoD', 'src/assets/game/PecheraElfoD.png');
    this.load.image('PecheraHieloD', 'src/assets/game/PecheraHieloD.png');
    this.load.image('PecheraFuegoD', 'src/assets/game/PecheraFuegoD.png');
    this.load.image('protecciones piernas', 'src/assets/game/protecciones piernas.png');
    this.load.image('ProtPiernasElfoD', 'src/assets/game/ProtPiernasElfoD.png');
    this.load.image('ProtPiernasHieloD', 'src/assets/game/ProtPiernasHieloD.png');
    this.load.image('ProtPiernasFuegoD', 'src/assets/game/ProtPiernasFuegoD.png');
    //Elementos del escenario
    this.load.image('empty', 'src/assets/game/empty.png');
    this.load.image('cajon1', 'src/assets/game/cajon1.png');
    this.load.image('cajon2', 'src/assets/game/cajon2.png');
    this.load.image('cajon3', 'src/assets/game/cajon3.png');
    this.load.image('cajon4', 'src/assets/game/cajon4.png');
    this.load.image('cajon5', 'src/assets/game/cajon5.png');
    this.load.image('cajon1I', 'src/assets/game/cajon1I.png');
    this.load.image('cajon2I', 'src/assets/game/cajon2I.png');
    this.load.image('cajon3I', 'src/assets/game/cajon3I.png');
    this.load.image('cajon4I', 'src/assets/game/cajon4I.png');
    this.load.image('cajon5I', 'src/assets/game/cajon5I.png');
    this.load.image('mesa', 'src/assets/game/mesa.png');
    this.load.spritesheet('horno', 
        'src/assets/game/horno.png',
        { frameWidth: 40, frameHeight: 120 }
    );
    this.load.spritesheet('horno doble', 
        'src/assets/game/horno doble.png',
        { frameWidth: 40, frameHeight: 172 }
    );
    this.load.image('yunque', 'src/assets/game/yunque.png');
    this.load.image('yunque doble', 'src/assets/game/yunque doble.png');
    this.load.image('barril de templado', 'src/assets/game/barril de templado.png');
    this.load.image('basura', 'src/assets/game/basura.png');
    this.load.image('basuraI', 'src/assets/game/basuraI.png');
    this.load.image('molde', 'src/assets/game/molde.png');
    this.load.image('moldeU', 'src/assets/game/moldeU.png');
    this.load.image('barreras', 'src/assets/game/barreras.png');
    //Otros extras (trampas)
    this.load.image('reloj', 'src/assets/game/reloj.png');
    this.load.image('trampa muro', 'src/assets/game/trampa muro.png');
    //Partículas
    this.load.image('dust', 'src/assets/game/dust.png');
    //Monstruos
    this.load.image('MElfoD', 'src/assets/game/MElfoD.png');
    this.load.image('MHieloD', 'src/assets/game/MHieloD.png');
    this.load.image('MFuegoD', 'src/assets/game/MFuegoD.png');
    //Interfaz
    this.load.image('victoria', 'src/assets/game/victoria.png');
    this.load.image('derrota', 'src/assets/game/derrota.png');
    this.load.image('empate', 'src/assets/game/empate.png');
    this.load.image('martillo', 'src/assets/game/martillo.png');
    this.load.image('martillo0', 'src/assets/game/martillo.png');
    this.load.image('martillo20', 'src/assets/game/martillo.png');
    this.load.image('martillo1', 'src/assets/game/martillo1.png');
    this.load.image('martillo2', 'src/assets/game/martillo2.png');
    this.load.image('martillo3', 'src/assets/game/martillo3.png');
    this.load.image('martillo4', 'src/assets/game/martillo4.png');
    this.load.image('martillo5', 'src/assets/game/martillo5.png');
    this.load.image('martillo6', 'src/assets/game/martillo6.png');
    this.load.image('martillo7', 'src/assets/game/martillo7.png');
    this.load.image('martillo8', 'src/assets/game/martillo8.png');
    this.load.image('martillo9', 'src/assets/game/martillo9.png');
    this.load.image('martillo10', 'src/assets/game/martillo10.png');
    this.load.image('martillo21', 'src/assets/game/martillo21.png');
    this.load.image('martillo22', 'src/assets/game/martillo22.png');
    this.load.image('martillo23', 'src/assets/game/martillo23.png');
    this.load.image('martillo24', 'src/assets/game/martillo24.png');
    this.load.image('martillo25', 'src/assets/game/martillo25.png');
    this.load.image('martillo26', 'src/assets/game/martillo26.png');
    this.load.image('martillo27', 'src/assets/game/martillo27.png');
    this.load.image('martillo28', 'src/assets/game/martillo28.png');
    this.load.image('martillo29', 'src/assets/game/martillo29.png');
    this.load.image('martillo210', 'src/assets/game/martillo210.png');
    this.load.image('relojinterfaz', 'src/assets/game/relojInterfaz.png');
    this.load.image('reloj0', 'src/assets/game/relojInterfaz.png');
    this.load.image('reloj1', 'src/assets/game/reloj1.png');
    this.load.image('reloj2', 'src/assets/game/reloj2.png');
    this.load.image('reloj3', 'src/assets/game/reloj3.png');
    this.load.image('reloj4', 'src/assets/game/reloj4.png');
    this.load.image('reloj5', 'src/assets/game/reloj5.png');
    this.load.image('reloj6', 'src/assets/game/reloj6.png');
    this.load.image('reloj7', 'src/assets/game/reloj7.png');
    this.load.image('reloj8', 'src/assets/game/reloj8.png');
    this.load.image('reloj9', 'src/assets/game/reloj8.png');
    this.load.image('cruz', 'src/assets/game/cruz.png');
    this.load.image('tic', 'src/assets/game/tic.png');
    this.load.image('1de2', 'src/assets/game/1de2.png');
    this.load.image('botonPausa', 'src/assets/game/botonPausa.png');
    this.load.image('pausedOverlay', 'src/assets/game/pausedoverlay.png');
    this.load.image('pausemenu', 'src/assets/game/pausemenu.png');
    this.load.image('pausequitmenu', 'src/assets/game/pausequitmenu.png');
    this.load.image('pauseguidebutton', 'src/assets/game/pauseguidebutton.png');
    this.load.image('pausequitbutton', 'src/assets/game/pausequitbutton.png');
    this.load.image('pauseresumebutton', 'src/assets/game/pauseresumebutton.png');
    this.load.image('pausecancelbutton', 'src/assets/game/pausecancelbutton.png');
    this.load.image('pausesurrenderbutton', 'src/assets/game/botonSurrender.png');

    this.load.image('guideMarker', 'src/assets/game/guideMarker.png');

    this.load.image('countdown5', 'src/assets/game/countdown5.png');
    this.load.image('countdown4', 'src/assets/game/countdown4.png');
    this.load.image('countdown3', 'src/assets/game/countdown3.png');
    this.load.image('countdown2', 'src/assets/game/countdown2.png');
    this.load.image('countdown1', 'src/assets/game/countdown1.png');
    this.load.image('countdown0', 'src/assets/game/countdown0.png');
    //De aquí para abajo los spritesheet
    this.load.spritesheet('SSElfa1', 
        'src/assets/game/SSElfa1.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEmpty', 
        'src/assets/game/SSElfaOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaCasco', 
        'src/assets/game/SSElfaCasco.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaCascoOverlay', 
        'src/assets/game/SSElfaCascoOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEspada', 
        'src/assets/game/SSElfaEspada.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaEspadaOverlay', 
        'src/assets/game/SSElfaEspadaOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetal', 
        'src/assets/game/SSElfaMetal.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetalOverlay', 
        'src/assets/game/SSElfaMetalOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaMetalCaliente', 
        'src/assets/game/SSElfaMetalCaliente.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaPechera', 
        'src/assets/game/SSElfaPechera.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaPecheraOverlay', 
        'src/assets/game/SSElfaPecheraOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaProtecPiernas', 
        'src/assets/game/SSElfaProtecPiernas.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSElfaProtecPiernasOverlay', 
        'src/assets/game/SSElfaProtecPiernasOverlay.png',
        { frameWidth: 61, frameHeight: 64 }
    );
    this.load.spritesheet('SSHielo1', 
        'src/assets/game/SSHielo1.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEmpty', 
        'src/assets/game/SSHieloEmpty.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloCasco', 
        'src/assets/game/SSHieloCasco.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloCascoOverlay', 
        'src/assets/game/SSHieloCascoOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEspada', 
        'src/assets/game/SSHieloEspada.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloEspadaOverlay', 
        'src/assets/game/SSHieloEspadaOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetal', 
        'src/assets/game/SSHieloMetal.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetalOverlay', 
        'src/assets/game/SSHieloMetalOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloMetalCaliente', 
        'src/assets/game/SSHieloMetalCaliente.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloPechera', 
        'src/assets/game/SSHieloPechera.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloPecheraOverlay', 
        'src/assets/game/SSHieloPecheraOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloProtecPiernas', 
        'src/assets/game/SSHieloProtecPiernas.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSHieloProtecPiernasOverlay', 
        'src/assets/game/SSHieloProtecPiernasOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );

    this.load.spritesheet('SSFuego1', 
    'src/assets/game/SSFuego1.png',
    { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoEmpty', 
        'src/assets/game/SSFuegoEmpty.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoCasco', 
        'src/assets/game/SSFuegoCasco.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoCascoOverlay', 
        'src/assets/game/SSFuegoCascoOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoEspada', 
        'src/assets/game/SSFuegoEspada.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoEspadaOverlay', 
        'src/assets/game/SSFuegoEspadaOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoMetal', 
        'src/assets/game/SSFuegoMetal.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoMetalOverlay', 
        'src/assets/game/SSFuegoMetalOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoMetalCaliente', 
        'src/assets/game/SSFuegoMetalCaliente.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoPechera', 
        'src/assets/game/SSFuegoPechera.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoPecheraOverlay', 
        'src/assets/game/SSFuegoPecheraOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoProtecPiernas', 
        'src/assets/game/SSFuegoProtecPiernas.png',
        { frameWidth: 70, frameHeight: 58 }
    );
    this.load.spritesheet('SSFuegoProtecPiernasOverlay', 
        'src/assets/game/SSFuegoProtecPiernasOverlay.png',
        { frameWidth: 70, frameHeight: 58 }
    );

    //Menú ajustes
    this.load.image('fondo menu ajustes', 'src/assets/game/fondo menu ajustes.png');
    this.load.image('botonTecla', 'src/assets/game/botonTecla.png');
    this.load.image('botonSalir', 'src/assets/game/botonSalir.png');
    this.load.image('botonRestablecer', 'src/assets/game/botonRestablecer.png');
    this.load.image('botonAplicar', 'src/assets/game/botonAplicar.png');
    this.load.image('icono menos', 'src/assets/game/icono menos.png');
    this.load.image('icono mas', 'src/assets/game/icono mas.png');
    this.load.image('botonLGuiaE', 'src/assets/game/botonLGuiaE.png');
    this.load.image('botonLGuiaD', 'src/assets/game/botonLGuiaD.png');

    //RECETAS
    this.load.image('recuadro', 'src/assets/game/recuadro.png');
    this.load.image('Rbarril', 'src/assets/game/Rbarril.png');
    this.load.image('Rcasco', 'src/assets/game/Rcasco.png');
    this.load.image('Respada', 'src/assets/game/Respada.png');
    this.load.image('Rhorno', 'src/assets/game/Rhorno.png');
    this.load.image('Rhorno doble', 'src/assets/game/Rhorno doble.png');
    this.load.image('Rmetal', 'src/assets/game/Rmetal.png');
    this.load.image('Rmolde', 'src/assets/game/Rmolde.png');
    this.load.image('RMonstruoE', 'src/assets/game/RMonstruoE.png');
    this.load.image('RMonstruoH', 'src/assets/game/RMonstruoH.png');
    this.load.image('RMonstruoF', 'src/assets/game/RMonstruoF.png');
    this.load.image('Rpechera', 'src/assets/game/Rpechera.png');
    this.load.image('Rpiernas', 'src/assets/game/Rpiernas.png');
    this.load.image('Ryunque', 'src/assets/game/Ryunque.png');
    this.load.image('Ryunque doble', 'src/assets/game/Ryunque doble.png');

    // Altar sin iluminar de las trampas
    this.load.image("altar1", "src/assets/game/altar1.png");

    // Altar iluminado de las trampas
    this.load.image("altar2", "src/assets/game/altar2.png");

    // Botón del altar
    this.load.image("btnAltar", "src/assets/game/botonAltar.png");

    // Trampa de reloj
    this.load.image("trampaReloj", "src/assets/game/reloj.png");

    // Trampa del muro
    this.load.image("trampaMuro", "src/assets/game/muro.png");

    // Interfaz de las trampas
    this.load.image("cuadroTrampa", "src/assets/game/cuadroTrampa.png");

    // Triple cartel de prohibido
    this.load.image("tripleMuro", "src/assets/game/prohibido3.png");

    // Progreso de los monstruos
    this.load.image("progreso0", "src/assets/game/progreso0.png");
    this.load.image("progreso1", "src/assets/game/progreso1.png");
    this.load.image("progreso2", "src/assets/game/progreso2.png");
    this.load.image("progreso3", "src/assets/game/progreso3.png");
    this.load.image("progreso4", "src/assets/game/progreso4.png");

    // Imágenes de la guía
    this.load.image("botonDer", "src/assets/guia/botonDer.png");

    this.load.image("botonIzda", "src/assets/guia/botonIzda.png");

    this.load.image("historia", "src/assets/guia/historia.png");

    this.load.image("controles", "src/assets/guia/controles.png");

    this.load.image("cajones", "src/assets/guia/cajones.png");

    this.load.image("hornos", "src/assets/guia/hornos.png");

    this.load.image("moldeguia", "src/assets/guia/moldeGuia.png");

    this.load.image("yunques", "src/assets/guia/yunques.png");

    this.load.image("mesaguia", "src/assets/guia/mesaGuia.png");

    this.load.image("barrilTemp", "src/assets/guia/barrilTemp.png");

    this.load.image("monstruo", "src/assets/guia/monstruo.png");

    this.load.image("basuraguia", "src/assets/guia/basuraGuia.png");

    this.load.image("trampas", "src/assets/guia/trampas.png");

    this.load.image("cruz2", "src/assets/guia/cruz2.png");

   /**** ESCENA DE LOS CRÉDITOS ****/

   this.load.image("creditos", "src/assets/creditos/creditos.png");

   /**** ESCENA DE PRÓXIMAMENTE ****/

   this.load.image("next", "src/assets/next/next.png");

    //ONLINE
    
    this.load.image("fondo online-lobby", "src/assets/online/fondo online-lobby.png");
    this.load.image("botonConectar", "src/assets/online/botonConectar.png");
    this.load.image("botonReconectar", "src/assets/online/botonReconectar.png");
    this.load.image("botonDesconectar", "src/assets/online/botonDesconectar.png");
    this.load.image("botonIniciarSesion", "src/assets/online/botonIniciarSesion.png");
    this.load.image("botonRegistrarse", "src/assets/online/botonRegistrarse.png");
    this.load.image("botonEnviar", "src/assets/online/botonEnviar.png");
    this.load.image("recuadroPje", "src/assets/online/recuadroPje.png");
    this.load.image("recuadroDesafio", "src/assets/online/recuadroDesafio.png");
    this.load.image("botonChange", "src/assets/online/botonChange.png");
    this.load.image("botonChallenge", "src/assets/online/botonChallenge.png");
    this.load.image("cruz3", "src/assets/online/cruz3.png");
    this.load.image("botonAccept", "src/assets/online/botonAccept.png");
    this.load.image("botonDecline", "src/assets/online/botonDecline.png");
    
    this.load.image('chatBoxBG', 'src/assets/online/chatBoxBG.png');

    //Tutorial
    this.load.image("T1", "src/assets/tutorial/T1.png");
    this.load.image("T2", "src/assets/tutorial/T2.png");
    this.load.image("T3", "src/assets/tutorial/T3.png");
    this.load.image("T4", "src/assets/tutorial/T4.png");
    this.load.image("T5", "src/assets/tutorial/T5.png");
    this.load.image("T6", "src/assets/tutorial/T6.png");
    this.load.image("T7", "src/assets/tutorial/T7.png");
    this.load.image("T8", "src/assets/tutorial/T8.png");
    this.load.image("T9", "src/assets/tutorial/T9.png");
    this.load.image("T10", "src/assets/tutorial/T10.png");
    this.load.image("T11", "src/assets/tutorial/T11.png");
    this.load.image("T12", "src/assets/tutorial/T12.png");
    this.load.image("T13", "src/assets/tutorial/T13.png");
    this.load.image("T14", "src/assets/tutorial/T14.png");
    this.load.image("T15", "src/assets/tutorial/T15.png");
    this.load.image("T16", "src/assets/tutorial/T16.png");
    this.load.image("T17", "src/assets/tutorial/T17.png");
    this.load.image("T18", "src/assets/tutorial/T18.png");
    this.load.image("T19", "src/assets/tutorial/T19.png");
    this.load.image("T20", "src/assets/tutorial/T20.png");
    this.load.image("TArrow", "src/assets/tutorial/TArrow.png");
    this.load.image("botonOk", "src/assets/tutorial/botonOk.png");

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