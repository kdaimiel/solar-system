/*
 * solar-system-react.jsx
 * @Description solar-system react component.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

class SolarSystemComponent extends React.Component {
  render(){
    var solarSystem = new SolarSystem();
    solarSystem.init(this.props);
    return null;
  }
}

var solarSystemElement = document.getElementById('solar-system');

ReactDOM.render(
  <SolarSystemComponent
    width={solarSystemElement.getAttribute('width')}
    height={solarSystemElement.getAttribute('height')}
    bodiesSrc={solarSystemElement.getAttribute('bodies-src')}
    cameraSrc={solarSystemElement.getAttribute('camera-src')}
    lightsSrc={solarSystemElement.getAttribute('lights-src')} />,
  solarSystemElement
);
