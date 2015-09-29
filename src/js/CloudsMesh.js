
THREE.CloudsMesh = function(cloudsProperties) {

  THREE.Object3D.call( this );

  this.type = cloudsProperties.type || 'CloudsMesh';
  this.speed = cloudsProperties.speed || 0.1;

  this.geometry   = new THREE.SphereGeometry(cloudsProperties.radius, 100, 100);
  this.material  = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(cloudsProperties.map),
    side: THREE.DoubleSide,
    opacity: cloudsProperties.opacity,
    transparent: cloudsProperties.transparent,
    depthWrite : cloudsProperties.depthWrite,
  });

  this.updateMorphTargets();
};

THREE.CloudsMesh.prototype = Object.create( THREE.Mesh.prototype );
THREE.CloudsMesh.prototype.constructor = THREE.CloudsMesh;

THREE.CloudsMesh.prototype.update = function() {
  // Rotates with the same speed in every direction (degrees).
  this.rotation.x -= this.speed * Math.PI / 180;
  this.rotation.y -= this.speed * Math.PI / 180;
  this.rotation.z -= this.speed * Math.PI / 180;
};
