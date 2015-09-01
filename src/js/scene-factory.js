
define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;
  var solarObjects = [];
  var solarOrbits = [];

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
    if(objectProperties.orbitRound) {

      var orbitProperties = {
        name: objectProperties.name,
        radius: objectProperties.orbitRadius,
        speed: objectProperties.orbitSpeed,
        tilt: objectProperties.orbitTilt
      };
      var solarOrbit = new THREE.SolarOrbit(orbitProperties);

      var solarParentOrbit;
      for(var i in solarOrbits) {
        if(objectProperties.orbitRound === solarOrbits[i].name) {
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

      solarObject.position.z = solarOrbit.radius || 0;
      solarOrbit.add(solarObject);
    } else {
      scene.add(solarObject);
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

    animate();
  }

  function animate() {

    requestAnimationFrame( animate );

    for(var i in solarObjects) {
      solarObjects[i].update();
    }

    for(var j in solarOrbits) {
      solarOrbits[j].update();
    }

    controls.update();

    render();
  }
});
