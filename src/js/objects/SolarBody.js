
THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.name = bodyProperties.name;
  this.type = bodyProperties.type;

  this.geometry = new THREE.Geometry();
  this.material = new THREE.MeshBasicMaterial();

  if(bodyProperties.cloudsProperties) {
    this.addClouds(bodyProperties.cloudsProperties);
  }

  if(bodyProperties.ringsProperties) {
    this.addRings(bodyProperties.ringsProperties);
  }

  this.updateMorphTargets();
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.addClouds = function(cloudsProperties) {
  this.add(new THREE.CloudsMesh(cloudsProperties));
};

THREE.SolarBody.prototype.addRings = function(ringsProperties) {
  this.add(new THREE.RingsMesh(ringsProperties));
};

THREE.SolarBody.prototype.addSatellite = function(satellite, orbitProperties) {
  var orbit = new THREE.OrbitMesh(orbitProperties);
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

//Mirar
THREE.SolarBody.prototype.loadMap = function(material, materialProperties) {
  material  = new THREE.MeshPhongMaterial({
    map: materialProperties.map,
    side: THREE.DoubleSide,
    opacity: materialProperties.opacity,
    transparent: materialProperties.transparent,
    depthWrite : materialProperties.depthWrite,
  });
};
