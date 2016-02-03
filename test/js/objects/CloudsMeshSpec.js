/*
 * CloudsMesh
 * @Description Unit tests for CloudsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing CloudsMesh', function() {

  it('Testing CloudsMesh with wrong parameters', function() {
    expect(THREE.CloudsMesh, null).toThrowError(TypeError);
  });

  xit('Testing CloudsMesh', function() {
    var clouds = THREE.CloudsMesh({});
    expect(clouds).not.toBe(undefined);
  });

});
