

THREE.SolarObject = function(systemProperties) {

  THREE.Object3D.call( this );

  this.satellites = [];

  this.name = systemProperties.name;
  this.type = 'SolarObject';
  this.category = systemProperties.category;
  this.radius = systemProperties.radius || 50;
  this.vRotation = systemProperties.vRotation || 0;
  this.vTranslation = systemProperties.vTranslation || 0;
  this.tilt = systemProperties.tilt;
  this.distance = systemProperties.distance;
  this.URLTexture = systemProperties.URLTexture;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(this.URLTexture);
  this.material = new THREE.MeshBasicMaterial({ map: texture });

  this.position.z = systemProperties.distance || 0;
  this.rotation.x = this.tilt || 0;

  for(var i in systemProperties.satellites) {
    this.add(new THREE.SolarObject(systemProperties.satellites[i]));
  }

  this.updateMorphTargets();
};

THREE.SolarObject.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarObject.prototype.constructor = THREE.SolarObject;

THREE.SolarObject.prototype.addSatellite = function(satellite) {
  this.satellites.push(satellite);
};

THREE.SolarObject.prototype.createOrbit = function(position){
  this.parent = new THREE.Object3D();
  this.parent.position = position;
  this.parent.add(this);
  this.position.z = position.z + this.orbitDistance;
};

THREE.SolarObject.prototype.update = function() {
  this.rotation.y += this.vRotation * Math.PI / 180 ;     // Rotates  45 degrees per frame;

  // Update the new position of the orbit of the satellites.
  for(var i in this.satellites){
    this.satellites[i].updateOrbit(this.position);
  }
};

THREE.SolarObject.prototype.updateOrbit = function(position){
  this.parent.position = position;
  this.parent.position.y = this.parent.rotation.y;
  this.parent.rotation.y += this.vTranslation * Math.PI / 180  || 0;

  if(this.orbit === 'Earth') {
    console.log(position);
    console.log(this.parent.rotation.y);
    console.log(this.position.z + ' - ' + this.parent.position.z + ' - ' + position.z );
  }
};
