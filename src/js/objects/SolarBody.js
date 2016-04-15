/*
 * SolarBody.js
 * @Description Solar abstract object.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || null,
    map: arguments[2] || null,
    bumpMap: arguments[3] || null,
    specularMap: arguments[4] || null,
    orbitProperties: arguments[5] || null,
    cloudsProperties: arguments[6] || null,
    ringsProperties: arguments[7] || null
  }, bodyProperties);

  this.name = this.properties.name;
  this.type = this.properties.type;

  this.geometry = new THREE.SphereGeometry( 5, 32, 32 );
  //this.geometry = new THREE.Geometry();
  this.material = new THREE.MeshBasicMaterial();

  if(this.properties.map){
    this.texloader.load(this.properties.map, this.loadTexture.bind(this));
  }

  if(this.properties.bumpMap) {
    this.texloader.load(this.properties.bumpMap, this.loadbumpMap.bind(this));
  }

  if(this.properties.specularMap) {
    this.texloader.load(this.properties.specularMap, this.loadspecularMap.bind(this));
  }

  if(this.properties.orbitProperties){
    this.orbitProperties = this.properties.orbitProperties;
  }

  if(this.properties.cloudsProperties) {
    this.addClouds(this.properties.cloudsProperties);
  }

  if(this.properties.ringsProperties) {
    this.addRings(this.properties.ringsProperties);
  }

  this.drawMode = THREE.TrianglesDrawMode;

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
    // To ensure that the orbit is inside the scene SolarObject has to be added to the scene
    if(this.parent) {
      this.parent.add(orbit);
    }
  }
  orbit.add(satellite);
  satellite.position.z = this.radius + orbit.distance + satellite.radius || 0;
};

THREE.SolarBody.prototype.loadTexture = function (map){
  this.material  = new THREE.MeshPhongMaterial({
    map: map,
    side: THREE.DoubleSide
  });
};

THREE.SolarBody.prototype.loadbumpMap = function(bumpMap) {
  this.material.bumpMap = bumpMap;
};

THREE.SolarBody.prototype.loadspecularMap = function(specularMap) {
  this.material.specularMap = specularMap;
};

THREE.SolarBody.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};

THREE.SolarBody.prototype.texloader = new THREE.TextureLoader();
