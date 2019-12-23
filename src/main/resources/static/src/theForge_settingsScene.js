"use strict";

//Escena del menú de ajustes
var sc_menuAjustes = new Phaser.Scene('MenuAjustes');

sc_menuAjustes.preload = function() {
    //Cambiar este fondo cuando esté subido el final
    //Botones de la interfaz
}

sc_menuAjustes.create = function() {
    //Añadimos el fondo
    sc_menuAjustes.fondo = sc_menuAjustes.add.image(400, 300, 'fondo menu ajustes');

    //Añadimos todas las teclas
    //jugador 1

    sc_menuAjustes.add.text(200, 40, "JUGADOR 1", {fontSize: '24px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.add.text(600, 40, "JUGADOR 2", {fontSize: '24px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp1i2 = this.physics.add.sprite(100, 100, 'botonTecla');
    sc_menuAjustes.bp1i2.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp1i2.text = sc_menuAjustes.add.text(100, 100, getTecla(cont.p1.i2), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp1i2.on('pointerup', function() {clickTecla(sc_menuAjustes.bp1i2, 0);});
    sc_menuAjustes.add.text(100, 75, "TRAMPAS", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp1w = this.physics.add.sprite(200, 100, 'botonTecla');
    sc_menuAjustes.bp1w.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp1w.text = sc_menuAjustes.add.text(200, 100, getTecla(cont.p1.w), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp1w.on('pointerup', function() {clickTecla(sc_menuAjustes.bp1w, 1);});
    sc_menuAjustes.add.text(200, 75, "ARRIBA", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp1i1 = this.physics.add.sprite(300, 100, 'botonTecla');
    sc_menuAjustes.bp1i1.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp1i1.text = sc_menuAjustes.add.text(300, 100, getTecla(cont.p1.i1), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp1i1.on('pointerup', function() {clickTecla(sc_menuAjustes.bp1i1, 2);});
    sc_menuAjustes.add.text(300, 75, "ACCIÓN", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp1a = this.physics.add.sprite(100, 200, 'botonTecla');
    sc_menuAjustes.bp1a.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp1a.text = sc_menuAjustes.add.text(100, 200, getTecla(cont.p1.a), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp1a.on('pointerup', function() {clickTecla(sc_menuAjustes.bp1a, 3);});
    sc_menuAjustes.add.text(100, 175, "IZQUIERDA", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp1s = this.physics.add.sprite(200, 200, 'botonTecla');
    sc_menuAjustes.bp1s.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp1s.text = sc_menuAjustes.add.text(200, 200, getTecla(cont.p1.s), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp1s.on('pointerup', function() {clickTecla(sc_menuAjustes.bp1s, 4);});
    sc_menuAjustes.add.text(200, 175, "ABAJO", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp1d = this.physics.add.sprite(300, 200, 'botonTecla');
    sc_menuAjustes.bp1d.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp1d.text = sc_menuAjustes.add.text(300, 200, getTecla(cont.p1.d), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp1d.on('pointerup', function() {clickTecla(sc_menuAjustes.bp1d, 5);});
    sc_menuAjustes.add.text(300, 175, "DERECHA", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    //jugador 2
    sc_menuAjustes.bp2i1 = this.physics.add.sprite(700, 100, 'botonTecla');
    sc_menuAjustes.bp2i1.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp2i1.text = sc_menuAjustes.add.text(700, 100, getTecla(cont.p2.i1), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp2i1.on('pointerup', function() {clickTecla(sc_menuAjustes.bp2i1, 6);});
    sc_menuAjustes.add.text(700, 75, "ACCIÓN", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp2w = this.physics.add.sprite(600, 100, 'botonTecla');
    sc_menuAjustes.bp2w.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp2w.text = sc_menuAjustes.add.text(600, 100, getTecla(cont.p2.w), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp2w.on('pointerup', function() {clickTecla(sc_menuAjustes.bp2w, 7);});
    sc_menuAjustes.add.text(600, 75, "ARRIBA", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp2i2 = this.physics.add.sprite(500, 100, 'botonTecla');
    sc_menuAjustes.bp2i2.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp2i2.text = sc_menuAjustes.add.text(500, 100, getTecla(cont.p2.i2), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp2i2.on('pointerup', function() {clickTecla(sc_menuAjustes.bp2i2, 8);});
    sc_menuAjustes.add.text(500, 75, "TRAMPAS", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp2d = this.physics.add.sprite(700, 200, 'botonTecla');
    sc_menuAjustes.bp2d.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp2d.text = sc_menuAjustes.add.text(700, 200, getTecla(cont.p2.d), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp2d.on('pointerup', function() {clickTecla(sc_menuAjustes.bp2d, 9);});
    sc_menuAjustes.add.text(700, 175, "DERECHA", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp2s = this.physics.add.sprite(600, 200, 'botonTecla');
    sc_menuAjustes.bp2s.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp2s.text = sc_menuAjustes.add.text(600, 200, getTecla(cont.p2.s), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp2s.on('pointerup', function() {clickTecla(sc_menuAjustes.bp2s, 10);});
    sc_menuAjustes.add.text(600, 175, "ABAJO", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.bp2a = this.physics.add.sprite(500, 200, 'botonTecla');
    sc_menuAjustes.bp2a.setInteractive({cursor: "pointer"});
    sc_menuAjustes.bp2a.text = sc_menuAjustes.add.text(500, 200, getTecla(cont.p2.a), {fontSize: '50px', fontFamily: 'Courier', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);
    sc_menuAjustes.bp2a.on('pointerup', function() {clickTecla(sc_menuAjustes.bp2a, 11);});
    sc_menuAjustes.add.text(500, 175, "IZQUIERDA", {fontSize: '12px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    //Botón salir
    //Al pulsarlo, se vuelve a la escena anterior
    sc_menuAjustes.botonSalir = this.physics.add.sprite(120, 500, 'botonSalir');
    sc_menuAjustes.botonSalir.setInteractive({cursor: "pointer"});
    var that = this;
    sc_menuAjustes.botonSalir.on('pointerup', function() { that.scene.start("MenuPrincipal");});

    //Botón restablecer
    //Al pulsarlo, se vuelve a llamar a guardarTeclas
    sc_menuAjustes.botonRestablecer = this.physics.add.sprite(400, 500, 'botonRestablecer');
    sc_menuAjustes.botonRestablecer.setInteractive({cursor: "pointer"});
    sc_menuAjustes.botonRestablecer.on('pointerup', function() { restablecerTeclas();});

    //Botón aplicar
    //Al pulsarlo, se llama a confirmarTeclas (guarda lo del array a las teclas de verdad)
    sc_menuAjustes.botonAplicar = this.physics.add.sprite(700, 500, 'botonAplicar');
    sc_menuAjustes.botonAplicar.setInteractive({cursor: "pointer"});
    sc_menuAjustes.botonAplicar.on('pointerup', function() { confirmarTeclas();});

    //Botones +- (música)
    //Al pulsarlos, se cambia tanto mus_vol como los volumenes de todas las músicas
    sc_menuAjustes.add.text(200, 300, "MÚSICA", {fontSize: '24px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.botonMusMenos = this.physics.add.sprite(100, 350, 'icono menos');
    sc_menuAjustes.botonMusMenos.setInteractive({cursor: "pointer"});
    sc_menuAjustes.botonMusMenos.on('pointerup', function() { musVol(-0.1);});

    sc_menuAjustes.volMusText = sc_menuAjustes.add.text(200, 350, (cont.mus_vol*100)+"%", {fontSize: '50px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.botonMusMas = this.physics.add.sprite(300, 350, 'icono mas');
    sc_menuAjustes.botonMusMas.setInteractive({cursor: "pointer"});
    sc_menuAjustes.botonMusMas.on('pointerup', function() { musVol(0.1);});

    //Botones +- (efectos de sonido)
    //Lo mismo pero para los sonidos
    sc_menuAjustes.add.text(600, 300, "EFECTOS DE SONIDO", {fontSize: '24px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.botonSndMenos = this.physics.add.sprite(500, 350, 'icono menos');
    sc_menuAjustes.botonSndMenos.setInteractive({cursor: "pointer"});
    sc_menuAjustes.botonSndMenos.on('pointerup', function() { sndVol(-0.1);});

    sc_menuAjustes.volSndText = sc_menuAjustes.add.text(600, 350, (cont.snd_vol*100)+"%", {fontSize: '50px', fontFamily: 'Bookman', color: '#ff6600', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5, 0.5);

    sc_menuAjustes.botonSndMas = this.physics.add.sprite(700, 350, 'icono mas');
    sc_menuAjustes.botonSndMas.setInteractive({cursor: "pointer"});
    sc_menuAjustes.botonSndMas.on('pointerup', function() { sndVol(0.1);});

    //Guardar todas las teclas en un array (funcion guardarTeclas)
    sc_menuAjustes.teclas = [];
    guardarTeclas();

    //Variable que indica si se puede cambiar una tecla o no
    sc_menuAjustes.puedeCambiar = false;

    //Variables que se cambiarán según la tecla que tenga que cambiar
    sc_menuAjustes.teclaACambiar = 0;
    sc_menuAjustes.textoACambiar = sc_menuAjustes.bp1i2.text;
}

//Si puede cambiar una tecla, la próxima tecla que se pulse se asignará a esa tecla.
sc_menuAjustes.update = function() {
    this.input.keyboard.on('keydown', 
    function (event) { 
        if (sc_menuAjustes.puedeCambiar && ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 37 && event.keyCode <= 40))) {
            sc_menuAjustes.teclas[sc_menuAjustes.teclaACambiar] = event.keyCode;
            sc_menuAjustes.textoACambiar.setText(getTecla(event.keyCode));
            sc_menuAjustes.botonACambiar.setTint(0xFFFFFF);
            sc_menuAjustes.puedeCambiar = false;
        }
    });
}

function clickTecla(button, id) {
    if (!sc_menuAjustes.puedeCambiar) {
        var text = button.text;
        //Dejar de dibujar la letra
        text.setText("");
        button.setTint(0xFFFF00);

        //Activar variable de aceptar inputs de letra
        sc_menuAjustes.puedeCambiar = true;

        //Asignar variables que indican la letra que cambiará
        sc_menuAjustes.teclaACambiar = id;
        sc_menuAjustes.textoACambiar = text;
        sc_menuAjustes.botonACambiar = button;
    }
}

function getTecla(tecla) {
    //Si la tecla es una de las flechas devuelve un caracter especial, si es una letra devuelve la letra
    switch(tecla) {
        case 37:
            return '←';
        case 38:
            return '↑';
        case 39:
            return '→';
        case 40:
            return '↓';
    }
    return String.fromCharCode(tecla);
}

//Guarda las teclas en un array y actualiza los textos
function guardarTeclas() {
    sc_menuAjustes.teclas[0] = cont.p1.i2;
    sc_menuAjustes.teclas[1] = cont.p1.w;
    sc_menuAjustes.teclas[2] = cont.p1.i1;
    sc_menuAjustes.teclas[3] = cont.p1.a;
    sc_menuAjustes.teclas[4] = cont.p1.s;
    sc_menuAjustes.teclas[5] = cont.p1.d;
    sc_menuAjustes.teclas[6] = cont.p2.i1;
    sc_menuAjustes.teclas[7] = cont.p2.w;
    sc_menuAjustes.teclas[8] = cont.p2.i2;
    sc_menuAjustes.teclas[9] = cont.p2.d;
    sc_menuAjustes.teclas[10] = cont.p2.s;
    sc_menuAjustes.teclas[11] = cont.p2.a;

    sc_menuAjustes.bp1i2.text.setText(getTecla(cont.p1.i2));

    sc_menuAjustes.bp1w.text.setText(getTecla(cont.p1.w));

    sc_menuAjustes.bp1i1.text.setText(getTecla(cont.p1.i1));

    sc_menuAjustes.bp1a.text.setText(getTecla(cont.p1.a));

    sc_menuAjustes.bp1s.text.setText(getTecla(cont.p1.s));

    sc_menuAjustes.bp1d.text.setText(getTecla(cont.p1.d));

    sc_menuAjustes.bp2i1.text.setText(getTecla(cont.p2.i1));

    sc_menuAjustes.bp2w.text.setText(getTecla(cont.p2.w));

    sc_menuAjustes.bp2i2.text.setText(getTecla(cont.p2.i2));

    sc_menuAjustes.bp2d.text.setText(getTecla(cont.p2.d));

    sc_menuAjustes.bp2s.text.setText(getTecla(cont.p2.s));

    sc_menuAjustes.bp2a.text.setText(getTecla(cont.p2.a));

    sc_menuAjustes.puedeCambiar = false;
}

//Pasa las teclas del array a los controles globales y actualiza los textos
function confirmarTeclas() {
    if (sc_menuAjustes.puedeCambiar) return; //No se puede confirmar hasta que no hayas seleccionado una nueva tecla.
    cont.p1.i2 = sc_menuAjustes.teclas[0];
    cont.p1.w = sc_menuAjustes.teclas[1];
    cont.p1.i1 = sc_menuAjustes.teclas[2];
    cont.p1.a = sc_menuAjustes.teclas[3];
    cont.p1.s = sc_menuAjustes.teclas[4];
    cont.p1.d = sc_menuAjustes.teclas[5];
    cont.p2.i1 = sc_menuAjustes.teclas[6];
    cont.p2.w = sc_menuAjustes.teclas[7];
    cont.p2.i2 = sc_menuAjustes.teclas[8];
    cont.p2.d = sc_menuAjustes.teclas[9];
    cont.p2.s = sc_menuAjustes.teclas[10];
    cont.p2.a = sc_menuAjustes.teclas[11];

    sc_menuAjustes.bp1i2.text.setText(getTecla(cont.p1.i2));

    sc_menuAjustes.bp1w.text.setText(getTecla(cont.p1.w));

    sc_menuAjustes.bp1i1.text.setText(getTecla(cont.p1.i1));

    sc_menuAjustes.bp1a.text.setText(getTecla(cont.p1.a));

    sc_menuAjustes.bp1s.text.setText(getTecla(cont.p1.s));

    sc_menuAjustes.bp1d.text.setText(getTecla(cont.p1.d));

    sc_menuAjustes.bp2i1.text.setText(getTecla(cont.p2.i1));

    sc_menuAjustes.bp2w.text.setText(getTecla(cont.p2.w));

    sc_menuAjustes.bp2i2.text.setText(getTecla(cont.p2.i2));

    sc_menuAjustes.bp2d.text.setText(getTecla(cont.p2.d));

    sc_menuAjustes.bp2s.text.setText(getTecla(cont.p2.s));

    sc_menuAjustes.bp2a.text.setText(getTecla(cont.p2.a));

}

//Si el volumen + cambio está entre 0 y 1, se actualiza mus_vol y todos los volúmenes de las músicas. También se actualiza el texto de la interfaz.
function musVol(cambio) {
    if (cont.mus_vol+cambio < 0 || cont.mus_vol+cambio > 1) return;
    cont.mus_vol += cambio;
    cont.mus_vol = Math.round(cont.mus_vol*10)/10; //Para evitar errores de redondeo
    sc_menuAjustes.volMusText.setText((cont.mus_vol*100)+"%");
    mus_menu.volume = cont.mus_vol;
    mus_game.volume = cont.mus_vol;
}

//Si el volumen + cambio está entre 0 y 1, se actualiza snd_vol y todos los volúmenes de los efectos de sonido. También se actualiza el texto de la interfaz.
function sndVol(cambio) {
    if (cont.snd_vol+cambio < 0 || cont.snd_vol+cambio > 1) return;
    cont.snd_vol += cambio;
    cont.snd_vol = Math.round(cont.snd_vol*10)/10; //Para evitar errores de redondeo
    sc_menuAjustes.volSndText.setText((cont.snd_vol*100)+"%");
    snd_yunque.volume = cont.snd_vol;
}

function restablecerTeclas() {
    sc_menuAjustes.puedeCambiar = false;

    cont.p1.i2 = 81;
    cont.p1.w = 87;
    cont.p1.i1 = 69;
    cont.p1.a = 65;
    cont.p1.s = 83;
    cont.p1.d = 68;
    cont.p2.i1 = 80;
    cont.p2.w = 38;
    cont.p2.i2 = 79;
    cont.p2.d = 39;
    cont.p2.s = 40;
    cont.p2.a = 37;

    sc_menuAjustes.teclas[0] = cont.p1.i2;
    sc_menuAjustes.teclas[1] = cont.p1.w;
    sc_menuAjustes.teclas[2] = cont.p1.i1;
    sc_menuAjustes.teclas[3] = cont.p1.a;
    sc_menuAjustes.teclas[4] = cont.p1.s;
    sc_menuAjustes.teclas[5] = cont.p1.d;
    sc_menuAjustes.teclas[6] = cont.p2.i1;
    sc_menuAjustes.teclas[7] = cont.p2.w;
    sc_menuAjustes.teclas[8] = cont.p2.i2;
    sc_menuAjustes.teclas[9] = cont.p2.d;
    sc_menuAjustes.teclas[10] = cont.p2.s;
    sc_menuAjustes.teclas[11] = cont.p2.a;

    sc_menuAjustes.bp1i2.text.setText(getTecla(cont.p1.i2));

    sc_menuAjustes.bp1w.text.setText(getTecla(cont.p1.w));

    sc_menuAjustes.bp1i1.text.setText(getTecla(cont.p1.i1));

    sc_menuAjustes.bp1a.text.setText(getTecla(cont.p1.a));

    sc_menuAjustes.bp1s.text.setText(getTecla(cont.p1.s));

    sc_menuAjustes.bp1d.text.setText(getTecla(cont.p1.d));

    sc_menuAjustes.bp2i1.text.setText(getTecla(cont.p2.i1));

    sc_menuAjustes.bp2w.text.setText(getTecla(cont.p2.w));

    sc_menuAjustes.bp2i2.text.setText(getTecla(cont.p2.i2));

    sc_menuAjustes.bp2d.text.setText(getTecla(cont.p2.d));

    sc_menuAjustes.bp2s.text.setText(getTecla(cont.p2.s));

    sc_menuAjustes.bp2a.text.setText(getTecla(cont.p2.a));

    sc_menuAjustes.puedeCambiar = false;
}
