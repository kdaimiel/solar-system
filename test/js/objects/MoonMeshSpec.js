/*
 * MoonMesh
 * @Description Unit tests for MoonMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing MoonMesh', function() {

  it('Testing MoonMesh with wrong parameters', function() {
    expect(THREE.MoonMesh, null).toThrowError(TypeError);
  });

  it('Testing MoonMesh', function() {
    var moon = new THREE.MoonMesh({});
    expect(moon).not.toBe(undefined);
  });

});
