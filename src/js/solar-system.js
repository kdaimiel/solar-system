/*
 * solar-system.js
 * @Description Solar System defines methods to init the scene.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
define('solar-system', [
  'scene-builder',
  'scene-factory',
  'solar-factory',
  'solar-service',
  'solar-properties'
], function(SceneBuilder, SceneFactory, SolarFactory, SolarService, SolarProperties) {

  'use strict';

  var bodies = {};

  var solarSystem = {
    addMoon: addMoon,
    addPlanet: addPlanet,
    addStar: addStar,
    init: init
  };

  return solarSystem;

  function init(sytemProperties) {
    SolarProperties.setProperties(sytemProperties);
    SceneBuilder.init(SolarProperties);
    loadObjectFronJSONFiles();
  }

  function addSolarBody(solarBody){
    bodies[solarBody.name] = solarBody;
    if(solarBody.orbitProperties) {
      bodies[solarBody.orbitProperties.round].addSatellite(solarBody, solarBody.orbitProperties);
    } else {
      SceneBuilder.addObject(solarBody);
    }
  }

  function addMoon(moonProperties) {
    var moon = SolarFactory.createMoon(moonProperties);
    addSolarBody(moon);
  }

  function addPlanet(planetProperties){
    var planet = SolarFactory.createPlanet(planetProperties);
    addSolarBody(planet);
  }

  function addStar(starProperties){
    var star = SolarFactory.createStar(starProperties);
    addSolarBody(star);
  }

  function loadObjectFronJSONFiles(){
    SolarService.getCamera(SolarProperties.cameraSrc, loadCamera);
    SolarService.getBodies(SolarProperties.bodiesSrc, loadBodies);
    SolarService.getLights(SolarProperties.lightsSrc, loadLights);
  }

  function loadCamera(cameraProperties) {
    var camera = SceneFactory.createCamera(cameraProperties);
    SceneBuilder.setCamera(camera);

    var controls = SceneFactory.createControls(camera, cameraProperties.controls);
    SceneBuilder.setControls(controls);
    SceneBuilder.animate();
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(bodyProperties) {
      switch(bodyProperties.type) {
      case 'Star':
        addStar(bodyProperties);
        break;
      case 'Planet':
        addPlanet(bodyProperties);
        break;
      case 'Dwarf Planet':
        addPlanet(bodyProperties);
        break;
      case 'Moon':
        addMoon(bodyProperties);
        break;
      default:
        console.error(bodyProperties.type + ' is not considered a kind of solar body');
        return;
      }
    });
  }

  function loadLights(lightsProperties) {
    lightsProperties.forEach(function(lightProperties) {
      var light = SceneFactory.createLight(lightProperties);
      SceneBuilder.addObject(light);
    });
  }

});
