/*
 * scene-builderSpec
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

    it('Testing addObject method', function() {

      it('Testing addObject method with wrong parameters', function() {
        expect(SceneBuilder.addObject, null).toThrowError(TypeError);
        expect(SceneBuilder.addObject, {}).toThrowError(TypeError);
      });

      it('Testing addObject method adding a different objects', function() {
        var light = new THREE.AmbientLight();
        var moon = new THREE.MoonMesh({type: 'Moon'});
        var planet = new THREE.PlanetMesh({type: 'Planet'});
        var star = new THREE.StarMesh({type: 'Star'});

        SceneBuilder.addObject(light);
        SceneBuilder.addObject(moon);
        SceneBuilder.addObject(planet);
        SceneBuilder.addObject(star);
      });

    });

    it('Testing animate method', function() {

      it('Testing animate method without being initiated before ', function() {
        expect(SceneBuilder.animate).toThrowError(TypeError);
      });

      xit('Testing animate method after being initiated before ', function() {
        spyOn(THREE, 'WebGLRenderer');
        SceneBuilder.init();
        SceneBuilder.animate();
      });

    });

    it('Testing setCamera method', function() {

      it('Testing setCamera method with wrong parameters', function() {
        expect(SceneBuilder.setCamera, null).toThrowError(TypeError);
        expect(SceneBuilder.setCamera, {}).toThrowError(TypeError);
      });

      var camera = new THREE.PerspectiveCamera();
      SceneBuilder.setCamera(camera);

    });

    it('Testing setControls method', function() {

      it('Testing setControls method with wrong parameters', function() {
        expect(SceneBuilder.setControls, null).toThrowError(TypeError);
        expect(SceneBuilder.setControls, {}).toThrowError(TypeError);
      });

      var camera = new THREE.PerspectiveCamera();
      var controls = new THREE.TrackballControls(camera);
      SceneBuilder.setControls(controls);
    });

    xit('Testing init method', function() {
      spyOn(THREE, 'WebGLRenderer');
      SceneBuilder.init();
    });

  });
});

