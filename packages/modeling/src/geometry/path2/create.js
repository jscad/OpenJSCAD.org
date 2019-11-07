const mat4 = require('../../math/mat4')

/**
 * Produces an empty, open path.
 * @returns {path} a new empty, open path
 * @example
 * let newpath = create()
 */
const create = (points) => {
  if (points === undefined) {
    points = []
  }
  return {
    points: points,
    isClosed: false,
    transforms: mat4.identity()
  }
}

module.exports = create
