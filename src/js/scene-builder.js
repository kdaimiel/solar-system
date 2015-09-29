
define('scene-builder', function() {

  'use strict';

  var scene, camera, renderer, controls;

  var factory = {
    addCamera: addCamera,
    addObject: addObject,
    animate : animate,
    setControls: setControls,
    init: init
  };

  return factory;

  function addCamera(newCamera) {
    camera = newCamera;
  }

  function addObject(object) {
    scene.add(object);
  }

  function setControls(newControls){
    controls = newControls;
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
        scene.children[i].update(camera);
      }
    }

    if(controls) {
      controls.update();
    }

    render();
  }
});
