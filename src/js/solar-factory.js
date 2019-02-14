/*
 * solar-factory.js
 * @Description Solar Factory creates solar objects
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var SolarFactory = (function() {

  'use strict';

  return {
    createMoon: function(moonProperties) {
      var moon = new THREE.MoonMesh(moonProperties);
      return moon;
    },

    createPlanet: function(planetProperties){
      var planet = new THREE.PlanetMesh(planetProperties);
      return planet;
    },

    createStar: function(starProperties){
      var star = new THREE.StarMesh(starProperties);
      return star;
    }
  };

})();
