/*
 * solar-properties.js
 * @Description Module to define solar system properties.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('solar-properties', function() {

  'use strict';

  // Default properties values
  var width = null;
  var height = null;
  var bodiesSrc = 'data/bodies.properties.json';
  var cameraSrc = 'data/camera.properties.json';
  var lightsSrc = 'data/lights.properties.json';

  var properties = {
    width: width,
    height: height,
    bodiesSrc: bodiesSrc,
    cameraSrc: cameraSrc,
    lightsSrc: lightsSrc,
    setProperties: setProperties
  };

  return properties;

  function setProperties(newProperties) {
    if(newProperties) {
      properties.width = newProperties.width || width;
      properties.height = newProperties.height || height;
      properties.bodiesSrc = newProperties.bodiesSrc || bodiesSrc;
      properties.cameraSrc = newProperties.cameraSrc || cameraSrc;
      properties.lightsSrc = newProperties.lightsSrc || lightsSrc;
    }
  }

});
