
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
    //this.createLensFlare(camera);
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
