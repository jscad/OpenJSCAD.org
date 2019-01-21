const mat4 = require('../math/mat4')
const geom2 = require('../geometry/geom2')

/**
 * @typedef {Object} Shape2 - 2d Shape
 * @property {Geom2} geometry geometry of this shape
 * @property {Mat4} transforms transformation matrix etc of this shape
 * @property {Boolean} isNegative boolean flag for inverted shapes
 */

/**
 * create shape2/ CAG
 * Holds a solid area geometry like CSG but 2D.
 * Each area consists of a number of sides.
 * Each side is a line between 2 points.
 */
const create = () => {
  return {
    type: 'shape2',
    curves: [], // not sure if this should be kept
    properties: {}, // properties are just simple objects, 'children' of the shape (ie transforms applied to the shape are applied to properties)

    geometry: geom2.create(),
    transforms: mat4.identity(),
    isNegative: false // FIXME: should special flags be put in a container object like errm 'flag' ?
  }
}

module.exports = create
