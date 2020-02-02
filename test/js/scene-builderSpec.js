/*
 * scene-builderSpec.js
 * @Description Unit tests for scene-builder module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
describe('SceneBuilder', function() {

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  const scene = new SceneBuilder();
  // Mocked Dom Element to test scene builder.
  const element = document.createElement('div');

  describe('before being initiated', function() {

    var sceneNotInitiated = new SceneBuilder();

    it('should not allow to add object', function() {
      var body = new THREE.SolarBody();
      expect(sceneNotInitiated.addObject, body).to.throw(TypeError);
    });

    it('should not allow animate', function() {
      expect(sceneNotInitiated.animate).to.throw(TypeError);
    });

    it('should allow to set camera because camera is independent from scene', function() {
      sceneNotInitiated.setCamera();
      sceneNotInitiated.setCamera(null);
      sceneNotInitiated.setCamera({});
      var camera = new THREE.PerspectiveCamera();
      sceneNotInitiated.setCamera(camera);
    });

    it('should allow to set controls because controls are independent form scene', function() {
      sceneNotInitiated.setControls();
      sceneNotInitiated.setControls(null);
      sceneNotInitiated.setControls({});
      var camera = new THREE.PerspectiveCamera();
      var controls = new THREE.TrackballControls(camera, renderer.domElement);
      sceneNotInitiated.setControls(controls);
    });

  });

  it('should allow to call init method adding a different objects', function() {
    scene.init();
    scene.init(null);
    scene.init({});
    scene.init({width: 'error', height: 'error'});
    scene.init(element);
  });

  describe('after being initiated', function() {

    var sceneInitiated = new SceneBuilder();
    sceneInitiated.init(element);

    it('should allow to add different objects', function() {
      var light = new THREE.AmbientLight(0x404040);
      var moon = new THREE.MoonMesh();
      var planet = new THREE.PlanetMesh();
      var star = new THREE.StarMesh();

      sceneInitiated.addObject({});
      sceneInitiated.addObject(light);
      sceneInitiated.addObject(moon);
      sceneInitiated.addObject(planet);
      sceneInitiated.addObject(star);
    });

    it('should allow to animate scene', function() {
      sceneInitiated.animate();
    });

    it('should allow to set cameras', function() {
      sceneInitiated.setCamera();
      sceneInitiated.setCamera(null);
      sceneInitiated.setCamera({});
      var camera = new THREE.PerspectiveCamera();
      sceneInitiated.setCamera(camera);
    });

    it('should allow to set controls', function() {
      sceneInitiated.setControls();
      sceneInitiated.setControls(null);
      sceneInitiated.setControls({});
      var camera = new THREE.PerspectiveCamera();
      var controls = new THREE.TrackballControls(camera, renderer.domElement);
      sceneInitiated.setControls(controls);
    });

  });
});
