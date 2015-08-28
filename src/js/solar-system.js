
require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  SolarService.getCamera(loadCamera);

  function loadCamera(cameraProperties) {
    SceneFactory.createCamera(cameraProperties);
    SceneFactory.init();
    SolarService.getObjects(loadObjects);
  }

  function loadObjects(systemPropertes) {
    systemPropertes.forEach(function(element) {
      SceneFactory.createMesh(element);
    });
  }
});
