const isOverlapping = require('./isOverlapping')
const fromPolygons = require('./fromPolygons')
const retessellate = require('./retessellate')
const canonicalize = require('./canonicalize')

const Tree = require('../trees')

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = (otherGeom3, csg) => {
  let newpolygons = otherGeom3.polygons.concat(csg.polygons)
  let result = fromPolygons(newpolygons)
  // FIXME: what to do with properties ????
  // result.properties = otherGeom3.properties._merge(csg.properties)
  result.isCanonicalized = otherGeom3.isCanonicalized && csg.isCanonicalized
  result.isRetesselated = otherGeom3.isRetesselated && csg.isRetesselated
  return result
}

const unionSub = (otherGeom3, csg, doRetesselate, doCanonicalize) => {
  if (!isOverlapping(otherGeom3, csg)) {
    return unionForNonIntersecting(otherGeom3, csg)
  } else {
    let a = new Tree(otherGeom3.polygons)
    let b = new Tree(csg.polygons)
    a.clipTo(b, false)

    // b.clipTo(a, true); // ERROR: this doesn't work
    b.clipTo(a)
    b.invert()
    b.clipTo(a)
    b.invert()

    let newpolygons = a.allPolygons().concat(b.allPolygons())
    let result = fromPolygons(newpolygons)
    // FIXME: what to do with properties ????
    // result.properties = otherGeom3.properties._merge(csg.properties)
    if (doRetesselate) result = retessellate(result)
    if (doCanonicalize) result = canonicalize(result)
    return result
  }
}

const union = (...solids) => {
  let csgs = solids
  // combine csg pairs in a way that forms a balanced binary tree pattern
  let i
  for (i = 1; i < csgs.length; i += 2) {
    csgs.push(unionSub(csgs[i - 1], csgs[i], false, false))
  }
  return canonicalize(retessellate(csgs[i - 1]))
}

module.exports = union
