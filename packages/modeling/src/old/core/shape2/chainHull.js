const geom2 = require('../geometry/geom2')
const clone = require('./clone')
const create = require('./create')

/** create a convex chainHull of the given shapes
 * Originally "Whosa whatsis" suggested "Chain Hull" ,
 * as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
 * essentially hull A+B, B+C, C+D and then union those
 * @typedef  {import('./create').Shape2} Shape2
 * @param {Array} shapes a list of Shape2 objects to create a chainHull around
 * @returns {Shape2} new Shape2 object , a chainHull around the given shapes
 *
 * @example
 * let hulled = chainHull(rectangle(), ellipse())
 */
const chainHull = shapes => {
  // first we transform all geometries to 'bake in' the transforms
  const updatedGeoms = shapes.map(shape => geom2.transform(shape.transforms, shape.geometry))
  const newGeometry = geom2.chainHull({}, updatedGeoms)
  /* this means that the new shape:
   - has default transforms (reset)
   - does not get any attributes or data from the input shapes
  */
  const newShape = create()
  newShape.geometry = newGeometry
  return newShape
}

module.exports = chainHull
