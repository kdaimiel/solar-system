/*
 * CloudsMesh.js
 * @Description Mesh to build the clouds of planets.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
THREE.CloudsMesh = function(cloudProperties) {

  this.properties = _.extend({
    name: arguments[0] || null,
    type: arguments[1] || 'CloudsMesh',
    radius: arguments[2] || 20,
    opacity: arguments[3] || 0.5,
    transparent: arguments[4] || true,
    depthWrite: arguments[5] || false,
    speed: arguments[6] || 0.20, // The max speed of the clouds rotation
    map: arguments[7] || null,
    bumpMap: arguments[8] || null,
    specularMap: arguments[9] || null,
  }, cloudProperties);

  THREE.SolarBody.call(this, this.properties);

  this.radius = this.properties.radius;
  this.opacity = this.properties.opacity;
  this.transparent = this.properties.transparent;
  this.depthWrite = this.properties.depthWrite;
  this.speed = this.properties.speed;

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
