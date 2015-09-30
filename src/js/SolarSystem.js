
require([
  'scene-builder',
  'scene-factory',
  'solar-service'
], function three(SceneBuilder, SceneFactory, SolarService) {

  var bodies = {};

  init();

  function init() {
    SceneBuilder.init();
    SolarService.getCamera(loadCamera);
    SolarService.getBodies(loadBodies);
    SolarService.getLights(loadLights);
  }

  function createBody(bodyProperties){
    var body;
    switch(bodyProperties.type) {
    case 'Star':
      body = new THREE.StarMesh(bodyProperties);
      break;
    case 'Planet':
      body = new THREE.PlanetMesh(bodyProperties);
      break;
    case 'Dwarf Planet':
      body = new THREE.PlanetMesh(bodyProperties);
      break;
    case 'Moon':
      body = new THREE.PlanetMesh(bodyProperties);
      break;
    default:
      console.error(bodyProperties.type + ' is not considered a kind of solar body');
      return;
    }

    bodies[body.name] = body;
    if(bodyProperties.orbitProperties) {
      bodies[bodyProperties.orbitProperties.round].addSatellite(body, bodyProperties.orbitProperties);
    } else {
      SceneBuilder.addObject(body);
    }
  }

  function loadCamera(cameraProperties) {
    var camera = SceneFactory.createCamera(cameraProperties);
    SceneBuilder.setCamera(camera);

    var controls = SceneFactory.createControls(camera, cameraProperties.controls);
    SceneBuilder.setControls(controls);
    SceneBuilder.animate();
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      createBody(bodyProperties);
    });
  }

  function loadLights(lightsProperties) {
    lightsProperties.forEach(function(lightProperties) {
      var light = SceneFactory.createLight(lightProperties);
      SceneBuilder.addObject(light);
    });
  }

});
