/*
 * RingsGeometrySpec
 * @Description Unit tests for RingsGeometry.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing RingsGeometry', function() {

  it('Testing RingsGeometry with wrong parameters', function() {
    expect(THREE.RingsGeometry, null).toThrowError(TypeError);
  });

  xit('Testing RingsGeometry', function() {
    var ringsProperties = {
      innerRadius: 2.5,
      outerRadius: 5.6,
      map: 'img/saturn/saturnringcolor.jpg'
    };
    var geometry = THREE.RingsGeometry(ringsProperties);
    expect(geometry).not.toBe(undefined);
  });

});
