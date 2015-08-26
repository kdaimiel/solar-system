
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
    mesh.position.z = solarObject.distance || 0;
    scene.add(mesh);
    mesh.Yrotation = solarObject.rotation;
    meshs.push(mesh);
    console.log(mesh);
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
