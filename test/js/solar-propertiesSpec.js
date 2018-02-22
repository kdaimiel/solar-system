/*
 * solar-propertiesSpec.js
 * @Description Unit tests for solar-properties module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('SolarProperties', function() {

  it('should have default values', function() {
    var solarProperties = new SolarProperties();
    expect(solarProperties.width).toBe(undefined);
    expect(solarProperties.height).toBe(undefined);
    expect(solarProperties.bodiesSrc).toBe('data/bodies.properties.json');
    expect(solarProperties.cameraSrc).toBe('data/camera.properties.json');
    expect(solarProperties.lightsSrc).toBe('data/lights.properties.json');
  });

  it('should allow set properties', function() {

    var properties = {
      width: 400,
      height: 400,
      bodiesSrc: 'bodiesSrc',
      cameraSrc: 'cameraSrc',
      lightsSrc: 'lightsSrc'
    };

    var solarProperties = new SolarProperties(properties);
    expect(solarProperties.width).toBe(400);
    expect(solarProperties.height).toBe(400);
    expect(solarProperties.bodiesSrc).toBe('bodiesSrc');
    expect(solarProperties.cameraSrc).toBe('cameraSrc');
    expect(solarProperties.lightsSrc).toBe('lightsSrc');

  });

});
