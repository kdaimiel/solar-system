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
