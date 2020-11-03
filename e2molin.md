# API CNIG

## Wiki del proyecto oficial
https://github.com/administradorcnig/APICore/wiki

### Instalación
```
npm install -g mapea-create-plugin
mapea-create-plugin
//Lo hacemos con la versión 5.1
//Nos metemos en el directorio
//Pending.Guadaltel: poder elegir si quieres un css por defecto o lo trae limpio
npm start
```

## Comentarios

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



## Snippets: Cargar Capa de Openlayer

```javascript
mapImpl = map.getMapImpl();
capa = new ol.layer.Tile({
source: new ol.source.OSM()
});
mapImpl.addLayer(capa)
```


## Instalación desde GitHub

Cuando