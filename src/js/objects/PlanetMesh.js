/*
 * PlanetMesh.js
 * @Description Mesh to build planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.PlanetMesh = function(planetProperties) {

  THREE.SolarBody.call(this, planetProperties);

  this.type = planetProperties && planetProperties.type || 'PlanetMesh';
  this.radius = planetProperties && planetProperties.radius || 50;
  this.rotation.x = planetProperties && planetProperties.tilt || 0;
  this.vRotation = planetProperties && planetProperties.vRotation || 0;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);
};

THREE.PlanetMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.PlanetMesh.prototype.constructor = THREE.PlanetMesh;
