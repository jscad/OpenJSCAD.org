const vec3 = require('../../math/vec3')

/**
 * Produces a canonicalized path by canonicalizing the contains points as
 *   necessary. Must be called before exposing any point data.
 * @param {path} path - the path to canonicalize.
 * @returns {path}
 * @example
 * canonicalize(path)
 */
const canonicalize = (path) => {
  if (path.isCanonicalized) {
    return path
  }
  // canonicalize in-place.
  path.points = path.basePoints.map(
                    point => vec3.canonicalize(
                                 vec3.transform(path.transforms, point)))
  path.isCanonicalized = true
  return path
}

module.exports = canonicalize
