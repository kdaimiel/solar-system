
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
      side: THREE.BackSide
    });

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
  }
};

THREE.StarMesh.prototype = Object.create( THREE.SolarBody.prototype );
THREE.StarMesh.prototype.constructor = THREE.StarMesh;

THREE.StarMesh.prototype.update = function(camera) {
  this.rotation.y -= this.vRotation * Math.PI / 180;     // Rotates  N degrees per frame;
  for(var i in this.children) {
    this.children[i].update(camera, this);
  }
};

THREE.StarMesh.prototype.createLensFlare = function() {

  //var vFOV = camera.fov * Math.PI / 180;
  //var dist = camera.position.distanceTo(this.position);
  //var height = 2 * Math.tan( vFOV / 2 ) * dist;
  //var size = window.innerHeight * (this.radius * 2 / height);

  var size = this.radius * 2;
  var flareColor = new THREE.Color( 0xffffff);

  var lensFlare = new THREE.LensFlare(flareColor );
  var texloader = new THREE.TextureLoader();
  texloader.load('img/sun/lensflare0.png', function(textureFlare) {
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

  //  this function will operate over each lensflare artifact, moving them around the screen
  lensFlare.update = function(camera, object) {
    var dist = camera.position.distanceTo(object.position);
    for(var i in this.lensFlares) {
      this.lensFlares[i].position = object.position;
      this.lensFlares[i].scale = this.lensFlares[i].size /  dist;
    }

    this.updateLensFlares();
  };

  this.add(lensFlare);
  this.hasLensFlare = true;
};
