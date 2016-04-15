/*
 * SolarBody.js
 * @Description Unit tests for SolarBody.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing SolarBody', function() {

  var solarBody;
  var bodyProperties;

  it('Testing SolarBody constructor', function() {
    solarBody = new THREE.SolarBody();
    expect(solarBody).not.toBe(undefined);

    solarBody = new THREE.SolarBody({});
    expect(solarBody).not.toBe(undefined);

    solarBody = new THREE.SolarBody(null);
    expect(solarBody).not.toBe(undefined);

    solarBody = new THREE.SolarBody('SolarBody', 'SolarBodyType');
    expect(solarBody.name).toBe('SolarBody');
    expect(solarBody.type).toBe('SolarBodyType');

    bodyProperties = {
      name: 'SolarBody',
      type: 'SolarBodyType'
    };
    solarBody = new THREE.SolarBody(bodyProperties);
    expect(solarBody.name).toBe('SolarBody');
    expect(solarBody.type).toBe('SolarBodyType');

  });

  describe('Testing SolarBody methods', function() {

    solarBody = new THREE.SolarBody({});

    it('Testing addClouds method in SolarBody', function() {
      expect(solarBody.addClouds, null).toThrowError(TypeError);
      solarBody.addClouds({});
    });

    it('Testing addRings method in SolarBody', function() {
      expect(solarBody.addRings, null).toThrowError(TypeError);
      solarBody.addRings({});
    });

    it('Testing addSatellite method in SolarBody with wrong parameters', function() {
      expect(solarBody.addSatellite, null, {}).toThrowError(TypeError);
    });

    it('Testing addSatellite method in SolarBody with simple parameters', function() {
      var satelite = new THREE.SolarBody({});
      solarBody.addSatellite(satelite, {});
    });

    it('Testing loadTexture method in SolarBody', function() {
      solarBody.loadTexture(null);
      solarBody.loadTexture('doesnotexit');
    });

    it('Testing loadbumpMap method in SolarBody', function() {
      solarBody.loadbumpMap(null);
      solarBody.loadbumpMap('doesnotexit');
    });

    it('Testing loadspecularMap method in SolarBody', function() {
      solarBody.loadspecularMap(null);
      solarBody.loadspecularMap('doesnotexit');
    });

    it('Testing update method in SolarBody', function() {
      solarBody.update();
    });

  });

});
