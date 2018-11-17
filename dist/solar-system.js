/*
 * SolarBody.js
 * @Description Solar abstract object.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.SolarBody = function(bodyProperties) {

  THREE.Object3D.call( this );

  this.geometry = new THREE.SphereGeometry( 5, 32, 32 );
  this.material = new THREE.MeshBasicMaterial();

  if(bodyProperties) {

    this.name = bodyProperties.name;
    this.type = bodyProperties.type;

    if(bodyProperties.map){
      this.texloader.load(bodyProperties.map, this.loadTexture.bind(this));
    }

    if(bodyProperties.bumpMap) {
      this.texloader.load(bodyProperties.bumpMap, this.loadbumpMap.bind(this));
    }

    if(bodyProperties.specularMap) {
      this.texloader.load(bodyProperties.specularMap, this.loadspecularMap.bind(this));
    }

    this.orbitProperties = bodyProperties.orbitProperties;

    if(bodyProperties.cloudsProperties) {
      this.addClouds(bodyProperties.cloudsProperties);
    }

    if(bodyProperties.ringsProperties) {
      this.addRings(bodyProperties.ringsProperties);
    }
  }

  this.drawMode = THREE.TrianglesDrawMode;

  this.updateMorphTargets();
};

THREE.SolarBody.prototype = Object.create( THREE.Mesh.prototype );
THREE.SolarBody.prototype.constructor = THREE.SolarBody;

THREE.SolarBody.prototype.addClouds = function(cloudsProperties) {
  this.add(new THREE.CloudsMesh(cloudsProperties));
};

THREE.SolarBody.prototype.addRings = function(ringsProperties) {
  this.add(new THREE.RingsMesh(ringsProperties));
};

THREE.SolarBody.prototype.addSatellite = function(satellite) {
  var orbit = new THREE.OrbitMesh(satellite.orbitProperties);
  satellite.orbit = orbit;

  if(this.orbit){
    this.orbit.add(orbit);
    orbit.position.z = this.position.z || 0;
  } else {
    // To ensure that the orbit is inside the scene SolarObject has to be added to the scene
    if(this.parent) {
      this.parent.add(orbit);
    }
  }
  orbit.add(satellite);
  satellite.position.z = this.radius + orbit.distance + satellite.radius || 0;
};

THREE.SolarBody.prototype.loadTexture = function (map){
  this.material  = new THREE.MeshPhongMaterial({
    map: map,
    side: THREE.DoubleSide
  });
};

THREE.SolarBody.prototype.loadbumpMap = function(bumpMap) {
  this.material.bumpMap = bumpMap;
};

THREE.SolarBody.prototype.loadspecularMap = function(specularMap) {
  this.material.specularMap = specularMap;
};

THREE.SolarBody.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};

THREE.SolarBody.prototype.texloader = new THREE.TextureLoader();

/*
 * PlanetMesh.js
 * @Description Mesh to build planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.PlanetMesh = function(planetProperties) {

  THREE.SolarBody.call(this, planetProperties);

  this.type = planetProperties && planetProperties.type || 'PlanetMesh';
  this.radius = planetProperties && planetProperties.radius || 50;
  this.rotation.x = planetProperties && planetProperties.tilt || 0;
  this.vRotation = planetProperties && planetProperties.vRotation || 0;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);
};

THREE.PlanetMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.PlanetMesh.prototype.constructor = THREE.PlanetMesh;

/*
 * solar-service.js
 * @Description Solar Builder sets and renders the scene.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function SceneBuilder() {

  'use strict';

  var scene, camera, renderer, controls;
  var width, height;

  var factory = {
    addObject: addObject,
    animate : animate,
    setCamera: setCamera,
    setControls: setControls,
    init: init
  };

  return factory;

  function setCamera(newCamera) {
    camera = newCamera;
    //console.log('New camera has been placed in the scene');
  }

  function addObject(object) {
    scene.add(object);
    if (camera) {
      camera.aspect = (width || window.innerWidth) / (height || window.innerHeight);
      camera.updateProjectionMatrix();
    }
    // console.log('New object of type "' + object.type + '"" has been added to the scene');
  }

  function setControls(newControls){
    controls = newControls;
    if(controls && controls.addEventListener) {
      controls.addEventListener('change', render);
    }
    //console.log('New controls have been added to the camera');
  }

  function render() {
    renderer.render(scene, camera);
  }

  function init(element) {
    scene = new THREE.Scene();
    if(element){
      width = element.width || null;
      height = element.height || null;
    }

    if(controls) {
      controls.addEventListener('change', render);
    }

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width || window.innerWidth , height || window.innerHeight);

    document.body.appendChild( renderer.domElement );

    // Catch
    window.addEventListener( 'resize', onWindowResize, false );

    //console.log('Scene initiated');
  }

  function animate() {

    if(!scene) {
      throw new TypeError('Scene has to be initiated before animate');
    }

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

  function onWindowResize() {
    if(camera) {
      camera.aspect = (width || window.innerWidth) / (height || window.innerHeight);
      camera.updateProjectionMatrix();
    }

    renderer.setSize(width || window.innerWidth , height || window.innerHeight);

    if(controls) {
      controls.handleResize();
    }
  }

}

/*
 * scene-factory.js
 * @Description Scene Factory creates scene objects
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var SceneFactory = (function() {

  'use strict';

  return {

    createCamera: function(cameraProperties) {
      var camera;
      cameraProperties.aspect = cameraProperties.aspect || window.innerWidth / window.innerHeight;
      switch(cameraProperties.type) {
      case 'PerspectiveCamera':
        camera = new THREE.PerspectiveCamera(cameraProperties.fov, cameraProperties.aspect, cameraProperties.near, cameraProperties.far);
        break;
      case 'CubeCamera':
        camera = new THREE.CubeCamera(cameraProperties.near, cameraProperties.far , cameraProperties.cubeResolution);
        break;
      case 'OrthographicCamera':
        camera = new THREE.OrthographicCamera(cameraProperties.left, cameraProperties.right , cameraProperties.top,  cameraProperties.bottom, cameraProperties.near, cameraProperties.far);
        break;
      default:
        throw new TypeError(cameraProperties.type + ' is not a kind of valid camera');
      }

      if(cameraProperties.position) {
        camera.position.x = cameraProperties.position.x || 0;
        camera.position.y = cameraProperties.position.y || 0;
        camera.position.z = cameraProperties.position.z || 0;
      }

      camera.zoom = cameraProperties.zoom || 1;

      return camera;
    },

    createControls: function(camera, controlsType) {
      var controls;
      switch(controlsType) {
      case 'TrackballControls':
        controls = new THREE.TrackballControls(camera);
        break;
      case 'DeviceOrientationControls':
        controls = new THREE.DeviceOrientationControls( camera );
        break;
      case 'FlyControls':
        controls = new THREE.FlyControls( camera );
        break;
      case 'OrbitControls':
        controls = new THREE.OrbitControls( camera );
        break;
      case 'PointerLockControls':
        controls = new THREE.PointerLockControls( camera );
        break;
      case 'TransformControls':
        controls = new THREE.TransformControls( camera );
        break;
      default:
        throw new TypeError(controlsType + ' is not a kind of valid camera controls');
      }
      return controls;
    },

    createLight: function(lightProperties) {

      var light;

      var color = new THREE.Color(lightProperties.hexColor) || 0xffffff;
      switch(lightProperties.type) {
      case 'AmbientLight':
        light = new THREE.AmbientLight(color);
        break;
      case 'DirectionalLight':
        light = new THREE.DirectionalLight(color, lightProperties.intensity || 0.5);
        break;
      case 'HemisphereLight':
        light = new THREE.HemisphereLight(lightProperties.skyColor || 0xffffbb, lightProperties.groundColor || 0x080820, lightProperties.intensity || 1.0);
        break;
      case 'PointLight':
        light = new THREE.PointLight(color, lightProperties.intensity || 1.0, lightProperties.distance || 0.0, lightProperties.decay || 1.0);
        break;
      case 'SpotLight':
        light = new THREE.SpotLight(color, lightProperties.intensity || 1.0, lightProperties.distance || 0.0, lightProperties.angle || Math.PI/3, lightProperties.exponent || 10.0, lightProperties.decay || 1);
        light.castShadow = lightProperties.castShadow || false;
        light.shadow.camera.near = lightProperties.shadowCameraNear || 50;
        light.shadow.camera.far = lightProperties.shadowCameraFar || 5000;
        light.shadow.camera.left = lightProperties.shadowCameraLeft || -500;
        light.shadow.camera.right = lightProperties.shadowCameraRight || 500;
        light.shadow.camera.top = lightProperties.shadowCameraTop || 500;
        light.shadow.camera.bottom = lightProperties.shadowCameraBottom || -500;
        if(lightProperties.shadowCameraVisible) {
          THREE.CameraHelper(light.shadow.camera);
        }
        light.shadow.bias = lightProperties.shadowBias || 0;
        light.shadow.mapSize.width = lightProperties.shadowMapWidth || 512;
        light.shadow.mapSize.height = lightProperties.shadowMapHeight || 512;
        light.shadowMapSize = lightProperties.shadowMapSize;
        light.shadowCamera = lightProperties.shadowCamera;
        light.shadowMatrix = lightProperties.shadowMatrix;
        light.shadowMap = lightProperties.shadowMap;
        break;
      default:
        throw new TypeError(lightProperties.type + ' is not a kind of valid light');
      }

      if(lightProperties.position) {
        light.position.set(lightProperties.position.x || 0, lightProperties.position.y || 0, lightProperties.position.z || 0);
      }

      return light;
    }
  };

})();

/*
 * solar-factory.js
 * @Description Solar Factory creates solar objects
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var SolarFactory = (function() {

  'use strict';

  return {
    createMoon: function(moonProperties) {
      var moon = new THREE.MoonMesh(moonProperties);
      return moon;
    },

    createPlanet: function(planetProperties){
      var planet = new THREE.PlanetMesh(planetProperties);
      return planet;
    },

    createStar: function(starProperties){
      var star = new THREE.StarMesh(starProperties);
      return star;
    }
  };

})();

/*
 * solar-properties.js
 * @Description Module to define solar system properties.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function SolarProperties(properties) {

  'use strict';

  return {
    width: properties && properties.width,
    height: properties && properties.height,
    bodiesSrc: properties && properties.bodiesSrc || 'data/bodies.properties.json',
    cameraSrc: properties && properties.cameraSrc || 'data/camera.properties.json',
    lightsSrc: properties && properties.lightsSrc || 'data/lights.properties.json',
  };

}

/*
 * solar-service.js
 * @Description Solar Service defines methods to get JSON properties
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var SolarService = (function() {

  'use strict';

  function getJSON(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          callback(JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.status >= 400) {
          console.error('Load ' + url + ' error, status: ' + xmlHttp.status);
        }
      }
    };
    xmlHttp.onerror = function(err) {
      console.error('Load ' + url + ' error :' + JSON.stringify(err, null, '  '));
    };

    xmlHttp.open('GET', url, true);  // true for asynchronous

    xmlHttp.send(null);
  }

  return {

    getCamera: function(cameraSrc, callback) {
      getJSON(cameraSrc, callback);
    },

    getBodies: function(bodiesSrc, callback){
      getJSON(bodiesSrc, callback);
    },

    getLights: function(lightsSrc, callback){
      getJSON(lightsSrc, callback);
    }

  };

})();

/*
 * solar-system.js
 * @Description Solar System defines methods to init the scene.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function SolarSystem() {

  'use strict';

  var bodies = {};

  var solarSystem = {
    addMoon: addMoon,
    addPlanet: addPlanet,
    addStar: addStar,
    init: init
  };

  var solarProperties;

  var sceneBuilder = new SceneBuilder();

  return solarSystem;

  function init(sytemProperties) {
    solarProperties = new SolarProperties(sytemProperties);
    sceneBuilder.init(solarProperties);
    loadObjectFronJSONFiles();
  }

  function addSolarBody(solarBody){
    bodies[solarBody.name] = solarBody;
    if(solarBody.orbitProperties) {
      bodies[solarBody.orbitProperties.round].addSatellite(solarBody);
    } else {
      sceneBuilder.addObject(solarBody);
    }
  }

  function addMoon(moonProperties) {
    var moon = SolarFactory.createMoon(moonProperties);
    addSolarBody(moon);
  }

  function addPlanet(planetProperties){
    var planet = SolarFactory.createPlanet(planetProperties);
    addSolarBody(planet);
  }

  function addStar(starProperties){
    var star = SolarFactory.createStar(starProperties);
    addSolarBody(star);
  }

  function loadObjectFronJSONFiles(){
    SolarService.getCamera(solarProperties.cameraSrc, loadCamera);
    SolarService.getBodies(solarProperties.bodiesSrc, loadBodies);
    SolarService.getLights(solarProperties.lightsSrc, loadLights);
  }

  function loadCamera(cameraProperties) {
    var camera = SceneFactory.createCamera(cameraProperties);
    sceneBuilder.setCamera(camera);

    var controls = SceneFactory.createControls(camera, cameraProperties.controls);
    sceneBuilder.setControls(controls);
    sceneBuilder.animate();
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      switch(bodyProperties.type) {
      case 'Star':
        addStar(bodyProperties);
        break;
      case 'Planet':
        addPlanet(bodyProperties);
        break;
      case 'Dwarf Planet':
        addPlanet(bodyProperties);
        break;
      case 'Moon':
        addMoon(bodyProperties);
        break;
      default:
        console.error(bodyProperties.type + ' is not considered a kind of solar body');
        return;
      }
    });
  }

  function loadLights(lightsProperties) {
    lightsProperties.forEach(function(lightProperties) {
      var light = SceneFactory.createLight(lightProperties);
      sceneBuilder.addObject(light);
    });
  }

}

/*
 * RingsGeometry.js
 * @Description Rings' Planet geometry.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.RingsGeometry = function (innerRadius, outerRadius, thetaStart, thetaLength, thetaSegments, phiSegments) {

  THREE.Geometry.call( this );

  this.type = 'RingsGeometry';

  this.innerRadius = innerRadius || 0;
  this.outerRadius = outerRadius || 50;

  this.thetaStart = thetaStart !== undefined ? thetaStart : 0;
  this.thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

  this.thetaSegments = thetaSegments !== undefined ? Math.max( 3, thetaSegments ) : 50;
  this.phiSegments = phiSegments !== undefined ? Math.max( 1, phiSegments ) : 50;

  var i, o, uvs = [], radius = this.innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / this.phiSegments ), segment;
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

/*
 * CloudsMesh.js
 * @Description Mesh to build the clouds of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.CloudsMesh = function(cloudProperties) {

  THREE.SolarBody.call(this, cloudProperties);

  this.type = cloudProperties && cloudProperties.type || 'CloudsMesh';
  this.radius = cloudProperties && cloudProperties.radius || 20;
  this.opacity = cloudProperties && cloudProperties.opacity || 0.5;
  this.transparent = cloudProperties && cloudProperties.transparent || true;
  this.depthWrite = cloudProperties && cloudProperties.depthWrite || false;
  this.speed = cloudProperties && cloudProperties.speed || 0.20;

  this.geometry   = new THREE.SphereGeometry(this.radius, 100, 100);
};

THREE.CloudsMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.CloudsMesh.prototype.constructor = THREE.CloudsMesh;

THREE.CloudsMesh.prototype.loadTexture = function (map){
  this.material  = new THREE.MeshPhongMaterial({
    map: map,
    side: THREE.DoubleSide,
    opacity: this.opacity,
    transparent: this.transparent,
    depthWrite : this.depthWrite
  });
};

THREE.CloudsMesh.prototype.update = function() {
  // Clouds rote with random speed between 0.0 and speed (degrees).
  this.rotation.x -= THREE.Math.randFloat( 0.00, this.speed ) * Math.PI / 180;
  this.rotation.y -= THREE.Math.randFloat( 0.00, this.speed ) * Math.PI / 180;
};

/*
 * MoonMesh.js
 * @Description Mesh to build moons.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.MoonMesh = function(moonProperties) {
  this.type = moonProperties &&  moonProperties.type || 'MoonMesh';

  THREE.PlanetMesh.call(this, moonProperties);
};

THREE.MoonMesh.prototype = Object.create( THREE.PlanetMesh.prototype );
THREE.MoonMesh.prototype.constructor = THREE.MoonMesh;

/*
 * OrbitMesh.js
 * @Description Mesh to define the orbits of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.OrbitMesh = function(orbitProperties) {

  THREE.Object3D.call( this );

  this.name = orbitProperties && orbitProperties.name;
  this.type = orbitProperties && orbitProperties.type || 'OrbitMesh';
  this.distance = orbitProperties && orbitProperties.distance || 50;
  this.speed = orbitProperties && orbitProperties.speed || 0;
  this.tilt = orbitProperties && orbitProperties.tilt || 0;
};

THREE.OrbitMesh.prototype = Object.create( THREE.Object3D.prototype );
THREE.OrbitMesh.prototype.constructor = THREE.OrbitMesh;

THREE.OrbitMesh.prototype.update = function() {
  this.rotation.y -= this.speed * Math.PI / 180 ;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update();
  }
};

/*
 * RingsMesh.js
 * @Description Mesh to build the rings of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.RingsMesh = function(ringsProperties) {

  THREE.SolarBody.call(this, ringsProperties);

  this.type = ringsProperties && ringsProperties.type || 'RingsMesh';
  this.tilt = ringsProperties && ringsProperties.tilt || 0;
  this.rotation.x = (90 - (this.tilt)) * Math.PI / 180;
  this.vRotation = ringsProperties && ringsProperties.vRotation || 0;
  this.geometry = new THREE.RingsGeometry(
    ringsProperties && ringsProperties.innerRadius,
    ringsProperties && ringsProperties.outerRadius,
    ringsProperties && ringsProperties.thetaStart,
    ringsProperties && ringsProperties.thetaLength,
    ringsProperties && ringsProperties.thetaSegments,
    ringsProperties && ringsProperties.phiSegments
  );

};

THREE.RingsMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.RingsMesh.prototype.constructor = THREE.RingsMesh;

THREE.RingsMesh.prototype.update = function() {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates N degrees per frame;
};

THREE.RingsMesh.prototype.loadTexture = function(map) {
  this.material = new THREE.MeshPhongMaterial({
      map: map,
      side: THREE.DoubleSide
    });
};

/*
 * StarMesh.js
 * @Description Mesh to build stars.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.StarMesh = function(starProperties) {

  THREE.SolarBody.call( this, starProperties );

  this.type = starProperties && starProperties.type || 'StarMesh';
  this.radius = starProperties && starProperties.radius || 50;
  this.rotation.x = starProperties && starProperties.tilt || 0;
  this.vRotation = starProperties && starProperties.vRotation || 0;
  this.intesity = starProperties && starProperties.intensity || 0.8;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);

  // PointLight cannot cast shadow because of performance capacity.
  var light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
  light.update = function(camera) {
    for(var i in light.children) {
      if(light.children[i].update) {
        light.children[i].update(camera);
      }
    }
  };
  this.add(light);

  this.createLensFlare();
};

THREE.StarMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.StarMesh.prototype.constructor = THREE.StarMesh;

THREE.StarMesh.prototype.createLensFlare = function() {

  var size = this.radius * 2 * this.intesity;
  var flareColor = new THREE.Color( 0xffffff);
  var lensFlare = new THREE.LensFlare(flareColor );
  var texloader = new THREE.TextureLoader();

  texloader.load('img/sun/lensflare1.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 16, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare2.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 16, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare3.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 16, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare4.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 64, 0.0, THREE.AdditiveBlending );
  });

  lensFlare.position = this.position;

  //  This function will operate over each lensflare artifact, moving them around the screen
  lensFlare.update = function(camera, object) {
    if(camera) {
      var dist = camera.position.distanceTo(object.position);
      for(var i in this.lensFlares) {
        this.lensFlares[i].position = object.position;
        this.lensFlares[i].scale = this.lensFlares[i].size /  dist;
      }
    }

    this.updateLensFlares();
  };

  this.add(lensFlare);
  this.hasLensFlare = true;
};

THREE.StarMesh.prototype.loadTexture = function (map){
  this.material  = new THREE.MeshBasicMaterial({
    map: map,
    side: THREE.BackSide
  });
};
