
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
