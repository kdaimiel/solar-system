
define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;

  var factory = {
    addObject: addObject,
    animate : animate,
    createCamera: createCamera,
    createControls: createControls,
    init: init
  };

  return factory;

  function addObject(object) {
    scene.add(object);
  }

  function createCamera(cam) {
    camera = cam;
  }

  function createControls(){
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
  }

  function animate() {

    requestAnimationFrame( animate );

    for(var i in scene.children) {
      if(scene.children[i].update) {
        scene.children[i].update();
      }
    }

    if(controls) {
      controls.update();
    }

    render();
  }
});
