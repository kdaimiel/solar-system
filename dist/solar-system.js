/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.15 - 2015-08-24
 * @link https://github.com/KenEDR/three-solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

define('scene-factory', function() {

  'use strict';

  var factory = {
    createCamera: createCamera,
    createMesh: createMesh
  };

  return factory;

  function createCamera(cameraProps) {
    var camera = new THREE.PerspectiveCamera(cameraProps.fov, window.innerWidth / window.innerHeight, cameraProps.near, cameraProps.far);
    camera.position.z = cameraProps.position.z;
    return camera;
  }

  function createMesh(solarObject){
    var geometry = new THREE.SphereGeometry(solarObject.radius, 50, 50);
    var texture = THREE.ImageUtils.loadTexture(solarObject.textureUrl);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = solarObject.distance || 0;
    return mesh;
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

  var scene, camera, renderer, controls;

  init();

  function render() {
    renderer.render(scene, camera);
  }


  function init() {

    scene = new THREE.Scene();

    SolarService.getCamera(loadCamera);
    SolarService.getObjects(loadObjects);

  }

  function animate() {

    requestAnimationFrame( animate );

    controls.update();

    render();

  }

  function loadCamera(cameraProps) {
    camera = SceneFactory.createCamera(cameraProps);

    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    animate();


  }

  function loadObjects(objects) {
    objects.forEach(function(element) {
      scene.add(SceneFactory.createMesh(element));
    });


  }

});
