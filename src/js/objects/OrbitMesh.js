/*
 * OrbitMesh.js
 * @Description Mesh to define the orbits of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.OrbitMesh = function(orbitProperties) {

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || 'OrbitMesh',
    distance: arguments[2] || 50,
    speed: arguments[3] || 0,
    tilt: arguments[4] || 0
  }, orbitProperties);

  THREE.Object3D.call( this );

  this.name = this.properties.name;
  this.type = this.properties.type;
  this.distance = this.properties.distance;
  this.speed = this.properties.speed;
  this.tilt = this.properties.tilt;
};

THREE.OrbitMesh.prototype = Object.create( THREE.Object3D.prototype );
THREE.OrbitMesh.prototype.constructor = THREE.OrbitMesh;

THREE.OrbitMesh.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};
