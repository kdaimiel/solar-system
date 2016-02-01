/*
 * solar-service
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

  function getCamera(cameraJSONProperties, callback){
    getJSON(cameraJSONProperties, callback);
  }

  function getBodies(bodiesJSONProperties, callback){
    getJSON(bodiesJSONProperties, callback);
  }

  function getLights(lightsJSONProperties, callback){
    getJSON(lightsJSONProperties, callback);
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
