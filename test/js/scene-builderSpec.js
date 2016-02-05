/*
 * scene-builderSpec.js
 * @Description Unit tests for scene-builder module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['scene-builder'], function(SceneBuilder) {

  describe('Testing scene-builder', function() {

    it('Check required modules', function() {
      expect(SceneBuilder).not.toBe(null);
    });

    describe('Testing addObject method', function() {

      xit('Testing addObject method with wrong parameters', function() {
        expect(SceneBuilder.addObject, null).toThrowError(TypeError);
        expect(SceneBuilder.addObject, {}).toThrowError(TypeError);
      });

      xit('Testing addObject method adding a different objects', function() {
        var light = new THREE.AmbientLight();
        var moon = new THREE.MoonMesh({});
        var planet = new THREE.PlanetMesh({});
        var star = new THREE.StarMesh({});

        SceneBuilder.addObject(light);
        SceneBuilder.addObject(moon);
        SceneBuilder.addObject(planet);
        SceneBuilder.addObject(star);
      });

    });

    describe('Testing animate method', function() {

      it('Testing animate method without being initiated before ', function() {
        expect(SceneBuilder.animate).toThrowError(TypeError);
      });

      it('Testing animate method after being initiated before ', function() {
        SceneBuilder.init();
        SceneBuilder.animate();
      });

    });

    xit('Testing setCamera method with wrong parameters', function() {
      expect(SceneBuilder.setCamera, null).toThrowError(TypeError);
      expect(SceneBuilder.setCamera, {}).toThrowError(TypeError);
    });

    it('Testing setCamera method', function() {
      var camera = new THREE.PerspectiveCamera();
      SceneBuilder.setCamera(camera);
    });

    it('Testing setControls method with wrong parameters', function() {
      expect(SceneBuilder.setControls, null).toThrowError(TypeError);
      expect(SceneBuilder.setControls, {}).toThrowError(TypeError);
    });

    it('Testing setControls method', function() {
      var camera = new THREE.PerspectiveCamera();
      var controls = new THREE.TrackballControls(camera);
      SceneBuilder.setControls(controls);
    });

    it('Testing init method', function() {
      SceneBuilder.init();
    });

  });
});

