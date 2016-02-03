/*
 * scene-factorySpec
 * @Description Unit tests for scene-factory module.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define(['scene-factory'], function(SceneFactory) {

  describe('Testing scene-factory', function() {

    it('Check required modules', function() {
      expect(SceneFactory).not.toBe(null);
    });

    it('Testing createCamera method', function() {

      it('Testing createCamera method creating a camera with wrong parameters ', function() {
        expect(SceneFactory.createCamera, null).toThrowError(TypeError);
        expect(SceneFactory.createCamera, {}).toThrowError(TypeError);
      });


      it('Testing createCamera method creating a PerspectiveCamera', function() {
        var cameraProperties = {
          type: 'PerspectiveCamera',
        };
        var camera = SceneFactory.createCamera(cameraProperties);
        var camera2 = new THREE.PerspectiveCamera();

        compareObjects(camera, camera2);
      });

      it('Testing createCamera method creating a CubeCamera', function() {
        var cameraProperties = {
          type: 'CubeCamera',
        };
        var camera = SceneFactory.createCamera(cameraProperties);
        var camera2 = new THREE.CubeCamera();

        compareObjects(camera, camera2);
      });

      it('Testing createCamera method creating a OrthographicCamera', function() {
        var cameraProperties = {
          type: 'OrthographicCamera',
        };
        var camera = SceneFactory.createCamera(cameraProperties);
        var camera2 = new THREE.OrthographicCamera();

        compareObjects(camera, camera2);
      });
    });

    it('Testing createControls method', function(){

      var camera;

      beforeEach(function() {
        camera = new THREE.PerspectiveCamera();
      });

      it('Testing createControls method  with wrong parameters ', function() {
        expect(SceneFactory.createControls, null, null).toThrowError(TypeError);
        expect(SceneFactory.createLight, {}, {}).toThrowError(TypeError);
      });

      it('Testing createControls method creating a TrackballControls', function() {
        var controls = SceneFactory.createControls(camera, 'TrackballControls');
        var controls2 = new THREE.TrackballControls(camera);
        compareObjects(controls, controls2);
      });

      it('Testing createControls method creating a DeviceOrientationControls', function() {
        var controls = SceneFactory.createControls(camera, 'DeviceOrientationControls');
        var controls2 = new THREE.DeviceOrientationControls(camera);
        compareObjects(controls, controls2);
      });

      it('Testing createControls method creating a FlyControls', function() {
        var controls = SceneFactory.createControls(camera, 'FlyControls');
        var controls2 = new THREE.FlyControls(camera);
        compareObjects(controls, controls2);
      });

      it('Testing createControls method creating a OrbitControls', function() {
        var controls = SceneFactory.createControls(camera, 'OrbitControls');
        var controls2 = new THREE.OrbitControls(camera);
        compareObjects(controls, controls2);
      });

      it('Testing createControls method creating a PointerLockControls', function() {
        var controls = SceneFactory.createControls(camera, 'PointerLockControls');
        var controls2 = new THREE.PointerLockControls(camera);
        compareObjects(controls, controls2);
      });

      it('Testing createControls method creating a TransformControls', function() {
        var controls = SceneFactory.createControls(camera, 'TransformControls');
        var controls2 = new THREE.TransformControls(camera);
        compareObjects(controls, controls2);
      });

    });

    it('Testing createLight method', function() {

      it('Testing createLight method with wrong parameters ', function() {
        expect(SceneFactory.createLight, null).toThrowError(TypeError);
        expect(SceneFactory.createLight, {}).toThrowError(TypeError);
      });

      it('Testing createLight method test creating a AmbientLight', function() {
        var lightProperties = {
          type: 'AmbientLight',
        };
        var light = SceneFactory.createLight(lightProperties);
        var light2 = new THREE.AmbientLight();

        compareObjects(light, light2);
      });

      it('Testing createLight method test creating a DirectionalLight', function() {
        var lightProperties = {
          type: 'DirectionalLight',
        };
        var light = SceneFactory.createLight(lightProperties);
        var light2 = new THREE.DirectionalLight();

        compareObjects(light, light2);
      });

      it('Testing createLight method test creating a HemisphereLight', function() {
        var lightProperties = {
          type: 'HemisphereLight',
        };
        var light = SceneFactory.createLight(lightProperties);
        var light2 = new THREE.HemisphereLight();

        compareObjects(light, light2);
      });

      it('Testing createLight method test creating a PointLight', function() {
        var lightProperties = {
          type: 'PointLight',
        };
        var light = SceneFactory.createLight(lightProperties);
        var light2 = new THREE.PointLight();

        compareObjects(light, light2);
      });

      it('Testing createLight method test creating a SpotLight', function() {
        var lightProperties = {
          type: 'SpotLight',
        };
        var light = SceneFactory.createLight(lightProperties);
        var light2 = new THREE.SpotLight();

        compareObjects(light, light2);
      });
    });

    it('Testing createMoon method creating a moon with wrong parameters ', function() {
      expect(SceneFactory.createMoon, null).toThrowError(TypeError);
      expect(SceneFactory.createMoon, {}).toThrowError(TypeError);
    });

    it('Testing createMoon method', function() {
      var moonProperties = {
        type: 'Moon'
      };
      var moon = SceneFactory.createMoon(moonProperties);
      var moon2 = new THREE.MoonMesh(moonProperties);

      compareObjects(moon, moon2);
    });

    it('Testing createPlanet method creating a planet with wrong parameters ', function() {
      expect(SceneFactory.createPlanet, null).toThrowError(TypeError);
      expect(SceneFactory.createPlanet, {}).toThrowError(TypeError);
    });

    it('Testing createPlanet method', function() {
      var planetProperties = {
        type: 'Planet'
      };
      var planet = SceneFactory.createPlanet(planetProperties);
      var planet2 = new THREE.PlanetMesh(planetProperties);

      compareObjects(planet, planet2);
    });

    it('Testing createStar method creating a star with wrong parameters ', function() {
      expect(SceneFactory.createStar, null).toThrowError(TypeError);
      expect(SceneFactory.createStar, {}).toThrowError(TypeError);
    });

    it('Testing createStar method', function() {
      var starProperties = {
        type: 'Star'
      };
      var star = SceneFactory.createStar(starProperties);
      var star2 = new THREE.StarMesh(starProperties);

      compareObjects(star, star2);
    });

    function compareObjects(o1, o2){
      expect(o1).not.toBe(undefined);
      expect(o2).not.toBe(undefined);
      expect(o1.type).toEqual(o2.type);
      expect(o1.prototype).toEqual(o2.prototype);
    }

  });
});
