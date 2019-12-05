"use strict";

var sc_Creditos = new Phaser.Scene('Creditos');

var imagen, cruz, salir;

sc_Creditos.create = function()
{
    imagen = this.add.image(0, 620, "creditos").setOrigin(0, 0);

    cruz = this.add.image(700, 520, "cruz2").setOrigin(0, 0);
    cruz.setInteractive().on("pointerdown", function(pointer)
    {
        sc_Creditos.scene.restart();
        sc_Creditos.scene.switch("MenuPrincipal");
    });

    salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
}

sc_Creditos.update = function(time, delta)
{
    imagen.y--;
    if (imagen.y < -800) imagen.y = 800;
    if (Phaser.Input.Keyboard.JustDown(salir))
    {
        sc_Creditos.scene.restart();
        sc_Creditos.scene.switch("MenuPrincipal");
    }
}