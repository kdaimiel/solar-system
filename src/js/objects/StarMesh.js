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
  this.intensity = starProperties && starProperties.intensity || 0.8;

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);

  this.createLensFlare();
};

THREE.StarMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.StarMesh.prototype.constructor = THREE.StarMesh;

THREE.StarMesh.prototype.createLensFlare = function() {

  var size = this.radius * 2 * this.intensity;
  var flareColor = new THREE.Color( 0xffffff);

  var texloader = new THREE.TextureLoader();

  var textureFlare1 = texloader.load('img/sun/lensflare1.png');
  var textureFlare2 = texloader.load('img/sun/lensflare2.png');
  var textureFlare3 = texloader.load('img/sun/lensflare3.png');
  var textureFlare4 = texloader.load('img/sun/lensflare4.png');

  var lensFlare = new THREE.Lensflare();

  lensFlare.addElement( new THREE.LensflareElement( textureFlare1, size * 16, 0.0, flareColor, THREE.AdditiveBlending ));
  lensFlare.addElement( new THREE.LensflareElement( textureFlare2, size * 16, 0.0, flareColor, THREE.AdditiveBlending ));
  lensFlare.addElement( new THREE.LensflareElement( textureFlare3, size * 16, 0.0, flareColor, THREE.AdditiveBlending ));
  lensFlare.addElement( new THREE.LensflareElement( textureFlare4, size * 64, 0.0, flareColor, THREE.AdditiveBlending ));

  //  This function will operate over each lensflare artifact, moving them around the screen
  lensFlare.update = function(camera, object) {
    if(camera) {
      var dist = camera.position.distanceTo(object.position);
      for(var i in this.lensFlares) {
        this.lensFlares[i].position = object.position;
        this.lensFlares[i].scale = this.lensFlares[i].size /  dist;
      }
    }
  };

  // PointLight cannot cast shadow because of performance capacity.
  var light = new THREE.PointLight( flareColor, 1.5, 4500 );
  light.update = function(camera) {
    for(var i in light.children) {
      if(light.children[i].update) {
        light.children[i].update(camera);
      }
    }
  };
  light.add( lensFlare );

  this.add(light);
  this.add(lensFlare);

  this.hasLensFlare = true;
};

THREE.StarMesh.prototype.loadTexture = function (map){
  this.material  = new THREE.MeshBasicMaterial({
    map: map,
    side: THREE.BackSide
  });
};
