/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.43 - 2015-09-18
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
    material.specularMap    = textureProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(textureProperties.specularMap) : undefined;
    material.reflectivity = 1;
    return material;
  }
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.createClouds = function(cloudsProperties) {

  cloudsProperties.radius = cloudsProperties.radius || this.radius + 100;

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

THREE.SolarBody.prototype.addSatellite = function(satellite, orbitProperties) {
  var orbit = new THREE.SolarOrbit(orbitProperties);
  satellite.orbit = orbit;

  if(this.orbit){
    this.orbit.add(orbit);
    orbit.position.z = this.position.z || 0;
  } else {
    this.parent.add(orbit);
  }
  orbit.add(satellite);
  satellite.position.z = this.radius + orbit.distance + satellite.radius || 0;
};


THREE.SolarOrbit = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.type = 'SolarOrbit';
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

  this.type = 'SolarRings';
  this.map = ringsProperties.map;
  this.vRotation = ringsProperties.vRotation || 0;
  this.tilt = ringsProperties.tilt || 0;

  this.geometry = new THREE.RingsGeometry(ringsProperties);
  var texture = THREE.ImageUtils.loadTexture(this.map);
  this.material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });

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

  init();

  function init() {
    SceneFactory.init();
    SolarService.getCamera(loadCamera);
    SolarService.getBodies(loadBodies);
    createLights();
  }

  function loadCamera(cameraProperties) {
    cameraProperties.aspect = cameraProperties.aspect !== undefined ? cameraProperties.aspect : window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(cameraProperties.fov, cameraProperties.aspect, cameraProperties.near, cameraProperties.far);
    camera.zoom = cameraProperties.zoom !== undefined ? cameraProperties.zoom : 1;
    camera.position.x = cameraProperties.position.x !== undefined ? cameraProperties.position.x : 0;
    camera.position.y = cameraProperties.position.y !== undefined ? cameraProperties.position.y : 0;
    camera.position.z = cameraProperties.position.z !== undefined ? cameraProperties.position.z : 0;
    SceneFactory.setCamera(camera);
    SceneFactory.animate();
    var controls = new THREE.TrackballControls(camera);
    SceneFactory.setControls(controls);
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      createBody(bodyProperties);
    });
  }

  function createBody(bodyProperties){
    var body = new THREE.SolarBody(bodyProperties);
    bodies[body.name] = body;

    if(bodyProperties.orbitProperties) {
      bodies[bodyProperties.orbitProperties.round].addSatellite(body, bodyProperties.orbitProperties);
    } else {
    var spotLight = new THREE.PointLight( 0xffffff, 1 );
    //spotLight.position.set( 0, 0, 0 );
    spotLight.add(body);

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;

    SceneFactory.addObject(spotLight );
    //SceneFactory.addObject(body);
    }
  }

  function createLights() {
    var light = new THREE.AmbientLight( 0x444444);
    SceneFactory.addObject(light);

    //var light = new THREE.DirectionalLight( 0xffffff, 2 );
    //light.position.set( 0, 0, 1 );

    //var light = new THREE.PointLight( 0xFFFFFF, 0.8);
    //light.position.set( 0, 0, 0 );

    //var spotLight = new THREE.SpotLight( 0xffffff );
    //spotLight.position.set( 0, 0, 0 );
    //spotLight.add(bodies["Sun"]);

    /*spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;*/

    //SceneFactory.addObject(spotLight );
  }
});


define('scene-factory', function() {

  'use strict';

  var scene, camera, renderer, controls;

  var factory = {
    addObject: addObject,
    animate : animate,
    setCamera: setCamera,
    setControls: setControls,
    init: init
  };

  return factory;

  function addObject(object) {
    scene.add(object);
  }

  function setCamera(newCamera) {
    camera = newCamera;
  }

  function setControls(newControls){
    controls = newControls;
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

  /*function getLights(callback){
    getJSON('../src/data/lights.properties.json', callback);
  }*/

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
