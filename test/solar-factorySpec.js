/*
 * solar-factorySpec
 * @Description Unit tests for solar-factory module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['scene-factory', 'solar-properties'], function(SceneFactory, SolarProperties) {

  var camera;
  var cameraProperties;
  var controls;
  var controlsProperties;
  var light;
  var lightProperties;

  beforeEach(function() {
    camera = null;
    cameraProperties = null;
    controls = null;
    controlsProperties = null;
    light = null;
    lightProperties = null;
  });

  describe('Testing solar service', function() {

    it('Check required modules', function() {
      expect(SceneFactory).not.toBe(null);
      expect(SolarProperties).not.toBe(null);
    });

    it('Testing createCamera method creating a camera with wrong parameters ', function() {
      expect(SceneFactory.createCamera, null).toThrowError(TypeError);
      camera = SceneFactory.createCamera({});
      expect(camera).toBe(undefined);
      controls = SceneFactory.createControls(camera, {});
      expect(controls).toBe(undefined);
    });

    it('Testing createCamera method creating a PerspectiveCamera', function() {
      cameraProperties = {
        type: 'PerspectiveCamera',
      };
      camera = SceneFactory.createCamera(cameraProperties);
      var camera2 = new THREE.PerspectiveCamera();

      compareCameras(camera, camera2);
    });

    it('Testing createCamera method creating a CubeCamera', function() {
      cameraProperties = {
        type: 'CubeCamera',
      };
      camera = SceneFactory.createCamera(cameraProperties);
      var camera2 = new THREE.CubeCamera();

      compareCameras(camera, camera2);
    });

    it('Testing createCamera method creating a OrthographicCamera', function() {
      cameraProperties = {
        type: 'OrthographicCamera',
      };
      camera = SceneFactory.createCamera(cameraProperties);
      var camera2 = new THREE.OrthographicCamera();

      compareCameras(camera, camera2);
    });

    it('Testing createControls method test', function() {
    });

    it('Testing createControls method  with wrong parameters ', function() {
    });

    it('Testing createLight method test', function() {
    });

    it('Testing createLight method with wrong parameters ', function() {

      expect(SceneFactory.createLight, null).toThrowError(TypeError);

      light = SceneFactory.createLight({});
      expect(light).toBe(undefined);
    });

    function compareCameras(camera, camera2){
      expect(camera).not.toBe(undefined);
      expect(camera2).not.toBe(undefined);
      expect(camera.type).toEqual(camera2.type);
      expect(camera.prototype).toEqual(camera2.prototype);
    }

  });
});

