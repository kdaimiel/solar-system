
define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;

  var factory = {
    addObject: addObject,
    createCamera: createCamera,
    init: init
  };

  return factory;

  function addObject(object) {
    scene.add(object);
  }

  function createCamera(cameraProperties) {
    camera = new THREE.SolarCamera(cameraProperties);
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

    //var light = new THREE.AmbientLight( 0x888888 );
    var light = new THREE.AmbientLight( 0xFFFFFF);

    scene.add( light );

    animate();
  }

  function animate() {

    requestAnimationFrame( animate );

    for(var i in scene.children) {
      if(scene.children[i].update) {
        scene.children[i].update();
      }
    }

    controls.update();

    render();
  }
});
