
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
    SolarService.getLights(loadLights);
  }

  function loadCamera(cameraProperties) {
    cameraProperties.aspect = cameraProperties.aspect !== undefined ? cameraProperties.aspect : window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(cameraProperties.fov, cameraProperties.aspect, cameraProperties.near, cameraProperties.far);
    camera.zoom = cameraProperties.zoom !== undefined ? cameraProperties.zoom : 1;
    camera.position.x = cameraProperties.position.x !== undefined ? cameraProperties.position.x : 0;
    camera.position.y = cameraProperties.position.y !== undefined ? cameraProperties.position.y : 0;
    camera.position.z = cameraProperties.position.z !== undefined ? cameraProperties.position.z : 0;
    SceneFactory.setCamera(camera);
    SceneFactory.animate();
    var controls = new THREE.TrackballControls(camera);
    SceneFactory.setControls(controls);
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      createBody(bodyProperties);
    });
  }

  function loadLights(lightsProperties) {
    lightsProperties.forEach(function(lightProperties) {
      createLight(lightProperties);
    });
  }


  function createBody(bodyProperties){
    var body;
    switch(bodyProperties.type) {
    case 'Star':
      body = new THREE.Star(bodyProperties);
      break;
    case 'Planet':
      body = new THREE.Planet(bodyProperties);
      break;
    case 'Dwarf Planet':
      body = new THREE.Planet(bodyProperties);
      break;
    case 'Moon':
      body = new THREE.Planet(bodyProperties);
      break;
    default:
      console.error(bodyProperties.type + ' is not considered a kind of solar body');
      return;
    }

    bodies[body.name] = body;
    if(bodyProperties.orbitProperties) {
      bodies[bodyProperties.orbitProperties.round].addSatellite(body, bodyProperties.orbitProperties);
    } else {
      SceneFactory.addObject(body);
    }
  }

  function createLight(lightProperties) {
    var light;
    switch(lightProperties.type) {
    case 'Ambient Light':
      light = new THREE.AmbientLight( lightProperties.hexColor || 0x444444);
      break;
    case 'Directional Light':
      light = new THREE.DirectionalLight( lightProperties.hexColor || 0xffffff, lightProperties.intensity || 0.5);
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      break;
    case 'Point Light':
      light = new THREE.DirectionalLight( lightProperties.hexColor || 0xffffff);
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      break;
    case 'Spot Light':
      light = new THREE.DirectionalLight( lightProperties.hexColor || 0xffffff);
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      break;
    default:
      console.error(lightProperties.type + ' is not a kind of light validated');
      return;
    }
    SceneFactory.addObject(light);

    //var light = new THREE.PointLight( 0xFFFFFF, 0.8);
    //light.position.set( 0, 0, 0 );

    //var spotLight = new THREE.SpotLight( 0xffffff );
    //spotLight.position.set( 0, 0, 0 );
    //spotLight.add(bodies["Sun"]);

    /*spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;*/

    //SceneFactory.addObject(spotLight );
  }
});
