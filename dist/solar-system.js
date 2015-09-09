/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.31 - 2015-09-09
 * @link https://github.com/KenEDR/three-solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.name = bodyProperties.name;
  this.type = 'SolarBody';
  this.category = bodyProperties.category;
  this.radius = bodyProperties.radius || 50;
  this.vRotation = bodyProperties.vRotation || 0;
  this.URLTexture = bodyProperties.URLTexture;
  this.tilt = bodyProperties.tilt || 0;

  this.geometry = new THREE.SphereGeometry(this.radius, 50, 50);
  bodyProperties.textureProperties.name = this.name; // TEMPORAL

  this.material = createMaterial(bodyProperties.textureProperties);

  this.rotation.x = this.tilt;

  if(bodyProperties.cloudsProperties) {
    console.log('AAAAAAAAAAAAA');
    this.createClouds(bodyProperties.cloudsProperties);
  }

  if(bodyProperties.ringsProperties) {
    this.createRings(bodyProperties.ringsProperties);
  }

  this.updateMorphTargets();

  function createMaterial(textureProperties) {

    var material  = new THREE.MeshPhongMaterial();

    material.map    = THREE.ImageUtils.loadTexture(textureProperties.map);

    material.bumpMap = textureProperties.bumpMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.bumpMap) : undefined;
    //material.bumpScale = 0.05;
    material.specularMap    = textureProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.specularMap) : undefined;
    //material.specular  = new THREE.Color('grey');

    return material;
  }

};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.createClouds = function(cloudsProperties) {
  var geometry   = new THREE.SphereGeometry(cloudsProperties.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(cloudsProperties.map);
  var material  = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    opacity: cloudsProperties.opacity,
    transparent: cloudsProperties.transparent,
    depthWrite : cloudsProperties.depthWrite,
  });

  var cloudMesh = new THREE.Mesh(geometry, material);
  this.add(cloudMesh);
};

THREE.SolarBody.prototype.createRings = function(ringsProperties) {
  var solarRings = new THREE.SolarRings(ringsProperties);
  this.add(solarRings);
};


THREE.SolarBody.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
};


THREE.SolarCamera = function(cameraProperties) {

  THREE.PerspectiveCamera.call( this );

  this.type = 'SolarCamera';

  this.zoom = cameraProperties.zoom !== undefined ? cameraProperties.zoom : 1;

  this.fov = cameraProperties.fov !== undefined ? cameraProperties.fov : 50;
  this.aspect = cameraProperties.aspect !== undefined ? cameraProperties.aspect : window.innerWidth / window.innerHeight;
  this.near = cameraProperties.near !== undefined ? cameraProperties.near : 0.1;
  this.far = cameraProperties.far !== undefined ? cameraProperties.far : 2000;
  this.position.x = cameraProperties.position.x !== undefined ? cameraProperties.position.x : 0;
  this.position.y = cameraProperties.position.y !== undefined ? cameraProperties.position.y : 0;
  this.position.z = cameraProperties.position.z !== undefined ? cameraProperties.position.z : 0;

  this.updateProjectionMatrix();

};

THREE.SolarCamera.prototype = Object.create( THREE.PerspectiveCamera.prototype);
THREE.SolarCamera.prototype.constructor = THREE.PerspectiveCamera;



THREE.SolarOrbit = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.name = orbitProperties.name;
  this.type = 'SolarOrbit';
  this.radius = orbitProperties.radius || 50;
  this.speed = orbitProperties.speed || 0;
  this.tilt = orbitProperties.tilt || 0;
};

THREE.SolarOrbit.prototype = Object.create( THREE.Object3D.prototype );
THREE.SolarOrbit.prototype.constructor = THREE.SolarOrbit;

THREE.SolarOrbit.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
};


