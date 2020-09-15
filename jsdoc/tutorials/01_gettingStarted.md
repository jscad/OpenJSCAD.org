## JSCAD Philosophy
The JSCAD tool allows you to write simple javascript code to produce 3D models. The 
output is precise, reproducible and easily configurable. Parametric modelling is made simple and 
easy, allowing you to produce and share re-usable scripts that can adjust a variety of needs without 
touching the code. This makes it an excellent option for 3D printing applications. 

## Usage Options
There are three options for using JSCAD.  It can be run in a browser, in a 
stand-alone application, or as a command-line tool. Most users start with the 
in-browser application, which can be found at [https://jscad.xyz/](https://jscad.xyz/). To explore 
the other options, you can get started by visiting the source code in [GitHub](https://github.com/jscad/OpenJSCAD.org/tree/V2), and 
checking out the code.

In all usage options, you start with a javascript text file that programmatically
describes your model. The file (or even group of files) is handed off to JSCAD for 
processing. The model can be outputted as STL, AMF, DXF, JSON and X3D formats.
 
## Model Script Basics
Your JSCAD Project typically starts with creating a text file in the editor of your choice.  Save it 
with a .js file extension, and when you are ready, drag it onto the JSCAD modeling window, or select 
it with the "Load a JSCAD Project" file dialog. 

The simplest file that will render a cube in JSCAD looks like this:
```javascript
// An import statement allows your code to use jscad methods:
const { cube } = require('@jscad/modeling').primitives

// A function declaration that returns geometry
const main = () => {
  return cube()
}

// A declaration of what elements in the module (this file) are externally available.
module.exports = { main }
```
Code must be imported using require, but there are several different syntaxes for doing this:
```javascript
// import only a specific object:
const cube = require('@jscad/modeling/primitives/cube')
let aCube = cube()

// import one or several objects from a module:
const { cube, sphere } = require('@jscad/modeling/primitives')
// or
const { cube, sphere } = require('@jscad/modeling').primitives
// ...
let aCube = cube()

// import all jscad code into a single object:
const jscad = require('@jscad/modeling')
const { cube, sphere } = jscad.primitives
// ...
let aCube = cube()
let aTorus = jscad.primitives.torus()
```
## Adding Methods
Clean, readable code is one of the most important aspects of a useful design. In that respect, it can often be useful to break your code into simple methods that do part of the work for your design:
```javascript
const { cylinder } = require('@jscad/modeling').primitives

const hex = (radius, height) => {
    return cylinder({radius, height, segments: 6})
}

const main = () => {
  return hex(6, 2)
}

module.exports = { main }
```
## Re-usable Designs
A valuable practise when creating models is to store all but the most trivial values as parameters in the code, rather than using the numerical values directly.  This can be done by storing them in constants in your file...
```javascript
const { cylinder } = require('@jscad/modeling').primitives

const options = {
    height: 5.1,
    radius: 3.7
}

const main = () => {
  return cylinder({radius: options.radius, height: options.height, segments: 6})
}

module.exports = { main }
```
 
... or, even better, to include runtime parameters in your design.  This is done using the getParameterDefinitions method:
```javascript
const { cylinder } = require('@jscad/modeling').primitives

// Declare a function named "getParameterDefinitions". It will return an array of parameter definitions.
const getParameterDefinitions = () => {
  return [
    { name: 'height', type: 'number', initial: 2.0, min: 1.0, max: 10.0, step: 0.1, caption: 'Hex Height:' },
    { name: 'radius', type: 'number', initial: 5.0, min: 1.0, max: 20.0, caption: 'Hex Radius:' }
  ]
}

// The parameter values are passed into the main method as an object.
const main = (params) => {
  return cylinder({radius: params.radius, height: params.height, segments: 6})
}

// You must also export the getParameterDefinitions method.
module.exports = { main, getParameterDefinitions }
```
<img src="img/parameters.png" alt="JSCAD Parameters Example">

## JSCAD Conventions...
In JSCAD code, you will see a number of conventions that may be useful in your code...

We prefer JS arrow function notation over function declaration:
```javascript
const buildFrame = (w,d,h) => {
    ... 
}
// over
function buildFrame(w,d,h) {
    ...
}
```
Short form object creation and deconstruction:
```javascript
let radius = ...
let height = ...

return { radius, height }
// over
return { radius: radius, height: height }

const { radius, height } = options
// over
const radius = options.radius
const height = options.height 
``` 
