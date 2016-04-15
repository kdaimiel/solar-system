/*
 * solar-factorySpec.js
 * @Description Unit tests for solar-factory module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['solar-factory'], function(SolarFactory) {

  describe('Testing scene-factory', function() {

    it('Check required modules', function() {
      expect(SolarFactory).not.toBe(null);
    });

    it('Testing createMoon method', function() {
      var moonProperties = {
        type: 'Moon'
      };
      var moon = SolarFactory.createMoon(moonProperties);
      var moon2 = new THREE.MoonMesh(moonProperties);

      compareObjects(moon, moon2);
    });

    it('Testing createPlanet method', function() {
      var planetProperties = {
        type: 'Planet'
      };
      var planet = SolarFactory.createPlanet(planetProperties);
      var planet2 = new THREE.PlanetMesh(planetProperties);

      compareObjects(planet, planet2);
    });

    it('Testing createStar method', function() {
      var starProperties = {
        type: 'Star'
      };
      var star = SolarFactory.createStar(starProperties);
      var star2 = new THREE.StarMesh(starProperties);

      compareObjects(star, star2);
    });

    function compareObjects(o1, o2){
      expect(o1).not.toBe(undefined);
      expect(o2).not.toBe(undefined);
      expect(o1.type).toEqual(o2.type);
      expect(o1.prototype).toEqual(o2.prototype);
    }

  });
});

