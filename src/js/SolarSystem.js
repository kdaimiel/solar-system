
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

  function createBody(bodyProperties){
    var body = new THREE.SolarBody(bodyProperties);
    bodies[body.name] = body;

    if(bodyProperties.orbitProperties) {
      bodies[bodyProperties.orbitProperties.round].addSatellite(body, bodyProperties.orbitProperties);
    } else {
    var spotLight = new THREE.PointLight( 0xffffff, 1 );
    //spotLight.position.set( 0, 0, 0 );
    spotLight.add(body);

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;

    SceneFactory.addObject(spotLight );
    //SceneFactory.addObject(body);
    }
  }

  function createLights() {
    var light = new THREE.AmbientLight( 0x444444);
    SceneFactory.addObject(light);

    //var light = new THREE.DirectionalLight( 0xffffff, 2 );
    //light.position.set( 0, 0, 1 );

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
