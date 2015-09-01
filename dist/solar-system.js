/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.29 - 2015-09-01
 * @link https://github.com/KenEDR/three-solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

THREE.SolarCamera = function(cameraProperties) {

  THREE.PerspectiveCamera.call( this );

  this.type = 'SolarCamera';

  this.zoom = cameraProperties.zoom !== undefined ? cameraProperties.zoom : 1;

  this.fov = cameraProperties.fov !== undefined ? cameraProperties.fov : 50;
  this.aspect = cameraProperties.aspect !== undefined ? cameraProperties.aspect : window.innerWidth / window.innerHeight;
  this.near = cameraProperties.near !== undefined ? cameraProperties.near : 0.1;
  this.far = cameraProperties.far !== undefined ? cameraProperties.far : 2000;
  this.position.x = cameraProperties.position.x !== undefined ? cameraProperties.position.x : 0;
  this.position.y = cameraProperties.position.y !== undefined ? cameraProperties.position.y : 0;
  this.position.z = cameraProperties.position.z !== undefined ? cameraProperties.position.z : 0;

  this.updateProjectionMatrix();

};

THREE.SolarCamera.prototype = Object.create( THREE.PerspectiveCamera.prototype);
THREE.SolarCamera.prototype.constructor = THREE.PerspectiveCamera;



THREE.SolarObject = function(objectProperties) {

  THREE.Object3D.call( this );

  this.name = objectProperties.name;
  this.type = 'SolarObject';
  this.category = objectProperties.category;
  this.radius = objectProperties.radius || 50;
  this.vRotation = objectProperties.vRotation || 0;
  this.URLTexture = objectProperties.URLTexture;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(this.URLTexture);
  this.material = new THREE.MeshBasicMaterial({ map: texture });

  this.rotation.x = this.tilt || 0;

  this.updateMorphTargets();
};

THREE.SolarObject.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarObject.prototype.constructor = THREE.SolarObject;

THREE.SolarObject.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180 ;     // Rotates  45 degrees per frame;
};




THREE.SolarOrbit = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.name = orbitProperties.name;
  this.type = 'SolarOrbit';
  this.radius = orbitProperties.radius || 50;
  this.speed = orbitProperties.speed || 0;
  this.tilt = orbitProperties.tilt || 0;

  //this.updateMorphTargets();
};

THREE.SolarOrbit.prototype = Object.create( THREE.Object3D.prototype );
THREE.SolarOrbit.prototype.constructor = THREE.SolarOrbit;

THREE.SolarOrbit.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  45 degrees per frame;
};


define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;
  var solarObjects = [];
  var solarOrbits = [];

  var factory = {
    createCamera: createCamera,
    createMesh: createMesh,
    init: init
  };

  return factory;

  function createCamera(cameraProperties) {
    camera = new THREE.SolarCamera(cameraProperties);

    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);
  }

  function createMesh(objectProperties){
    var solarObject = new THREE.SolarObject(objectProperties);
    solarObjects.push(solarObject);
    if(objectProperties.orbitRound) {

      var orbitProperties = {
        name: objectProperties.name,
        radius: objectProperties.orbitRadius,
        speed: objectProperties.orbitSpeed,
        tilt: objectProperties.orbitTilt
      };
      var solarOrbit = new THREE.SolarOrbit(orbitProperties);

      var solarParentOrbit;
      for(var i in solarOrbits) {
        if(objectProperties.orbitRound === solarOrbits[i].name) {
          solarParentOrbit = solarOrbits[i];
        }
      }

      if(solarParentOrbit) {
        solarOrbit.position.z = solarParentOrbit.position.z + solarParentOrbit.radius || 0;
        solarParentOrbit.add(solarOrbit);
      } else {
        scene.add(solarOrbit);
      }

      solarOrbits.push(solarOrbit);

      solarObject.position.z = solarOrbit.radius || 0;
      solarOrbit.add(solarObject);
    } else {
      scene.add(solarObject);
    }
  }

  function render() {
    renderer.render(scene, camera);
  }

  function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    animate();
  }

  function animate() {

    requestAnimationFrame( animate );

    for(var i in solarObjects) {
      solarObjects[i].update();
    }

    for(var j in solarOrbits) {
      solarOrbits[j].update();
    }

    controls.update();

    render();
  }
});


define('solar-service', function() {

  'use strict';

  var service = {
    getCamera: getCamera,
    getObjects: getObjects
  };

  return service;

  function getCamera(callback){
    getJSON('../src/data/camera.properties.json', callback);
  }

  function getObjects(callback){
    getJSON('../src/data/system.properties.json', callback);
  }

  function getJSON(src, callback) {
    $.ajax(src, {
      success: function(data) {
        return callback(data);
      },
      error: function(err) {
        console.error('Load JSON error:' + err);
      }
    });
  }

});


require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  SolarService.getCamera(loadCamera);

  function loadCamera(cameraProperties) {
    SceneFactory.createCamera(cameraProperties);
    SceneFactory.init();
    SolarService.getObjects(loadObjects);
  }

  function loadObjects(systemPropertes) {
    systemPropertes.forEach(function(element) {
      SceneFactory.createMesh(element);
    });
  }
});
