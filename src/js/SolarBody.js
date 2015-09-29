
THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.name = bodyProperties.name;
  this.type = bodyProperties.type;

  this.radius = bodyProperties.radius || 50;
  this.rotation.x = bodyProperties.tilt || 0;
  this.vRotation = bodyProperties.vRotation || 0;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);
  this.material  = new THREE.MeshPhongMaterial();
  this.material.map  = THREE.ImageUtils.loadTexture(bodyProperties.map);
  this.material.bumpMap = bodyProperties.bumpMap !== undefined ? THREE.ImageUtils.loadTexture(bodyProperties.bumpMap) : undefined;
  this.material.specularMap  = bodyProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(bodyProperties.specularMap) : undefined;

  this.updateMorphTargets();
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.addSatellite = function(satellite, orbitProperties) {
  var orbit = new THREE.SolarOrbit(orbitProperties);
  satellite.orbit = orbit;

  if(this.orbit){
    this.orbit.add(orbit);
    orbit.position.z = this.position.z || 0;
  } else {
    this.parent.add(orbit);
  }
  orbit.add(satellite);
  satellite.position.z = this.radius + orbit.distance + satellite.radius || 0;
};
