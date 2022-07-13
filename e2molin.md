# API CNIG

## Wiki del proyecto oficial
https://github.com/administradorcnig/APICore/wiki

## Instalación
```
npm install -g mapea-create-plugin
mapea-create-plugin
//Lo hacemos con la versión 5.1
//Nos metemos en el directorio
//Pending.Guadaltel: poder elegir si quieres un css por defecto o lo trae limpio
npm start
```

## Comentarios generales

Cuando sigo los pasos para crear el *boilerplate* del plugin la instalación funciona sin problemas. Arranca un proyecto y dibuja un mapa con el Toporáster de Andalucía centrado y un plugin muy sencillo con un botón que permite hacer una operación sobre el mapa.

Pero las librerías de las que tira son las de la junta de Andalucía, así que lo primero que hago es cambiar las irecciones de los ficheros CSS y JS en el fichero dev.html del directorio test, que es el que lanza el stack de desarrollo.

```html
    <!-- Comento los estilos de MAPEA y meto los de APICNIG -->
    <!--<link href="http://mapea4-sigc.juntadeandalucia.es/assets/css/mapea-5.1.0.ol.min.css" rel="stylesheet" />-->
    <link type="text/css" rel="stylesheet" href="http://mapea-lite.desarrollo.guadaltel.es/api-core/assets/css/apiign-1.2.0.ol.min.css" /><!-- Estilos de MAPEA -->

    <!-- Comento las librerías de MAPEA y meto las de APICNIG -->
    <!--<script type="text/javascript" src="http://mapea4-sigc.juntadeandalucia.es/js/mapea-5.1.0.ol.min.js"></script>
    <script type="text/javascript" src="http://mapea4-sigc.juntadeandalucia.es/js/configuration-5.1.0.js"></script>-->
    <script type="text/javascript" src="http://mapea-lite.desarrollo.guadaltel.es/api-core/js/apiign-1.2.0.ol.min.js"></script>
    <script type="text/javascript" src="http://mapea-lite.desarrollo.guadaltel.es/api-core/js/configuration-1.2.0.js"></script>
```

También podemos cambiar las librerías por las del API-CNIG qu están publicadas en los servidores de CNIG. Incluso meter algún plugin. El *boilerplate* quedará así.

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="mapea" content="yes">

    <title>Lyrdropdown TEST</title>
    <link type="text/css" rel="stylesheet" href="https://componentes.cnig.es/api-core/assets/css/apiign.ol.min.css" />                 <!-- Estilos de MAPEA -->
    <link type="text/css" rel="stylesheet" href="https://componentes.cnig.es/api-core/plugins/toc/toc.ol.min.css" />                   <!-- CSS Plugin TOC: Selector de capas overlay - Feo como él solo pero funciona -->
    <link type="text/css" rel="stylesheet" href="https://componentes.cnig.es/api-core/plugins/beautytoc/beautytoc.ol.min.css" />       <!-- CSS Plugin BeautyTOC: Selector de capas overlay - No funciona -->
    <link type="text/css" rel="stylesheet" href="https://componentes.cnig.es/api-core/plugins/fulltoc/fulltoc.ol.min.css" />           <!-- CSS Plugin FullTOC: Selector de capas overlay - En desarrollo pero pinta genial -->
    <link type="text/css" rel="stylesheet" href="https://componentes.cnig.es/api-core/plugins/backimglayer/backimglayer.ol.min.css" /> <!-- CSS Plugin BackImgLayer: Selector de capas bsse -->    
    <style rel="stylesheet">
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
    </style>

</head>

<body>
    <div id="mapjs" class="container"></div>

    <script type="text/javascript" src="https://componentes.cnig.es/api-core/js/apiign.ol.min.js"></script>
    <script type="text/javascript" src="https://componentes.cnig.es/api-core/js/configuration.js"></script>
    
    <!-- Plugins APICNIG -->
    <script type="text/javascript" src="https://componentes.cnig.es/api-core/plugins/toc/toc.ol.min.js"></script>                         <!-- JS Plugin TOC: Selector de capas overlay - feo pero funciona -->
    <script type="text/javascript" src="https://componentes.cnig.es/api-core/plugins/beautytoc/beautytoc.ol.min.js"></script>             <!-- JS Plugin BeautyTOC: Selector de capas overlay - No va bien -->
    <script type="text/javascript" src="https://componentes.cnig.es/api-core/plugins/fulltoc/fulltoc.ol.min.js"></script>                 <!-- JS Plugin FullTOC: Selector de capas overlay - Va de PM aunque está en desarrollo -->
    <script type="text/javascript" src="https://componentes.cnig.es/api-core/plugins/backimglayer/backimglayer.ol.min.js"></script>       <!-- JS Plugin BackImgLayer: Selector de capas base -->

    <script type="text/javascript" src="/main.js"></script>

