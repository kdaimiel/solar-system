/*
 * solar-service.js
 * @Description Solar Service defines methods to get JSON properties
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var SolarService = (function() {

  'use strict';

  function getJSON(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          callback(JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.status >= 400) {
          console.error('Load ' + url + ' error, status: ' + xmlHttp.status);
        }
      }
    };
    xmlHttp.onerror = function(err) {
      console.error('Load ' + url + ' error :' + JSON.stringify(err, null, '  '));
    };

    xmlHttp.open('GET', url, true);  // true for asynchronous

    xmlHttp.send(null);
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
