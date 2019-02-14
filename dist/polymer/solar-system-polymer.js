/*
 * solar-system.js
 * @Description Solar System defines methods to init the scene.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
import { PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';

export class SolarSystemElement extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return 'solar-system';
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      bodiesSrc: String,
      cameraSrc: String,
      lightsSrc: String
    };
  }

  ready() {
    var solarSystem = new SolarSystem();
    solarSystem.init(this);
  }

}

// Register the element with the browser.
window.customElements.define('solar-system', SolarSystemElement);