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
    expect(solarProperties.width).to.equal(undefined);
    expect(solarProperties.height).to.equal(undefined);
    expect(solarProperties.bodiesSrc).to.equal('data/bodies.properties.json');
    expect(solarProperties.cameraSrc).to.equal('data/camera.properties.json');
    expect(solarProperties.lightsSrc).to.equal('data/lights.properties.json');
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
    expect(solarProperties.width).to.equal(400);
    expect(solarProperties.height).to.equal(400);
    expect(solarProperties.bodiesSrc).to.equal('bodiesSrc');
    expect(solarProperties.cameraSrc).to.equal('cameraSrc');
    expect(solarProperties.lightsSrc).to.equal('lightsSrc');

  });

});
