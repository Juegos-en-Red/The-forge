"use strict";

var sc_Guia = new Phaser.Scene('Guia');

var array;// = new Array();

var pos;// = 0;

var left, right, escape;

var btnRight, btnLeft, cross;

var ingame;


sc_Guia.create = function(escena)
{
    if (cont.guiaIngame) {
        ingame = true;
        cont.guiaIngame = false;
    } else {
        ingame = false;
    }

    array = new Array();
    pos = 0;
    array.push(this.add.image(0, 0, "historia").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "controles").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "cajones").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "hornos").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "moldeguia").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "yunques").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "mesaguia").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "barrilTemp").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "monstruo").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "basuraguia").setOrigin(0, 0));
    array.push(this.add.image(0, 0, "trampas").setOrigin(0, 0));

    btnRight = this.add.image(700, 520, "botonDer").setOrigin(0, 0).setScale(0.5, 0.5);
    btnLeft = this.add.image(50, 520, "botonIzda").setOrigin(0, 0).setScale(0.5, 0.5);
    cross = this.add.image(650, 20, "cruz2").setOrigin(0, 0);
    cross.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
    {
        if (ingame) {
            sc_Guia.scene.stop("Guia");
            if (cont.guiaOnline) {
                cont.guiaOnline = false;
                sc_Guia.scene.wake("JuegoOnline");
            } else {
                sc_Guia.scene.wake("JuegoLocal");
            }
        } else {
            sc_Guia.scene.start("MenuPrincipal");
        }
    })

    
    btnRight.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
    {
        if (pos + 1 < array.length)
        {
            array[pos].visible = false;
            pos++;
        }
    })

    
    btnLeft.setInteractive({cursor: "pointer"}).on("pointerdown", function(pointer)
    {
        if (pos - 1 >= 0)
        {
            array[pos].visible = false;
            pos--;
            btnLeft.visible = true;
        }
    })


    cross.inputEnabled = true;

    for (var i = 1; i < array.length; i++)
    {
        array[i].visible = false;
    }
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
}

sc_Guia.update = function(time, delta)
{
    if (Phaser.Input.Keyboard.JustDown(left))
    {
        if (pos - 1 >= 0)
        {
            array[pos].visible = false;
            pos--;
            btnLeft.visible = true;
        }
    }
    if (Phaser.Input.Keyboard.JustDown(right))
    {
        if (pos + 1 < array.length)
        {
            array[pos].visible = false;
            pos++;
        }
    }
    array[pos].visible = true;
    if (pos == 0)
        btnLeft.visible = false;
    else
        btnLeft.visible = true;
    if (pos == array.length - 1)
        btnRight.visible = false;
    else
    {
        btnRight.visible = true;
    }
        
    if (Phaser.Input.Keyboard.JustDown(escape))
        {
            if (ingame) {

                sc_Guia.scene.stop("Guia");
                sc_Guia.scene.wake("JuegoLocal");
            } else {
                sc_Guia.scene.start("MenuPrincipal");
            }
        }
}

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