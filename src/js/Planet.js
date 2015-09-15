
THREE.Planet = function(planetProperties) {

  THREE.Object3D.call( this );

  this.name = planetProperties.name;
  this.type = 'Planet';
  this.category = planetProperties.category;
  this.radius = planetProperties.radius || 50;
  this.vRotation = planetProperties.vRotation || 0;
  this.URLTexture = planetProperties.URLTexture;
  this.tilt = planetProperties.tilt || 0;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  planetProperties.textureProperties.name = this.name; // TEMPORAL

  this.material = createMaterial(planetProperties.textureProperties);

  this.rotation.x = this.tilt;

  if(planetProperties.cloudsProperties) {
    this.createClouds(planetProperties.cloudsProperties);
  }

  if(planetProperties.ringsProperties) {
    this.createRings(planetProperties.ringsProperties);
  }

  this.updateMorphTargets();

  function createMaterial(textureProperties) {
    var material  = new THREE.MeshPhongMaterial();

    material.map    = THREE.ImageUtils.loadTexture(textureProperties.map);
    material.bumpMap = textureProperties.bumpMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.bumpMap) : undefined;
    material.bumpScale = 0.05;
    material.specularMap    = textureProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.specularMap) : undefined;
    material.specular  = new THREE.Color('grey');
    return material;
  }

};

THREE.Planet.prototype = Object.create( THREE.Mesh.prototype );
THREE.Planet.prototype.constructor = THREE.Planet;

THREE.Planet.prototype.createClouds = function(cloudsProperties) {

  cloudsProperties.radius = cloudsProperties.radius || this.radius + 10;

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

THREE.Planet.prototype.createRings = function(ringsProperties) {
  var rings = new THREE.Rings(ringsProperties);
  this.add(rings);
};

THREE.Planet.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};
