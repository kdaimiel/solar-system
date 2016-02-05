/*
 * solar-systemSpec.js
 * @Description Unit tests for solar-system module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['solar-system'], function(SolarSystem) {

  describe('Testing solar system', function() {

    it('Check required modules', function() {
      expect(SolarSystem).not.toBe(null);
    });

    it('Testing addMoon method with wrong parameters', function() {
      expect(SolarSystem.addMoon, null).toThrowError(TypeError);
    });

    it('Testing addMoon method', function() {
      SolarSystem.addMoon({});
    });

    it('Testing addPlanet method with wrong parameters', function() {
      expect(SolarSystem.addPlanet, null).toThrowError(TypeError);
    });

    it('Testing addPlanet method', function() {
      SolarSystem.addPlanet({});
    });

    it('Testing addStar method with wrong parameters', function() {
      expect(SolarSystem.addStar, null).toThrowError(TypeError);
    });

    it('Testing addStar method', function() {
      SolarSystem.addStar({});
    });

    it('Testing init method', function() {
      SolarSystem.init();
    });

    it('Testing loadObjectFronJSONFiles method', function() {
      SolarSystem.loadObjectFronJSONFiles();
    });

  });
});

