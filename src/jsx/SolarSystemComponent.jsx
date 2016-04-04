/*
 * SolarSystemComponent.jsx
 * @Description SolarSystemComponent react component.
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

var SolarSystemComponent = React.createClass({
  render: function(){
    return (
      <h1>Hello, world!</h1>
    );
  }
});

document.registerReact('solar-system', SolarSystemComponent);
ReactDOM.render(
  <SolarSystemComponent />,
  document.getElementsByTagName('solar-system')
);

