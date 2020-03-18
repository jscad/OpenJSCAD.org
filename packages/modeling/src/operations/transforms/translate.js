const flatten = require('../../utils/flatten')

const mat4 = require('../../math/mat4')

const { geom2, geom3, path2 } = require('../../geometry')

/**
 * Translate the given object(s) using the given options.
 * @param {Number[]} offset - offset (vector) of which to translate the object
 * @param {Object|Array} objects - the objects(s) to translate
 * @return {Object|Array} the translated object(s)
 *
 * @example
 * const newsphere = translate([5, 0, 10], sphere())
 */
const translate = (offset, ...objects) => {
  if (!Array.isArray(offset)) throw new Error('offset must be an array')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the offset if necessary
  offset = offset.slice() // don't modify the original
  while (offset.length < 3) offset.push(0)

  const matrix = mat4.fromTranslation(offset)

  const results = objects.map(function (object) {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Translate the given object(s) along the X axis using the given options.
 * @param {Number} offset - X offset of which to translate the object
 * @param {Object|Array} objects - the objects(s) to translate
 * @return {Object|Array} the translated object(s)
 */
const translateX = (offset, ...objects) => translate([offset, 0, 0], objects)

/**
 * Translate the given object(s) along the Y axis using the given options.
 * @param {Number} offset - Y offset of which to translate the object
 * @param {Object|Array} objects - the objects(s) to translate
 * @return {Object|Array} the translated object(s)
 */
const translateY = (offset, ...objects) => translate([0, offset, 0], objects)

/**
 * Translate the given object(s) along the Z axis using the given options.
 * @param {Number} offset - Z offset of which to translate the object
 * @param {Object|Array} objects - the objects(s) to translate
 * @return {Object|Array} the translated object(s)
 */
const translateZ = (offset, ...objects) => translate([0, 0, offset], objects)

module.exports = {
  translate,
  translateX,
  translateY,
  translateZ
}
