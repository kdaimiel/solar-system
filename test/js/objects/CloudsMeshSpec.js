/*
 * CloudsMesh.js
 * @Description Unit tests for CloudsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('CloudsMesh', function() {

  var clouds;
  var cloudsProperties;

  it('should allow indroduce properties in the constructor', function() {
    clouds = new THREE.CloudsMesh();
    expect(clouds).not.to.equals(undefined);

    clouds = new THREE.CloudsMesh({});
    expect(clouds).not.to.equals(undefined);

    clouds = new THREE.CloudsMesh(undefined);
    expect(clouds).not.to.equals(undefined);

    cloudsProperties = {
      name: 'Clouds',
      type: 'CloudsType',
      radius: 2000
    };
    clouds = new THREE.CloudsMesh(cloudsProperties);
    expect(clouds.name).to.equals('Clouds');
    expect(clouds.type).to.equals('CloudsType');
    expect(clouds.radius).to.equals(2000);

  });

  describe('Testing CloudsMesh methods', function() {

    clouds = new THREE.CloudsMesh({});

    it('Testing loadTexture method in CloudsMesh', function() {
      clouds.loadTexture(null);
      clouds.loadTexture('doesnotexit');
    });

    it('Testing loadTexture method in CloudsMesh', function() {
      clouds.loadTexture(null);
      clouds.loadTexture('doesnotexit');
    });

    it('Testing update method in CloudsMesh', function() {
      clouds.update();
    });

  });

});
