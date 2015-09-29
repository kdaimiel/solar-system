
THREE.Clouds = function(cloudsProperties) {

  THREE.Object3D.call( this );

  this.type = cloudsProperties.type || 'Clouds';

  this.rotation.x = this.tilt;

  this.geometry   = new THREE.SphereGeometry(cloudsProperties.radius, 100, 100);
  var texture = THREE.ImageUtils.loadTexture(cloudsProperties.map);
  this.material  = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    opacity: cloudsProperties.opacity,
    transparent: cloudsProperties.transparent,
    depthWrite : cloudsProperties.depthWrite,
  });

  this.updateMorphTargets();
};

THREE.Clouds.prototype = Object.create( THREE.Mesh.prototype );
THREE.Clouds.prototype.constructor = THREE.Clouds;

THREE.Clouds.prototype.update = function() {
  // Rotates with the same speed in every direction (degrees).
  this.rotation.x -= this.speed * Math.PI / 180;
  this.rotation.y -= this.speed * Math.PI / 180;
  this.rotation.z -= this.speed * Math.PI / 180;
};
