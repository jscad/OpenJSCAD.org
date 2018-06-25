
# CSG/CAG Objects
    - removal of almost all methods
    TODO: list here 
    - no more boolean operations on the prototypes of CSG/CAG Objects !!
     ie this is valid const foo = union(a, b) 
     but this is not const foo = a.union(b)
    - CSG/CAG objects now have a .pipe() method
    to be able to chain operations on them using functions:
    ie benefit of functional approach while allowing chaining
    this is also in preparation for the day browsers & Node.js will
    support the > (pipe) operator 

## Math utilities & data structures:
 * vector3/3D is deprecated and replaced by vec3
  * not a class anymore, but a set of helper functions, that are also compatible with the stack.gl ecosystem
 * vector2/2D is deprecated and replaced by vec3
  * not a class anymore, but a set of helper functions, that are also compatible with the stack.gl ecosystem
 * matrix4 is deprecated and replaced by mat4
  * not a class anymore, but a set of helper functions, that are also compatible with the stack.gl ecosystem
# API

    - snake case methods are now camel case: ie chain_hull => chainHull
    - a SINGLE function per shape : no more CSG.sphere() vs sphere()
      - unified functions keep the openscad shortcuts, but also add more explicit ones
        - ie : h => height, fn => segments

  ## Booleans

    - no more implicit extrusions : ie union(2dShape, 3dShape) will not work anymore : you need to explicitely
    convert shapes before applying operations : ie extrude 2d shapes, or project/flatten 3d shapes

  ## Transformations

    - expand/contract is now only expand, with negative values
    - rotate, translate, scale etc do NOT do implicit UNIONS anymore => array in, array out, single item item in, single item out

  ## Primitives

    - square => rectangle
    - circle => ellipse
    - triangle => GONE

    - cube => cuboid
    - sphere => spheroid ? (not sure about this one)

    - rectangle: now accepts either :
      * a size named parameter
      * a single numeric value (creates a square)
      * an array of numeric values 

      * center can be either a single boolean, a 2d array of booleans, or a 2d array of numeric values
      (for direct positioning)

  ## Extrusions

    - rectangular_extrude (basePoints, params) => rectangularExtrude(params, basePoints)
    - linear_extrude => linearExtrude
    - rotate_extrude => rotateExtrude
    - extrusions of 2d shapes with no edges (sides length === 0) will now throw an error
    - solidFromSlices(polygon, options) => solidFromSlices(options, polygon)

  ## Colors
    - cut up into modules
    - a few helper functions have been renamed for correctness & clarity
      * rgb2Html => rgbToHex
      * hex2Html => hexToRgb
      * css2Rgb => colorNameToRgb
  
  ## Properties
    - there is no 'properties' class/ object anymore
    - it is a simple array (Object??) attribute on parts/shapes

# Things to fix:

- rectangular_extrude's 'round' option was actually never used !!