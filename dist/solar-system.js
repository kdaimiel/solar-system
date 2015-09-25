/*
 * solar-system
 * @Description Solar System with Threejs
 * @version v0.0.45 - 2015-09-25
 * @link https://github.com/KenEDR/three-solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

THREE.Clouds = function(cloudsProperties) {

  THREE.Planet.call( this );

  this.name = cloudsProperties.name;
  this.type = cloudsProperties.type || 'Clouds';

  this.rotation.x = this.tilt;

  this.geometry   = new THREE.SphereGeometry(cloudsProperties.radius, 50, 50);
  var texture = THREE.ImageUtils.loadTexture(cloudsProperties.map);
  this.material  = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    opacity: cloudsProperties.opacity,
    transparent: cloudsProperties.transparent,
    depthWrite : cloudsProperties.depthWrite,
  });

  this.updateMorphTargets();
};

THREE.Clouds.prototype = Object.create( THREE.Mesh.prototype );
THREE.Clouds.prototype.constructor = THREE.Clouds;

THREE.Clouds.prototype.update = function() {
  // Rotates with the same speed in every direction (degrees).
  this.rotation.x -= this.speed * Math.PI / 180;
  this.rotation.y -= this.speed * Math.PI / 180;
  this.rotation.z -= this.speed * Math.PI / 180;
};


THREE.Planet = function(planetProperties) {

  THREE.SolarBody.call(this, planetProperties);

  if(planetProperties.cloudsProperties) {
    this.createClouds(planetProperties.cloudsProperties);
  }

  if(planetProperties.ringsProperties) {
    this.createRings(planetProperties.ringsProperties);
  }
};

THREE.Planet.prototype = Object.create( THREE.SolarBody.prototype );
THREE.Planet.prototype.constructor = THREE.Planet;

THREE.Planet.prototype.createClouds = function(cloudsProperties) {
  this.add(new THREE.SolarRings(cloudsProperties));
};

THREE.Planet.prototype.createRings = function(ringsProperties) {
  this.add(new THREE.SolarRings(ringsProperties));
};

THREE.Planet.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};


THREE.SolarBody = function(bodyProperties) {
  THREE.Object3D.call( this );

  this.name = bodyProperties.name;
  this.type = bodyProperties.type;

  this.radius = bodyProperties.radius || 50;
  this.rotation.x = bodyProperties.tilt || 0;
  this.vRotation = bodyProperties.vRotation || 0;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);
  this.material  = new THREE.MeshPhongMaterial();
  this.material.map  = THREE.ImageUtils.loadTexture(bodyProperties.map);
  this.material.bumpMap = bodyProperties.bumpMap !== undefined ? THREE.ImageUtils.loadTexture(bodyProperties.bumpMap) : undefined;
  this.material.specularMap  = bodyProperties.specularMap !== undefined ? THREE.ImageUtils.loadTexture(bodyProperties.specularMap) : undefined;
  this.material.depthWrite = false;

  this.updateMorphTargets();
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

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
    SolarService.getLights(loadLights);
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

  function loadLights(lightsProperties) {
    lightsProperties.forEach(function(lightProperties) {
      createLight(lightProperties);
    });
  }


  function createBody(bodyProperties){
    var body;
    switch(bodyProperties.type) {
    case 'Star':
      body = new THREE.Star(bodyProperties);
      break;
    case 'Planet':
      body = new THREE.Planet(bodyProperties);
      break;
    case 'Dwarf Planet':
      body = new THREE.Planet(bodyProperties);
      break;
    case 'Moon':
      body = new THREE.Planet(bodyProperties);
      break;
    default:
      console.error(bodyProperties.type + ' is not considered a kind of solar body');
      return;
    }

    bodies[body.name] = body;
    if(bodyProperties.orbitProperties) {
      bodies[bodyProperties.orbitProperties.round].addSatellite(body, bodyProperties.orbitProperties);
    } else {
      SceneFactory.addObject(body);
    }
  }

  function createLight(lightProperties) {
    var light;
    switch(lightProperties.type) {
    case 'Ambient Light':
      light = new THREE.AmbientLight( lightProperties.hexColor || 0x444444);
      break;
    case 'Directional Light':
      light = new THREE.DirectionalLight( lightProperties.hexColor || 0xffffff, lightProperties.intensity || 0.5);
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      break;
    case 'Point Light':
      light = new THREE.DirectionalLight( lightProperties.hexColor || 0xffffff);
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      break;
    case 'Spot Light':
      light = new THREE.DirectionalLight( lightProperties.hexColor || 0xffffff);
      light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      break;
    default:
      console.error(lightProperties.type + ' is not a kind of light validated');
      return;
    }
    SceneFactory.addObject(light);

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


THREE.Star = function(starProperties) {

  THREE.SolarBody.call( this, starProperties );

  this.material.depthWrite = false;

  var pointLight = new THREE.PointLight( 0xffffff, 1 );
  pointLight.update = function(camera) {
    for(var i in pointLight.children) {
      if(pointLight.children[i].update) {
        pointLight.children[i].update(camera);
      }
    }
  };
  this.add(pointLight);

  this.updateMorphTargets();
};

THREE.Star.prototype = Object.create( THREE.SolarBody.prototype );
THREE.Star.prototype.constructor = THREE.Star;

THREE.Star.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  if(!this.hasLensFlare) {
    this.createLensFlare(camera);
  }

  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};

THREE.Star.prototype.createLensFlare = function(camera) {

  var dist = camera.position.distanceTo(this.position);
  var height = this.radius * 2; // visible height
  //var size = this.radius * 2 / dist;
  //var aspect = window.width / window.height;
  //var size = height * aspect;
  var size =  20 * Math.atan( height / ( 2 * dist ) ) * ( 180 / Math.PI ); // in degrees

  //var size = this.radius * 2 / camera.position.length();
  var flareColor = new THREE.Color( 0xffffff );
  flareColor.offsetHSL( 0.08, 0.5, 0.5 );

  var textureFlare1 = THREE.ImageUtils.loadTexture('img/sun/lensflare1.png');
  var textureFlare2 = THREE.ImageUtils.loadTexture('img/sun/lensflare2.png');
  var textureFlare3 = THREE.ImageUtils.loadTexture('img/sun/lensflare3.png');
  var textureFlare4 = THREE.ImageUtils.loadTexture('img/sun/lensflare4.png');

  var lensFlare = new THREE.LensFlare( textureFlare1, size * 16, 0.0, THREE.AdditiveBlending, flareColor );
  lensFlare.add( textureFlare2, size * 17, 0.0, THREE.AdditiveBlending );
  lensFlare.add( textureFlare3, size * 20, 0.0, THREE.AdditiveBlending );
  lensFlare.add( textureFlare4, size * 48, 0.0, THREE.AdditiveBlending );

  lensFlare.position = this.position;
  lensFlare.size = size;
  //lensFlare.scale = size / camera.position.length();

  //  this function will operate over each lensflare artifact, moving them around the screen
  lensFlare.update = function(camera, object) {
    var f, fl = this.lensFlares.length;
    var flare;
    var size = object.radius * 2;

    var dist = camera.position.distanceTo(object.position);

    for( f = 0; f < fl; f ++ ) {
      flare = this.lensFlares[ f ];
      flare.pisition = object.position;
      flare.scale = size / dist;
      //flare.opacity = 0.5;
    }
  };

  this.add(lensFlare);
  this.hasLensFlare = true;
};


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
        scene.children[i].update(camera);
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
    getBodies: getBodies,
    getLights: getLights
  };

  return service;

  function getCamera(callback){
    getJSON('../src/data/camera.properties.json', callback);
  }

  function getBodies(callback){
    getJSON('../src/data/bodies.properties.json', callback);
  }

  function getLights(callback){
    getJSON('../src/data/lights.properties.json', callback);
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
