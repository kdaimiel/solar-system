
THREE.PlanetMesh = function(planetProperties) {
  THREE.SolarBody.call(this, planetProperties);

  this.radius = planetProperties.radius || 50;
  this.rotation.x = planetProperties.tilt || 0;
  this.vRotation = planetProperties.vRotation || 0;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);

  var texloader = new THREE.TextureLoader();
  texloader.load(planetProperties.map, loadTexture.bind(this));

  function loadTexture(map){
    this.material  = new THREE.MeshPhongMaterial({
      map: map,
      side: THREE.DoubleSide
    });

    if(planetProperties.bumpMap) {
      texloader.load(planetProperties.bumpMap, loadbumpMap.bind(this));
    }

    if(planetProperties.specularMap) {
      texloader.load(planetProperties.specularMap, loadspecularMap.bind(this));
    }
  }

  function loadbumpMap(bumpMap) {
    this.material.bumpMap = bumpMap;
  }

  function loadspecularMap(specularMap) {
    this.material.specularMap = specularMap;
  }

};

THREE.PlanetMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.PlanetMesh.prototype.constructor = THREE.PlanetMesh;

THREE.PlanetMesh.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};
