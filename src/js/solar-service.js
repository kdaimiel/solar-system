
define('solar-service', function() {

  'use strict';

  var service = {
    getCamera: getCamera,
    getObjects: getObjects
  };

  return service;

  function getCamera(callback){
    getJSON('../src/data/solar-camera.json', callback);
  }

  function getObjects(callback){
    getJSON('../src/data/solar-objects.json', callback);
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
