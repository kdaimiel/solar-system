/*
 * RingsGeometrySpec.js
 * @Description Unit tests for RingsGeometry.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing RingsGeometry', function() {

  it('Testing RingsGeometry with wrong parameters', function() {
    expect(THREE.RingsGeometry, null).toThrowError(TypeError);
  });

  it('Testing RingsGeometry', function() {
    var geometry;
    geometry = new THREE.RingsGeometry();
    expect(geometry).not.toBe(undefined);
    geometry = new THREE.RingsGeometry({});
    expect(geometry).not.toBe(undefined);
  });

});
