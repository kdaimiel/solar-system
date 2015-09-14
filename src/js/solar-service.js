
define('solar-service', function() {

  'use strict';

  var service = {
    getCamera: getCamera,
    getPlanets: getPlanets
  };

  return service;

  function getCamera(callback){
    getJSON('../src/data/camera.properties.json', callback);
  }

  function getPlanets(callback){
    getJSON('../src/data/planets.properties.json', callback);
  }

  function getJSON(src, callback) {
    $.ajax(src, {
      success: function(data) {
        return callback(data);
      },
      error: function(err) {
        console.error('Load JSON error:' + err);
      }
    });
  }

});
