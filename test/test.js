import Comparepanel from 'facade/comparepanel';

M.language.setLang('es');//Español
//M.language.setLang('en');//Inglés

/**
 * Definimos las capas con notación MAPEA
 */

 
const capasPNOA = [
  'WMS*PNOA 2004*https://www.ign.es/wms/pnoa-historico*PNOA2004',
  'WMS*PNOA 2005*https://www.ign.es/wms/pnoa-historico*PNOA2005',
  'WMS*PNOA 2006*https://www.ign.es/wms/pnoa-historico*PNOA2006',
  'WMS*PNOA 2007*https://www.ign.es/wms/pnoa-historico*PNOA2007',
  'WMS*PNOA 2008*https://www.ign.es/wms/pnoa-historico*PNOA2008',
  'WMS*PNOA 2009*https://www.ign.es/wms/pnoa-historico*PNOA2009',
  'WMS*PNOA 2010*https://www.ign.es/wms/pnoa-historico*PNOA2010',
  'WMS*PNOA 2011*https://www.ign.es/wms/pnoa-historico*PNOA2011',
  'WMS*PNOA 2012*https://www.ign.es/wms/pnoa-historico*PNOA2012',
  'WMS*PNOA 2013*https://www.ign.es/wms/pnoa-historico*PNOA2013',
  'WMS*PNOA 2014*https://www.ign.es/wms/pnoa-historico*PNOA2014',
  'WMS*PNOA 2015*https://www.ign.es/wms/pnoa-historico*PNOA2015',
  'WMS*PNOA 2016*https://www.ign.es/wms/pnoa-historico*PNOA2016',
  'WMS*PNOA 2017*https://www.ign.es/wms/pnoa-historico*PNOA2017',
  'WMS*PNOA 2018*https://www.ign.es/wms/pnoa-historico*PNOA2018',
];

/**
* Definimos las capas con notación MAPEA
*/
const capasVueloHisto = [
  'WMTS*http://www.ign.es/wmts/primera-edicion-mtn?*catastrones*GoogleMapsCompatible*Catastrones de MTN',
  'WMTS*http://www.ign.es/wmts/primera-edicion-mtn?*mtn50-edicion1*GoogleMapsCompatible*MTN50 Primera edición',
  'WMTS*http://www.ign.es/wmts/primera-edicion-mtn?*mtn25-edicion1*GoogleMapsCompatible*MTN25 Primera edición',
  'WMS*SIGPAC*https://www.ign.es/wms/pnoa-historico*SIGPAC',
  'WMS*OLISTAT*https://www.ign.es/wms/pnoa-historico*OLISTAT',
  'WMS*Vuelo Nacional 1981-1986*https://www.ign.es/wms/pnoa-historico*Nacional_1981-1986',
  'WMS*Vuelo Interministerial 1973-1986*https://www.ign.es/wms/pnoa-historico*Interministerial_1973-1986',
  'WMS*Vuelo Americano B 1956-1957*https://www.ign.es/wms/pnoa-historico*AMS_1956-1957',
];

/**
 * Definimos capas notación standard
 * 
 */
let wmtsMTN251edi = new M.layer.WMTS({
  url: "http://www.ign.es/wmts/primera-edicion-mtn",
  name: "mtn25-edicion1",
  matrixSet: "GoogleMapsCompatible",
  legend: "Primera edición MTN25"
  }, {
  format: 'image/jpeg'
});

let wmtsMTN501edi = new M.layer.WMTS({
  url: "http://www.ign.es/wmts/primera-edicion-mtn",
  name: "mtn50-edicion1",
  matrixSet: "GoogleMapsCompatible",
  legend: "Primera edición MTN50"
}, {
  format: 'image/jpeg'
});
  
let wmtsMTNActual = new M.layer.WMTS({
  url: "https://www.ign.es/wmts/mapa-raster",
  name: "MTN",
  matrixSet: "GoogleMapsCompatible",
  legend: "Cartografía Ráster Actual"
}, {
  format: 'image/jpeg'
});

