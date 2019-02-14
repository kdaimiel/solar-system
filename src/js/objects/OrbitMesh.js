/*
 * OrbitMesh.js
 * @Description Mesh to define the orbits of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.OrbitMesh = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.name = orbitProperties && orbitProperties.name;
  this.type = orbitProperties && orbitProperties.type || 'OrbitMesh';
  this.distance = orbitProperties && orbitProperties.distance || 50;
  this.speed = orbitProperties && orbitProperties.speed || 0;
  this.tilt = orbitProperties && orbitProperties.tilt || 0;
};

THREE.OrbitMesh.prototype = Object.create( THREE.Object3D.prototype );
THREE.OrbitMesh.prototype.constructor = THREE.OrbitMesh;

THREE.OrbitMesh.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};
