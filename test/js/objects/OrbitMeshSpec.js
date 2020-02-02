/*
 * OrbitMesh.js
 * @Description Unit tests for OrbitMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('OrbitMesh', function() {

  var orbit;
  var orbitProperties;

  it('should allow indroduce properties in the constructor', function() {
    orbit = new THREE.OrbitMesh();
    expect(orbit).not.to.equals(undefined);

    orbit = new THREE.OrbitMesh({});
    expect(orbit).not.to.equals(undefined);

    orbit = new THREE.OrbitMesh(undefined);
    expect(orbit).not.to.equals(undefined);

    orbitProperties = {
      name: 'Orbit',
      type: 'OrbitType',
      distance: 2000
    };
    orbit = new THREE.OrbitMesh(orbitProperties);
    expect(orbit.name).to.equals('Orbit');
    expect(orbit.type).to.equals('OrbitType');
    expect(orbit.distance).to.equals(2000);
  });

  describe('Testing OrbitMesh methods', function() {
    orbit = new THREE.OrbitMesh({});

    it('Testing update method in OrbitMesh', function() {
      orbit.update();
    });

  });

});
