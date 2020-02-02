/*
 * solar-serviceSpec.js
 * @Description Unit tests for solar-service module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing solar service', function() {

  var solarProperties = new SolarProperties();

  it('Check required modules', function() {
    expect(SolarService).not.to.equals(null);
    expect(solarProperties).not.to.equals(null);
  });

  it('The getBodies method getting the path from SolarProperties ', function() {
    SolarService.getBodies(solarProperties.bodiesJSONProperties, loadJSON);
  });

  it('The getBodies method with wrong parameters ', function() {
    SolarService.getBodies('doesnotexist.json', loadWrongJSON);
  });

  it('The getCamera method getting the path from SolarProperties ', function() {
    SolarService.getCamera(solarProperties.cameraJSONProperties, loadJSON);
  });

  it('The getCamera method with wrong parameters ', function() {
    SolarService.getCamera('doesnotexist.json', loadWrongJSON);
  });

  it('The getLights method getting the path from SolarProperties ', function() {
    SolarService.getLights(solarProperties.lightsJSONProperties, loadJSON);
  });

  it('The getLights method with wrong parameters ', function() {
    SolarService.getLights('doesnotexist.json', loadWrongJSON);
  });

  function loadJSON(response) {
    expect(response).not.to.equals(undefined);
  }

  function loadWrongJSON(response) {
    expect(response).to.equals(undefined);
  }
});
