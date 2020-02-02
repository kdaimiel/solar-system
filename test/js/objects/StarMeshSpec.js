/*
 * StarMesh.js
 * @Description Unit tests for StarMesh.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

describe('StarMesh', function() {

  var star;
  var starProperties;

  it('should allow indroduce properties in the constructor', function() {
    star = new THREE.StarMesh();
    expect(star).not.to.equals(undefined);

    star = new THREE.StarMesh({});
    expect(star).not.to.equals(undefined);

    star = new THREE.StarMesh(undefined);
    expect(star).not.to.equals(undefined);

    starProperties = {
      name: 'Star',
      type: 'StarType',
      radius: 2000
    };
    star = new THREE.StarMesh(starProperties);
    expect(star.name).to.equals('Star');
    expect(star.type).to.equals('StarType');
    expect(star.radius).to.equals(2000);
  });

  describe('Testing StarMesh', function() {
    star = new THREE.StarMesh({});

    it('Testing createLensFlare method in StarMesh', function() {
      star.createLensFlare();
    });

    it('Testing loadTexture method in StarMesh', function() {
      star.loadTexture(null);
      star.loadTexture('doesnotexit');
    });

    it('Testing update method in StarMesh', function() {
      star.update();
    });

  });

});
