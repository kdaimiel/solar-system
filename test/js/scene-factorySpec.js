/*
 * scene-factorySpec.js
 * @Description Unit tests for scene-factory module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
describe('SceneFactory', function () {

  it('should be defined', function () {
    expect(SceneFactory).not.toBe(null);
  });

  it('should throw an error when a camera is created with wrong parameters ', function () {
    expect(SceneFactory.createCamera, null).toThrowError(TypeError);
    expect(SceneFactory.createCamera, {}).toThrowError(TypeError);
  });

  it('should be able to create a PerspectiveCamera', function () {
    var cameraProperties = {
      type: 'PerspectiveCamera',
    };
    var camera = SceneFactory.createCamera(cameraProperties);
    var camera2 = new THREE.PerspectiveCamera();

    compareObjects(camera, camera2);
  });

  it('should be able to create a CubeCamera', function () {
    var cameraProperties = {
      type: 'CubeCamera',
    };
    var camera = SceneFactory.createCamera(cameraProperties);
    var camera2 = new THREE.CubeCamera();

    compareObjects(camera, camera2);
  });

  it('should be able to create a OrthographicCamera', function () {
    var cameraProperties = {
      type: 'OrthographicCamera',
    };
    var camera = SceneFactory.createCamera(cameraProperties);
    var camera2 = new THREE.OrthographicCamera();

    compareObjects(camera, camera2);
  });

  it('should trhow an error when a controll is created with wrong parameters ', function () {
    expect(SceneFactory.createControls, null, null).toThrowError(TypeError);
    expect(SceneFactory.createControls, {}, {}).toThrowError(TypeError);
  });

  it('should be able to create a TrackballControls for a given camera', function () {
    var camera = new THREE.PerspectiveCamera();
    var controls = SceneFactory.createControls(camera, 'TrackballControls');
    var controls2 = new THREE.TrackballControls(camera);
    compareObjects(controls, controls2);
  });

  it('should be able to create a DeviceOrientationControls for a given camera', function () {
    var camera = new THREE.PerspectiveCamera();
    var controls = SceneFactory.createControls(camera, 'DeviceOrientationControls');
    var controls2 = new THREE.DeviceOrientationControls(camera);
    compareObjects(controls, controls2);
  });

  it('should be able to create a FlyControls for a given camera', function () {
    var camera = new THREE.PerspectiveCamera();
    var controls = SceneFactory.createControls(camera, 'FlyControls');
    var controls2 = new THREE.FlyControls(camera);
    compareObjects(controls, controls2);
  });

  it('should be able to create a OrbitControls for a given camera', function () {
    var camera = new THREE.PerspectiveCamera();
    var controls = SceneFactory.createControls(camera, 'OrbitControls');
    var controls2 = new THREE.OrbitControls(camera);
    compareObjects(controls, controls2);
  });

  it('should be able to create a PointerLockControls for a given camera', function () {
    var camera = new THREE.PerspectiveCamera();
    var controls = SceneFactory.createControls(camera, 'PointerLockControls');
    var controls2 = new THREE.PointerLockControls(camera);
    compareObjects(controls, controls2);
  });

  it('should be able to create a TransformControls for a given camera', function () {
    var camera = new THREE.PerspectiveCamera();
    var controls = SceneFactory.createControls(camera, 'TransformControls');
    var controls2 = new THREE.TransformControls(camera);
    compareObjects(controls, controls2);
  });

  it('should trhow an error when a light is created with wrong parameters', function () {
    expect(SceneFactory.createLight, null).toThrowError(TypeError);
    expect(SceneFactory.createLight, {}).toThrowError(TypeError);
  });

  it('should be able to create an AmbientLight', function () {
    var lightProperties = {
      type: 'AmbientLight',
    };
    var light = SceneFactory.createLight(lightProperties);
    var light2 = new THREE.AmbientLight();

    compareObjects(light, light2);
  });

  it('should be able to create a DirectionalLight', function () {
    var lightProperties = {
      type: 'DirectionalLight',
    };
    var light = SceneFactory.createLight(lightProperties);
    var light2 = new THREE.DirectionalLight();

    compareObjects(light, light2);
  });

  it('should be able to create an HemisphereLight', function () {
    var lightProperties = {
      type: 'HemisphereLight',
    };
    var light = SceneFactory.createLight(lightProperties);
    var light2 = new THREE.HemisphereLight();

    compareObjects(light, light2);
  });

  it('should be able to create a PointLight', function () {
    var lightProperties = {
      type: 'PointLight',
    };
    var light = SceneFactory.createLight(lightProperties);
    var light2 = new THREE.PointLight();

    compareObjects(light, light2);
  });

  it('should be able to create a SpotLight', function () {
    var lightProperties = {
      type: 'SpotLight',
    };
    var light = SceneFactory.createLight(lightProperties);
    var light2 = new THREE.SpotLight();

    compareObjects(light, light2);
  });

  function compareObjects(o1, o2) {
    expect(o1).not.toBe(undefined);
    expect(o2).not.toBe(undefined);
    expect(o1.type).toEqual(o2.type);
    expect(o1.prototype).toEqual(o2.prototype);
  }

});
