const toArray = require('../../core/utils/toArray')
const flatten = require('../../core/utils/flatten')
const pipe = require('../../core/utils/pipe')
const {isArray} = require('../../core/utils/typeChecks')

const shape2 = require('../../core/geometry/shape2')
const shape3 = require('../../core/geometry/shape3')
const {isShape2} = require('../../core/utils/typeChecks')

/** rotate an object in 2D/3D space
 * @param {Float|Array} rotation - either an array or simple number to rotate object(s) by
 * @param {Object(s)|Array} shapes either a single or multiple Shape3/Shape2 shapes to rotate
 * @returns {Shape3} new Shape3 object , rotated by the given amount
 *
 * @example
 * let rotatedSphere = rotate([0.2,15,1], spheroid())
 * rotate(r,[x,y,z],o) ????
 * rotate([x,y,z],o) ????
 **/
function rotate (options, ...shapes) {
  const defaults = {
    angle: 1,
    axes: [0, 0, 0]
  }
  if (isArray(options)) {
    options.axes = options
  }
  const {angle, axes} = Object.assign({}, defaults, options)
  shapes = flatten(toArray(shapes))

  const results = shapes.map(function (shape) {
    const typeOp = isShape2(shape) ? shape2 : shape3
    if (angle !== 1) {
      return typeOp.rotate([0, 0, 0], shape) // shape.rotate([0, 0, 0], axes, angle)
    } else {
      return typeOp.rotate(...axes, shape)
      return pipe(
        shape => shape,
        typeOp.rotateX(axes[0]),
        typeOp.rotateY(axes[1]),
        typeOp.rotateZ(axes[2])
      )
        // typeOp.rotateZ(axes[2], typeOp.rotateY(axes[1], typeOp.rotateX(axes[0], shape)))

        // shape.rotateX(axes[0]).rotateY(axes[1]).rotateZ(axes[2])
    }
  })

  // if there is more than one result, return them all , otherwise a single one
  return results.length === 1 ? results[0] : results
}

module.exports = rotate