let wmtssiose = new M.layer.WMTS({
  url: "https://servicios.idee.es/wmts/ocupacion-suelo",
  name: "LC.LandCoverSurfaces",
  matrixSet: "GoogleMapsCompatible",
  legend: "CORINE / SIOSE"
}, {
  format: 'image/jpeg'
});

let wmtsmdt = new M.layer.WMTS({
  url: "https://servicios.idee.es/wmts/mdt",
  name: "Relieve",
  matrixSet: "GoogleMapsCompatible",
  legend: "MDT"
}, {
  format: 'image/jpeg'
});


/**
 * Objeto mapa
 */

const map = M.map({
  container: 'mapjs',
  center: {
    x: -667143.31,
    y: 4493011.77,
    draw: false  //Dibuja un punto en el lugar de la coordenada
  },
  controls: ['scale','location'],
  /*projection: "EPSG:25830*m",*/
  projection: "EPSG:3857*m",
  zoom: 6,

  //Ojo, si añado esta capa sin TOC, se ve siempre y no se muestran capas base
  /*layers: ["WMTS*http://www.ign.es/wmts/pnoa-ma?*OI.OrthoimageCoverage*EPSG:25830*PNOA"],*/
});


/**
 * Plugin con los mapas de fondo
 */

const mpBIL = new M.plugin.BackImgLayer({
  position: 'TR',
  layerId: 0,
  layerVisibility: true,
  collapsed: true,
  collapsible: true,
  columnsNumber: 3,
  layerOpts: [{
          id: 'mapa',
          preview: 'https://componentes.ign.es/api-core/plugins/backimglayer/images/svqmapa.png',
          title: 'Mapa',
          layers: [new M.layer.WMTS({
              url: 'http://www.ign.es/wmts/ign-base?',
              name: 'IGNBaseTodo',
              legend: 'Mapa IGN',
              matrixSet: 'GoogleMapsCompatible',
              transparent: false,
              displayInLayerSwitcher: false,
              queryable: false,
              visible: true,
              format: 'image/jpeg',
          })],
      },
      {
          id: 'imagen',
          title: 'Imagen',
          preview: 'https://componentes.ign.es/api-core/plugins/backimglayer/images/svqimagen.png',
          layers: [new M.layer.WMTS({
              url: 'http://www.ign.es/wmts/pnoa-ma?',
              name: 'OI.OrthoimageCoverage',
              legend: 'Imagen (PNOA)',
              matrixSet: 'GoogleMapsCompatible',
              transparent: false,
              displayInLayerSwitcher: false,
              queryable: false,
              visible: true,
              format: 'image/jpeg',
          })],
      },
      {
          id: 'hibrido',
          title: 'Híbrido',
          preview: 'https://componentes.ign.es/api-core/plugins/backimglayer/images/svqhibrid.png',
          layers: [new M.layer.WMTS({
                  url: 'http://www.ign.es/wmts/pnoa-ma?',
                  name: 'OI.OrthoimageCoverage',
                  legend: 'Imagen (PNOA)',
                  matrixSet: 'GoogleMapsCompatible',
                  transparent: true,
                  displayInLayerSwitcher: false,
                  queryable: false,
                  visible: true,
                  format: 'image/png',
              }),
              new M.layer.WMTS({
                  url: 'http://www.ign.es/wmts/ign-base?',
                  name: 'IGNBaseOrto',
                  matrixSet: 'GoogleMapsCompatible',
                  legend: 'Mapa IGN',
                  transparent: false,
                  displayInLayerSwitcher: false,
                  queryable: false,
                  visible: true,
                  format: 'image/png',
              })
          ],
      },
      {
          id: 'lidar',
          preview: 'https://componentes.ign.es/api-core/plugins/backimglayer/images/svqlidar.png',
          title: 'LIDAR',
          layers: [new M.layer.WMTS({
              url: 'https://wmts-mapa-lidar.idee.es/lidar?',
              name: 'EL.GridCoverageDSM',
              legend: 'Modelo Digital de Superficies LiDAR',
              matrixSet: 'GoogleMapsCompatible',
              transparent: false,
              displayInLayerSwitcher: false,
              queryable: false,
              visible: true,
              format: 'image/png',
          })],
      },
      {
        id: 'mtn25',
        preview: 'img/mtn251Edi.jpg',
        title: 'MTN25 1Edi',
        layers: [wmtsMTN251edi],
      },
      {
        id: 'mtn50',
        preview: 'img/mtn501Edi.jpg',
        title: 'MTN50 1Edi',
        layers: [wmtsMTN501edi],
      },
      {
        id: 'mtnActual',
        preview: 'img/mtnactual.jpg',
        title: 'Cartografía ráster',
        layers: [wmtsMTNActual],
      },
      {
        id: 'SIOSE',
        preview: 'img/siose.jpg',
        title: 'CORINE / SIOSE',
        layers: [wmtssiose],
      }, 
      {
        id: 'MDT',
        preview: 'img/mdt.jpg',
        title: 'MDT',
        layers: [wmtsmdt],
      },                          
  ],
});