</body>

</html>
```

Tras hacer esto hay que parar el daemon-server y volver a arrancarlo. Al hacerlo los estilo cambias y el botón ya no funciona. Desaparece, posiblemente porque no encuentra la librería que aportaba el icono.

Creo que hay que normalizar los plugin. Establecer unos nombres fijos para determinados nombres de propiedades, se usa indistintamente *name* o *name_*, así como unas reglas de estilo, como usar camelcase en los nombres o lowercase, ya que tenemos plugins con nombres dcomo **FullTOC** o nombres como **backimglayer**.

Cuando nos bajamos el *boilerplate* para comenzar a hacer un plugin, debería llevar implementado de serie los procedimientos que luego son obligatorios en todos los plugin: los procedimientos *collapsible* o *collapsable*, cómo se activa o desactiva el plugin, las llamadas por API o el procedimiento de destrucción del plugin. Además deberían apuntar a las librerías del APICNIG y no a las de la Junta de Andalucía.  

Hay que explicar cómo pasar los parámetros del plugin con todas sus variantes: strings, arrays, booleans, y explicar cómo se gestiona la entrada.


## Comentarios particulares de este plugin

Hemos reducido el grosor de los separadores de los métodos *curtain* aunque sin llegar al grosor mínimo de los que aparecen en el método *mirror*. En el método *curtain* es necesario que haya un grosor ligeramente mayor, para que se aprecie mejor la transición entre capas. Aún así es cierto que el grosor anterior podía ser excesivo. Se reduce a la mitad.

```css
.lyrcompare-swipe-control.vertical::before {
	content: '';
	background: #fff;
	display: block;
	position: absolute;
	height: 250vh;
	width: 0.25rem;	/* 0.5rem; Reducimos el ancho del separador vertical */
	top: -125vh;
	left: 1.125rem; /* 1rem; Reducimos el ancho del separador vertical */
	cursor: ew-resize;
}

.lyrcompare-swipe-control.horizontal::after {
	content: '';
	background: #fff;
	display: block;
	position: absolute;
	width: 250vw;
	height: 0.25rem;	/*0.5rem; Reducimos el alto del separador horizontal */
	left: -125vw;
	top: 1.125rem; 		/* 1rem;  Reducimos el alto del separador horizontal  */
	cursor: ns-resize;
}
```

### Nuevos iconos

Hemos introducido alguno de los iconops de la librería Font-GIS de Jean-Marc Vignilo

```html
https://viglino.github.io/font-gis/
```


## Snippets 

### Cargar Capa de Openlayer

```javascript
mapImpl = map.getMapImpl();
capa = new ol.layer.Tile({
source: new ol.source.OSM()
});
mapImpl.addLayer(capa)
```

### Cargar capas WMTS

```javascript
new M.layer.WMTS({
            url: 'https://www.ign.es/wmts/mapa-raster?',
            name: 'MTN',
            legend: 'Mapa',
            matrixSet: 'GoogleMapsCompatible',
            transparent: false,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/png',
          }),

//Si se quiere cargar como cadena igualmente el orden es correcto. Si cargo la capa por url me devuelve que el formato no está soportado. He probado con png y funciona correctamente.

capaSIOSEsource = 'WMTS*https://servicios.idee.es/wmts/ocupacion-suelo?*LC.LandCoverSurfaces*GoogleMapsCompatible*SIOSE*false*image/png*false*false*true';
```

### Configurar mapas de fondo en el BackImgLayer

El mapa de fondo es ql que aprece por debajo de todas las capas, con zIndex=0
La configuración de los mapas que se muestran en el control **BackImgLayer** y aparece en el fichero de configuración 

```html
https://componentes.cnig.es/api-core/js/configuration.js
```
Por defecto el IGNBase aparecerá abierto con el PNOA y el PNOA híbrido como alternativas. Pero podemos variar tanto el mapa incial como los mapas añadidos
Podemos variar el listado de mapas disponibles como capas de fondo, basta con que antes de definir el mapa introduzcamos este *snippet*. El mapa que figura en primer lugar del array es el que se muestra por defecto.

```javascript
const customBGLids = ['mapa','imagen','hibrido','cartomtn'];
const customBGLtitles = ['Mapa','Imagen','Mixto','Carto'];
const customBGLlayers = [
          'WMTS*https://www.ign.es/wmts/ign-base?*IGNBaseTodo*GoogleMapsCompatible*base*false*image/jpeg*false*false*true',
          'WMTS*https://www.ign.es/wmts/pnoa-ma?*OI.OrthoimageCoverage*GoogleMapsCompatible*imagen*false*image/jpeg*false*false*true',
          'WMTS*https://www.ign.es/wmts/pnoa-ma?*OI.OrthoimageCoverage*GoogleMapsCompatible*imagen*true*image/jpeg*false*false*true' + '+' +
          'WMTS*https://www.ign.es/wmts/ign-base?*IGNBaseOrto*GoogleMapsCompatible*Callejero*true*image/png*false*false*true',
          'WMTS*https://www.ign.es/wmts/mapa-raster?*MTN*GoogleMapsCompatible*MTN*true*image/jpeg*false*false*true'
        ];

