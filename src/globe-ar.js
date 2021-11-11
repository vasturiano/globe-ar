import 'aframe-globe-component';

//import * as a from 'ar.js/aframe/build/aframe-ar.js';

import Kapsule from 'kapsule';

//

const GLOBE_RADIUS = 100; // in GL units

export default Kapsule({

  props: {
    width: {},
    height: {},
    yOffset: { default: 1.5 }, // marker size units
    globeScale: { default: 1 }, // globe radius units per marker width

    onHover: {},
    onClick: {},
    globeImageUrl: {},
    bumpImageUrl: {},
    showGlobe: { default: true },
    showGraticules: { default: false },
    showAtmosphere: { default: true },
    atmosphereColor: { default: 'lightskyblue' },
    atmosphereAltitude: { default: 0.15 },
    onGlobeReady: {},
    pointsData: { default: [] },
    pointLat: { default: 'lat' },
    pointLng: { default: 'lng' },
    pointColor: { default: () => '#ffffaa' },
    pointAltitude: { default: 0.1 }, // in units of globe radius
    pointRadius: { default: 0.25 }, // in deg
    pointResolution: { default: 12 }, // how many slice segments in the cylinder's circumference
    pointsMerge: { default: false }, // boolean. Whether to merge all points into a single mesh for rendering performance
    pointsTransitionDuration: { default: 1000 }, // ms
    arcsData: { default: [] },
    arcStartLat: { default: 'startLat' },
    arcStartLng: { default: 'startLng' },
    arcEndLat: { default: 'endLat' },
    arcEndLng: { default: 'endLng' },
    arcColor: { default: () => '#ffffaa' },
    arcAltitude: {}, // in units of globe radius
    arcAltitudeAutoScale: { default: 0.5 }, // scale altitude proportional to great-arc distance between the two points
    arcStroke: {}, // in deg
    arcCurveResolution: { default: 64 }, // how many straight segments in the curve
    arcCircularResolution: { default: 6 }, // how many slice segments in the tube's circumference
    arcDashLength: { default: 1 }, // in units of line length
    arcDashGap: { default: 0 },
    arcDashInitialGap: { default: 0 },
    arcDashAnimateTime: { default: 0 }, // ms
    arcsTransitionDuration: { default: 1000 }, // ms
    polygonsData: { default: [] },
    polygonGeoJsonGeometry: { default: 'geometry' },
    polygonSideColor: { default: () => '#ffffaa' },
    polygonSideMaterial: {},
    polygonCapColor: { default: () => '#ffffaa' },
    polygonCapMaterial: {},
    polygonStrokeColor: {},
    polygonAltitude: { default: 0.01 }, // in units of globe radius
    polygonCapCurvatureResolution: { default: 5 },
    polygonsTransitionDuration: { default: 1000 }, // ms
    pathsData: { default: [] },
    pathPoints: { default: pnts => pnts },
    pathPointLat: { default: arr => arr[0] },
    pathPointLng: { default: arr => arr[1] },
    pathPointAlt: { default: 1e-3 },
    pathResolution: { default: 2 }, // in deg
    pathColor: { default: () => '#ffffaa' },
    pathStroke: {}, // in deg
    pathDashLength: { default: 1 }, // in units of line length
    pathDashGap: { default: 0 },
    pathDashInitialGap: { default: 0 },
    pathDashAnimateTime: { default: 0 }, // ms
    pathTransitionDuration: { default: 1000 }, // ms
    hexBinPointsData: { default: [] },
    hexBinPointLat: { default: 'lat' },
    hexBinPointLng: { default: 'lng' },
    hexBinPointWeight: { default: 1 },
    hexBinResolution: { default: 4 }, // 0-15. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons.
    hexMargin: { default: 0.2 }, // in fraction of diameter
    hexTopColor: { default: () => '#ffffaa' },
    hexSideColor: { default: () => '#ffffaa' },
    hexAltitude: { default: ({ sumWeight }) => sumWeight * 0.01 }, // in units of globe radius
    hexTopCurvatureResolution: { default: 5 },
    hexBinMerge: { default: false }, // boolean. Whether to merge all hex geometries into a single mesh for rendering performance
    hexTransitionDuration: { default: 1000 }, // ms
    hexPolygonsData: { default: [] },
    hexPolygonGeoJsonGeometry: { default: 'geometry' },
    hexPolygonColor: { default: () => '#ffffaa' },
    hexPolygonAltitude: { default: 0.001 }, // in units of globe radius
    hexPolygonResolution: { default: 3 }, // 0-15. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons.
    hexPolygonMargin: { default: 0.2 }, // in fraction of hex diameter
    hexPolygonCurvatureResolution: { default: 5 },
    hexPolygonsTransitionDuration: { default: 0 }, // ms
    tilesData: { default: [] },
    tileLat: { default: 'lat' }, // tile centroid
    tileLng: { default: 'lng' },
    tileAltitude: { default: 0.01 }, // in units of globe radius
    tileWidth: { default: 1 }, // in lng degrees
    tileHeight: { default: 1 }, // in lat degrees
    tileUseGlobeProjection: { default: true }, // whether to size tiles relative to the globe coordinate system, or independently
    tileMaterial: {},
    tileCurvatureResolution: { default: 5 }, // in angular degrees
    tilesTransitionDuration: { default: 1000 }, // ms
    ringsData: { default: [] },
    ringLat: { default: 'lat' },
    ringLng: { default: 'lng' },
    ringAltitude: { default: 1.5e-3 },
    ringColor: { default: () => '#ffffaa' }, // single color, array of colors or color interpolation fn
    ringResolution: { default: 64 }, // how many slice segments in each circle's circumference
    ringMaxRadius: { default: 2 }, // degrees
    ringPropagationSpeed: { default: 1 }, // degrees/s
    ringRepeatPeriod: { default: 700 }, // ms
    labelsData: { default: [] },
    labelLat: { default: 'lat' },
    labelLng: { default: 'lng' },
    labelAltitude: { default: 0 }, // in units of globe radius
    labelText: { default: 'text' },
    labelSize: { default: 0.5 }, // text height in deg
    labelTypeFace: {},
    labelColor: { default: () => 'lightgrey' },
    labelRotation: { default: 0 }, // clockwise degrees, relative to the latitute parallel plane
    labelResolution: { default: 3 }, // how many segments in the text's curves
    labelIncludeDot: { default: true },
    labelDotRadius: { default: 0.1 }, // in deg
    labelDotOrientation: { default: () => 'bottom' }, // right, top, bottom
    labelsTransitionDuration: { default: 1000 }, // ms
    customLayerData: { default: [] },
    customThreeObject: {},
    customThreeObjectUpdate: {}
  },

  methods: {
    // pass-through methods
    ...Object.assign({}, ...[
      'globeMaterial',
      'getCoords',
      'toGeoCoords'
    ].map(method => ({
      [method]: function (state, ...args) {
        const aframeComp = state.globe.components.globe;
        const returnVal = aframeComp[method](...args);

        return returnVal === aframeComp
          ? this // chain based on this object, not the inner aframe component
          : returnVal;
      }
    }))),
    _destructor: function() {
      this.pointsData([]);
      this.arcsData([]);
      this.polygonsData([]);
      this.pathsData([]);
      this.hexBinPointsData([]);
      this.hexPolygonsData([]);
      this.tilesData([]);
      this.labelsData([]);
      this.customLayerData([]);
    }
  },

  init(domNode, state, { markerAttrs = { preset: 'hiro' }} = {}) {
    // Wipe DOM
    domNode.innerHTML = '';

    state.container = document.createElement('div');
    domNode.appendChild(state.container);

    // Create scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', 'debugUIEnabled: false;');

    const arMarker = document.createElement('a-marker');
    // add marker attributes
    Object.entries(markerAttrs).forEach(([attr, val]) => arMarker.setAttribute(attr, val));
    scene.appendChild(arMarker);

    // Setup raycaster cursor
    let mouseCursor;
    scene.appendChild(mouseCursor = document.createElement('a-entity'));
    mouseCursor.setAttribute('cursor' /*, 'rayOrigin: mouse'*/); // mouse raycaster has accuracy issues in ar.js: https://github.com/AR-js-org/AR.js/issues/40
    mouseCursor.setAttribute('raycaster', 'objects: [globe]; interval: 100');

    // Add globe entity
    state.globe = document.createElement('a-entity');
    state.globe.setAttribute('globe', null);
    arMarker.appendChild(state.globe);

    const cameraEntity = document.createElement('a-entity');
    cameraEntity.setAttribute('camera', '');
    scene.appendChild(cameraEntity);

    // attach scene
    state.container.appendChild(scene);
    //domNode.appendChild(scene);
  },

  update(state, changedProps) {
    changedProps.hasOwnProperty('width') && state.width && (state.container.style.width = state.width);
    changedProps.hasOwnProperty('height') && state.height && (state.container.style.height = state.height);

    changedProps.hasOwnProperty('globeScale') &&
      state.globe.setAttribute('scale', [...new Array(3)].map(() => 1 / (state.globeScale * GLOBE_RADIUS)).join(' '));

    changedProps.hasOwnProperty('yOffset') &&
    state.globe.setAttribute('position', `0 ${state.yOffset} 0`);

    const passThroughProps = [
      'onHover',
      'onClick',
      'globeImageUrl',
      'bumpImageUrl',
      'showGlobe',
      'showGraticules',
      'showAtmosphere',
      'atmosphereColor',
      'atmosphereAltitude',
      'onGlobeReady',
      'pointsData',
      'pointLat',
      'pointLng',
      'pointColor',
      'pointAltitude',
      'pointRadius',
      'pointResolution',
      'pointsMerge',
      'pointsTransitionDuration',
      'arcsData',
      'arcStartLat',
      'arcStartLng',
      'arcEndLat',
      'arcEndLng',
      'arcColor',
      'arcAltitude',
      'arcAltitudeAutoScale',
      'arcStroke',
      'arcCurveResolution',
      'arcCircularResolution',
      'arcDashLength',
      'arcDashGap',
      'arcDashInitialGap',
      'arcDashAnimateTime',
      'arcsTransitionDuration',
      'polygonsData',
      'polygonGeoJsonGeometry',
      'polygonCapColor',
      'polygonCapMaterial',
      'polygonSideColor',
      'polygonSideMaterial',
      'polygonStrokeColor',
      'polygonAltitude',
      'polygonCapCurvatureResolution',
      'polygonsTransitionDuration',
      'pathsData',
      'pathPoints',
      'pathPointLat',
      'pathPointLng',
      'pathPointAlt',
      'pathResolution',
      'pathColor',
      'pathStroke',
      'pathDashLength',
      'pathDashGap',
      'pathDashInitialGap',
      'pathDashAnimateTime',
      'pathTransitionDuration',
      'hexBinPointsData',
      'hexBinPointLat',
      'hexBinPointLng',
      'hexBinPointWeight',
      'hexBinResolution',
      'hexMargin',
      'hexTopCurvatureResolution',
      'hexTopColor',
      'hexSideColor',
      'hexAltitude',
      'hexBinMerge',
      'hexTransitionDuration',
      'hexPolygonsData',
      'hexPolygonGeoJsonGeometry',
      'hexPolygonColor',
      'hexPolygonAltitude',
      'hexPolygonResolution',
      'hexPolygonMargin',
      'hexPolygonCurvatureResolution',
      'hexPolygonsTransitionDuration',
      'tilesData',
      'tileLat',
      'tileLng',
      'tileAltitude',
      'tileWidth',
      'tileHeight',
      'tileUseGlobeProjection',
      'tileMaterial',
      'tileCurvatureResolution',
      'tilesTransitionDuration',
      'ringsData',
      'ringLat',
      'ringLng',
      'ringAltitude',
      'ringColor',
      'ringResolution',
      'ringMaxRadius',
      'ringPropagationSpeed',
      'ringRepeatPeriod',
      'labelsData',
      'labelLat',
      'labelLng',
      'labelAltitude',
      'labelRotation',
      'labelText',
      'labelSize',
      'labelTypeFace',
      'labelColor',
      'labelResolution',
      'labelIncludeDot',
      'labelDotRadius',
      'labelDotOrientation',
      'labelsTransitionDuration',
      'customLayerData',
      'customThreeObject',
      'customThreeObjectUpdate'
    ];

    const newProps = Object.assign({},
      ...Object.entries(state)
        .filter(([prop, val]) => changedProps.hasOwnProperty(prop) && passThroughProps.indexOf(prop) !== -1 && val !== undefined && val !== null)
        .map(([key, val]) => ({ [key]: val }))
    );

    state.globe.setAttribute('globe', newProps);
  }
});