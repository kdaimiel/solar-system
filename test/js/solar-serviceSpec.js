/*
 * solar-serviceSpec.js
 * @Description Unit tests for solar-service module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('SolarService', function () {

  var solarProperties = new SolarProperties();

  it('should be defined', function() {
    expect(SolarService).not.to.equals(null);
    expect(solarProperties).not.to.equals(null);
  });

  it('should get bodies from SolarProperties properly', function () {
    SolarService.getBodies(solarProperties.bodiesJSONProperties, loadJSON);
  });

  it('getBodies should get undefined if properties file does not exist', function () {
    SolarService.getBodies('does-not-exist.json', loadWrongJSON);
  });

  it('should get camera from SolarProperties properly', function () {
    SolarService.getCamera(solarProperties.cameraJSONProperties, loadJSON);
  });

  it('getCamera should get undefined if properties file does not exist', function () {
    SolarService.getCamera('does-not-exist.json', loadWrongJSON);
  });

  it('should get lights from SolarProperties properly', function () {
    SolarService.getLights(solarProperties.lightsJSONProperties, loadJSON);
  });

  it('getLights should get undefined if properties file does not exist', function () {
    SolarService.getLights('does-not-exist.json', loadWrongJSON);
  });

  function loadJSON(response) {
    expect(response).not.to.equals(undefined);
  }

  function loadWrongJSON(response) {
    expect(response).to.equals(undefined);
  }
});
