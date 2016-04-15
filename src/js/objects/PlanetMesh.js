/*
 * PlanetMesh.js
 * @Description Mesh to build planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.PlanetMesh = function(planetProperties) {

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || 'PlanetMesh',
    radius: arguments[2] || 50,
    tilt: arguments[3] || 0,
    vRotation: arguments[4] || 0,

  }, planetProperties);

  THREE.SolarBody.call(this, this.properties);

  this.radius = this.properties.radius;
  this.rotation.x = this.properties.tilt;
  this.vRotation = this.properties.vRotation;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);
};

THREE.PlanetMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.PlanetMesh.prototype.constructor = THREE.PlanetMesh;
