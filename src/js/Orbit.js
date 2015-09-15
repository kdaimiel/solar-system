

THREE.Orbit = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.name = orbitProperties.name;
  this.type = 'Orbit';
  this.radius = orbitProperties.radius || 50;
  this.speed = orbitProperties.speed || 0;
  this.tilt = orbitProperties.tilt || 0;
};

THREE.Orbit.prototype = Object.create( THREE.Object3D.prototype );
THREE.Orbit.prototype.constructor = THREE.Orbit;

THREE.Orbit.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};
