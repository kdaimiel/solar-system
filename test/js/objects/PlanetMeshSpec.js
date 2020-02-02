/*
 * PlanetMesh.js
 * @Description Unit tests for PlanetMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('PlanetMesh', function() {

  var planet;
  var planetProperties;

  it('should allow indroduce properties in the constructor', function() {
    planet = new THREE.PlanetMesh();
    expect(planet).not.to.equals(undefined);

    planet = new THREE.PlanetMesh({});
    expect(planet).not.to.equals(undefined);

    planet = new THREE.PlanetMesh(undefined);
    expect(planet).not.to.equals(undefined);

    planetProperties = {
      name: 'Planet',
      type: 'PlanetType',
      radius: 2000
    };
    planet = new THREE.PlanetMesh(planetProperties);
    expect(planet.name).to.equals('Planet');
    expect(planet.type).to.equals('PlanetType');
    expect(planet.radius).to.equals(2000);
  });

  describe('Testing PlanetMesh methods', function() {

    planet = new THREE.PlanetMesh({});

    it('Testing loadTexture method in PlanetMesh', function() {
      planet.loadTexture(null);
      planet.loadTexture('doesnotexit');
    });

    it('Testing update method in PlanetMesh', function() {
      planet.update();
    });

  });

});
