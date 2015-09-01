

THREE.SolarOrbit = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.name = orbitProperties.name;
  this.type = 'SolarOrbit';
  this.radius = orbitProperties.radius || 50;
  this.speed = orbitProperties.speed || 0;
  this.tilt = orbitProperties.tilt || 0;

  //this.updateMorphTargets();
};

THREE.SolarOrbit.prototype = Object.create( THREE.Object3D.prototype );
THREE.SolarOrbit.prototype.constructor = THREE.SolarOrbit;

THREE.SolarOrbit.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  45 degrees per frame;
};
