define(['json!data/solar-objects.json'], function(objects){

  var getAll = function() {
    return objects;
  };

  return {
    list: getAll
  };
});
