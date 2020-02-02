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
    expect(moon).not.to.equals(undefined);

    moon = new THREE.MoonMesh({});
    expect(moon).not.to.equals(undefined);

    moon = new THREE.MoonMesh(undefined);
    expect(moon).not.to.equals(undefined);

    moonProperties = {
      name: 'Moon',
      type: 'MoonType',
      radius: 2000
    };
    moon = new THREE.MoonMesh(moonProperties);
    expect(moon.name).to.equals('Moon');
    expect(moon.type).to.equals('MoonType');
    expect(moon.radius).to.equals(2000);

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
