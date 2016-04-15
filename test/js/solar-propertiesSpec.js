/*
 * solar-propertiesSpec.js
 * @Description Unit tests for solar-properties module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['solar-properties'], function(SolarProperties) {

  var properties;

  describe('Testing SolarProperties', function() {

    it('Check required modules', function() {
      expect(SolarProperties).not.toBe(null);
    });

    it('Testing SolarProperties default values', function() {
      expect(SolarProperties.width).toBe(null);
      expect(SolarProperties.height).toBe(null);
      expect(SolarProperties.bodiesSrc).toBe('data/bodies.properties.json');
      expect(SolarProperties.cameraSrc).toBe('data/camera.properties.json');
      expect(SolarProperties.lightsSrc).toBe('data/lights.properties.json');
    });


    describe('Testing SolarProperties methods', function() {

      it('Testing setProperties method', function() {

        SolarProperties.setProperties();
        expect(SolarProperties.width).toBe(null);
        expect(SolarProperties.height).toBe(null);
        expect(SolarProperties.bodiesSrc).toBe('data/bodies.properties.json');
        expect(SolarProperties.cameraSrc).toBe('data/camera.properties.json');
        expect(SolarProperties.lightsSrc).toBe('data/lights.properties.json');

        properties = {
          width: 400,
          height: 400,
          bodiesSrc: 'bodiesSrc',
          cameraSrc: 'cameraSrc',
          lightsSrc: 'lightsSrc'
        };

        SolarProperties.setProperties(properties);
        expect(SolarProperties.width).toBe(400);
        expect(SolarProperties.height).toBe(400);
        expect(SolarProperties.bodiesSrc).toBe('bodiesSrc');
        expect(SolarProperties.cameraSrc).toBe('cameraSrc');
        expect(SolarProperties.lightsSrc).toBe('lightsSrc');

      });
    });
  });
});
