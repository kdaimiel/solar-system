/*
 * solar-factory.js
 * @Description Solar Factory creates solar objects
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('solar-factory', function() {

  'use strict';

  var factory = {
    createMoon: createMoon,
    createPlanet: createPlanet,
    createStar: createStar
  };

  return factory;
  function createMoon(moonProperties) {
    var moon = new THREE.MoonMesh(moonProperties);
    return moon;
  }

  function createPlanet(planetProperties){
    var planet = new THREE.PlanetMesh(planetProperties);
    return planet;
  }

  function createStar(starProperties){
    var star = new THREE.StarMesh(starProperties);
    return star;
  }

});
