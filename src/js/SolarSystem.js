
require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  var planets = {};
  var orbits = {};

  SolarService.getCamera(loadCamera);

  function loadCamera(cameraProperties) {
    SceneFactory.createCamera(cameraProperties);
    SceneFactory.init();
    SolarService.getPlanets(loadPlanets);
  }

  function loadPlanets(planetsProperties) {
    planetsProperties.forEach(function(planetProperties) {
      createPlanet(planetProperties);
    });
  }

  function createPlanet(planetProperties){
    var planet = new THREE.Planet(planetProperties);
    planets[planet.name] = planet;
    if(planetProperties.orbitProperties) {
      createOrbit(planet, planetProperties.orbitProperties);
    } else {
      SceneFactory.addObject(planet);
    }
  }

  function createOrbit(planet, orbitProperties) {
    orbitProperties.name = planet.name;
    var orbit = new THREE.Orbit(orbitProperties);

    var parentOrbit = orbits[orbitProperties.round] ? orbits[orbitProperties.round] : undefined;

    if(parentOrbit) {
      orbit.position.z = parentOrbit.position.z + parentOrbit.radius || 0;
      parentOrbit.add(orbit);
    } else {
      SceneFactory.addObject(orbit);
    }

    orbits[orbitProperties.name] = orbit;

    planet.position.z = orbit.radius || 0;
    orbit.add(planet);
  }

});
