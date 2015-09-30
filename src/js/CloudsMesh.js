
THREE.CloudsMesh = function(cloudsProperties) {

  THREE.Object3D.call( this );

  this.speed = cloudsProperties.speed || 0.20; // The max speed of the clouds rotation

  this.type = cloudsProperties.type || 'CloudsMesh';
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
  // Clouds rote in every direction to random speed between 0.0 and the speed (degrees).
  this.rotation.x -= THREE.Math.randFloat( 0.00, this.speed ) * Math.PI / 180;
  this.rotation.y -= THREE.Math.randFloat( 0.00, this.speed ) * Math.PI / 180;
};
