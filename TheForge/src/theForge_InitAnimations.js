function initAnimations(escena)
{
    // Horno grande
    escena.anims.create
    ({
        key: 'hornoGrande_fuego',
        frames: escena.anims.generateFrameNames("hornoGrande", {start: 0, end: 5}),
        frameRate: 1,
        repeat: -1
    });

    // Horno pequeño
    escena.anims.create
    ({
        key: 'hornoPequeño_fuego',
        frames: escena.anims.generateFrameNames("hornoPequeño", {start: 0, end: 5}),
        frameRate: 1,
        repeat: -1
    });

    // Caja marron
    escena.anims.create
    ({
        key: 'cajaMarron_abrir',
        frames: escena.anims.generateFrameNames("cajaMarron", {start: 0, end: 2}),
        frameRate: 0.3,
        repeat: 1
    });

    // Caja gris
    escena.anims.create
    ({
        key: 'cajaGris_abrir',
        frames: escena.anims.generateFrameNames("cajaGris", {start: 0, end: 2}),
        frameRate: 0.3,
        repeat: 1
    });

    // Caja azul
    escena.anims.create
    ({
        key: 'cajaAzul_abrir',
        frames: escena.anims.generateFrameNames("cajaAzul", {start: 0, end: 2}),
        frameRate: 0.3,
        repeat: 1
    });

    // Molde
    escena.anims.create
    ({
        key: 'molde_On',
        frames: escena.anims.generateFrameNames("molde", {start: 0, end: 1}),
        frameRate: 0.3,
        repeat: 1
    });

    // Basura
    escena.anims.create
    ({
        key: 'basura_On',
        frames: escena.anims.generateFrameNames("basura", {start: 0, end: 2}),
        frameRate: 0.3,
        repeat: 1
    });

    /* ANIMACIONES DEL PERSONAJE DE HIELO */

    // Animaciones sin ningún objeto

    escena.anims.create
    ({
        key: 'HwithoutObjectDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 0, end: 3}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HwithoutObjectUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 4, end: 7}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HwithoutObjectLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 8, end: 11}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HwithoutObjectRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 12, end: 15}),
        frameRate: 1,
        repeat: -1
    }); 

    // Animaciones con el casco gris

    escena.anims.create
    ({
        key: 'HgreyHelmetDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 16, end: 19}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyHelmetUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 20, end: 23}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyHelmetLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 24, end: 27}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyHelmetRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 28, end: 31}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el casco amarillo

    escena.anims.create
    ({
        key: 'HyellowHelmetDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 32, end: 35}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowHelmetUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 36, end: 39}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowHelmetLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 40, end: 43}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowHelmetRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 44, end: 47}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el casco azul

    escena.anims.create
    ({
        key: 'HblueHelmetDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 48, end: 51}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueHelmetUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 52, end: 55}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueHelmetLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 56, end: 59}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueHelmetRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 60, end: 63}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el casco marrón

    escena.anims.create
    ({
        key: 'HbrownHelmetDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 64, end: 67}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownHelmetUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 68, end: 71}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownHelmetLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 72, end: 75}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownHelmetRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 76, end: 79}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la espada final

    escena.anims.create
    ({
        key: 'HfinalSwordDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 80, end: 83}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HfinalSwordUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 84, end: 87}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HfinalSwordLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 88, end: 91}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HfinalSwordRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 92, end: 95}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la espada sin templar

    escena.anims.create
    ({
        key: 'HbrownSwordDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 96, end: 99}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownSwordUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 100, end: 103}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownSwordLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 104, end: 107}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownSwordRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 108, end: 111}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal gris

    escena.anims.create
    ({
        key: 'HgreyMetalDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 112, end: 115}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyMetalUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 116, end: 119}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyMetalLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 120, end: 123}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyMetalRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 124, end: 127}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal amarillo

    escena.anims.create
    ({
        key: 'HyellowMetalDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 128, end: 131}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowMetalUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 132, end: 135}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowMetalLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 136, end: 139}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowMetalRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 140, end: 143}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal azul

    escena.anims.create
    ({
        key: 'HblueMetalDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 144, end: 147}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueMetalUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 148, end: 151}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueMetalLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 152, end: 155}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueMetalRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 156, end: 159}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal caliente

    escena.anims.create
    ({
        key: 'HhotMetalDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 160, end: 163}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HhotMetalUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 164, end: 167}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HhotMetalLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 168, end: 171}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HhotMetalRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 172, end: 175}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la cota gris

    escena.anims.create
    ({
        key: 'HgreyArmorDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 176, end: 179}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyArmorUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 180, end: 183}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyArmorLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 184, end: 187}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyArmorRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 188, end: 191}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la cota marrón

    escena.anims.create
    ({
        key: 'HbrownArmorDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 192, end: 195}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownArmorUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 196, end: 199}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownArmorLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 200, end: 203}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownArmorRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 204, end: 207}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos grises

    escena.anims.create
    ({
        key: 'HgreyArmsDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 208, end: 211}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyArmsUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 212, end: 215}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyArmsLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 216, end: 219}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HgreyArmsRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 220, end: 223}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos amarillos

    escena.anims.create
    ({
        key: 'HyellowArmsDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 224, end: 227}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowArmsUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 228, end: 231}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowArmsLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 232, end: 235}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HyellowArmsRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 236, end: 239}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos azules

    escena.anims.create
    ({
        key: 'HblueArmsDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 240, end: 243}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueArmsUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 244, end: 247}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueArmsLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 248, end: 251}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HblueArmsRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 252, end: 255}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos marrones

    escena.anims.create
    ({
        key: 'HbrownArmsDown',
        frames: escena.anims.generateFrameNames("perHielo", {start: 256, end: 259}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownArmsUp',
        frames: escena.anims.generateFrameNames("perHielo", {start: 260, end: 263}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownArmsLeft',
        frames: escena.anims.generateFrameNames("perHielo", {start: 264, end: 267}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownArmsRight',
        frames: escena.anims.generateFrameNames("perHielo", {start: 268, end: 271}),
        frameRate: 1,
        repeat: -1
    });

    /* ANIMACIONES DEL PERSONAJE ELFA */

    // Animaciones sin ningún objeto

    escena.anims.create
    ({
        key: 'EwithoutObjectDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 0, end: 3}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EwithoutObjectUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 4, end: 7}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EwithoutObjectLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 8, end: 11}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EwithoutObjectRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 12, end: 15}),
        frameRate: 1,
        repeat: -1
    }); 

    // Animaciones con el casco gris

    escena.anims.create
    ({
        key: 'EgreyHelmetDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 16, end: 19}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyHelmetUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 20, end: 23}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyHelmetLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 24, end: 27}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyHelmetRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 28, end: 31}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el casco amarillo

    escena.anims.create
    ({
        key: 'EyellowHelmetDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 32, end: 35}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowHelmetUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 36, end: 39}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowHelmetLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 40, end: 43}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowHelmetRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 44, end: 47}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el casco azul

    escena.anims.create
    ({
        key: 'EblueHelmetDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 48, end: 51}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueHelmetUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 52, end: 55}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueHelmetLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 56, end: 59}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueHelmetRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 60, end: 63}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el casco marrón

    escena.anims.create
    ({
        key: 'EbrownHelmetDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 64, end: 67}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownHelmetUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 68, end: 71}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'HbrownHelmetLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 72, end: 75}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownHelmetRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 76, end: 79}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la espada final

    escena.anims.create
    ({
        key: 'EfinalSwordDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 80, end: 83}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EfinalSwordUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 84, end: 87}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EfinalSwordLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 88, end: 91}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EfinalSwordRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 92, end: 95}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la espada sin templar

    escena.anims.create
    ({
        key: 'EbrownSwordDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 96, end: 99}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownSwordUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 100, end: 103}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownSwordLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 104, end: 107}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownSwordRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 108, end: 111}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal gris

    escena.anims.create
    ({
        key: 'EgreyMetalDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 112, end: 115}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyMetalUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 116, end: 119}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyMetalLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 120, end: 123}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyMetalRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 124, end: 127}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal amarillo

    escena.anims.create
    ({
        key: 'EyellowMetalDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 128, end: 131}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowMetalUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 132, end: 135}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowMetalLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 136, end: 139}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowMetalRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 140, end: 143}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal azul

    escena.anims.create
    ({
        key: 'EblueMetalDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 144, end: 147}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueMetalUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 148, end: 151}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueMetalLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 152, end: 155}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueMetalRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 156, end: 159}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con el metal caliente

    escena.anims.create
    ({
        key: 'EhotMetalDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 160, end: 163}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EhotMetalUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 164, end: 167}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EhotMetalLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 168, end: 171}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EhotMetalRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 172, end: 175}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la cota gris

    escena.anims.create
    ({
        key: 'EgreyArmorDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 176, end: 179}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyArmorUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 180, end: 183}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyArmorLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 184, end: 187}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyArmorRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 188, end: 191}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con la cota marrón

    escena.anims.create
    ({
        key: 'EbrownArmorDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 192, end: 195}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownArmorUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 196, end: 199}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownArmorLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 200, end: 203}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownArmorRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 204, end: 207}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos grises

    escena.anims.create
    ({
        key: 'EgreyArmsDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 208, end: 211}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyArmsUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 212, end: 215}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyArmsLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 216, end: 219}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EgreyArmsRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 220, end: 223}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos amarillos

    escena.anims.create
    ({
        key: 'EyellowArmsDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 224, end: 227}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowArmsUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 228, end: 231}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowArmsLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 232, end: 235}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EyellowArmsRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 236, end: 239}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos azules

    escena.anims.create
    ({
        key: 'EblueArmsDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 240, end: 243}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueArmsUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 244, end: 247}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueArmsLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 248, end: 251}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EblueArmsRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 252, end: 255}),
        frameRate: 1,
        repeat: -1
    });

    // Animaciones con los protectores de los brazos marrones

    escena.anims.create
    ({
        key: 'EbrownArmsDown',
        frames: escena.anims.generateFrameNames("perElfa", {start: 256, end: 259}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownArmsUp',
        frames: escena.anims.generateFrameNames("perElfa", {start: 260, end: 263}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownArmsLeft',
        frames: escena.anims.generateFrameNames("perElfa", {start: 264, end: 267}),
        frameRate: 1,
        repeat: -1
    });

    escena.anims.create
    ({
        key: 'EbrownArmsRight',
        frames: escena.anims.generateFrameNames("perElfa", {start: 268, end: 271}),
        frameRate: 1,
        repeat: -1
    });

}