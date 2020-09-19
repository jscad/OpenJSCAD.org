JSCAD is a solids modelling system. It is fundamentally unitless, however, when you
export files, typically 1 unit in JSCAD corresponds to 1 millimeter in your model file.

Modelling in JSCAD is often a case of building the shape you want out of primitives,
but there are often many different options to get the same shape.  Check out the 
examples on the JSCAD app's info menu to learn about the different capabilities.

## Working with Primitives
The documentation is your best friend when working with primitives, but the 
provided examples are also a valuable resource.

Most primitives in JSCAD are constructed by calling their constructor function,
and passing in options that define their size, position, resolution, etc.
```javascript
let caseShell = roundedCuboid({
    size:[2,7,10],
    center:[10,10,5],
    segments: 32
})
```

You will see a recurring pattern of an array of three numbers, "[30,10,0]" in parameters 
such as cuboid size, object center, etc. These represent the cartesian coordinate system
in JSCAD, and are always in the order x, y, z.

The "segments" option is another common sight, and refers to the number of subdivisions 
present on curved paths and surfaces. A lower number will produce shapes with fewer 
polygons, and less detail on curves. 

## Boolean Operations
Booleans are one of the most important tools in the solid modeling toolkit. Many of
the shapes that you will need to create on your journey can be created by joining, 
subtracting and intersecting simple shapes.
<img src="img/booleans.png" alt="JSCAD Parameters Example">

## 2D to 3D
Another valuable way of building shapes is to start with 2D shapes.  These can be created by 
specifying points, starting with basic primitive 2D shapes, or importing SVG files.  The 2D 
shapes can then be extruded to produce a wide variety of different geometries.
```javascript
const jscad = require('@jscad/modeling')
const {polygon } = jscad.primitives
const { extrudeLinear } = jscad.extrusions

function main () {
    const poly = polygon({ points: [[-1, -1], [3, -1], [3.5, 2], [2, 1], [1, 2], [0, 1], [-1, 2]] })
    return extrudeLinear({ height: 5, twistAngle: Math.PI / 4, twistSteps: 10 }, poly)
}

module.exports = { main }
```
<img src="img/extrude.png" alt="Building from polygons Example">

## Building with Polygons
For complex shapes, it is possible to build the surfaces you need from simple polygons.
```javascript
  return polyhedron({
    points: [
      [0, -10, 60], [0, 10, 60], [0, 10, 0], [0, -10, 0], [60, -10, 60], [60, 10, 60],
      [10, -10, 50], [10, 10, 50], [10, 10, 30], [10, -10, 30], [30, -10, 50], [30, 10, 50]
    ],
    faces: [
      [0, 2, 3], [0, 1, 2], [4, 5, 0], [5, 1, 0], [5, 4, 2], [4, 3, 2],
      [6, 9, 8], [6, 8, 7], [6, 11, 10], [6, 7, 11], [10, 11, 8], [10, 8, 9],
      [3, 9, 0], [9, 6, 0], [10, 0, 6], [0, 10, 4], [3, 10, 9], [3, 4, 10],
      [1, 11, 7], [1, 5, 11], [1, 7, 8], [2, 1, 8], [8, 11, 2], [5, 2, 11]
    ]
  })
```
<img src="img/polyhedron.jpg" alt="Building from polygons Example">
