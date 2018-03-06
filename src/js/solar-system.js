/*
 * solar-system.js
 * @Description Solar System defines methods to init the scene.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function SolarSystem() {

  'use strict';

  var bodies = {};

  var solarSystem = {
    addMoon: addMoon,
    addPlanet: addPlanet,
    addStar: addStar,
    init: init
  };

  var solarProperties;

  var sceneBuilder = new SceneBuilder();

  return solarSystem;

  function init(sytemProperties) {
    solarProperties = new SolarProperties(sytemProperties);
    sceneBuilder.init(solarProperties);
    loadObjectFronJSONFiles();
  }

  function addSolarBody(solarBody){
    bodies[solarBody.name] = solarBody;
    if(solarBody.orbitProperties) {
      bodies[solarBody.orbitProperties.round].addSatellite(solarBody);
    } else {
      sceneBuilder.addObject(solarBody);
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
    SolarService.getCamera(solarProperties.cameraSrc, loadCamera);
    SolarService.getBodies(solarProperties.bodiesSrc, loadBodies);
    SolarService.getLights(solarProperties.lightsSrc, loadLights);
  }

  function loadCamera(cameraProperties) {
    var camera = SceneFactory.createCamera(cameraProperties);
    sceneBuilder.setCamera(camera);

    var controls = SceneFactory.createControls(camera, cameraProperties.controls);
    sceneBuilder.setControls(controls);
    sceneBuilder.animate();
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
      sceneBuilder.addObject(light);
    });
  }

}
