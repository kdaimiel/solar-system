
THREE.Rings = function(ringsProperties) {

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

THREE.Rings.prototype = Object.create( THREE.Mesh.prototype );
THREE.Rings.prototype.constructor = THREE.Rings;


THREE.Rings.prototype.update = function() {
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
