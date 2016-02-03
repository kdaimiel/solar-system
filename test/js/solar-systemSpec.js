/*
 * solar-systemSpec
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

    xit('Testing addMoon method', function() {

      it('Testing addMoon method with wrong parameters', function() {
        expect(SolarSystem.addMoon, null).toThrowError(TypeError);
        expect(SolarSystem.addMoon, {}).toThrowError(TypeError);
      });

      var moonProperties = {
        type: 'Moon'
      };
      spyOn(SolarSystem, 'scene');
      SolarSystem.addMoon(moonProperties);

    });

    xit('Testing addPlanet method', function() {

      it('Testing addPlanet method with wrong parameters', function() {
        expect(SolarSystem.addPlanet, null).toThrowError(TypeError);
        expect(SolarSystem.addPlanet, {}).toThrowError(TypeError);
      });

      var planetProperties = {
        type: 'Planet'
      };
      SolarSystem.addPlanet(planetProperties);

    });

    xit('Testing addStar method', function() {

      it('Testing addStar method with wrong parameters', function() {
        expect(SolarSystem.addStar, null).toThrowError(TypeError);
        expect(SolarSystem.addStar, {}).toThrowError(TypeError);
      });

      var starProperties = {
        type: 'Star'
      };
      SolarSystem.addStar(starProperties);

    });

    xit('Testing init method', function() {
      spyOn(THREE, 'WebGLRenderer');
      SolarSystem.init();
    });

    it('Testing loadObjectFronJSONFiles method', function() {
      SolarSystem.loadObjectFronJSONFiles();
    });

  });
});