THREE.SolarRings = function(ringsProperties) {

  THREE.Object3D.call( this );

  this.type = 'SolarRings';
  this.map = ringsProperties.map;
  this.vRotation = ringsProperties.vRotation || 0;
  this.tilt = ringsProperties.tilt || 0;

  this.geometry = new THREE.SolarRingsGeometry(ringsProperties);
  var texture = THREE.ImageUtils.loadTexture(this.map);
  this.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

  this.rotation.x = (90 - this.tilt) * Math.PI / 180;

  //this.updateMorphTargets();
};

THREE.SolarRings.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarRings.prototype.constructor = THREE.SolarRings;


THREE.SolarRings.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates N degrees per frame;
};


THREE.SolarRingsGeometry = function ( ringsProperties ) {

  THREE.Geometry.call( this );

  this.type = 'SolarRingsGeometry';

  this.innerRadius = ringsProperties.innerRadius || 0;
  this.outerRadius = ringsProperties.outerRadius || 50;

  this.thetaStart = ringsProperties.thetaStart !== undefined ? ringsProperties.thetaStart : 0;
  this.thetaLength = ringsProperties.thetaLength !== undefined ? ringsProperties.thetaLength : Math.PI * 2;

  this.thetaSegments = ringsProperties.thetaSegments !== undefined ? Math.max( 3, ringsProperties.thetaSegments ) : 50;
  this.phiSegments = ringsProperties.phiSegments !== undefined ? Math.max( 1, ringsProperties.phiSegments ) : 50;

  var i, o, uvs = [], radius = this.innerRadius, radiusStep = ( ( ringsProperties.outerRadius - ringsProperties.innerRadius ) / this.phiSegments ), segment;

  for ( i = 0; i < this.phiSegments + 1; i ++ ) { // concentric circles inside ring

    for ( o = 0; o < this.thetaSegments + 1; o ++ ) { // number of segments per circle

      var vertex = new THREE.Vector3();
      segment = this.thetaStart + o / this.thetaSegments * this.thetaLength;
      vertex.x = radius * Math.cos( segment );
      vertex.y = radius * Math.sin( segment );

      this.vertices.push( vertex );
      uvs.push( new THREE.Vector2( i/(this.thetaSegments-1), o/ (this.phiSegments-1) ) );
    }

    radius += radiusStep;

  }

  var n = new THREE.Vector3( 0, 0, 1 );

  for ( i = 0; i < this.phiSegments; i ++ ) { // concentric circles inside ring

    var thetaSegment = i * (this.thetaSegments + 1);

    for ( o = 0; o < this.thetaSegments ; o ++ ) { // number of segments per circle

      segment = o + thetaSegment;

      var v1 = segment;
      var v2 = segment + this.thetaSegments + 1;
      var v3 = segment + this.thetaSegments + 2;

      this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
      this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ]);

      v1 = segment;
      v2 = segment + this.thetaSegments + 2;
      v3 = segment + 1;

      this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
      this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ]);

    }
  }

  this.computeFaceNormals();

  this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

};

THREE.SolarRingsGeometry.prototype = Object.create( THREE.RingGeometry.prototype );
THREE.SolarRingsGeometry.prototype.constructor = THREE.SolarRingsGeometry;


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


define('solar-service', function() {

  'use strict';

  var service = {
    getCamera: getCamera,
    getBodies: getBodies
  };

  return service;

  function getCamera(callback){
    getJSON('../src/data/camera.properties.json', callback);
  }

  function getBodies(callback){
    getJSON('../src/data/bodies.properties.json', callback);
  }

  function getJSON(src, callback) {
    $.ajax(src, {
      success: function(data) {
        return callback(data);
      },
      error: function(err) {
        console.error('Load JSON error:' + err);
      }
    });
  }

});


require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  SolarService.getCamera(loadCamera);

  function loadCamera(cameraProperties) {
    SceneFactory.createCamera(cameraProperties);
    SceneFactory.init();
    SolarService.getBodies(loadBodies);
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(element) {
      SceneFactory.createBody(element);
    });
  }
});


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
