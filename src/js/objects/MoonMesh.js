/*
 * MoonMesh.js
 * @Description Mesh to build moons.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.MoonMesh = function(moonProperties) {

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || 'MoonMesh',
    radius: arguments[2] || 50,
    tilt: arguments[3] || 0,
    vRotation: arguments[4] || 0,
    map: arguments[5] || null,
    bumpMap: arguments[6] || null,
    specularMap: arguments[7] || null,
    orbitProperties: arguments[8] || null,
    cloudsProperties: arguments[9] || null,
    ringsProperties: arguments[10] || null
  }, moonProperties);

  THREE.PlanetMesh.call(this, this.properties);
};

THREE.MoonMesh.prototype = Object.create( THREE.PlanetMesh.prototype );
THREE.MoonMesh.prototype.constructor = THREE.MoonMesh;
