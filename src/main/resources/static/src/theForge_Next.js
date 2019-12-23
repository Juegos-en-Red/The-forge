"use strict";

var sc_Next = new Phaser.Scene('Next');

var imagen, cruz, salir;

sc_Next.create = function()
{
    imagen = this.add.image(0, 0, "next").setOrigin(0, 0);

    cruz = this.add.image(700, 10, "cruz2").setOrigin(0, 0);
    cruz.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
    {
        sc_Next.scene.start("MenuPrincipal");
    });

    salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
}

sc_Next.update = function(time, delta)
{
    if (Phaser.Input.Keyboard.JustDown(salir))
    {
        sc_Next.scene.start("MenuPrincipal");
    }
}