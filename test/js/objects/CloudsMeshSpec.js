/*
 * CloudsMesh.js
 * @Description Unit tests for CloudsMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('Testing CloudsMesh', function() {

  var clouds;
  var cloudsProperties;

  it('Testing CloudsMesh constructor', function() {
    clouds = new THREE.CloudsMesh();
    expect(clouds).not.toBe(undefined);

    clouds = new THREE.CloudsMesh({});
    expect(clouds).not.toBe(undefined);

    clouds = new THREE.CloudsMesh(null);
    expect(clouds).not.toBe(undefined);

    clouds = new THREE.CloudsMesh('Clouds', 'CloudsType', 2000);
    expect(clouds.name).toBe('Clouds');
    expect(clouds.type).toBe('CloudsType');
    expect(clouds.radius).toBe(2000);

    cloudsProperties = {
      name: 'Clouds',
      type: 'CloudsType',
      radius: 2000
    };
    clouds = new THREE.CloudsMesh(cloudsProperties);
    expect(clouds.name).toBe('Clouds');
    expect(clouds.type).toBe('CloudsType');
    expect(clouds.radius).toBe(2000);

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
