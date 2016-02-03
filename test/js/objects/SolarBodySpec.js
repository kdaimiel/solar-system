/*
 * SolarBody
 * @Description Unit tests for SolarBody.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing SolarBody', function() {

  it('Testing SolarBody with wrong parameters', function() {
    expect(THREE.SolarBody, null).toThrowError(TypeError);
  });

  xit('Testing SolarBody', function() {
    var solarBody = THREE.SolarBody({});
    expect(solarBody).not.toBe(undefined);
  });

});
