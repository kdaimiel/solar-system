/*
 * RingsMesh
 * @Description Unit tests for RingsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing RingsMesh', function() {

  it('Testing RingsMesh with wrong parameters', function() {
    expect(THREE.RingsMesh, null).toThrowError(TypeError);
  });

  it('Testing RingsMesh', function() {
    var rings = new THREE.RingsMesh({});
    expect(rings).not.toBe(undefined);
  });

});
