## JSCAD Philosophy
The JSCAD tool allows you to write simple javascript code to produce 3D models. The 
output is precise, reproducible and easily configurable. Parametric modelling is made simple and 
easy, allowing you to produce and share re-usable scripts that can adjust a variety of needs without 
touching the code. This makes it an excellent option for 3D printing applications. 

## Usage Options
There are three options for using JSCAD.  It can be run in a browser, in a 
stand-alone application, or as a command-line tool. Most users start with the 
in-browser application, which can be found at [https://openjscad.xyz/](https://openjscad.xyz/). To explore 
the other options, you can get started by visiting the source code in [GitHub](https://github.com/jscad/OpenJSCAD.org/), and 
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
// the import statement allows your code to use JSCAD functions.
import { primitives } from '@jscad/modeling'

// the export statement defines the entry point of the design.
export const main = () => {
  return primitives.cube()
}
```
JSCAD functions must be imported, but there are several different syntaxes for using the functions:
```javascript
// import one or more functional areas from JSCAD:
import { primitives, booleans } from '@jscad/modeling'

// use functions directly
let aCube = primitives.cube()

// or

// use the functions by name
const { cube, sphere } = primitives

let aCube = cube()
let aSphere = sphere()
```
## Adding Methods
Clean, readable code is one of the most important aspects of a useful design. In that respect, it can often be useful to break your code into simple function that do part of the work for your design:
```javascript
import { primitives } from '@jscad/modeling'
const { cylinder } = primitives

const hex = (radius, height) => {
    return cylinder({radius, height, segments: 6})
}

export const main = () => {
  return hex(6, 2)
}
```
## Re-usable Designs
A valuable practise when creating models is to store all but the most trivial values as parameters in the code, rather than using the numerical values directly.  This can be done by storing them in constants in your file...
```javascript
import { primitives } from '@jscad/modeling'
const { cylinder } = primitives

const options = {
    height: 5.1,
    radius: 3.7
}

export const main = () => {
  return cylinder({radius: options.radius, height: options.height, segments: 6})
}
```
 
... or, even better, to include runtime parameters in your design.  This is done using the getParameterDefinitions function:
```javascript
import { primitives } from '@jscad/modeling'
const { cylinder } = primitives

// Declare a function named "getParameterDefinitions". It will return an array of parameter definitions.
export const getParameterDefinitions = () => {
  return [
    { name: 'height', type: 'number', initial: 2.0, min: 1.0, max: 10.0, step: 0.1, caption: 'Hex Height:' },
    { name: 'radius', type: 'number', initial: 5.0, min: 1.0, max: 20.0, caption: 'Hex Radius:' }
  ]
}

// The parameter values are passed into the main function as an object.
export const main = (params) => {
  return cylinder({radius: params.radius, height: params.height, segments: 6})
}
// You must also export the getParameterDefinitions function.
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
