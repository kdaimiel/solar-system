/*
 * solar-factorySpec
 * @Description Unit tests for solar-factory module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['scene-factory', 'solar-properties'], function(SceneFactory, SolarProperties) {
//define( function() {

  var camera;
  var controls;
  var light;

  beforeEach(function() {
    camera = null;
    controls = null;
    light = null;
  });

  describe('Testing solar service', function() {

    it('Check required modules', function() {
      expect(SceneFactory).not.toBe(null);
      expect(SolarProperties).not.toBe(null);
    });

    it('Testing createCamera method creating a PerspectiveCamera', function() {

    });

    it('Testing createCamera method creating a PerspectiveCamera with wrong parameters ', function() {
      camera = SceneFactory.createCamera({});
      expect(camera).toBe(undefined);
      controls = SceneFactory.createControls(camera, {});
      expect(controls).toBe(undefined);

      //var camera = SolarFactory.createCamera(null);
      //expect(camera).toBe(undefined);
    });

    it('Testing createCamera method creating a CubeCamera', function() {
      //var camera = SolarFactory.createCamera(null);
      //expect(camera).toBe(undefined);
    });

    it('Testing createCamera method creating a CubeCamera with wrong parameters ', function() {
      //var camera = SolarFactory.createCamera(null);
      //expect(camera).toBe(undefined);
    });

    it('Testing createCamera method creating a OrthographicCamera', function() {
      //var camera = SolarFactory.createCamera(null);
      //expect(camera).toBe(undefined);
    });

    it('Testing createCamera method creating a OrthographicCamera with wrong parameters ', function() {
      //var camera = SolarFactory.createCamera(null);
      //expect(camera).toBe(undefined);
    });

    it('The createControls method test', function() {
    });

    it('The createControls method method with wrong parameters ', function() {
    });

    it('The createLight method test', function() {
    });

    it('The createLight method method with wrong parameters ', function() {

      console.log('A');
      //expect(SceneFactory.createLight({})).toThrowError(TypeError);
      console.log('B');


      light = SceneFactory.createLight({});
      expect(light).toBe(undefined);
    });

  });
});

