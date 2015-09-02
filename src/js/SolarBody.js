
THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.name = bodyProperties.name;
  this.type = 'SolarBody';
  this.category = bodyProperties.category;
  this.radius = bodyProperties.radius || 50;
  this.vRotation = bodyProperties.vRotation || 0;
  this.URLTexture = bodyProperties.URLTexture;
  this.tilt = bodyProperties.tilt || 0;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(this.URLTexture);
  this.material = new THREE.MeshBasicMaterial({ map: texture });

  this.rotation.x = this.tilt;

  if(bodyProperties.ringsProperties) {
    this.createRings(bodyProperties.ringsProperties);
  }

  this.updateMorphTargets();
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );

THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.createRings = function(ringsProperties) {
  var solarRings = new THREE.SolarRings(ringsProperties);
  this.add(solarRings);
};


THREE.SolarBody.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
};
