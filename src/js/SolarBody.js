
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
  bodyProperties.textureProperties.name = this.name; // TEMPORAL

  this.material = createMaterial(bodyProperties.textureProperties);

  this.rotation.x = this.tilt;

  if(bodyProperties.cloudsProperties) {
    console.log('AAAAAAAAAAAAA');
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
    //material.bumpScale = 0.05;
    material.specularMap    = textureProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.specularMap) : undefined;
    //material.specular  = new THREE.Color('grey');

    return material;
  }

};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.createClouds = function(cloudsProperties) {
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
  this.add(cloudMesh);
};

THREE.SolarBody.prototype.createRings = function(ringsProperties) {
  var solarRings = new THREE.SolarRings(ringsProperties);
  this.add(solarRings);
};


THREE.SolarBody.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
};
