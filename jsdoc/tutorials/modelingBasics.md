JSCAD is a solids modelling system. It is fundamentally unitless, however, when you
export files, typically 1 unit is jscad corresponds to 1mm in your model file.

Modelling in JSCAD is often a case of building the shape you want out of primitives,
but there are often many different options to get the same shape.  Check out the 
examples on the JSCAD app page to learn about the different capabilities.

### Working with Primitives
The documentation is your best friend when working with primitives, but the 
provided examples are also a valuable resource.

Most primitives in JSCAD are constructed by calling their constructor function,
and passing in options that define their size, position, resolution, etc.
```javascript
let caseShell = roundedCuboid({size:[2,7,10], center:[10,10,5], segments: 32})
```

You will see a recurring pattern of an array of three numbers, "[30,10,0]" in parameters 
such as cuboid size, object center, etc. These represent the cartesion coordinate system
in JSCAD, and are always in the order x, y, z.

The "segments" option is another common sight, and refers to the number of subdivisions 
present on curved paths and surfaces. A lower number will produce shapes with fewer 
polygons, and less detail on curves. 

### Boolean Operations

### 2D to 3D

### Building with Polygons