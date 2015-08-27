/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.19 - 2015-08-27
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

  this.satellites = [];

  this.type = 'SolarObject';

  this.parameters = {
    name: objectProperties.name,
    category: objectProperties.category,
    radius: objectProperties.radius,
    vRotation: objectProperties.vRotation,
    vTranslation: objectProperties.vTranslation,
    tilt: objectProperties.tilt,
    orbit: objectProperties.orbit,
    orbitDistance: objectProperties.orbitDistance,
    URLTexture: objectProperties.URLTexture
  };

  this.parameters.radius = objectProperties.radius || 50;
  this.parameters.vRotation = objectProperties.vRotation || 0;
  this.parameters.vTranslation = objectProperties.vTranslation || 0;

  this.position.z = objectProperties.orbitDistance || 0;

  this.geometry = new THREE.SphereGeometry(this.parameters.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(objectProperties.URLTexture);
  this.material = new THREE.MeshBasicMaterial({ map: texture });

  this.rotation.x = objectProperties.tilt || 0;

  this.updateMorphTargets();

   /*if(solarObject.orbit) {
      for(var i in meshs) {
        if(meshs[i].identifier === solarObject.orbit) {

          var orbit = new THREE.Object3D();
          orbit.position.x = meshs[i].position.x;
          orbit.position.y = meshs[i].position.y;
          orbit.position.z = meshs[i].position.z;
          orbit.vTranslation = solarObject.vTranslation;
          scene.add(orbit);
          orbits.push(orbit);

          var pivot = new THREE.Object3D();
          orbit.add(pivot);

          mesh.position.z = solarObject.distance + meshs[i].position.z;
          pivot.add(mesh);
          break;
        }
      }
    } else {
      scene.add(mesh);
    }*/

};

THREE.SolarObject.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarObject.prototype.constructor = THREE.SolarObject;

THREE.SolarObject.prototype.addSatelite = function(satellite) {
  this.satellites.push(satellite);
};

THREE.SolarObject.prototype.update = function() {
  this.rotation.y += this.parameters.vRotation * Math.PI / 180 ;     // Rotates  45 degrees per frame;

  // Update the new position of the orbit of the satellites.
  for(var i in this.satellites){
    this.satellites[i].updateOrbit();
  }
};

THREE.SolarObject.prototype.updateOrbit = function(newPosition){
  this.position = newPosition;
};


define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;
  var solarObjects = [];

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
    scene.add(solarObject);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    animate();
  }

  function animate() {

    requestAnimationFrame( animate );

    for(var i in solarObjects) {
      solarObjects[i].update();
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
    getJSON('../src/data/solar-camera.json', callback);
  }

  function getObjects(callback){
    getJSON('../src/data/solar-objects.json', callback);
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

  function loadObjects(objects) {
    objects.forEach(function(element) {
      SceneFactory.createMesh(element);
    });
  }
});
