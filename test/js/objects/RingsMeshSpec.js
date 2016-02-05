/*
 * RingsMesh.js
 * @Description Unit tests for RingsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing RingsMesh', function() {

  var rings;

  it('Testing RingsMesh with wrong parameters', function() {
    expect(THREE.RingsMesh, null).toThrowError(TypeError);
  });

  xit('Testing RingsMesh', function() {
    rings = new THREE.RingsMesh();
    expect(rings).not.toBe(undefined);
    rings = new THREE.RingsMesh({});
    expect(rings).not.toBe(undefined);
  });

  describe('Testing RingsMesh methods', function() {
    rings = new THREE.RingsMesh({});

    it('Testing loadTexture method in RingsMesh', function() {
      rings.loadTexture(null);
      rings.loadTexture('doesnotexit');
    });

    it('Testing update method in RingsMesh', function() {
      rings.update();
    });

  });

});
