/*
 * solar-systemSpec.js
 * @Description Unit tests for solar-system module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('SolarSystem', function() {

  var solarSystem = new SolarSystem();

  // Mocked Dom Element to test scene builder.
  var element = document.createElement('div');

  it('should add moon properly', function() {
    solarSystem.init(element);
    solarSystem.addMoon({});
  });

  it('should add planet properly', function() {
    solarSystem.init(element);
    solarSystem.addPlanet({});
  });

  it('should add star properly', function() {
    solarSystem.init(element);
    solarSystem.addStar({});
  });

  it('should init properly', function() {
    solarSystem.init(element);
  });

});
