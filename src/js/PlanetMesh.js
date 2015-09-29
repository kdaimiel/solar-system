
THREE.PlanetMesh = function(planetProperties) {
  THREE.SolarBody.call(this, planetProperties);

  this.radius = planetProperties.radius || 50;
  this.rotation.x = planetProperties.tilt || 0;
  this.vRotation = planetProperties.vRotation || 0;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);
  this.material  = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(planetProperties.map),
    side: THREE.DoubleSide
  });
  this.material.bumpMap = planetProperties.bumpMap !== undefined ? THREE.ImageUtils.loadTexture(planetProperties.bumpMap) : undefined;
  this.material.specularMap  = planetProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(planetProperties.specularMap) : undefined;

  this.updateMorphTargets();
};

THREE.PlanetMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.PlanetMesh.prototype.constructor = THREE.PlanetMesh;

THREE.PlanetMesh.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};
