
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
