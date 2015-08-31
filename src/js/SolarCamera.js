
THREE.SolarCamera = function(cameraProperties) {

  THREE.PerspectiveCamera.call( this );

  this.type = 'SolarCamera';

  this.zoom = cameraProperties.zoom !== undefined ? cameraProperties.zoom : 1;

  this.fov = cameraProperties.fov !== undefined ? cameraProperties.fov : 50;
  this.aspect = cameraProperties.aspect !== undefined ? cameraProperties.aspect : window.innerWidth / window.innerHeight;
  this.near = cameraProperties.near !== undefined ? cameraProperties.near : 0.1;
  this.far = cameraProperties.far !== undefined ? cameraProperties.far : 2000;
  this.position.x = cameraProperties.position.x !== undefined ? cameraProperties.position.x : 0;
  this.position.y = cameraProperties.position.y !== undefined ? cameraProperties.position.y : 0;
  this.position.z = cameraProperties.position.z !== undefined ? cameraProperties.position.z : 0;

  this.updateProjectionMatrix();

};

THREE.SolarCamera.prototype = Object.create( THREE.PerspectiveCamera.prototype);
THREE.SolarCamera.prototype.constructor = THREE.PerspectiveCamera;
