/*
 * solar-systemSpec.js
 * @Description Unit tests for solar-system module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['solar-system'], function(SolarSystem) {

  describe('Testing SolarSystem', function() {

    // Mocked Dom Element to test scene builder.
    var element = document.createElement('div');

    it('Check required modules', function() {
      expect(SolarSystem).not.toBe(null);
    });

    describe('Testing SolarSystem methods', function() {

      it('Testing addMoon method', function() {
        SolarSystem.addMoon({});
      });

      it('Testing addPlanet method', function() {
        SolarSystem.addPlanet({});
      });

      it('Testing addStar method', function() {
        SolarSystem.addStar({});
      });

      it('Testing init method', function() {
        SolarSystem.init(element);
      });

    });

  });
});

