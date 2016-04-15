/*
 * OrbitMesh.js
 * @Description Unit tests for OrbitMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing OrbitMesh', function() {

  var orbit;
  var orbitProperties;

  it('Testing OrbitMesh constructor', function() {
    orbit = new THREE.OrbitMesh();
    expect(orbit).not.toBe(undefined);

    orbit = new THREE.OrbitMesh({});
    expect(orbit).not.toBe(undefined);

    orbit = new THREE.OrbitMesh(null);
    expect(orbit).not.toBe(undefined);

    orbit = new THREE.OrbitMesh('Orbit', 'OrbitType', 2000);
    expect(orbit.name).toBe('Orbit');
    expect(orbit.type).toBe('OrbitType');
    expect(orbit.distance).toBe(2000);

    orbitProperties = {
      name: 'Orbit',
      type: 'OrbitType',
      distance: 2000
    };
    orbit = new THREE.OrbitMesh(orbitProperties);
    expect(orbit.name).toBe('Orbit');
    expect(orbit.type).toBe('OrbitType');
    expect(orbit.distance).toBe(2000);

  });

  describe('Testing OrbitMesh methods', function() {
    orbit = new THREE.OrbitMesh({});

    it('Testing update method in OrbitMesh', function() {
      orbit.update();
    });

  });

});
