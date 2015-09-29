
THREE.Planet = function(planetProperties) {

  THREE.SolarBody.call(this, planetProperties);

  if(planetProperties.cloudsProperties) {
    this.createClouds(planetProperties.cloudsProperties);
  }

  if(planetProperties.ringsProperties) {
    this.createRings(planetProperties.ringsProperties);
  }
};

THREE.Planet.prototype = Object.create( THREE.SolarBody.prototype );
THREE.Planet.prototype.constructor = THREE.Planet;

THREE.Planet.prototype.createClouds = function(cloudsProperties) {
  this.add(new THREE.Clouds(cloudsProperties));
};

THREE.Planet.prototype.createRings = function(ringsProperties) {
  this.add(new THREE.SolarRings(ringsProperties));
};

THREE.Planet.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};
