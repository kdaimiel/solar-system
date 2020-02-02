/*
 * solar-system-component.js
 * @Description Solar System Web Component
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

'use strict';

window.customElements.define('solar-system',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      var solarSystem = new SolarSystem();
      solarSystem.init(this, this);
    }

    get width() {
      return this.getAttribute('width');
    }

    get height() {
      return this.getAttribute('height');
    }

    get bodiesSrc() {
      return this.getAttribute('bodies-src');
    }

    get cameraSrc() {
      return this.getAttribute('camera-src');
    }

    get lightsSrc() {
      return this.getAttribute('lights-src');
    }

  }

);