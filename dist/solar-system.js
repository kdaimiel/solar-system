/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.18 - 2015-08-26
 * @link https://github.com/KenEDR/three-solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

define('scene-factory', function() {

  'use strict';

  var scene = new THREE.Scene();
  var camera, renderer, controls;
  var meshs = [];

  var factory = {
    createCamera: createCamera,
    createMesh: createMesh,
    init: init
  };

  return factory;

  function createCamera(cameraProps) {
    camera = new THREE.PerspectiveCamera(cameraProps.fov, window.innerWidth / window.innerHeight, cameraProps.near, cameraProps.far);
    camera.position.x = cameraProps.position.x;
    camera.position.y = cameraProps.position.y;
    camera.position.z = cameraProps.position.z;

    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);

  }

  function createMesh(solarObject){
    var geometry = new THREE.SphereGeometry(solarObject.radius, 50, 50);
    var texture = THREE.ImageUtils.loadTexture(solarObject.textureUrl);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.name = solarObject.name;
    mesh.position.z = solarObject.distance || 0;
    console.log(solarObject.tilt);
    mesh.phiStart = solarObject.tilt;
    scene.add(mesh);
    mesh.Yrotation = solarObject.rotation;
    meshs.push(mesh);
  }

  function render() {
    renderer.render(scene, camera);
  }


  function init() {


    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    animate();
  }

  function animate() {

    requestAnimationFrame( animate );

    if(controls) {
      controls.update();
    }

    for(var i in meshs) {
      meshs[i].rotation.y += meshs[i].Yrotation;
    }

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
        console.err('Load JSON error:' + err);
      }
    });
  }

});


require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  SolarService.getCamera(loadCamera);
  SolarService.getObjects(loadObjects);

  function loadCamera(cameraProps) {
    SceneFactory.createCamera(cameraProps);
    SceneFactory.init();
  }

  function loadObjects(objects) {
    objects.forEach(function(element) {
      SceneFactory.createMesh(element);
    });
  }
});
