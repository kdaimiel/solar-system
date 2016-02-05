/*
 * PlanetMesh.js
 * @Description Unit tests for PlanetMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing PlanetMesh', function() {

  var planet;

  it('Testing PlanetMesh with wrong parameters', function() {
    expect(THREE.PlanetMesh, null).toThrowError(TypeError);
  });

  xit('Testing PlanetMesh', function() {
    planet = new THREE.PlanetMesh();
    expect(planet).not.toBe(undefined);
    planet = new THREE.PlanetMesh({});
    expect(planet).not.toBe(undefined);
  });

  describe('Testing PlanetMesh methods', function() {

    planet = new THREE.PlanetMesh({});

    it('Testing loadTexture method in PlanetMesh', function() {
      planet.loadTexture(null);
      planet.loadTexture('doesnotexit');
    });

    it('Testing update method in PlanetMesh', function() {
      planet.update();
    });

  });

});
