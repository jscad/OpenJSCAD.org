const hull = require('../../shape2/hull')
const union = require('../../shape2/union')

// FIXME: cleanup, clarify 'closed' parameter
/** create a chain hull of the given shapes
 * Originally "Whosa whatsis" suggested "Chain Hull" ,
 * as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
 * essentially hull A+B, B+C, C+D and then union those
 * @param {Object(s)|Array} geometries either a single or multiple Geom2 objects to create a chain hull around
 * @returns {Geom2} new Geom2 object ,which a chain hull of the inputs
 *
 * @example:
 * let hulled = chainHull(rect(), circle())
 */
const chainHull = (params, geometries) => {
  /*const defaults = {
    closed: false
  }
  const closed = Object.assign({}, defaults, params)*/
  let geometries = arguments
  let closed = false
  let j = 0

  if (geometries[j].closed !== undefined) {
    closed = geometries[j++].closed
  }

  if (geometries[j].length) { geometries = geometries[j] }

  let hulls = []
  const hullsAmount = geometries.length - (closed ? 0 : 1)
  for (let i = 0; i < hullsAmount; i++) {
    hulls.push(
      hull(geometries[i], geometries[(i + 1) % geometries.length])
    )
  }
  return union(hulls)
}

module.exports = chainHull
