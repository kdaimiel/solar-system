/*
 * scene-builderSpec.js
 * @Description Unit tests for scene-builder module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['scene-builder'], function(SceneBuilder) {

  describe('Testing scene-builder', function() {

    // Mocked Dom Element to test scene builder.
    var element = document.createElement('div');

    it('Check required modules', function() {
      expect(SceneBuilder).not.toBe(null);
    });

    describe('Testing SceneBuilder before being initiated', function() {

      it('Testing addObject method before being initiated', function() {
        expect(SceneBuilder.addObject, null).toThrowError(TypeError);
        expect(SceneBuilder.addObject, {}).toThrowError(TypeError);
        var body = new THREE.SolarBody();
        expect(SceneBuilder.addObject, body).toThrowError(TypeError);
      });

      it('Testing animate method before being initiated', function() {
        expect(SceneBuilder.animate).toThrowError(TypeError);
      });

      it('Testing setCamera method before being initiated', function() {
        // Camera is independent form scene so it should work fine.
        SceneBuilder.setCamera();
        SceneBuilder.setCamera(null);
        SceneBuilder.setCamera({});
        var camera = new THREE.PerspectiveCamera();
        SceneBuilder.setCamera(camera);
      });

      it('Testing setControls method before being initiated', function() {
        // Camera is independent form scene so it should work fine.
        SceneBuilder.setControls();
        SceneBuilder.setControls(null);
        SceneBuilder.setControls({});
        var camera = new THREE.PerspectiveCamera();
        var controls = new THREE.TrackballControls(camera);
        SceneBuilder.setControls(controls);
      });

    });

    it('Testing init method adding a different objects', function() {
      SceneBuilder.init();
      SceneBuilder.init(null);
      SceneBuilder.init({});
      SceneBuilder.init({width: 'error', height: 'error'});
      SceneBuilder.init(element);
    });

    describe('Testing SceneBuilder after being initiated', function() {

      it('Testing addObject method adding a different objects', function() {
        var light = new THREE.AmbientLight(0x404040);
        var moon = new THREE.MoonMesh();
        var planet = new THREE.PlanetMesh();
        var star = new THREE.StarMesh();

        SceneBuilder.addObject();
        SceneBuilder.addObject(null);
        SceneBuilder.addObject({});
        SceneBuilder.addObject(light);
        SceneBuilder.addObject(moon);
        SceneBuilder.addObject(planet);
        SceneBuilder.addObject(star);
      });

      it('Testing animate method after being initiated before ', function() {
        SceneBuilder.animate();
      });

      it('Testing setCamera method', function() {
        SceneBuilder.setCamera();
        SceneBuilder.setCamera(null);
        SceneBuilder.setCamera({});
        var camera = new THREE.PerspectiveCamera();
        SceneBuilder.setCamera(camera);
      });

      it('Testing setControls method', function() {
        SceneBuilder.setControls();
        SceneBuilder.setControls(null);
        SceneBuilder.setControls({});
        var camera = new THREE.PerspectiveCamera();
        var controls = new THREE.TrackballControls(camera);
        SceneBuilder.setControls(controls);
      });

    });
  });
});

