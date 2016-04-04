/*
 * SolarSystemComponent.js
 * @Description SolarSystemComponent polymer component.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

require(['solar-system'], function three(SolarSystem) {

  // element registration
  Polymer({
    is: 'solar-system',
    properties: {
      width: {
        type: Number,
        value: window.innerWidth
      },
      height: {
        type: Number,
        value: window.innerHeight
      }
    },
    ready: function() {
      SolarSystem.init(this);
      SolarSystem.loadObjectFronJSONFiles();
    }
  });
});
