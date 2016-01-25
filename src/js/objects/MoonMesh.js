/*
 * MoonMesh
 * @Description Mesh to build moons.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.MoonMesh = function(moonProperties) {
  THREE.PlanetMesh.call(this, moonProperties);
};

THREE.MoonMesh.prototype = Object.create( THREE.PlanetMesh.prototype );
THREE.MoonMesh.prototype.constructor = THREE.MoonMesh;
