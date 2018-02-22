/*
 * solar-properties.js
 * @Description Module to define solar system properties.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function SolarProperties(properties) {

  'use strict';

  return {
    width: properties && properties.width,
    height: properties && properties.height,
    bodiesSrc: properties && properties.bodiesSrc || 'data/bodies.properties.json',
    cameraSrc: properties && properties.cameraSrc || 'data/camera.properties.json',
    lightsSrc: properties && properties.lightsSrc || 'data/lights.properties.json',
  };

}
