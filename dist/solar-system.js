/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.41 - 2015-09-15
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
  this.material = createMaterial(bodyProperties.textureProperties);

  this.rotation.x = this.tilt;

  if(bodyProperties.cloudsProperties) {
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
    material.bumpScale = 0.05;
    material.specularMap    = textureProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.specularMap) : undefined;
    material.specular  = new THREE.Color('grey');
    return material;
  }

};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.createClouds = function(cloudsProperties) {

  cloudsProperties.radius = cloudsProperties.radius || this.radius + 10;

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
  cloudMesh.rotation.x = this.tilt;
  cloudMesh.update = function () {
    this.rotation.x -= cloudsProperties.speed * Math.PI / 180;     // Rotates  N degrees per frame;
    this.rotation.y -= cloudsProperties.speed * Math.PI / 180;     // Rotates  N degrees per frame;
    this.rotation.z -= cloudsProperties.speed * Math.PI / 180;     // Rotates  N degrees per frame;
  };
  this.add(cloudMesh);
};

THREE.SolarBody.prototype.createRings = function(ringsProperties) {
  var rings = new THREE.SolarRings(ringsProperties);
  this.add(rings);
};

THREE.SolarBody.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
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
  this.type = 'Orbit';
  this.distance = orbitProperties.distance || 50;
  this.speed = orbitProperties.speed || 0;
  this.tilt = orbitProperties.tilt || 0;
};

THREE.SolarOrbit.prototype = Object.create( THREE.Object3D.prototype );
THREE.SolarOrbit.prototype.constructor = THREE.SolarOrbit;

THREE.SolarOrbit.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};


THREE.SolarRings = function(ringsProperties) {

  THREE.Object3D.call( this );

  this.type = 'Rings';
  this.map = ringsProperties.map;
  this.vRotation = ringsProperties.vRotation || 0;
  this.tilt = ringsProperties.tilt || 0;

  this.geometry = new THREE.RingsGeometry(ringsProperties);
  var texture = THREE.ImageUtils.loadTexture(this.map);
  this.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

  this.rotation.x = (90 - this.tilt) * Math.PI / 180;

};

THREE.SolarRings.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarRings.prototype.constructor = THREE.SolarRings;


THREE.SolarRings.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates N degrees per frame;
};


THREE.RingsGeometry = function ( ringsProperties ) {

  THREE.Geometry.call( this );

  this.type = 'RingsGeometry';

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

THREE.RingsGeometry.prototype = Object.create( THREE.RingGeometry.prototype );
THREE.RingsGeometry.prototype.constructor = THREE.RingsGeometry;


require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  var bodies = {};
  var orbits = {};

  init();

  function init() {
    SceneFactory.init();
    SolarService.getCamera(loadCamera);
    SolarService.getBodies(loadBodies);
    createLights();
  }

  function loadCamera(cameraProperties) {
    var camera = new THREE.SolarCamera(cameraProperties);
    SceneFactory.createCamera(camera);
    SceneFactory.animate();
    SceneFactory.createControls();
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      createBody(bodyProperties);
    });
  }

  function createBody(bodyProperties){
    var body = new THREE.SolarBody(bodyProperties);
    bodies[body.name] = body;

    if(!bodyProperties.orbitProperties) {
      SceneFactory.addObject(body);
      return;
    }

    var orbitProperties = bodyProperties.orbitProperties;
    orbitProperties.name = body.name;
    var orbit = new THREE.SolarOrbit(orbitProperties);

    var parentOrbit = orbits[orbitProperties.round] ? orbits[orbitProperties.round] : undefined;

    if(parentOrbit) {
      orbit.position.z = bodies[parentOrbit.name].position.z || 0;
      parentOrbit.add(orbit);
    } else {
      SceneFactory.addObject(orbit);
    }

    orbits[orbitProperties.name] = orbit;

    body.position.z = bodies[orbitProperties.round].radius + orbit.distance + body.radius || 0;
    orbit.add(body);
  }

  function createLights() {
    var light = new THREE.AmbientLight( 0xFFFFFF);
    SceneFactory.addObject(light);
  }
});


define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;

  var factory = {
    addObject: addObject,
    animate : animate,
    createCamera: createCamera,
    createControls: createControls,
    init: init
  };

  return factory;

  function addObject(object) {
    scene.add(object);
  }

  function createCamera(cam) {
    camera = cam;
  }

  function createControls(){
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
  }

  function animate() {

    requestAnimationFrame( animate );

    for(var i in scene.children) {
      if(scene.children[i].update) {
        scene.children[i].update();
      }
    }

    if(controls) {
      controls.update();
    }

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
        console.error('Load ' + src + ' error :' + err);
      }
    });
  }

});
