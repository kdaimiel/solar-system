/*
 * SolarBody.js
 * @Description Solar abstract object.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.geometry = new THREE.SphereGeometry( 5, 32, 32 );
  this.material = new THREE.MeshBasicMaterial();

  if(bodyProperties) {

    this.name = bodyProperties.name;
    this.type = bodyProperties.type;

    if(bodyProperties.map){
      this.texloader.load(bodyProperties.map, this.loadTexture.bind(this));
    }

    if(bodyProperties.bumpMap) {
      this.texloader.load(bodyProperties.bumpMap, this.loadbumpMap.bind(this));
    }

    if(bodyProperties.specularMap) {
      this.texloader.load(bodyProperties.specularMap, this.loadspecularMap.bind(this));
    }

    this.orbitProperties = bodyProperties.orbitProperties;

    if(bodyProperties.cloudsProperties) {
      this.addClouds(bodyProperties.cloudsProperties);
    }

    if(bodyProperties.ringsProperties) {
      this.addRings(bodyProperties.ringsProperties);
    }
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

THREE.SolarBody.prototype.addSatellite = function(satellite) {
  var orbit = new THREE.OrbitMesh(satellite.orbitProperties);
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
