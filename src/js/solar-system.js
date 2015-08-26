
require([
  'scene-factory',
  'solar-service'
], function three(SceneFactory, SolarService) {

  SolarService.getCamera(loadCamera);
  SolarService.getObjects(loadObjects);

  function loadCamera(cameraProps) {
    SceneFactory.createCamera(cameraProps);
    SceneFactory.init();
  }

  function loadObjects(objects) {
    objects.forEach(function(element) {
      SceneFactory.createMesh(element);
    });
  }
});
