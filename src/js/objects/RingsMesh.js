
THREE.RingsMesh = function(ringsProperties) {

  THREE.Mesh.call( this );

  this.type = 'RingsMesh';
  this.rotation.x = (90 - (ringsProperties.tilt || 0)) * Math.PI / 180;
  this.vRotation = ringsProperties.vRotation || 0;

  var texloader = new THREE.TextureLoader();
  texloader.load(ringsProperties.map, loadTexture.bind(this));
  function loadTexture(map) {
    this.geometry = new THREE.RingsGeometry(ringsProperties);
    this.material = new THREE.MeshPhongMaterial({
      map: map,
      side: THREE.DoubleSide
    });
  }
};

THREE.RingsMesh.prototype = Object.create( THREE.Mesh.prototype );
THREE.RingsMesh.prototype.constructor = THREE.RingsMesh;

THREE.RingsMesh.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates N degrees per frame;
};
