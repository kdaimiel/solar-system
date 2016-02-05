/*
 * solar-serviceSpec.js
 * @Description Unit tests for solar-service module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['solar-service', 'solar-properties'], function(SolarService, SolarProperties) {

  describe('Testing solar service', function() {

    it('Check required modules', function() {
      expect(SolarService).not.toBe(null);
      expect(SolarProperties).not.toBe(null);
    });

    it('The getBodies method getting the path from SolarProperties ', function() {
      SolarService.getBodies(SolarProperties.bodiesJSONProperties, loadJSON);
    });

    it('The getBodies method with wrong parameters ', function() {
      SolarService.getBodies('doesnotexist.json', loadNullJSON);
    });

    it('The getCamera method getting the path from SolarProperties ', function() {
      SolarService.getCamera(SolarProperties.cameraJSONProperties, loadJSON);
    });

    it('The getCamera method with wrong parameters ', function() {
      SolarService.getCamera('doesnotexist.json', loadNullJSON);
    });

    it('The getLights method getting the path from SolarProperties ', function() {
      SolarService.getLights(SolarProperties.lightsJSONProperties, loadJSON);
    });

    it('The getLights method with wrong parameters ', function() {
      SolarService.getLights('doesnotexist.json', loadNullJSON);
    });

    function loadJSON(properties) {
      expect(properties).not.toBe(null);
    }

    function loadNullJSON(properties) {
      expect(properties).toBe(null);
    }
  });
});

