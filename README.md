# Solar System in Threejs

This is a 3D Solar System JavaScript model created with [Threejs](https://threejs.org/).

![alt text](media/solar-system.gif)

## Usage
The easy way to use the 3D Solar System is importing dependencies and using plain JavaScript.

```html
<script type="text/javascript" src="../dist/libs/three/build/three.min.js"></script>
<script type="text/javascript" src="../dist/libs/three/examples/js/controls/TrackballControls.js"></script>
<script type="text/javascript" src="../dist/libs/three/examples/js/objects/Lensflare.js"></script>

<script type="text/javascript" src="../dist/solar-system.min.js"></script>

<script>
  var solarSystem = new SolarSystem();
  solarSystem.init();
</script>
```

We may also change default properties as follow.

```html
<script>
  var solarSystem = new SolarSystem();
  solarSystem.init( {
    width: '500',
    height: '500',
    'bodies-src': 'data/bodies.properties.json',
    'camera-src': 'data/camera.properties.json',
    'lights-src': 'data/lights.properties.json'
  });
</script>
```

Check [demo](demo) folder to see some examples.

>Note that data properties could be change to create new System models. Here and example of planet Earth.

```json
{
  "name": "Earth",
  "type": "Planet",
  "radius": 1,
  "tilt": 23.17,
  "vRotation": 0.1,
  "map": "img/earth/earthmap1k.jpg",
  "bumpMap": "img/earth/earthbump1k.jpg",
  "specularMap": "img/earth/earthspec1k.jpg",
  "orbitProperties": {
    "round" : "Sun",
    "distance": 14.5,
    "speed": 0.2
  },
  "cloudsProperties": {
    "radius": 1.01,
    "opacity": 0.5,
    "transparent" : true,
    "depthWrite"  : false,
    "speed": 0.2,
    "map": "img/earth/earthcloudmap.jpg"
  }
}
```

**React**

We can also import the 3D Solar System as a [Reactjs](https://facebook.github.io/react/) component.

```html
<script type="text/javascript" src="../dist/libs/react/react.js"></script>
<script type="text/javascript" src="../dist/libs/react/react-dom.js"></script>

<script type="text/javascript" src="../dist/libs/three/build/three.min.js"></script>
<script type="text/javascript" src="../dist/libs/three/examples/js/controls/TrackballControls.js"></script>
<script type="text/javascript" src="../dist/libs/three/examples/js/objects/Lensflare.js"></script>

<script type="text/javascript" src="../dist/solar-system.min.js"></script>

<div id="solar-system"
  width="500"
  height="500"
  bodies-src="data/bodies.properties.json"
  camera-src="data/camera.properties.json"
  lights-src="data/lights.properties.json">
</div>

<script async src="../dist/solar-system-react.js"></script>
```

**Polymer**

We can also import the 3D Solar System as a [Polymer](https://www.polymer-project.org/) component.


```html
<script src="../dist/libs/webcomponentsjs/webcomponents-loader.js" async></script>

<script type="text/javascript" src="../dist/libs/three/build/three.min.js"></script>
<script type="text/javascript" src="../dist/libs/three/examples/js/controls/TrackballControls.js"></script>
<script type="text/javascript" src="../dist/libs/three/examples/js/objects/Lensflare.js"></script>

<script type="text/javascript" src="../dist/solar-system.min.js"></script>

<script src="../dist/solar-system-polymer.js" type="module" async></script>

<solar-system
  width="500"
  height="500"
  bodies-src="data/bodies.properties.json"
  camera-src="data/camera.properties.json"
  lights-src="data/lights.properties.json">
</solar-system>
```

## Development Guidelines

### Install

Install dependencies with `npm` within project folder.

```sh
npm install
```

### Build

We use `gulp` as a task runner to build the project. So we suggest to install `gulp-cli` as a global dependency.

```sh
npm install -g gulp gulp-cli
```

Then build the project with `gulp` as a global dependency inside project folder.

```sh
gulp build
```

However, we can also build project with `gulp` as a local dependecy inside project folder.

```sh
./node_modules/.bin/gulp build
```

Or, using a `npm` script.

```sh
npm run build
```

### Serve
We can build project on `serve` mode to check change immediately.

```sh
gulp serve
```

or

```sh
./node_modules/.bin/gulp serve
```

or

```sh
npm run serve
```

This throws a Web Server in `http://localhost:9000/` watching source files to check changes.

### Tests
We also use `gulp` to run tests. So, using `gulp` as global dependency.

```sh
gulp test
```

However, using `gulp` as a local dependency.

```sh
./node_modules/.bin/gulp test
```

Or, just using `npm` script.

```sh
npm test
```

It is also possible to run test on `watch` mode.

```sh
gulp test:watch
```

or

```sh
./node_modules/.bin/gulp test:watch
```

or

```sh
npm run test:watch
```
