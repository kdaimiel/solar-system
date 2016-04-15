/*
 * scene-factory.js
 * @Description Scene Factory creates scene objects
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('scene-factory', function() {

  'use strict';

  var factory = {
    createCamera: createCamera,
    createControls: createControls,
    createLight: createLight
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
      throw new TypeError(cameraProperties.type + ' is not a kind of valid camera');
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
      throw new TypeError(controlsType + ' is not a kind of valid camera controls');
    }
    return controls;
  }

  function createLight(lightProperties) {

    var light;

    var color = new THREE.Color(lightProperties.hexColor) || 0xffffff;
    switch(lightProperties.type) {
    case 'AmbientLight':
      light = new THREE.AmbientLight(color);
      break;
    case 'DirectionalLight':
      light = new THREE.DirectionalLight(color, lightProperties.intensity || 0.5);
      break;
    case 'HemisphereLight':
      light = new THREE.HemisphereLight(lightProperties.skyColor || 0xffffbb, lightProperties.groundColor || 0x080820, lightProperties.intensity || 1.0);
      break;
    case 'PointLight':
      light = new THREE.PointLight(color, lightProperties.intensity || 1.0, lightProperties.distance || 0.0, lightProperties.decay || 1.0);
      break;
    case 'SpotLight':
      light = new THREE.SpotLight(color, lightProperties.intensity || 1.0, lightProperties.distance || 0.0, lightProperties.angle || Math.PI/3, lightProperties.exponent || 10.0, lightProperties.decay || 1);
      light.castShadow = lightProperties.castShadow || false;
      light.shadow.camera.near = lightProperties.shadowCameraNear || 50;
      light.shadow.camera.far = lightProperties.shadowCameraFar || 5000;
      light.shadow.camera.left = lightProperties.shadowCameraLeft || -500;
      light.shadow.camera.right = lightProperties.shadowCameraRight || 500;
      light.shadow.camera.top = lightProperties.shadowCameraTop || 500;
      light.shadow.camera.bottom = lightProperties.shadowCameraBottom || -500;
      if(lightProperties.shadowCameraVisible) {
        THREE.CameraHelper(light.shadow.camera);
      }
      light.shadow.bias = lightProperties.shadowBias || 0;
      light.shadow.mapSize.width = lightProperties.shadowMapWidth || 512;
      light.shadow.mapSize.height = lightProperties.shadowMapHeight || 512;
      light.shadowMapSize = lightProperties.shadowMapSize;
      light.shadowCamera = lightProperties.shadowCamera;
      light.shadowMatrix = lightProperties.shadowMatrix;
      light.shadowMap = lightProperties.shadowMap;
      break;
    default:
      throw new TypeError(lightProperties.type + ' is not a kind of valid light');
    }

    if(lightProperties.position) {
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
    }

    return light;
  }

});
