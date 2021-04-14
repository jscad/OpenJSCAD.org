const geom3 = require('../../geometries/geom3')

const mayOverlap = require('./mayOverlap')
const { Tree } = require('./trees')

/*
 * Return a new 3D geometry representing the space in both the first geometry and
 * the second geometry. None of the given geometries are modified.
 * @param {geom3} geometry1 - a geometry
 * @param {geom3} geometry2 - a geometry
 * @returns {geom3} new 3D geometry
 */
const intersectGeom3Sub = (geometry1, geometry2) => {
  if (!mayOverlap(geometry1, geometry2)) {
    return geom3.create() // empty geometry
  }

  const a = new Tree(geom3.toPolygons(geometry1))
  const b = new Tree(geom3.toPolygons(geometry2))

  a.invert()
  b.clipTo(a)
  b.invert()
  a.clipTo(b)
  b.clipTo(a)
  a.addPolygons(b.allPolygons())
  a.invert()

  const newpolygons = a.allPolygons()
  return geom3.create(newpolygons)
}

module.exports = intersectGeom3Sub
