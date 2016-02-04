/*
 * OrbitMesh
 * @Description Unit tests for OrbitMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing OrbitMesh', function() {

  it('Testing OrbitMesh with wrong parameters', function() {
    expect(THREE.OrbitMesh, null).toThrowError(TypeError);
  });

  it('Testing OrbitMesh', function() {
    var orbit = new THREE.OrbitMesh({});
    expect(orbit).not.toBe(undefined);
  });

});