const customBGLoptions = customBGLids.map((id, index) => {
  return {
    id,
    title: customBGLtitles[index],
    layers: customBGLlayers[index].split('+'),
  };
});

M.config('backgroundlayers', customBGLoptions);
```

## Obtener un listado de capas cargado en el mapa

```javascript
let capas=[];
this.map.getLayers().forEach((layer,i) =>{
  capas.push(layer.name)
})
console.table(capas);
```

## Mejoras

* Asignar un icono general al ComparePanel: actualmente replica el icono del mirrorPanel
  * ✅ Icono añadido a la librería de fuentes y asignado
* El timeline debería arrancarse activo y en una capa concreta.
  * ✅ Ya se puede arrancar en una de las capas a través de **defaultCompareViz**.
* Cuando se pulsa un *play*, no aparece un botón de *pause* para detener la animación
  * ✅ Ya se puede contralar la animación arrancando y deteniéndola. Botones con iconos adecuados
* Posibilidad de configurar el lienzo principal a derecha o izquierda
  * ✅ Los modos 1,3,4,5,7 y 9 tienen un modo reverse, en el que la aineación de las columnas va de izquierda a derecha
* Problema de funcionamiento con API-CNIG 4.0 y OL6
  * ✅ Se ha solucionado el problema de funcionamiento. A la espera de introducir retrocompatibilidad.
* ✅ Descripción en la ayuda de ejemplos de carga de capas por WMS y WMTS
* ✅ Mostrar un plugin FullTOC y un plugin Vector junto con un control BackImgLayer en los diversos mapas mirror.


## Semantic Commit Messages

* feat: (new feature for the user, not a new feature for build script)
* fix: (bug fix for the user, not a fix to a build script)
* docs: (changes to the documentation)
* style: (formatting, missing semi colons, etc; no production code change)
* refactor: (refactoring production code, eg. renaming a variable)
* test: (adding missing tests, refactoring tests; no production code change)
* chore: (updating grunt tasks etc; no production code change)

## Preguntas

* ¿Cómo se puede conocer la versión de la API con la que trabajo? : No se puede. Quizás se implemente en próximas peticiones. Ahora la única solución actualmente sería pasar la versión como parámetro del plugin.

### Git
* https://www.nobledesktop.com/learn/git/git-branches
* https://vabadus.es/blog/otros/trabajando-con-git-deshacer-un-merge
* https://desarrolloweb.com/articulos/trabajar-ramas-git.html

## Servicios de prueba

NASA * https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers#expand-WMTS

## Media Queryes del CSS original


```css
/* Mobile fix */

@media only screen and (max-width: 1000px) {

	.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened {
			background-color: rgba(255, 255, 255, 0.5) !important;
			position: absolute;
			height: 100vh;
			margin: 0px;
			padding: calc((100vw - 210px) / 2);
			padding-top: 10px;
			width: 100vw;
			z-index: 99999;
	}

	.m-panel.m-plugin-comparepanel.opened>button {
			left: 0;
			top: 0;
	}


	.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-titulo {
			font-size: 13px;
			padding-left: 0;
			padding-right: 0;
			width: 210px;
	}

	.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-previews {
			height: calc(100vh - 50px);
			overflow: scroll;
			width: 210px;
	}

	.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-previews>div {
			height: 210px;
			width: 210px;
	}

	.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-previews>div>img {
			height: 200px;
			width: 200px;
	}

	.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-previews>div>span {
			font-size: 1.3em;
			height: 40px;
			line-height: 40px;
			top: 160px;
			width: 200px;
	}

	/* Firefox fix */
	@-moz-document url-prefix() {
			.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened {
					padding: 10px 50px 0;
			}

			.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-previews {
					padding-bottom: 50px;
			}
	}

	/* Chrome fix */
	@media screen and (-webkit-min-device-pixel-ratio:0) {
			.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened>div.m-panel-controls>div.m-control.m-container.m-comparepanel>div#m-comparepanel-previews {
					height: calc(100vh - 100px);
			}
	}

}

@media only screen and (max-width: 433px) {

	/* Edge fix */
	@supports (-ms-ime-align:auto) {
			.m-areas>div.m-area>div.m-panel.m-plugin-comparepanel.opened {
					padding: 10px 50px 0;
			}
	}
}
```