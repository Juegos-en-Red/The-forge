# The Forge
Juego de la asignatura de Juegos en red desarrollado por:
* Elvira Gutiérrez Bartolomé. Correo: e.gutierrezb.2017@alumnos.urjc.es, Github: [elviragb](https://github.com/elviragb)
* Imanol Díaz Servando. Correo: i.diazs.2017@alumnos.urjc.es, Github: [Zeus-guy](https://github.com/Zeus-guy)
* Javier Sendarrubias Otero. Correo: ja.sendarrubias.2017@alumnos.urjc.es, Github: [Javierso1](https://github.com/Javierso1)
* Jorge Sendarrubias Otero. Correo: j.sendarrubias.2017@alumnos.urjc.es, Github: [JorgeURJC](https://github.com/JorgeURJC)

## VIDEO SOBRE EL USO DEL JUEGO ONLINE
[![](http://img.youtube.com/vi/Hzufct9Ceo4/0.jpg)](http://www.youtube.com/watch?v=Hzufct9Ceo4 "")

## CAMBIOS EN EL DOCUMENTO DE DISEÑO V1.3
Se ha implementado el tercer personaje. Al estar en la versión final del juego, también se ha actualizado lo referente a este en los apartados de HISTORIA y PERSONAJES, de tal forma que ahora solo aparecen en el contexto los tres personajes seleccionables durante las partidas. 
Se ha actualizado la sección de DIAGRAMAS con uno referente a la implementación de WebSockets. Además se ha añadido un apartado referente a la documentación de WebSockets resumiendo los cambios y la comunicación que se ha realizado para la fase 4 llamado DOCUMENTACION y se ha actualizado la sección de MUESTRAS DEL DISEÑO Y LA NAVEGACIÓN con nuevas capturas de pantalla referente a las actualizaciones de las pantallas en ambas fases, 4 y 5. 
También se han modificado los controles del segundo jugador en la fase 5. De este cambio se deja constancia en la sección "Controles".

## CAMBIOS EN EL DOCUMENTO DE DISEÑO V1.2
El concepto general del juego se mantiene sin cambios. Dentro del menú principal se han introducido dos nuevas opciones de selección: una sección de cambios que existirán en un futuro donde se recogen las sugerencias o mejoras que pretendemos introducir en fases futuras del desarrollo del juego y un botón de créditos donde se especifica el trabajo realizado por cada miembro del equipo. Dentro del documento se ha actualizado la anterior sección de "DIAGRAMAS DE NAVEGACIÓN" por una denominada "DIAGRAMAS" en la que, junto a este, incluimos el diagrama de clases de la aplicación y el diagrama de clases de API REST, ambos en formato UML. También se ha actualizado el apartado de "MUESTRAS DE DISEÑO" para que ahora incluya las explicaciones y pantallazos referentes a la navegación.

Por último se incluye una nueva clase con las instrucciones pertinentes para ejecutar el programa. 

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
Dentro de sus dominios, tres condes proponen cada uno a un campeón, sus más hábiles trabajadores. Estas tres regiones se enfrentarán entre sí para decidir quién será aquel que se alce con el puesto del favorito del rey y les lleve a la victoria en las futuras contiendas contra imperios vecinos.  
El ganador regresará a su hogar con grandes honores, tierras y tesoros para su gente y su familia. Cada duque manda a su campeón acompañado de un monstruo folclórico con el que competir contra el resto.  
El trabajo del herrero será forjar las armas que llevará equipadas la criatura, quien dependerá completamente de su trabajo para ganar la cruenta batalla.
Estas tres regiones son:  
* El pueblo del hielo, que mandará a un elegido de gélido temperamento acompañado de un imponente yeti.
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
2. Elfos oscuros: Al más puro estilo de los drow de Dungeons & Dragons, estos elfos son representados por una herrera acompañada de un demonio. Vienen de la mano con ellos los colores oscuros y las formas afiladas. Esto quedará reflejado sobre todo en la creación de armas pequeñas y letales y en la forja de armaduras oscuras decoradas con pinchos y otros detalles tétricos.
3. Nigromantes: También en una clave de color más basada en los tonos oscuros y fantasmagóricos, se diferencian de los elfos en que su campeón será un mago herrero que maneja a un zombie con él. Este aporte de la magia permitirá incluir tonos o colores más brillantes y antinaturales en su equipamiento, diseño y animaciones.  
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
* I,K,L,J: Movimiento del personaje
* O: Coger objetos
* U: Lanzar objetos

## DOCUMENTACION

## DIAGRAMAS
![Diagrama de navegación entre las distintas pantallas](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/DiagramaActualizado.png)

Al no utilizar clases en la implementación de nuestro juego, preguntamos qué hacer con este apartado y se nos indicó que tomáramos las escenas como clases. En este diagrama todos los cuadros son escenas, excepto "Core"y "Global". Los colores de las flechas son solo para diferenciar mejor (hemos considerado todas las relaciones como asociación).

![Diagrama de navegación uml de las clases de Phaser](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/uml_phaser.PNG)

El fichero Core contiene a todas escenas del proyecto. Y el archivo "Global" contiene variables globales que las escenas señaladas en el diagrama emplean. Hemos considerado que si de una escena se podía pasar a otra y viceversa, podría considerarse como asociación en base a tomar las escenas como clases. 
Aunque antes no estaba presente en el documento, los cambios con respecto a la fase anterior vienen a ser la existencia de nuevas escenas con las que implementar los mencionados créditos, la sección de "próximamente" y toda la escena online, cuyo funcionamiento se explica a continuación con el diagrama UML de navegación por la aplicación API REST.

![Diagrama de navegación uml de las clases de Phaser en la última fase](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/uml_phaser2.PNG)
Lo nuevo que se añadido o modificado está en color negro. Se ha eliminado la escena Next, que contenía una descripción de funcionalidades que podríamos aplicar en el futuro, y se ha reemplazado por por una escena Tutorial. Además, se han añadido las escenas jugarOnline y seleccionPersonajeOnline, a las que se accede desde la lobby. La antigua escena "disconnect" ahora se ha sustituido por disconnectOverlay, a partir de la cual podremos volver a la escena menuPrincipal. 
Cabe mencionar que ahora la guía es accesible desde juegoLocal y juegoOnline. Otra cosa que hay que clarificar es que desde la guía del menú principal no se puede acceder a juegoOnline ni juegoLocal, hemos puesto la flecha doble porque si abrimos la guía desde juegoLocal podremos volver a nuestra escena juegoLocal y lo mismo parajuegoOnline. Con Guia y su conexión con disconnectOverlay queremos puntualizar que solo es posible el paso de Guia a esta escena si nos encontramos en el modo Online. Que Guia pase por lobby no significa nada, es que la aplicación no permitía otro modo de introducir la flecha.

![Diagrama de navegación uml de las clases de API REST](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/uml%20api2.PNG)

A la hora de desarrollar la aplicación de Spring para poner nuestro proyecto a funcionar con su correspondiente servidor se han creado cuatro clases distintas. Como su nombre indica, PlayerController es la clase controlador encargada de ejecutar los métodos HTTP. Esta se nutre mediante relaciones de asociación y composición del resto de clases, usadas principalmente para administrar el estado de los jugadores y del chat disponible en el menú de juego online.
Mencionar que la clase App, que aparentemente no depende de nada, es la encargada de lanzar la aplicación de Spring que compone el esqueleto del programa, y que será donde posteriormente maniobrará PlayerController.


![Diagrama uml de las clases de WebSockets](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/uml_websockets.PNG)
App implementa una interfaz de tipo WebSocketConfigurer y contiene atributo(s) que son de tipoWebSocketEchoHandler, que a su vez contiene atributo(s) de tipo Room, que también contiene un atributo de tipo Stage.
WebSocketEchoHandler hereda de TextWebSocketEchoHandler.

## MUESTRAS DEL DISEÑO Y LA NAVEGACIÓN
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

![CAPTURA DE PANTALLA DEL NUEVO MENÚ](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaNuevoMenu.png)

El menú principal del juego se ha actualizado con sus correspondientes opciones. El cambio más relevante y el objetivo de la fase tres es el haber habilitado el modo online que antes aparecía semitransparente, indicando que ahora ya se puede acceder a él.

![CAPTURA DE PANTALLA DEL MODO ONLINE IP](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineIP.png)

Nada más pulsar el botón de online, lo primero que se nos aparece es un cuadro de texto en el que introducir la IP del servidor al que queremos conectarnos. Una vez tecleada, se pueden dar varios casos de error o bien proceder a la siguiente pantalla.

![CAPTURA DE PANTALLA MODO ONLINE IP INCORRECTA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineIPIncorrecta.png)

Si la IP introducida por el usuario no es válida o el servidor no está en funcionamiento, esto se le hace saber al usuario vía un mensaje textual en pantalla, justo por encima del recuadro.

![CAPTURA DE PANTALLA UC](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineUC.png)

Tras concetarse a un servidor, el jugador deberá introducir su nombre de usuario y su contraseña si los tiene. En caso negativo siempre podrá registrarse con un nombre de usuario y una contraseña que permanezcan libres. Tanto "iniciar sesión" como "registrarse" llevan a la misma escena donde en un futuro el usuario podrá acceder a una partida online.

![CAPTURA DE PANTALLA USUARIO INCORRECTO](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineUsuarioIncorrecto.png)

Si el nombre de usuario introducido no es correcto porque no existe al intentar iniciar sesión o porque ya está en uso al intentar registrarse, se le manda un aviso al jugador.

![CAPTURA DE PANTALLA CONTRASEÑA INCORRECTA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineContrase%C3%B1aIncorrecta.png)

Si la contraseña introducida no es correcta porque no existe al intentar iniciar sesión o porque ya está en uso al intentar registrarse, se le manda un aviso al jugador.

![CAPTURA DE PANTALLLA USUARIO REGISTRADO NO VÁLIDO](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineUsuarioYaExiste.png)

Cuando el jugador intenta registrar un usuario que ya se ha registrado previamente, se avisa mediante un mensaje sobre los cuadros de texto.

![CAPTURA DE PANTALLA DEL LOBBY](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaOnlineLobby.png)

Una vez el registro o el inicio de sesión ha concluido de forma exitosa, se dispone de una escena en la que distintos jugadores pueden interactuar entre ellos vía un chat en línea. También se conoce en todo momento cuantos usuarios están conectados. Si alguno se marcha empleando el botón de desconectar desaparece de la tabla sobre el chat. Además en este último caso, en un tiempo máximo de tres segundos, se le notifica al jugador lo ocurrido. 

![CAPTURA DE PANTALLA DEL SERVIDOR CAIDO](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaServidorCaido.png)

Si se interrumpe la conexión con el servidor, se le notifica al usuario y se le da la opción de volver al menú principal.

![CAPTURA DE PANTALLA DE LOS CRÉDITOS](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaCreditos.png)

Escena que muestra los créditos del juego.

![CAPTURA DE PANTALLA DE FUTUROS CAMBIOS](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/CapturaProximamente.png)

Desde el menú principal, pulsando en el botón de "Próximamente" se accede a una nueva pantalla en la que quedan reflejados los cambios o mejoras que se pretenden introducir en un futuro.

![CAPTURA DE PANTALLA DEL MENÚ DEFINITIVO](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/MENU%20PRINCIPAL.PNG)

Se ha eliminado el botón de "Próximamente" y se ha sustituido por el de "Tutorial", implementando sus respectivas funcionalidades. Además, con el objetivo de colgarlo en internet, se han actualizado todos los textos del juego al inglés, como se irá viendo en las distintas muestras del juego.

![CAPTURA DE PANTALLA DE LA GUÍA TRADUCIDA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/MUESTRAGUIA.PNG)

Se han actualizado los controles del segundo jugador y se ha traducido al inglés. Se mantiene el contenido general, pero también se han intercambiado las capturas de pantalla con unas correspondientes al juego actual. 

![CAPTURA DE PANTALLA DEL TUTORIAL](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/MUESTRATUTORIAL.PNG)

El tutorial es una funcionalidad completamente nueva implementada para la fase 5. Se trata de una partida en solitario guiada donde una serie de textos van indicándole al jugador las acciones que tiene que realizar paso por paso para ganar la partida.

![CAPTURA DE PANTALLA DEL MENÚ DE SELECCIÓN DE PERSONAJES](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/MENUSELECCION.PNG)

Se ha introducido un nuevo personaje seleccionable. Junto a él se verá en la partida a su correspondiente monstruo.

![CAPTURA DE PANTALLA DE LA PARTIDA ACTUALIZADA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/PARTIDA.PNG)

Se han hecho una serie de cambios desde la partida para mejorar la fase 2. En el aspecto visual, se han introducido partículas junto al movimiento de los personajes, se ha cambiado el sprite del yunque doble para hacerlo más diferenciable del yunque normal y se han eliminado los signos de prohibido del contenedor de basura. Se ha hecho más reconocible el icono del menú de pausa y se ha cambiado la distribución de las recetas. Además, en la parte superior de la pantalla se han incluido para cada jugador un área que muestre la trampa que posee cada usuario en cada momento, un cronómetro que lleva la cuenta de la duración máxima de la partida y otro que actualiza el progreso de la armadura. 
Por último, se han implementado pantallas de derrota y empate.

![CAPTURA DE PANTALLA DEL MENÚ DE PAUSA](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/MENUDEPAUSA.PNG)

Ahora se dispone de un menú de pausa que permite acceder a la guía, salir de la partida y volver a esta.

![CAPTURA DE PANTALLA DEL LOBBY ACTUALIZADO](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/NUEVOLOBBY.PNG)

Se han mejorado los gráficos referentes al chat y a la lista de jugadores, que marca el estado de cada usuario en función a su disponibilidad para realizar una partida. Ahora existe un perfil del jugador. Este mismo es visible para otros jugadore al hacer click sobre el nombre de un usuario e incluye la posibilidad de desafiarlo. Si el jugador es desafiado, le llegará un mensaje que puede aceptar o rechazar. 

![CAPTURA DE PANTALLA DEL LA PARTIDA ONLINE](https://github.com/Juegos-en-Red/The-forge/blob/master/TheForge/partidaOnline.PNG)

Equivalente a la partida local. La mayor diferencia es que el sprite del oponente aparece en un color distinto para diferenciarlo del propio. Aquí también se dispone de un menú de pausa y de todas las funcionalidades de la partida local.

## PROTOCOLO UTILIZADO SOBRE WEBSOCKETS
Todos los mensajes enviados por websockets están en formato JSON, y contienen un parámetro llamado message_type.

Dependiendo del tipo de mensaje, se ejecutarán unas acciones u otras.

Cuando un jugador recibe un desafío y pulsa el botón aceptar, abre un websocket y envía un mensaje de tipo "OPEN".

El servidor, al recibirlo, crea una sala para ese jugador y su oponente.

Cuando el otro jugador sabe que está en partida, abre websocket y envía un mensaje de tipo "OPEN2".

Cuando el servidor recibe ese mensaje, busca una sala en la que ya esté y le mete.

Una vez están los dos jugadores dentro de la sala, el servidor envía un mensaje de tipo "begin_game", que indica a ambos jugadores que la partida ha comenzado.

Una vez dentro de la partida, el servidor enviará una serie de mensajes cada 100ms (25 en algunos casos, como la posición de jugadores)

Los mensajes que puede enviar el servidor son:
- "trap_change": Envía a los clientes las trampas de ambos jugadores y del altar
- "estaciones": Envía a los clientes todos los tiempos y objetos de todas las estaciones de trabajo, los jugadores y los monstruos
- "winner": Envía a los clientes el nombre del ganador
- "player_move": Envía a los clientes la posición de ambos jugadores
- "player_move_single": Envía a un cliente la posición, velocidad y dirección del otro cliente
- "timeout": Envía a un cliente el tiempo que le queda al otro para reconectarse antes de perder
- "recetas": Envía a ambos clientes los arrays que contienen las recetas restantes de los dos jugadores
- "game_time": Envía a los clientes el tiempo que le queda a la partida

Los mensajes que pueden mandar los clientes son:
- "GRAB TRAP": El servidor asigna al jugador indicado la trampa que tenga el altar, si es que tiene alguna. Después, elimina la trampa del altar
- "USE TRAP": El servidor elimina la trampa del jugador indicado, si es que tiene alguna, y asigna los tiempos correspondientes a la trampa eliminada
- "PLAYER MOVE": El servidor actualiza la posición, velocidad y dirección del jugador indicado
- "INTERACT": Asigna al jugador y estación de trabajo seleccionadas los tiempos y objetos correspondientes, según los que ya tuvieran
- "INTERACT_TIMER": Similar al anterior, pero sólo modifica tiempos
- "INTERACT_MONSTER": Si el jugador tiene el objeto que necesita el monstruo, se realizan todas las acciones necesarias para eliminar el objeto de la receta y asignárselo al monstruo. Si un jugador gana, se enviará el mensaje apropiado a los clientes
- "SURRENDER": El jugador indicado se rinde, por lo que se envía un mensaje de victoria con el otro jugador como ganador



## INSTRUCCIONES DE EJECUCCIÓN
A la hora de ejecutar el proyecto existen dos maneras. 

En una de ellas es necesario disponer de un IDE de desarrollo, preferiblemente Spring Tool Suite, ya que es en el que se ha realizado la aplicación. 

Una vez se abra el proyecto en Spring, se ejecuta la aplicación con el comando "run as: java application". 

Hecho esto se inicia el servidor al que se conectará el navegador. 


La otra forma de ejecutarlo es utilizando un archivo .jar, ya sea el que viene incluido u otro que se compile a partir del código fuente. Para compilar un archivo .jar, es necesario tener instalado el JDK. Desde Spring, se debe utilizar el comando "run as: Maven Build.." y en Goals se debe introducir "package". 

Al pulsar el botón "Run", se empezará a compilar el servidor en un archivo .jar. Una vez esté compilado, se puede o abrir directamente o, desde la línea de comandos y en la carpeta en la que se encuentre el .jar, ejecutar "java -jar laforja-final.jar". El comando cambiará según el nombre del archivo .jar.


Una vez el servidor se esté ejecutando, desde el navegador se accede a la IP del servidor que está activo, que será la del equipo con el puerto 8080. Desde el equipo en el que se esté ejecutando, basta con entrar en localhost:8080.

Para acceder a las funcionalidades online basta con escogerlas en el menú principal e introducir la IP del servidor al que te quieras conectar, que puede ser el mismo con el que se ha abierto el navegador o bien otro en el que también se esté ejecutando el proyecto.


## TRELLO
Para coordinar el desarrollo utilizamos el siguiente tablero de trello: https://trello.com/b/rXEmfYBZ/the-forge

## ENLACE PRESENTACIÓN POWERPOINT
Fase 1:
https://1drv.ms/p/s!Ake2wFBOjmIhhdoBoWvQU7ZfREAtjg

Fase 2:
https://drive.google.com/open?id=1rvBCVqbPnGor9RUyLEz24A49ELa_eSHKa5emECI2Yok

Fase 3:
https://drive.google.com/open?id=1rvBCVqbPnGor9RUyLEz24A49ELa_eSHKa5emECI2Yok

Fases 4 y 5:
https://drive.google.com/open?id=1rvBCVqbPnGor9RUyLEz24A49ELa_eSHKa5emECI2Yok

## ENLACE A LAS PÁGINAS WEB EN LAS QUE ESTÁ SUBIDO EL JUEGO

Como parte de la fase 5, The Forge se puede encontrar disponible en los siguientes enlaces:
 
 https://zeus-guy.itch.io/the-forge
 
 https://gamejolt.com/games/theforge/462495
 
 https://www.newgrounds.com/portal/view/746102
 
 https://play.idevgames.co.uk/game/the-forge

## FUENTES
1. Imagen *Overcooked*: https://steamcdn-a.akamaihd.net/steam/apps/448510/ss_058c688a6f07a4624b4f775b3e71df8037ef4df2.1920x1080.jpg?t=1567203965
2. Imagen *Dragon Age: Inquisition*: https://www.lagzero.net/wp-content/uploads/2014/10/dai.jpg
3. Imagen *Clash of Clans*: https://i.postimg.cc/HxTB3NgV/Screenshot-20171224-223249.png
4. Imagen *Hollow Knight*: https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3c6ad2b7-76a1-4e34-b92a-0431101f82f8/ddbz6j3-277d7737-0026-43c7-a802-17bb3fb6c11a.png/v1/fill/w_1280,h_1280,q_80,strp/hollow_knight_characters_studies_2_by_art_revolver_ddbz6j3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzNjNmFkMmI3LTc2YTEtNGUzNC1iOTJhLTA0MzExMDFmODJmOFwvZGRiejZqMy0yNzdkNzczNy0wMDI2LTQzYzctYTgwMi0xN2JiM2ZiNmMxMWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.SJhbkCYVSAYNPyNWjua9tW-oFFCRU2JfZ6Z_L6e36TY
5. Image *The Swords of Ditto*: https://pbs.twimg.com/media/Di91nr5UUAA9J4o.jpg
6. Sonido del yunque: Anvil de MrAuralization (https://freesound.org/people/MrAuralization/sounds/274846/)
7. Tipografía empleada en los textos: Enchanted Land de Dennis Ludlow (https://www.dafont.com/es/enchanted-land.font)
8. Tutorial de la pantalla de carga (https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/)
