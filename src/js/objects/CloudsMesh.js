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
