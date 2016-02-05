/*
 * MoonMesh.js
 * @Description Unit tests for MoonMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing MoonMesh', function() {

  var moon;

  it('Testing MoonMesh with wrong parameters', function() {
    expect(THREE.MoonMesh, null).toThrowError(TypeError);
  });

  xit('Testing MoonMesh', function() {
    moon = new THREE.MoonMesh();
    expect(moon).not.toBe(undefined);
    moon = new THREE.MoonMesh({});
    expect(moon).not.toBe(undefined);
  });

  describe('Testing MoonMesh methods', function() {
    moon = new THREE.MoonMesh({});

    it('Testing loadTexture method in MoonMesh', function() {
      moon.loadTexture(null);
      moon.loadTexture('doesnotexit');
    });

    it('Testing update method in MoonMesh', function() {
      moon.update();
    });

  });

});