map.addPlugin(mpBIL);


/**
 * Plugin Comparador
 */


const pluginComparepanel = new Comparepanel({
  position: 'TR',
  vertical: true,
  baseLayers: [
    ["AM 1956-1957", "1956", "WMS*AMS_1956-1957*https://www.ign.es/wms/pnoa-historico*AMS_1956-1957"],
    ["Interministerial 1973-1986", "1983", "WMS*Interministerial_1973-1986*https://www.ign.es/wms/pnoa-historico*Interministerial_1973-1986"],
    ["NACIONAL 1981-1986", "1986", "WMS*NACIONAL_1981-1986*https://www.ign.es/wms/pnoa-historico*NACIONAL_1981-1986"],
    ["OLISTAT", "1998", "WMS*OLISTAT*https://www.ign.es/wms/pnoa-historico*OLISTAT"],
    ["SIGPAC", "2003", "WMS*SIGPAC*https://www.ign.es/wms/pnoa-historico*SIGPAC"],
    ["PNOA 2004", "2004", "WMS*pnoa2004*https://www.ign.es/wms/pnoa-historico*pnoa2004"],
    ["PNOA 2005", "2005", "WMS*pnoa2005*https://www.ign.es/wms/pnoa-historico*pnoa2005"],
    ["PNOA 2006", "2006", "WMS*pnoa2006*https://www.ign.es/wms/pnoa-historico*pnoa2006"],
    ["PNOA 2007", "2007", "WMS*pnoa2007*https://www.ign.es/wms/pnoa-historico*pnoa2007"],
    ["PNOA 2008", "2008", "WMS*pnoa2008*https://www.ign.es/wms/pnoa-historico*pnoa2008"],
    ["PNOA 2009", "2009", "WMS*pnoa2009*https://www.ign.es/wms/pnoa-historico*pnoa2009"],
    ["PNOA 2010", "2010", "WMS*pnoa2010*https://www.ign.es/wms/pnoa-historico*pnoa2010"],
    ["PNOA 2011", "2011", "WMS*pnoa2011*https://www.ign.es/wms/pnoa-historico*pnoa2011"],
    ["PNOA 2012", "2012", "WMS*pnoa2012*https://www.ign.es/wms/pnoa-historico*pnoa2012"],
    ["PNOA 2013", "2013", "WMS*pnoa2013*https://www.ign.es/wms/pnoa-historico*pnoa2013"],
    ["PNOA 2014", "2014", "WMS*pnoa2014*https://www.ign.es/wms/pnoa-historico*pnoa2014"],
    ["PNOA 2015", "2015", "WMS*pnoa2015*https://www.ign.es/wms/pnoa-historico*pnoa2015"],
    ["PNOA 2016", "2016", "WMS*pnoa2016*https://www.ign.es/wms/pnoa-historico*pnoa2016"],
    ["PNOA 2017", "2017", "WMS*pnoa2017*https://www.ign.es/wms/pnoa-historico*pnoa2017"],
    ["PNOA 2018", "2018", "WMS*pnoa2018*https://www.ign.es/wms/pnoa-historico*pnoa2018"]
  ],
  timelineParams: { animation: false, },
  transparencyParams: { radius: 140, },
  lyrcompareParams: { staticDivision: 2, },
  mirrorpanelParams: { showCursors: true, }
});

map.addPlugin(pluginComparepanel);

