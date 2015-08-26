
define('scene-factory', function() {

  'use strict';

  var factory = {
    createCamera: createCamera,
    createMesh: createMesh
  };

  return factory;

  function createCamera(cameraProps) {
    var camera = new THREE.PerspectiveCamera(cameraProps.fov, window.innerWidth / window.innerHeight, cameraProps.near, cameraProps.far);
    camera.position.x = cameraProps.position.x;
    camera.position.y = cameraProps.position.y;
    camera.position.z = cameraProps.position.z;
    return camera;
  }

  function createMesh(solarObject){
    var geometry = new THREE.SphereGeometry(solarObject.radius, 50, 50);
    var texture = THREE.ImageUtils.loadTexture(solarObject.textureUrl);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = solarObject.distance || 0;
    return mesh;
  }

});
