const flatten = require('../../utils/flatten')

const mat4 = require('../../math/mat4')

const {geom2, geom3, path2} = require('../../geometry')

/**
 * Translate the given object(s) using the given options (if any)
 * @param {Array} offsets - offsets of which to translate the object
 * @param {Object|Array} objects - the objects(s) to translate
 * @return {Object|Array} the translated object(s)
 *
 * @example
 * const newsphere = translate({offsets: [5, 0, 10]}, sphere())
 */
const translate = (offsets, ...objects) => {
  if (!Array.isArray(offsets)) throw new Error('offsets must be an array')
  if (offsets.length != 3) throw new Error('offsets must contain X, Y and Z values')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const matrix = mat4.fromTranslation(offsets)

  const results = objects.map(function (object) {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

const translateX = (offset, ...objects) => translate([offset, 0, 0], objects)

const translateY = (offset, ...objects) => translate([0, offset, 0], objects)

const translateZ = (offset, ...objects) => translate([0, 0, offset], objects)

module.exports = {
  translate,
  translateX,
  translateY,
  translateZ
}
