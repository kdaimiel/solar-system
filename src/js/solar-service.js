/*
 * solar-service.js
 * @Description Solar Service defines methods to get JSON properties
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var SolarService = (function() {

  'use strict';

  function getJSON(src, callback) {
    $.ajax(src, {
      success: function(data) {
        return callback(data);
      },
      error: function(err) {
        console.error('Load ' + src + ' error :' + JSON.stringify(err, null, '  '));
      }
    });
  }

  return {

    getCamera: function(cameraSrc, callback) {
      getJSON(cameraSrc, callback);
    },

    getBodies: function(bodiesSrc, callback){
      getJSON(bodiesSrc, callback);
    },

    getLights: function(lightsSrc, callback){
      getJSON(lightsSrc, callback);
    }

  };

})();
