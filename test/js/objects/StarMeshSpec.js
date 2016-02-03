/*
 * StarMesh
 * @Description Unit tests for StarMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing StarMesh', function() {

  it('Testing StarMesh with wrong parameters', function() {
    expect(THREE.StarMesh, null).toThrowError(TypeError);
  });

  xit('Testing StarMesh', function() {
    var star = THREE.StarMesh({});
    expect(star).not.toBe(undefined);
  });

});
