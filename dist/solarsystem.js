/*
 * solarsystem
 * @Description Solar System with Threejs
 * @version v0.0.4 - 2015-08-19
 * @link https://github.com/KenEDR/three-solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

define(function() {

  var factory = {
    createMesh: createMesh
  };

  return factory;

  function createMesh(solarObject){
    var geometry = new THREE.SphereGeometry(solarObject.radius, 50, 50);
    var texture = THREE.ImageUtils.loadTexture(solarObject.textureUrl);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = solarObject.distance || 0;
    return mesh;
  }

});

define(['json!data/solar-objects.json'], function(objects){

  var getAll = function() {
    return objects;
  };

  return {
    list: getAll
  };
});

require({
    baseUrl: 'lib',
    paths: {
      app: '../js',
      data: '../data'
    },
    shim: { 'three': { exports: 'THREE' } }
}, [
    'three',
    'app/solar-object',
    'app/solar-factory'
], function(THREE, objects, SolarFactory) {

  var scene, camera, renderer;

  /* Mejorar */
  var meshs = [];
  objects.list().forEach(function(element) {
      meshs.push(SolarFactory.createMesh(element));
  });
  //meshs.push(objects.list().forEach(SolarFactory.createMesh));

  init();
  animate();

  function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    /* Mejorar */
    meshs.forEach(function(element){
      scene.add( element );
    });
    //scene.add( meshs );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
  }

  function animate() {

    requestAnimationFrame( animate );

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;

    renderer.render( scene, camera );
  }

});
