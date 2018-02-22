/*
 * scene-builderSpec.js
 * @Description Unit tests for scene-builder module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
describe('SceneBuilder', function() {

  var sceneBuild = new SceneBuilder();

  // Mocked Dom Element to test scene builder.
  var element = document.createElement('div');

  describe('before being initiated', function() {

    it('Testing addObject method before being initiated', function() {
      expect(sceneBuild.addObject, null).toThrowError(TypeError);
      expect(sceneBuild.addObject, {}).toThrowError(TypeError);
      var body = new THREE.SolarBody();
      expect(sceneBuild.addObject, body).toThrowError(TypeError);
    });

    it('Testing animate method before being initiated', function() {
      expect(sceneBuild.animate).toThrowError(TypeError);
    });

    it('Testing setCamera method before being initiated', function() {
      // Camera is independent form scene so it should work fine.
      sceneBuild.setCamera();
      sceneBuild.setCamera(null);
      sceneBuild.setCamera({});
      var camera = new THREE.PerspectiveCamera();
      sceneBuild.setCamera(camera);
    });

    it('Testing setControls method before being initiated', function() {
      // Camera is independent form scene so it should work fine.
      sceneBuild.setControls();
      sceneBuild.setControls(null);
      sceneBuild.setControls({});
      var camera = new THREE.PerspectiveCamera();
      var controls = new THREE.TrackballControls(camera);
      sceneBuild.setControls(controls);
    });

  });

  it('Testing init method adding a different objects', function() {
    sceneBuild.init();
    sceneBuild.init(null);
    sceneBuild.init({});
    sceneBuild.init({width: 'error', height: 'error'});
    sceneBuild.init(element);
  });

  describe('Testing SceneBuilder after being initiated', function() {

    it('Testing addObject method adding a different objects', function() {
      var light = new THREE.AmbientLight(0x404040);
      var moon = new THREE.MoonMesh();
      var planet = new THREE.PlanetMesh();
      var star = new THREE.StarMesh();

      sceneBuild.addObject();
      sceneBuild.addObject(null);
      sceneBuild.addObject({});
      sceneBuild.addObject(light);
      sceneBuild.addObject(moon);
      sceneBuild.addObject(planet);
      sceneBuild.addObject(star);
    });

    it('Testing animate method after being initiated before ', function() {
      sceneBuild.animate();
    });

    it('Testing setCamera method', function() {
      sceneBuild.setCamera();
      sceneBuild.setCamera(null);
      sceneBuild.setCamera({});
      var camera = new THREE.PerspectiveCamera();
      sceneBuild.setCamera(camera);
    });

    it('Testing setControls method', function() {
      sceneBuild.setControls();
      sceneBuild.setControls(null);
      sceneBuild.setControls({});
      var camera = new THREE.PerspectiveCamera();
      var controls = new THREE.TrackballControls(camera);
      sceneBuild.setControls(controls);
    });

  });
});
