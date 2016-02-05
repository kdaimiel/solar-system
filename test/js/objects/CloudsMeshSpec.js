/*
 * CloudsMesh.js
 * @Description Unit tests for CloudsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing CloudsMesh', function() {

  var clouds;


  it('Testing CloudsMesh with wrong parameters', function() {
    expect(THREE.CloudsMesh, null).toThrowError(TypeError);
  });

  xit('Testing CloudsMesh', function() {
    clouds = new THREE.CloudsMesh();
    expect(clouds).not.toBe(undefined);
    clouds = new THREE.CloudsMesh({});
    expect(clouds).not.toBe(undefined);
  });

  describe('Testing CloudsMesh methods', function() {

    clouds = new THREE.CloudsMesh({});

    it('Testing loadTexture method in CloudsMesh', function() {
      clouds.loadTexture(null);
      clouds.loadTexture('doesnotexit');
    });


    it('Testing loadTexture method in CloudsMesh', function() {
      clouds.loadTexture(null);
      clouds.loadTexture('doesnotexit');
    });

    it('Testing update method in CloudsMesh', function() {
      clouds.update();
    });

  });

});
