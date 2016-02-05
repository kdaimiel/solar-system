/*
 * solar-properties.js
 * @Description Module to define solar system properties.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('solar-properties', function() {

  'use strict';

  var properties = {
    bodiesJSONProperties: '../src/data/bodies.properties.json',
    cameraJSONProperties: '../src/data/camera.properties.json',
    lightsJSONProperties: '../src/data/lights.properties.json'
  };

  return properties;
});
