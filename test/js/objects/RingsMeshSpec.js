/*
 * RingsMesh.js
 * @Description Unit tests for RingsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('RingsMesh', function() {

  var rings;
  var ringsProperties;

  it('should allow indroduce properties in the constructor', function() {
    rings = new THREE.RingsMesh();
    expect(rings).not.toBe(undefined);

    rings = new THREE.RingsMesh({});
    expect(rings).not.toBe(undefined);

    rings = new THREE.RingsMesh(undefined);
    expect(rings).not.toBe(undefined);

    ringsProperties = {
      name: 'Rings',
      type: 'RingsType',
      tilt: 30
    };
    rings = new THREE.RingsMesh(ringsProperties);
    expect(rings.name).toBe('Rings');
    expect(rings.type).toBe('RingsType');
    expect(rings.tilt).toBe(30);
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
