# The Forge
Juego de la asignatura de Juegos en red desarrollado por:
* Elvira Gutiérrez Bartolomé. Correo: e.gutierrezb.2017@alumnos.urjc.es, Github: [elviragb](https://github.com/elviragb)
* Imanol Díaz Servando. Correo: i.diazs.2017@alumnos.urjc.es, Github: [Zeus-guy](https://github.com/Zeus-guy)
* Javier Sendarrubias Otero. Correo: ja.sendarrubias.2017@alumnos.urjc.es, Github: [Javierso1](https://github.com/Javierso1)
* Jorge Sendarrubias Otero. Correo: j.sendarrubias.2017@alumnos.urjc.es, Github: [JorgeURJC](https://github.com/JorgeURJC)

## CAMBIOS EN EL DOCUMENTO DE DISEÑO V1.1
La orientación del juego se ha planteado para dos jugadores en vez de para cuatro. Además, de los cuatro reinos planeados, de momento solo existen dos disponibles para elegir y manejar. Todas las amoladoras se han cambiado por moldes, algo más coherente teniendo en cuenta el contexto general del juego y los objetos de una forja con los que podrían estar familiarizados los jugadores. 
Se han eliminado trampas dentro de las planeadas y se le ha añadido una guía textual, accesible desde el menú. Dentro de la partida se contempla también la opción de deshacerse de los objetos creados por error. Además, al monstruo se le arma dándole directamente las piezas en vez de depositándolas en una mesa cercana. Al documento como tal se le han añadido las secciones Diagrama de navegación y de Muestras del diseño. 
Se han añadido referencias a los sonidos empleados y a la fuente usada para los textos.

## TEMÁTICA
### CONCEPTO
*The Forge* es un juego en el que asumes el control de un herrero que ha sido enviado por su pueblo para competir contra los demás pueblos de un mismo reino y decidir a qué población le deben adjudicar el honor de forjar las armas de la realeza, para lo que tendrás que forjar todo el arsenal que llevará el monstruo característico de tu región.
### GÉNERO
Juego de simulación de una herrería no realista competitivo. Basado en una Edad Media ficticia con toques de fantasía clásica. Presenta similitudes con los juegos de simulación de cocina en lo referente a la jugabilidad.
### PÚBLICO
Este juego está dirigido a jugadores con un amplio rango de edades, de forma que pueda ser jugado esporádicamente, sin progresión y compitiendo contra otros jugadores, ya sean estos amigos o usuarios online.
## HISTORIA
En una Edad Media fantástica llena de dragones, hadas y brujos, un rey con una guerra en ciernes, busca al mejor herrero de sus tierras, aquel elegido que pueda forjar las armas capaces de salvaguardar la corona.  
Dentro de sus dominios, cuatro condes proponen cada uno a un campeón, sus más hábiles trabajadores. Estas cuatro regiones se enfrentarán entre sí para decidir quién será aquel que se alce con el puesto del favorito del rey y les lleve a la victoria en las futuras contiendas contra imperios vecinos.  
El ganador regresará a su hogar con grandes honores, tierras y tesoros para su gente y su familia. Cada duque manda a su campeón acompañado de un monstruo folclórico con el que competir contra el resto.  
El trabajo del herrero será forjar las armas que llevará equipadas la criatura, quien dependerá completamente de su trabajo para ganar la cruenta batalla.
Estas cuatro regiones son:  
* El pueblo del hielo, que mandará a un elegido de gélido temperamento acompañado de un imponente yeti.
* El pueblo del fuego; llevará su herrero al encuentro montado en un imponente y fiero dragón.
* El pueblo de los elfos oscuros, que con su magia invocan a los demonios más poderosos del infierno.
* El pueblo de los nigromantes, torcidos humanos capaces de crear zombies con habilidades que superan toda lógica.
## DISEÑO DE NIVELES
Las partidas tendrán lugar en un único nivel, dividido en dos secciones. Las secciones serán idénticas entre sí, espejada una con respecto a la otra, para no dar una ventaja injusta a determinados jugadores según su ubicación en el mapa.
En el nivel se podrán encontrar elementos típicos de una forja, como hornos, yunques, barriles de templado o moldes. Además habrá unos cajones con iconos de los metales que hay que utilizar de donde sacaremos estos.
En el centro del escenario, equidistante con respecto a las fraguas de cada jugador, aparecerá aleatoriamente un ítem que funciona a modo de potenciador, de tal manera que los jugadores podrán elegir si ir a recogerlo o no, tomando la decisión según lo que más les convenga en cada momento. Estos ítems se podrán usar como mejoras en la forja del jugador o como obstáculos en las ajenas.
En cuanto al aspecto visual, el escenario se presenta como un espacio cerrado, dentro del cual cada sección es la herrería de cada jugador con sus útiles correspondientes: hornos, yunques, martillos, barriles de templado y moldes. Tendremos mesas entre medias de estas secciones para poder dejar lo que estemos forjando. Al monstruo se le equiparán las armas cuando las piezas estén terminadas.
![Inspirado en *Overcooked*](https://steamcdn-a.akamaihd.net/steam/apps/448510/ss_058c688a6f07a4624b4f775b3e71df8037ef4df2.1920x1080.jpg?t=1567203965)
## GAMEPLAY
### Mecánicas
  * **Recoger objetos** (como metal) y **transportarlos** de un lado a otro.
  * **Movimiento** en 8 direcciones.
  * Partida **por objetivo de puntos**.
  * **Interactividad** con los objetos: **recoger** metal, **calentar** metal, **martillear**, **afilar**, **templar** y **moldear**.
  * Durante la partida, en una esquina nos pondrá qué arma tenemos que elaborar y qué materiales son necesarios.
  * **Potenciadores y trampas**:
    * Movimiento más rápido o movimiento más lento. 
    * Poner un muro en la forja de otro jugador para ralentizar sus acciones, de tal forma que no pueda desplazarse con libertad por su espacio
    * Detener por completo a los otros jugadores durante unos segundos, de tal forma que el que lanza esta trampa es el único que puede moverse.
    * Solo podremos tener una trampa, lo que quiere decir que no podremos acumularlas durante la partida.
### Condiciones de victoria
Hay que forjar un número determinado de armas, el primero que lo consiga, ganará la partida. 
## ARTE
### ESTILO
Al hablar de fantasía medieval, a cualquiera se le vienen a la cabeza imágenes épicas sacadas del Señor de los Anillos. 
*The Forge* emula esa estética de cuento de caballeros andantes, mezclándola con elementos más cotidianos dentro del medievalismo. 
En vez de campos de batalla, se representan herrerías, lo cual implica una gran carga de elementos metálicos, fuego y herramientas. Destacarán los colores vivos y cálidos, muy saturados, ya que se pretende reflejar la intensidad de las aventuras de cualquier campaña del medievo. 
Todas las representaciones que se hagan mediante imágenes vendrán en un formato de mapa de bits 2D, con un estilo de ilustración no muy alejado del *pixel art*, sin entrar en un nivel de detalle exagerado. No llega tampoco a ser un estilo minimalista. 
### ESCENARIOS
Aunque como tal solo exista un escenario por partida, que será el campo en el que se desarrollará toda la jugabilidad, en cuanto al aspecto gráfico de los escenarios queremos incluir también las pantallas de: carga, tutorial, selección de avatar  y el menú principal.
1. Partida: El juego se desarrollará dentro de un  recinto de la familia real en el que cada campeón ha sido convocado para forjar las armas de su monstruo correspondiente. Este espacio se dividirá en cuatro campos de tamaños iguales con las mismas herramientas, para que así se dispute una contienda equilibrada, decorados con los estandartes y la temática de las criaturas de cada región. Nuestra referencia fundamental de organización para este apartado es el *Overcooked*, y de ambientación tiramos hacia ambientes medievales como los de *Dragon Age: Inquisition*.
![](https://www.lagzero.net/wp-content/uploads/2014/10/dai.jpg)
2. Pantalla de carga: Se añadirá en el modo online. Mostrará un espacio con una división de colores ajustados al estilo general del juego. Mientras este carga, sobre la línea divisoria entre ambos se reproducirán pequeñas animaciones con sprites de los monstruos de cada región enfrentándose entre ellos. Tomaremos como un buen ejemplo la de *Clash Royale* o *Clash of Clans*.
![](https://i.postimg.cc/HxTB3NgV/Screenshot-20171224-223249.png)
3. Tutorial: La historia y los controles del juego, que deberían ser bastante intuitivos sobre todo en la versión online, se manifestará en una pantalla con aspecto de pergamino antiguo, en un papel amarillento y letras en colores negros, marrones muy oscuros o granates.
4. Selección de avatar: El jugador podrá elegir entre cada uno de los cuatro pueblos disponibles para ir a la batalla. Cada herrero aparecerá en un lateral de la pantalla junto con un pergamino a su derecha que redacte sus características e historia básica. Se podrá elegir a uno u a otro mediante flechas en los laterales.
5. Menú principal: En la misma paleta de colores que el resto del juego (tonos ocre y cálidos), se podrá leer el título del juego en forma de su logotipo, y bajo este una serie de botones detallados en el apartado de interfaz. 
### PERSONAJES
Los personajes mostrados en el juego serán los herreros elegidos por cada reino y sus monstruos correspondientes. Nos fijamos sobre todo en estilo de los trazos de *Hollow Knight*,el estilo de los personajes de *The Swords of Ditto*, o algunas ilustraciones de *Shovel Knight* y *Octopath Traveler*, todos ellos adaptados al estilo medieval ya mencionado anteriormente. Aunque estén dentro de una misma línea estética, cada uno tendrá un estilo distintivo según su región de origen. Por el momento solo se pueden elegir dos reinos de los cuatro planeados.
![](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3c6ad2b7-76a1-4e34-b92a-0431101f82f8/ddbz6j3-277d7737-0026-43c7-a802-17bb3fb6c11a.png/v1/fill/w_1280,h_1280,q_80,strp/hollow_knight_characters_studies_2_by_art_revolver_ddbz6j3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzNjNmFkMmI3LTc2YTEtNGUzNC1iOTJhLTA0MzExMDFmODJmOFwvZGRiejZqMy0yNzdkNzczNy0wMDI2LTQzYzctYTgwMi0xN2JiM2ZiNmMxMWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.SJhbkCYVSAYNPyNWjua9tW-oFFCRU2JfZ6Z_L6e36TY) ![](https://pbs.twimg.com/media/Di91nr5UUAA9J4o.jpg)
1. Pueblo del hielo: Quizá los únicos detalles de colores fríos del juego, su herrero será un hombre de constitución imponente ataviado con pieles, todo en tonos blancos que reflejarán lo gélido del hielo en consonancia con su monstruo, un yeti todavía más grande que el campeón elegido.
2. Pueblo del fuego: Representados por una mujer de piel morena, aparentarán haber llegado del desierto o de unas montañas rocosas. Basado en la clásica representación del dragón medieval, rojo y con ojos de serpiente. 
3. Elfos oscuros: Al más puro estilo de los drow de Dungeons & Dragons, estos elfos son representados por una herrera acompañada de un demonio. Vienen de la mano con ellos los colores oscuros y las formas afiladas. Esto quedará reflejado sobre todo en la creación de armas pequeñas y letales y en la forja de armaduras oscuras decoradas con pinchos y otros detalles tétricos.
4. Nigromantes: También en una clave de color más basada en los tonos oscuros y fantasmagóricos, se diferencian de los elfos en que su campeón será un mago herrero que maneja a un zombie con él. Este aporte de la magia permitirá incluir tonos o colores más brillantes y antinaturales en su equipamiento, diseño y animaciones.  
## SONIDO Y MÚSICA
La música que sonará durante la partida será una música medieval épica.
Los efectos de sonidos serán los apropiados para cada momento: martillazos y similares mientras se forjan las armas, y rugidos y golpes para las batallas entre las criaturas
## INTERFAZ DE USUARIO Y CONTROLES
### MENÚS
El menú principal tendrá las siguientes opciones:
* Juego local: Ambos jugadores elegirán su avatar y comenzará la partida.
* Juego online: Eliges tu avatar y te conectas al resto de jugadores.
* Opciones: Habrá opciones como cambiar los controles o el volumen del juego.
* Guía: Conjunto de instrucciones para que el jugador aprenda el manejo básico de los controles.
En el menú de pausa se podrá acceder al menú de  opciones, volver al menú principal o volver a la partida.
### INTERFAZ DE LA PARTIDA
Se mostrará información relevante a cada jugador, como la cantidad de trabajo que le queda a cada uno para ganar.
Además habrá indicadores de cuándo un metal está listo en el horno (cuando está lo suficientemente caliente), un indicador de cuándo está quemado (y no se puede usar) y “recetas” sobre cómo preparar diferentes armas.
### Controles
Los controles al jugar online serán los mismos que los del primer jugador en modo local, siendo estos:
* W, A, S, D: Movimiento del personaje
* E: Coger objetos
* Q: Lanzar objetos

El segundo jugador tendrá los siguientes controles:
* Flechas de dirección: Movimiento del personaje
* O: Coger objetos
* P: Lanzar objetos

## DIAGRAMA DE NAVEGACIÓN
![Diagrama de navegación entre las distintas pantallas](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/Diagrama.png)

## MUESTRAS DEL DISEÑO
![CAPTURA DE PANTALLA DEL MENÚ](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaMenu.PNG)

Menú principal de juego. Los botones permiten el acceso a las distintas pantallas disponibles. El botón de juego online permanecerá desactivado hasta la siguiente fase.

![CAPTURA DE PANTALLA DE LA PANTALLA DE AJUSTES](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaAjustes.PNG)

Se dispone de la opción de cambiar los controles que usen ambos jugadores y los volúmenes tanto de la música como de los efectos de sonido. Existe un botón para restablecer los controles por defecto.

![CAPTURA DE PANTALLA DE LA GUIA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaGuia.png)
Guía textual y visual que permite pasar de unas páginas a otras para que el jugador vea todo lo que puede hacer y todos los controles disponibles.

![CAPTURA DE PANTALLA DEL MENÚ DE SELECCIÓN DE PJES](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaSeleccion.PNG)

El jugador uno puede elegir entre los dos personajes disponibles en este momento. El jugador dos se queda con el restante. Una vez seleccionado, comienza la partida.

![CAPTURA DE PANTALLA DEL JUEGO](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaPartida.PNG)

Captura de pantalla de una partida en proceso. Su funcionamiento queda detallado tanto en previos apartados del readme como en las instrucciones de la guía. En la imagen el juego acaba de empezar, por lo tanto se pueden ver las posiciones iniciales de ambos herreros y la disposición del escenario y de la interfaz disponible.

![CAPTURA DE PANTALLA DEL FIN DE PARTIDA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaVictoria.png)
Se indica el jugador ganador junto con un letrero de victoria. Vuelve al menú principal.

## TRELLO
Para coordinar el desarrollo utilizamos el siguiente tablero de trello: https://trello.com/b/rXEmfYBZ/the-forge

## ENLACE PRESENTACIÓN POWERPOINT
https://1drv.ms/p/s!Ake2wFBOjmIhhdoBoWvQU7ZfREAtjg

https://drive.google.com/open?id=1rvBCVqbPnGor9RUyLEz24A49ELa_eSHKa5emECI2Yok

## FUENTES
1. Imagen *Overcooked*: https://steamcdn-a.akamaihd.net/steam/apps/448510/ss_058c688a6f07a4624b4f775b3e71df8037ef4df2.1920x1080.jpg?t=1567203965
2. Imagen *Dragon Age: Inquisition*: https://www.lagzero.net/wp-content/uploads/2014/10/dai.jpg
3. Imagen *Clash of Clans*: https://i.postimg.cc/HxTB3NgV/Screenshot-20171224-223249.png
4. Imagen *Hollow Knight*: https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3c6ad2b7-76a1-4e34-b92a-0431101f82f8/ddbz6j3-277d7737-0026-43c7-a802-17bb3fb6c11a.png/v1/fill/w_1280,h_1280,q_80,strp/hollow_knight_characters_studies_2_by_art_revolver_ddbz6j3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzNjNmFkMmI3LTc2YTEtNGUzNC1iOTJhLTA0MzExMDFmODJmOFwvZGRiejZqMy0yNzdkNzczNy0wMDI2LTQzYzctYTgwMi0xN2JiM2ZiNmMxMWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.SJhbkCYVSAYNPyNWjua9tW-oFFCRU2JfZ6Z_L6e36TY
5. Image *The Swords of Ditto*: https://pbs.twimg.com/media/Di91nr5UUAA9J4o.jpg
6. Música del menú principal: Northland de Antti Martikainen (https://www.youtube.com/watch?v=tUR6zJcQ6MA)
7. Música de la partida: Super Hero 3 de Johannes Bornlöf (https://www.youtube.com/watch?v=2Tfw3YuE5_Q)
8. Sonido del yunque: Sonido del yunque de minecraft (https://gamepedia.cursecdn.com/minecraft_gamepedia/8/8c/Anvil_land.ogg)
9. Tipografía empleada en los textos: Enchanted Land (https://www.dafont.com/es/enchanted-land.font)
10. Tutorial de la pantalla de carga (https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/)
