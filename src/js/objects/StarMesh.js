/*
 * StarMesh.js
 * @Description Mesh to build stars.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.StarMesh = function(starProperties) {

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || 'StarMesh',
    radius: arguments[2] || 50,
    tilt: arguments[3] || 0,
    vRotation: arguments[4] || 0,
    intesity: arguments[5] || 0.8,
    map: arguments[6] || null,
    bumpMap: arguments[7] || null,
    specularMap: arguments[8] || null,
    orbitProperties: arguments[9] || null,
    cloudsProperties: arguments[10] || null,
    ringsProperties: arguments[11] || null
  }, starProperties);

  THREE.SolarBody.call( this, this.properties );

  this.radius = this.properties.radius;
  this.rotation.x = this.properties.tilt;
  this.vRotation = this.properties.vRotation;
  this.intesity = this.properties.intensity;

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
