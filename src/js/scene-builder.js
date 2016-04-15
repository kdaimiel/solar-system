/*
 * solar-service.js
 * @Description Solar Builder sets and renders the scene.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('scene-builder', function() {

  'use strict';

  var scene, camera, renderer, controls, stats;
  var width, height;

  var factory = {
    addObject: addObject,
    animate : animate,
    setCamera: setCamera,
    setControls: setControls,
    init: init
  };

  return factory;

  function setCamera(newCamera) {
    camera = newCamera;
    //console.log('New camera has been placed in the scene');
  }

  function addObject(object) {
    scene.add(object);
    camera.aspect = (width || window.innerWidth) / (height || window.innerHeight);
    camera.updateProjectionMatrix();
    //console.log('New object of type "' + object.type + '"" has been added to the scene');
  }

  function setControls(newControls){
    controls = newControls;
    if(controls && controls.addEventListener) {
      controls.addEventListener('change', render);
    }
    //console.log('New controls have been added to the camera');
  }

  function render() {
    renderer.render(scene, camera);
  }

  function init(element) {
    scene = new THREE.Scene();
    if(element){
      width = element.width || null;
      height = element.height || null;
    }

    if(controls) {
      controls.addEventListener('change', render);
    }

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width || window.innerWidth , height || window.innerHeight);

    document.body.appendChild( renderer.domElement );

    // Set stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    // Catch
    window.addEventListener( 'resize', onWindowResize, false );

    //console.log('Scene initiated');
  }

  function animate() {

    if(!scene) {
      throw new TypeError('Scene has to be initiated before animate');
    }

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
    stats.update();
  }

  function onWindowResize() {
    if(camera) {
      camera.aspect = (width || window.innerWidth) / (height || window.innerHeight);
      camera.updateProjectionMatrix();
    }

    renderer.setSize(width || window.innerWidth , height || window.innerHeight);

    if(controls) {
      controls.handleResize();
    }
  }

});
