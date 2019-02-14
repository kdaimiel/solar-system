/*
 * MoonMesh.js
 * @Description Unit tests for MoonMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('MoonMesh', function() {

  var moon;
  var moonProperties;

  it('should allow indroduce properties in the constructor', function() {
    moon = new THREE.MoonMesh();
    expect(moon).not.toBe(undefined);

    moon = new THREE.MoonMesh({});
    expect(moon).not.toBe(undefined);

    moon = new THREE.MoonMesh(undefined);
    expect(moon).not.toBe(undefined);

    moonProperties = {
      name: 'Moon',
      type: 'MoonType',
      radius: 2000
    };
    moon = new THREE.MoonMesh(moonProperties);
    expect(moon.name).toBe('Moon');
    expect(moon.type).toBe('MoonType');
    expect(moon.radius).toBe(2000);

  });

  describe('Testing MoonMesh methods', function() {
    moon = new THREE.MoonMesh({});

    it('Testing loadTexture method in MoonMesh', function() {
      moon.loadTexture(null);
      moon.loadTexture('doesnotexit');
    });

    it('Testing update method in MoonMesh', function() {
      moon.update();
    });

  });

});
