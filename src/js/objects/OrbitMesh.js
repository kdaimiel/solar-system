/*
 * OrbitMesh.js
 * @Description Mesh to define the orbits of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.OrbitMesh = function(orbitProperties) {

  THREE.SolarBody.call(this, orbitProperties);

  this.type = 'OrbitMesh';
  this.distance = orbitProperties.distance || 50;
  this.speed = orbitProperties.speed || 0;
  this.tilt = orbitProperties.tilt || 0;
};

THREE.OrbitMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.OrbitMesh.prototype.constructor = THREE.OrbitMesh;

THREE.OrbitMesh.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};
