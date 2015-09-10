
// Init scene which content rendered objects.
var scene = new THREE.Scene();

// Init a perspective camera tho watch objects.
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Create a renderer object and include this in html code.
// aLpha:true sets background to be transparent
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('picture').appendChild( renderer.domElement );

// Create a cube object with a specific geometry and material.

var geometry   = new THREE.SphereGeometry(1, 32, 32);
var material  = new THREE.MeshPhongMaterial();
var earthMesh = new THREE.Mesh(geometry, material);

material.map  = THREE.ImageUtils.loadTexture('img/earth/earthmap1k.jpg');

material.bumpMap    = THREE.ImageUtils.loadTexture('img/earth/earthbump1k.jpg');
material.bumpScale = 0.05;

material.specularMap    = THREE.ImageUtils.loadTexture('img/earth/earthspec1k.jpg');
material.specular  = new THREE.Color('grey');

scene.add(earthMesh);

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 0, 0 );
scene.add( light );

var light = new THREE.AmbientLight( 0x888888 );
scene.add( light );
// var light  = new THREE.DirectionalLight( 'white', 1)
// light.position.set(5,5,5)
// light.target.position.set( 0, 0, 0 )
// scene.add( light )

/*var light = new THREE.DirectionalLight( 0xcccccc, 1 );
light.position.set(5,3,5);
scene.add( light );*/



// Set the camera position in z axis.
camera.position.z = 5;

// render function to start renderization.
function render() {

  // Set animation Frame
  requestAnimationFrame( render );

  // Set render update properties to objects

  renderer.render( scene, camera );
}

// Start render
render();
