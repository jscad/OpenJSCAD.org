const retesselate = require('./retesselate')
const canonicalize = require('./canonicalize')

const intersection = (otherCag, geometry) => {
  let geometries
  if (geometry instanceof Array) {
    geometries = geometry
  } else {
    geometries = [geometry]
  }
  let r = toShape3Wall(otherCag, -1, 1)
  geometries.map( geometry => {
    r = intersectSub(r, toShape3Wall(geometry, -1, 1), false, false)
  })
  r = retesselate(r)
  r = canonicalize(r)
  r = fromFakeCSG(r)
  r = canonicalize(r)
  return r
}

module.exports = intersection