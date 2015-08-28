/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.21 - 2015-08-28
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



THREE.SolarObject = function(systemProperties) {

  THREE.Object3D.call( this );

  this.satellites = [];

  this.name = systemProperties.name;
  this.type = 'SolarObject';
  this.category = systemProperties.category;
  this.radius = systemProperties.radius || 50;
  this.vRotation = systemProperties.vRotation || 0;
  this.vTranslation = systemProperties.vTranslation || 0;
  this.tilt = systemProperties.tilt;
  this.distance = systemProperties.distance;
  this.URLTexture = systemProperties.URLTexture;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(this.URLTexture);
  this.material = new THREE.MeshBasicMaterial({ map: texture });

  this.position.z = systemProperties.distance || 0;
  this.rotation.x = this.tilt || 0;

  for(var i in systemProperties.satellites) {
    this.add(new THREE.SolarObject(systemProperties.satellites[i]));
  }

  this.updateMorphTargets();
};

THREE.SolarObject.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarObject.prototype.constructor = THREE.SolarObject;

THREE.SolarObject.prototype.addSatellite = function(satellite) {
  this.satellites.push(satellite);
};

THREE.SolarObject.prototype.createOrbit = function(position){
  this.parent = new THREE.Object3D();
  this.parent.position = position;
  this.parent.add(this);
  this.position.z = position.z + this.orbitDistance;
};

THREE.SolarObject.prototype.update = function() {
  this.rotation.y += this.vRotation * Math.PI / 180 ;     // Rotates  45 degrees per frame;

  // Update the new position of the orbit of the satellites.
  for(var i in this.satellites){
    this.satellites[i].updateOrbit(this.position);
  }
};

THREE.SolarObject.prototype.updateOrbit = function(position){
  this.parent.position = position;
  this.parent.position.y = this.parent.rotation.y;
  this.parent.rotation.y += this.vTranslation * Math.PI / 180  || 0;

  if(this.orbit === 'Earth') {
    console.log(position);
    console.log(this.parent.rotation.y);
    console.log(this.position.z + ' - ' + this.parent.position.z + ' - ' + position.z );
  }
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
    if(objectProperties.orbit) {
      for(var i in solarObjects) {
        if(solarObjects[i].name === objectProperties.orbit) {
          solarObject.createOrbit(solarObjects[i].position);
          solarObjects[i].addSatellite(solarObject);
        }
      }
      scene.add(solarObject.parent);
      return;
    }

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
