/*
 * PlanetMesh.js
 * @Description Unit tests for PlanetMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing PlanetMesh', function() {

  var planet;
  var planetProperties;

  it('Testing PlanetMesh constructor', function() {
    planet = new THREE.PlanetMesh();
    expect(planet).not.toBe(undefined);

    planet = new THREE.PlanetMesh({});
    expect(planet).not.toBe(undefined);

    planet = new THREE.PlanetMesh(null);
    expect(planet).not.toBe(undefined);

    planet = new THREE.PlanetMesh('Planet', 'PlanetType', 2000);
    expect(planet.name).toBe('Planet');
    expect(planet.type).toBe('PlanetType');
    expect(planet.radius).toBe(2000);

    planetProperties = {
      name: 'Planet',
      type: 'PlanetType',
      radius: 2000
    };
    planet = new THREE.PlanetMesh(planetProperties);
    expect(planet.name).toBe('Planet');
    expect(planet.type).toBe('PlanetType');
    expect(planet.radius).toBe(2000);

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
