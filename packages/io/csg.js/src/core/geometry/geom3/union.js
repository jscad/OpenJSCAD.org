const flatten = require('../../utils/flatten')
const toArray = require('../../utils/toArray')

const Tree = require('../trees')

const isOverlapping = require('./isOverlapping')
const fromPolygons = require('./fromPolygons')
const retessellate = require('./retessellate')
const canonicalize = require('./canonicalize')

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = (otherGeom3, csg) => {
  const newpolygons = otherGeom3.polygons.concat(csg.polygons)
  const result = fromPolygons(newpolygons)
  // FIXME: what to do with properties ????
  // result.properties = otherGeom3.properties._merge(csg.properties)
  result.isCanonicalized = otherGeom3.isCanonicalized && csg.isCanonicalized
  result.isRetesselated = otherGeom3.isRetesselated && csg.isRetesselated
  return result
}

const unionSub = (otherGeom3, csg, doRetesselate, doCanonicalize) => {
  if (!isOverlapping(otherGeom3, csg)) {
    return unionForNonIntersecting(otherGeom3, csg)
  }
  const a = new Tree(otherGeom3.polygons)
  const b = new Tree(csg.polygons)
  a.clipTo(b, false)

  // b.clipTo(a, true); // ERROR: this doesn't work
  b.clipTo(a)
  b.invert()
  b.clipTo(a)
  b.invert()

  const newpolygons = a.allPolygons().concat(b.allPolygons())
  let result = fromPolygons(newpolygons)
  // FIXME: what to do with properties ????
  // result.properties = otherGeom3.properties._merge(csg.properties)
  if (doCanonicalize) result = canonicalize(result)
  if (doRetesselate) result = retessellate(result)
  return result
}

const union = (...geometries) => {
  geometries = flatten(toArray(geometries))
  if (geometries.length === 0) throw new Error('union requires one or more geometries')

  // combine geometries in a way that forms a balanced binary tree pattern
  let i
  for (i = 1; i < geometries.length; i += 2) {
    geometries.push(unionSub(geometries[i - 1], geometries[i], false, false))
  }
  return retessellate(canonicalize(geometries[i - 1]))
}

module.exports = union
