/*
 * StarMesh.js
 * @Description Unit tests for StarMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing StarMesh', function() {

  var star;

  it('Testing StarMesh with wrong parameters', function() {
    expect(THREE.StarMesh, null).toThrowError(TypeError);
  });

  xit('Testing StarMesh', function() {
    star = new THREE.StarMesh();
    expect(star).not.toBe(undefined);
    star = new THREE.StarMesh({});
    expect(star).not.toBe(undefined);
  });

  describe('Testing StarMesh', function() {
    star = new THREE.StarMesh({});

    it('Testing createLensFlare method in StarMesh', function() {
      star.createLensFlare();
    });

    it('Testing loadTexture method in StarMesh', function() {
      star.loadTexture(null);
      star.loadTexture('doesnotexit');
    });

    it('Testing update method in StarMesh', function() {
      star.update();
    });

  });

});
