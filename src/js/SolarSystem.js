
require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  var bodies = {};

  init();

  function init() {
    SceneFactory.init();
    SolarService.getCamera(loadCamera);
    SolarService.getBodies(loadBodies);
    createLights();
  }

  function loadCamera(cameraProperties) {
    var camera = new THREE.SolarCamera(cameraProperties);
    SceneFactory.createCamera(camera);
    SceneFactory.animate();
    SceneFactory.createControls();
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      createBody(bodyProperties);
    });
  }

  function createBody(bodyProperties){
    var body = new THREE.SolarBody(bodyProperties);
    bodies[body.name] = body;

    if(bodyProperties.orbitProperties) {
      var orbit = new THREE.SolarOrbit(bodyProperties.orbitProperties);
      bodies[bodyProperties.orbitProperties.round].addSatellite(orbit, body);
    } else {
      SceneFactory.addObject(body);
    }
  }

  function createLights() {
    var light = new THREE.AmbientLight( 0xFFFFFF);
    SceneFactory.addObject(light);
  }
});
