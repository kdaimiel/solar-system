/*
 * solar-serviceSpec.js
 * @Description Unit tests for solar-service module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('SolarService', function () {

  var solarProperties = new SolarProperties();

  it('should be defined', function () {
    expect(SolarService).not.toBe(null);
    expect(solarProperties).not.toBe(null);
  });

  it('should get bodies from SolarProperties properly', function () {
    SolarService.getBodies(solarProperties.bodiesJSONProperties, loadJSON);
  });

  it('getBodies should get undefined if properties file does not exist', function () {
    SolarService.getBodies('doesnotexist.json', loadWrongJSON);
  });

  it('should get camera from SolarProperties properly', function () {
    SolarService.getCamera(solarProperties.cameraJSONProperties, loadJSON);
  });

  it('getCamera shoulo get undefined if properties file does not exist', function () {
    SolarService.getCamera('doesnotexist.json', loadWrongJSON);
  });

  it('should get ligths from SolarProperties properly', function () {
    SolarService.getLights(solarProperties.lightsJSONProperties, loadJSON);
  });

  it('getLights should get undefined if properties file does not exist', function () {
    SolarService.getLights('doesnotexist.json', loadWrongJSON);
  });

  function loadJSON(response) {
    expect(response).not.toBe(undefined);
  }

  function loadWrongJSON(response) {
    expect(response).toBe(undefined);
  }
});
