// this file contains all api functions for re-exporting, NOT FINAL AND NOT even valid js at this stage
const center = require('./center')
const solidFromSlices = require('./solidFromSlices')
// const {translate, rotate, scale, applyMatrix} = require('./ops-transforms')
// const {union, difference, intersection} = require('./ops-booleans')
// const {linearExtrude, rotateExtrude, rectangularExtrude, pathExtrude} = require('./ops-extrusions')
// const projection = require('./ops-projections')
// const {minkowski, hull, chainHull} = require('./ops-hulls)
// const {area, volume} = require('./ops-measurements')
// const clone = require('./clone')
// const mirror = require('./mirror')
// const text = require('./text')
// const color = require('./color)
// const {rectangle, ellipse, polygon}

// these are all FUNCTIONS, they do not mutate the inputs, but return new ones
// 2D
rectangle // encompasses both squares & rectangles since squares are a specific rectangle
ellipse // encompases both circle & ellipses since circle are a specific ellipse
polygon
text
// 3D
cuboid // encompasses both cubes & cuboids (rectangle faces) since cubes are a specific cuboid
spheroid // encompasses both spheres & spheroids (3d ellipse) since spheres are a specific spheroid
cylinder
polyhedron
torus // can be obtained with a rotateExtrude, should it be here ?
// booleans : unlike the other operations these describe the operation in a different manner
// ie if we match things translate/rotation would be 'translation' / 'rotation' ... perhaps nitpicking
union
difference
intersection
// transformations
translate
rotate
scale
transform // ie apply/multMatrix : it is also mean as a generic operator to be curried
center
mirror
expand
contract // perhaps expand and contract should just be expand() with a negative value passed in for contract ?
// extrusions
linearExtrude
rotateExtrude
rectangularExtrude
pathExtrude
solidFromSlices // (old name, but the name is fitting)
// projections
projection
// hull
minkowski
hull
chainHull
// measurements
area
volume
//cuts
sectionCut // can be folded into projection() if used like openscad's cut=true
cutByPlane
// various
clone
color
// cnc specific ???
lieFlat
overCutInsideCorners
// semi internal, what to do??
canonicalize
fixTJunctions
retesselate
properties
// various factory functions (not listed here)

module.exports = {
  center,
  solidFromSlices
}
