/*
 * solar-service.js
 * @Description Solar Service defines methods to get JSON properties
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('solar-service', function() {

  'use strict';

  var service = {
    getCamera: getCamera,
    getBodies: getBodies,
    getLights: getLights,
  };

  return service;

  function getCamera(cameraSrc, callback){
    getJSON(cameraSrc, callback);
  }

  function getBodies(bodiesSrc, callback){
    getJSON(bodiesSrc, callback);
  }

  function getLights(lightsSrc, callback){
    getJSON(lightsSrc, callback);
  }

  function getJSON(src, callback) {
    $.ajax(src, {
      success: function(data) {
        return callback(data);
      },
      error: function(err) {
        console.error('Load ' + src + ' error :' + err);
      }
    });
  }
});
