const geom3 = require('../geometry/geom3')
const create = require('./create')

/** Cut the solid by a plane. Returns the solid on the back side of the plane
 * @param  {Plane} plane
 * @returns {Shape3} the solid on the back side of the plane
 */
const cutByPlane = (shape, plane) => {
  if (shape.polygons.length === 0) {
    throw new Error('Cannot cut empty Shape3 !')
  }
  const transformedGeom = geom3.transform(shape.transforms, shape.geometry)
  const newShape = create()
  // FIXME : should we clone & reset the original shape ? or create a fresh one ? 
  // ie do we need to keep anything from the original
  newShape.geometry = geom3.cutByPlane(transformedGeom, plane)
  return newShape
}

module.exports = cutByPlane
