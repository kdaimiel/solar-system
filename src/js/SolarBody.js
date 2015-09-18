
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
  this.material = createMaterial(bodyProperties.textureProperties);

  this.rotation.x = this.tilt;

  if(bodyProperties.cloudsProperties) {
    this.createClouds(bodyProperties.cloudsProperties);
  }

  if(bodyProperties.ringsProperties) {
    this.createRings(bodyProperties.ringsProperties);
  }

  this.updateMorphTargets();

  function createMaterial(textureProperties) {
    var material  = new THREE.MeshPhongMaterial();
    material.map    = THREE.ImageUtils.loadTexture(textureProperties.map);
    material.bumpMap = textureProperties.bumpMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.bumpMap) : undefined;
    material.specularMap    = textureProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.specularMap) : undefined;
    material.reflectivity = 1;
    return material;
  }
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.createClouds = function(cloudsProperties) {

  cloudsProperties.radius = cloudsProperties.radius || this.radius + 100;

  var geometry   = new THREE.SphereGeometry(cloudsProperties.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(cloudsProperties.map);
  var material  = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    opacity: cloudsProperties.opacity,
    transparent: cloudsProperties.transparent,
    depthWrite : cloudsProperties.depthWrite,
  });

  var cloudMesh = new THREE.Mesh(geometry, material);
  cloudMesh.rotation.x = this.tilt;
  cloudMesh.update = function () {
    this.rotation.x -= cloudsProperties.speed * Math.PI / 180;     // Rotates  N degrees per frame;
    this.rotation.y -= cloudsProperties.speed * Math.PI / 180;     // Rotates  N degrees per frame;
    this.rotation.z -= cloudsProperties.speed * Math.PI / 180;     // Rotates  N degrees per frame;
  };
  this.add(cloudMesh);
};

THREE.SolarBody.prototype.createRings = function(ringsProperties) {
  var rings = new THREE.SolarRings(ringsProperties);
  this.add(rings);
};

THREE.SolarBody.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};

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
