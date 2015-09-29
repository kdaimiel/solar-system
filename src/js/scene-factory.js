
define('scene-factory', function() {

  'use strict';

  var factory = {
    createCamera: createCamera,
    createControls: createControls,
    createLight : createLight
  };

  return factory;

  function createCamera(cameraProperties) {
    var camera;
    cameraProperties.aspect = cameraProperties.aspect || window.innerWidth / window.innerHeight;
    switch(cameraProperties.type) {
    case 'PerspectiveCamera':
      camera = new THREE.PerspectiveCamera(cameraProperties.fov, cameraProperties.aspect, cameraProperties.near, cameraProperties.far);
      break;
    case 'CubeCamera':
      camera = new THREE.CubeCamera(cameraProperties.near, cameraProperties.far , cameraProperties.cubeResolution);
      break;
    case 'OrthographicCamera':
      camera = new THREE.OrthographicCamera(cameraProperties.left, cameraProperties.right , cameraProperties.top,  cameraProperties.bottom, cameraProperties.near, cameraProperties.far);
      break;
    default:
      console.error(cameraProperties.type + ' is not a kind of valid camera');
      return;
    }

    if(cameraProperties.position) {
      camera.position.x = cameraProperties.position.x || 0;
      camera.position.y = cameraProperties.position.y || 0;
      camera.position.z = cameraProperties.position.z || 0;
    }

    camera.zoom = cameraProperties.zoom || 1;

    return camera;
  }

  function createControls(camera, controlsType) {
    var controls;
    switch(controlsType) {
    case 'TrackballControls':
      controls = new THREE.TrackballControls(camera);
      break;
    case 'DeviceOrientationControls':
      controls = new THREE.DeviceOrientationControls( camera );
      break;
    case 'FlyControls':
      controls = new THREE.FlyControls( camera );
      break;
    case 'OrbitControls':
      controls = new THREE.OrbitControls( camera );
      break;
    case 'PointerLockControls':
      controls = new THREE.PointerLockControls( camera );
      break;
    case 'TransformControls':
      controls = new THREE.TransformControls( camera );
      break;
    default:
      console.error(controlsType + ' is not a kind of valid camera controls');
      return;
    }
    return controls;
  }

  function createLight(lightProperties) {

    var color = new THREE.Color(lightProperties.hexColor) || 0xffffff;
    var light;
    switch(lightProperties.type) {
    case 'AmbientLight':
      light = new THREE.AmbientLight( color);
      break;
    case 'DirectionalLight':
      light = new THREE.DirectionalLight( color, lightProperties.intensity || 0.5);
      break;
    case 'PointLight':
      light = new THREE.PointLight( color, lightProperties.intensity || 1.0, lightProperties.distance || 0.0, lightProperties.decay || 1);
      break;
    case 'SpotLight':
      light = new THREE.SpotLight( color, lightProperties.intensity || 1.0, lightProperties.distance || 0.0, lightProperties.angle || Math.PI/3, lightProperties.exponent || 10.0, lightProperties.decay || 1);
      break;
    default:
      console.error(lightProperties.type + ' is not a kind of valid light');
      return;
    }

    if(lightProperties.position) {
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
    }

    light.onlyShadow = lightProperties.onlyShadow || false;
    light.castShadow = lightProperties.castShadow || false;
    light.shadowCameraNear = lightProperties.shadowCameraNear || 50;
    light.shadowCameraFar = lightProperties.shadowCameraFar || 5000;
    light.shadowCameraLeft = lightProperties.shadowCameraLeft || -500;
    light.shadowCameraRight = lightProperties.shadowCameraRight || 500;
    light.shadowCameraTop = lightProperties.shadowCameraTop || 500;
    light.shadowCameraBottom = lightProperties.shadowCameraBottom || -500;
    light.shadowCameraVisible = lightProperties.shadowCameraVisible || false;
    light.shadowBias = lightProperties.shadowBias || 0;
    light.shadowDarkness = lightProperties.shadowDarkness || 0.5;
    light.shadowMapWidth = lightProperties.shadowMapWidth || 512;
    light.shadowMapWidth = lightProperties.shadowMapHeight || 512;
    light.shadowMapSize = lightProperties.shadowMapSize;
    light.shadowCamera = lightProperties.shadowCamera;
    light.shadowMatrix = lightProperties.shadowMatrix;
    light.shadowMap = lightProperties.shadowMap;

    return light;
  }

});
