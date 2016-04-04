/*
 * RingsMesh.js
 * @Description Mesh to build the rings of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.RingsMesh = function(ringsProperties) {

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || 'RingsMesh',
    tilt: arguments[2] || 0,
    vRotation: arguments[3] || 0,
    map: arguments[4] || null,
    bumpMap: arguments[5] || null,
    specularMap: arguments[6] || null,
    orbitProperties: arguments[7] || null,
    cloudsProperties: arguments[8] || null,
    ringsProperties: arguments[9] || null
  }, ringsProperties);

  THREE.SolarBody.call(this, this.properties);

  this.tilt = this.properties.tilt;
  this.rotation.x = (90 - (this.properties.tilt)) * Math.PI / 180;
  this.vRotation = this.properties.vRotation;
  this.geometry = new THREE.RingsGeometry(
    this.properties.innerRadius,
    this.properties.outerRadius,
    this.properties.thetaStart,
    this.properties.thetaLength,
    this.properties.thetaSegments,
    this.properties.phiSegments
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
