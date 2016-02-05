/*
 * OrbitMesh.js
 * @Description Unit tests for OrbitMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing OrbitMesh', function() {

  var orbit;

  it('Testing OrbitMesh with wrong parameters', function() {
    expect(THREE.OrbitMesh, null).toThrowError(TypeError);
  });

  xit('Testing OrbitMesh', function() {
    orbit = new THREE.OrbitMesh();
    expect(orbit).not.toBe(undefined);
    orbit = new THREE.OrbitMesh({});
    expect(orbit).not.toBe(undefined);
  });

  describe('Testing OrbitMesh methods', function() {
    orbit = new THREE.OrbitMesh({});

    it('Testing loadTexture method in OrbitMesh', function() {
      orbit.loadTexture(null);
      orbit.loadTexture('doesnotexit');
    });

    it('Testing update method in OrbitMesh', function() {
      orbit.update();
    });

  });

});
