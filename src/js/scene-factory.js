
define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;
  var solarBodies = [];
  var solarOrbits = [];

  var factory = {
    createCamera: createCamera,
    createBody: createBody,
    init: init
  };

  return factory;

  function createCamera(cameraProperties) {
    camera = new THREE.SolarCamera(cameraProperties);

    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);
  }

  function createBody(bodyProperties){
    var solarBody = new THREE.SolarBody(bodyProperties);
    solarBodies.push(solarBody);
    if(bodyProperties.orbitProperties) {

      var orbitProperties = bodyProperties.orbitProperties;
      orbitProperties.name = bodyProperties.name;

      var solarOrbit = new THREE.SolarOrbit(orbitProperties);

      var solarParentOrbit;
      for(var i in solarOrbits) {
        if(orbitProperties.round === solarOrbits[i].name) {
          solarParentOrbit = solarOrbits[i];
        }
      }

      if(solarParentOrbit) {
        solarOrbit.position.z = solarParentOrbit.position.z + solarParentOrbit.radius || 0;
        solarParentOrbit.add(solarOrbit);
      } else {
        scene.add(solarOrbit);
      }

      solarOrbits.push(solarOrbit);

      solarBody.position.z = solarOrbit.radius || 0;
      solarOrbit.add(solarBody);
    } else {
      scene.add(solarBody);
    }
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

    for(var i in solarBodies) {
      solarBodies[i].update();
    }

    for(var j in solarOrbits) {
      solarOrbits[j].update();
    }

    controls.update();

    render();
  }
});
