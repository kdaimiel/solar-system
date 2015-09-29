
define('solar-service', function() {

  'use strict';

  var service = {
    getCameras: getCameras,
    getBodies: getBodies,
    getLights: getLights
  };

  return service;

  function getCameras(callback){
    getJSON('../src/data/cameras.properties.json', callback);
  }

  function getBodies(callback){
    getJSON('../src/data/bodies.properties.json', callback);
  }

  function getLights(callback){
    getJSON('../src/data/lights.properties.json', callback);
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
