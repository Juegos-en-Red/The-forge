const recetasPosibles = new Map();
recetasPosibles.set("MeterHornoIndividual", {filaJ1: 4, columnaJ1: 2, filaJ2: 4, columnaJ2: 17});
recetasPosibles.set("SacarHornoIndividual", {filaJ1: 4, columnaJ1: 2, filaJ2: 4, columnaJ2: 17});
recetasPosibles.set("MetalAmarillo", {filaJ1: 3, columnaJ1: 3, filaJ2: 3, columnaJ2: 16});
recetasPosibles.set("MetalGris", {filaJ1: 3, columnaJ1: 4, filaJ2: 3, columnaJ2: 15});
recetasPosibles.set("MetalAzul", {filaJ1: 3, columnaJ1: 5, filaJ2: 3, columnaJ2: 14});
recetasPosibles.set("SoltarYunqueIndividual", {filaJ1: 7, columnaJ1: 2, filaJ2: 7, columnaJ2: 17});
recetasPosibles.set("MartillearYunqueIndividual", {filaJ1: 7, columnaJ1: 2, filaJ2: 7, columnaJ2: 17});
recetasPosibles.set("SoltarMolde", {filaJ1: 3, columnaJ1: 6, filaJ2: 3, columnaJ2: 13});
recetasPosibles.set("UsarMolde", {filaJ1: 3, columnaJ1: 6, filaJ2: 3, columnaJ2: 13});
recetasPosibles.set("SoltarTemplado", {filaJ1: 4, columnaJ1: 6, filaJ2: 4, columnaJ2: 13});
recetasPosibles.set("UsarTemplado", {filaJ1: 4, columnaJ1: 6, filaJ2: 4, columnaJ2: 13});
recetasPosibles.set("Monstruo", {filaJ1: 12, columnaJ1: 3, filaJ2: 12, columnaJ2: 16});
recetasPosibles.set("SoltarYunqueDoble", {filaJ1: 7, columnaJ1: 4, filaJ2: 7, columnaJ2: 15});
recetasPosibles.set("MartillearYunqueDoble", {filaJ1: 7, columnaJ1: 4, filaJ2: 7, columnaJ2: 15});
recetasPosibles.set("MeterHornoDoble", {filaJ1: 6, columnaJ1: 2, filaJ2: 6, columnaJ2: 17});
recetasPosibles.set("SacarHornoDoble", {filaJ1: 6, columnaJ1: 2, filaJ2: 6, columnaJ2: 17});
recetasPosibles.set("Basura", {filaJ1: 6, columnaJ1: 6, filaJ2: 6, columnaJ2: 13});

function Receta(jugador, pasos, nombre)
{    
    // Jugador para el que va dirigida la receta
    this.jugador = jugador;

    // Pasos a seguir en la receta
    this.pasos = pasos;

    // Nombre de la receta
    this.nombre = nombre;
}

function RecetaHandler(jugador)
{
    /* VARIABLES */
    
    // Receta 1
    var cascoGris = new Receta(jugador, ["MetalGris", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarMolde", "UsarMolde", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "cascogris");

    var cascoAmarillo = new Receta(jugador, ["MetalAmarillo", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarMolde", "UsarMolde", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "cascoamarillo");

    var cascoAzul = new Receta(jugador, ["MetalAzul", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarMolde", "UsarMolde", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "cascoazul");

    // Receta 2
    var cota = new Receta(jugador, ["MetalAmarillo", "MeterHornoDoble", "MetalGris", "MeterHornoDoble", "SacarHornoDoble", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "cota")

    // Receta 3
    var protectoresBrazosAzul = new Receta(jugador, ["MetalAzul", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "protectoresbrazosazul");

    var protectoresBrazosAmarillo = new Receta(jugador, ["MetalAmarillo", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "protectoresbrazosamarillo");

    var protectoresBrazosGris = new Receta(jugador, ["MetalGris", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"], "protectoresbrazosgris");

    // Receta 4
    var espada = new Receta(jugador, ["MetalAmarillo", "MeterHornoDoble", "MetalAzul", "MeterHornoDoble", "SacarHornoDoble", "SoltarYunqueDoble", "MartillearYunqueDoble", "SoltarTemplado", "UsarTemplado", "Monstruo"], "espada");
    
    /* FUNCIONES PÚBLICAS */

    this.generateRandomCombination = function()
    {
        var cascos = [cascoGris, cascoAmarillo, cascoAzul];
        var cotas = [cota];
        var protectoresBrazos = [protectoresBrazosAzul, protectoresBrazosAmarillo, protectoresBrazosGris];
        var espadas = [espada];
        var recetas = [getRandomElement(cascos), getRandomElement(cotas), getRandomElement(protectoresBrazos), getRandomElement(espadas)];
        shuffle(recetas);
        return recetas;
    }

    this.restart = function(nombre)
    {
        if (nombre == "cascogris")
            return ["MetalGris", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarMolde", "UsarMolde", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"];
        if (nombre == "cascoamarillo")
            return ["MetalAmarillo", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarMolde", "UsarMolde", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"];
        if (nombre == "cascoazul")
            return ["MetalAzul", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarMolde", "UsarMolde", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"];
        if (nombre == "cota")
            return ["MetalAmarillo", "MeterHornoDoble", "MetalGris", "MeterHornoDoble", "SacarHornoDoble", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "SoltarTemplado", "UsarTemplado", "Monstruo"];
        if (nombre == "protectoresbrazosazul")
            return ["MetalAzul", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "Templado"];
        if (nombre == "protectoresbrazosamarillo")
            return ["MetalAmarillo", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "Templado"];
        if (nombre == "protectoresbrazosgris")
            return ["MetalGris", "MeterHornoIndividual", "SacarHornoIndividual", "SoltarYunqueIndividual", "MartillearYunqueIndividual", "MeterHornoIndividual", "SacarHornoIndividual", "Templado"];
        if (nombre == "espada")
            return ["MetalAmarillo", "MeterHornoDoble", "MetalAzul", "MeterHornoDoble", "SacarHornoDoble", "SoltarYunqueDoble", "MartillearYunqueDoble", "SoltarTemplado", "UsarTemplado", "Monstruo"];
    }

    /* FUNCIONES PRIVADAS */

    function shuffle(array)
    {
        var j, x, i;
        for (i = array.length - 1; i > 0; i--)
        {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    }

    function getRandomElement(array)
    {
        shuffle(array);
        return array[0];
    }
}