const geom3 = require('../geometry/geom3')
const shape2 = require('../shape2')

/** project the Shape3 onto a plane
 * This returns a Shape2 with the 'shadow' shape of the 3D solid when projected onto the
 * plane represented by the plane
 * @param  {Shape3} shape the shape3 object to project
 * @param  {Vec4} plane the plane to project along
 * @returns {Shape2} the projection
 */
const project = (shape, plane) => {
  const transformedGeom = geom3.transform(shape.transforms, shape.geometry)
  const projected = shape2.create()
  projected.geometry = geom3.project(transformedGeom, plane)
  return projected
}

module.exports = project
