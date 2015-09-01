

THREE.SolarObject = function(objectProperties) {

  THREE.Object3D.call( this );

  this.name = objectProperties.name;
  this.type = 'SolarObject';
  this.category = objectProperties.category;
  this.radius = objectProperties.radius || 50;
  this.vRotation = objectProperties.vRotation || 0;
  this.URLTexture = objectProperties.URLTexture;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(this.URLTexture);
  this.material = new THREE.MeshBasicMaterial({ map: texture });

  this.rotation.x = this.tilt || 0;

  this.updateMorphTargets();
};

THREE.SolarObject.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarObject.prototype.constructor = THREE.SolarObject;

THREE.SolarObject.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180 ;     // Rotates  45 degrees per frame;
};

