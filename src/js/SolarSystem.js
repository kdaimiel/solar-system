
require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  var bodies = {};
  var orbits = {};

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

    if(!bodyProperties.orbitProperties) {
      SceneFactory.addObject(body);
      return;
    }

    var orbitProperties = bodyProperties.orbitProperties;
    orbitProperties.name = body.name;
    var orbit = new THREE.SolarOrbit(orbitProperties);

    var parentOrbit = orbits[orbitProperties.round] ? orbits[orbitProperties.round] : undefined;

    if(parentOrbit) {
      orbit.position.z = bodies[parentOrbit.name].position.z || 0;
      parentOrbit.add(orbit);
    } else {
      SceneFactory.addObject(orbit);
    }

    orbits[orbitProperties.name] = orbit;

    body.position.z = bodies[orbitProperties.round].radius + orbit.distance + body.radius || 0;
    orbit.add(body);
  }

  function createLights() {
    var light = new THREE.AmbientLight( 0xFFFFFF);
    SceneFactory.addObject(light);
  }
});
