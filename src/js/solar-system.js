
require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  SolarService.getCamera(loadCamera);

  function loadCamera(cameraProperties) {
    SceneFactory.createCamera(cameraProperties);
    SceneFactory.init();
    SolarService.getBodies(loadBodies);
  }

  function loadBodies(bodiesProperties) {
    bodiesProperties.forEach(function(element) {
      SceneFactory.createBody(element);
    });
  }
});
