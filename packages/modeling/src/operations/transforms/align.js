const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

const measureAggregateBoundingBox = require('../../measurements/measureAggregateBoundingBox')

const { translate } = require('./translate')

// const alignGeometry = (options, object) => {
//     const defaults = {
//         axes: [true, true, true],
//         align: [0, 0, 0]
//     }
//     const { axes, align } = Object.assign({}, defaults, options)
//
//     const bounds = measureBoundingBox(object)
//     const offset = [0, 0, 0]
//     if (axes[0]) offset[0] = align[0] - (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2))
//     if (axes[1]) offset[1] = align[1] - (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2))
//     if (axes[2]) offset[2] = align[2] - (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))
//     return translate(offset, object)
// }

/**
 * Center the given geometries using the given options.
 * @param {Object} options - options for aligning
 * @param {Array} [options.axes=[true,true,true]] - axis of which to align, true or false
 * @param {Array} [options.align=[0,0,0]] - point of which to align the object upon
 * @param {...Object} geometries - the geometries to align
 * @return {Object|Array} the aligned geometry, or a list of aligned geometries
 * @alias module:modeling/transforms.align
 *
 * @example
 * let myshape = align({axes: [true,false,false]}, sphere()) // align about the X axis
 */
const align = (options, ...geometries) => {
  const defaults = {
    modes: ['center', 'center', 'center'],
    alignTo: [0, 0, 0],
    grouped: false
  }
  const { modes, alignTo, grouped } = Object.assign({}, defaults, options)

  geometries = flatten(geometries)
  //return geometries
  if (geometries.length === 0) throw new Error('align(): No geometries were provided to act upon')
  if (modes.length !== 3) throw new Error('align(): modes must be an array of length 3')
  if (alignTo.length !== 3) throw new Error('align(): alignTo must be an array of length 3')

    if (grouped) {
      let bounds = measureAggregateBoundingBox(geometries)
      let translation = [0,0,0]
      for (let i = 0; i < 3; i++) {
        if (modes[i] === 'center') {
          translation[i] = alignTo[i] - (bounds[0][i] + bounds[1][i]) / 2
        } else if (modes[i] === 'upper') {
          translation[i] = alignTo[i] - bounds[1][i]
        } else if (modes[i] === 'lower') {
          translation[i] = alignTo[i] - bounds[0][i]
        }
      }
      return translate(translation, geometries)
    } else {

    }
  // options = {
  //   axes: axes,
  //   align: align
  // }
  //
  // const results = geometries.map((object) => {
  //   if (path2.isA(object)) return alignGeometry(options, object)
  //   if (geom2.isA(object)) return alignGeometry(options, object)
  //   if (geom3.isA(object)) return alignGeometry(options, object)
  //   return object
  // })
  return results.length === 1 ? results[0] : results
}

const alignX = (...objects) => align({ axes: [true, false, false] }, objects)

const alignY = (...objects) => align({ axes: [false, true, false] }, objects)

const alignZ = (...objects) => align({ axes: [false, false, true] }, objects)

module.exports = {
  align,
  alignX,
  alignY,
  alignZ
}
