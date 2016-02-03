/*
 * PlanetMesh
 * @Description Unit tests for PlanetMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing PlanetMesh', function() {

  it('Testing PlanetMesh with wrong parameters', function() {
    expect(THREE.PlanetMesh, null).toThrowError(TypeError);
  });

  xit('Testing PlanetMesh', function() {
    var planet = THREE.PlanetMesh({});
    expect(planet).not.toBe(undefined);
  });

});
