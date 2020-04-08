# Summary of V2 Changes

## Modeling Package (Previously named CSG)

The modeling package has been fundamentally changed to acheive several goals.

- math functions have been rewritten based on the glmatrix library, which is array based data
- geometry has been simplified to arrays of data to simplify api, improve memory usage and performance
- geom2 - 2D geometries
- geom3 - 3D geometries
- path2 - 2D paths
- APIs have been made consistant and now align to JavaScript standards for interoperability
- tests for everything, no more unknowns
- lots and lots of improvements and rewrites (simpler is better !)

Please watch out for **BREAKING CHANGES**, while we are aware that having to change your designs can be a hassle, we have tried:

- to aim for a better, simpler, more understandable API
- to keep disruption to a minimum


## Changes to Primitive Shapes

- arc, line
- square / rectangle / roundedRectangle, circle / ellipse, star
- cube / cuboid / roundedCuboid, sphere / ellipsoid, cylinder / cylinderElliptic / roundedCylinder, geodesicSphere, polyhedron, torus
- **NEW**: line 2D primitive
- **NEW**: star 2D primitive
- **NEW**: ellipsoid 3D primitive
- **BREAKING CHANGE**: cylinder definition now uses 'height'
- **BREAKING CHANGE** : primitives are centered at 0,0,0 only. use **translate()** / **center()** to position the shape
- **BREAKING CHANGE** : all angles / rotations are now based on radians. Use **degToRad()** to convert easily.
- APIs have been standardized
- major rewrites of cylinder, roundedRectangle, roundedCube
- bug fixes

## Changes to Transforms

- center, mirror, rotate, scale, transform, translate
- **BREAKING CHANGE** : transforms are accumlated so the order of transforms is now important
- **BREAKING CHANGE** : all rotations are now based on radians. Use **degToRad()** to convert easily.
- APIs have been standardized
- bug fixes

## Changes to Booleans

- intersect, subtract, union
- APIs have been standardized
- bug fixes

## Changes to Measurements

- now includes: measureArea, measureBounds, measureVolume
- **BREAKING CHANGE** : RENAMED bounds() to measureBounds(), now returns an array of [[min, max]]
- **BREAKING CHANGE** : RENAMED area to measureArea
- **BREAKING CHANGE** : RENAMED volume to measureVolume
- **BREAKING CHANGE** : Contraction is now a negative (-) expansion.
- major rewrites of measureArea and measureVolume

## Changes to Expansions

- expand, offset
- **NEW** expand function for 2D paths
- **NEW** offset function for 2D paths and 2D geometries
- **BREAKING CHANGE** : API of expand has been changed
- APIs have been standardized
- bug fixes

## Changes to Extrusions

- extrudeLinear, extrudeRectangular, extrudeRotate, extrudeFromSlices
- **BREAKING CHANGE**: RENAMED linear_extrude to extrudeLinear
- **BREAKING CHANGE**: RENAMED rectangular_extrude to extrudeRectangular
- **BREAKING CHANGE**: RENAMED rotate_extrude to extrudeRotate
- **BREAKING CHANGE**: RENAMED solidFromSlices to extrudeFromSlices
- **BREAKING CHANGE**: all angles / rotations are now based on radians
- APIs have been standardized
- major rewrites of all extrusions

## Changes to Hulls

- hull, hullChain
- **NEW** hull and hullChain for 2D paths
- **NEW** hull for 3D geometries
- **BREAKING CHANGE**: RENAMED chain_hull to hullChain
- APIs have been standardized

## Changes to Colors

- color
- colorNameToRgb, hexToRgb, hslToRgb, hsvToRgb, hueToColorComponent
- rgbToHex, rgbToHsl, rgbtoHsv
- **NEW**: color for 2D geometries and 2D paths
- **BREAKING CHANGE**: REMOVED color using names, use colorNameToRgb

## Changes to text

- **BREAKING CHANGE**: vector_char is now vectorChar with a different API
- **BREAKING CHANGE**: vector_text is now vectorText with a different API


## GENERAL BREAKING CHANGES : Removed Functionality

- **BREAKING CHANGE**: REMOVED CSG, CAG, etc. objects, See Object API
- **BREAKING CHANGE**: REMOVED OpenSCAD functions / function signitures
- **BREAKING CHANGE**: REMOVED OpenSCAD math functions
- **BREAKING CHANGE**: REMOVED old text functions

### REMOVED functionality for 3D geometries

- lieFlat
- getTransformationToFlatLying
- getTransformationAndInverseTransformationToFlatLying
- stretchAtPlane
- cutByPlane
- sectionCut

### REMOVED functionalty for 2D geometries

- overCutInsideCorners
- extrudeInOrthonormalBasis
- extrudeInPlane
NOTE: REMOVED functionality might be supported via small user libraries, if there is a need

## IO Packages

### 3MF

- NEW Serializer (export)
- serialization of 3D geometries to 3MF meshes

### AMF

- Deserializer (import)
- bug fix for colors
- bug fix for model scales
- Serializer (export)
- bug fix for colors

### DXF

- Deserializer (import)
- bug fix for lwpolylines
- bug fix for polylines
- bug fix for colors

### OBJ

- Deserializer (import)
- bug fix for relative vertex references
- enhanced support for groups
- enhanced support for colors (material names)

### STL

- Deserializer (import)
- enhanced translation to jscad scripts
- bug fix for colors

### SVG

- Deserializer (import)
- bug fix for colors
- bug fix for quadradic bezier curves
- bug fix for closed paths
- Serializer (export)
- bug fix for colors
- bug fix for 2D geometries

### X3D

- Serializer (export)
- bug fix for colors

## Command Line Application

tbw

## Desktop Application

tbw

## Web (Site) Application

tbw