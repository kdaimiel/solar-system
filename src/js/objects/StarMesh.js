
THREE.StarMesh = function(starProperties) {

  THREE.SolarBody.call( this, starProperties );

  this.radius = starProperties.radius || 50;
  this.rotation.x = starProperties.tilt || 0;
  this.vRotation = starProperties.vRotation || 0;

  var texloader = new THREE.TextureLoader();
  texloader.load(starProperties.map, loadTexture.bind(this));

  this.geometry = new THREE.SphereGeometry(this.radius || 50, 100, 100);

  function loadTexture(map) {
    this.material  = new THREE.MeshPhongMaterial({
      map: map,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    // PointLight cannot cast shadow for performance capacity.
    var light = new THREE.PointLight( 0xffffff, 1 );
    light.update = function(camera) {
      for(var i in light.children) {
        if(light.children[i].update) {
          light.children[i].update(camera);
        }
      }
    };
    this.add(light);
  }
};

THREE.StarMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.StarMesh.prototype.constructor = THREE.StarMesh;

THREE.StarMesh.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  if(!this.hasLensFlare) {
    this.createLensFlare(camera);
  }

  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};

THREE.StarMesh.prototype.createLensFlare = function(camera) {

  var vFOV = camera.fov * Math.PI / 180;
  var dist = camera.position.distanceTo(this.position);
  //var size = this.radius * 2 / dist;
  //var size =  20 * Math.atan( height / ( 2 * dist ) ) * ( 180 / Math.PI ); // in degrees

  //var size = 2 * Math.atan( (height / camera.aspect) / ( 2 * dist ) ) * ( 180 / Math.PI );

  var height = 2 * Math.tan( vFOV / 2 ) * dist;
  var rate = this.radius * 2 / height ;
  var size = window.innerHeight * (this.radius * 2 / height);

  console.log(window.innerHeight);
  console.log(rate);
  console.log(size);

  //var size = this.radius * 2 / camera.position.length();
  var flareColor = new THREE.Color( 0xffffff );
  flareColor.offsetHSL( 0.08, 0.5, 0.5 );

  var lensFlare = new THREE.LensFlare(flareColor );
  var texloader = new THREE.TextureLoader();
  texloader.load('img/sun/lensflare0.png', function(textureFlare) {
    lensFlare.add( textureFlare, size, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare1.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 16, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare2.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 17, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare3.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 20, 0.0, THREE.AdditiveBlending );
  });
  texloader.load('img/sun/lensflare4.png', function(textureFlare) {
    lensFlare.add( textureFlare, size * 48, 0.0, THREE.AdditiveBlending );
  });

  lensFlare.position = this.position;

  //lensFlare.size = size;
  //lensFlare.scale = size / camera.position.length();

  //  this function will operate over each lensflare artifact, moving them around the screen
  lensFlare.update = function(camera, object) {
    /*var f, fl = this.lensFlares.length;
    var flare;
    var dist = camera.position.distanceTo(object.position);

    for( f = 0; f < fl; f ++ ) {
      flare = this.lensFlares[ f ];
      console.log(flare);
      flare.pisition = object.position;
      flare.scale = flare.size / dist;
    }*/

    console.log(this.lensFlares[1]);

    var dist = camera.position.distanceTo(object.position);
    for(var i in this.lensFlares) {
      this.lensFlares[i].position = object.position;
      this.lensFlares[i].scale = object.radius * 2  / dist;
    }

  };

  this.add(lensFlare);
  this.hasLensFlare = true;
};
