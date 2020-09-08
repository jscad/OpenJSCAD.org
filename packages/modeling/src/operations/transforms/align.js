const flatten = require('../../utils/flatten')
const { measureAggregateBoundingBox } = require('../../measurements')
const { translate } = require('./translate')

const validateOptions = (options) => {
  const defaults = {
    modes: ['center', 'center', 'lower'],
    alignTo: [0, 0, 0],
    grouped: false
  }
  options = Object.assign({}, defaults, options)

  if (options.modes.length !== 3) throw new Error('align(): modes must be an array of length 3')
  if (options.modes.filter(mode => ['center', 'upper', 'lower', 'none'].includes(mode)).length !== 3) throw new Error('align(): all modes must be one of "center", "upper" or "lower"')
  if (options.alignTo.length !== 3) throw new Error('align(): alignTo must be an array of length 3')
  if (options.alignTo.filter(alignVal => (Number.isFinite(alignVal) || alignVal == null)).length !== 3) throw new Error('align(): all alignTo values must be a number, or null.')
  if (options.grouped !== true && options.grouped !== false) throw new Error('align(): grouped must be either true or false.')
  return options
}

const populateAlignToFromBounds = (alignTo, modes, bounds) => {
  for (let i = 0; i < 3; i++) {
    if (alignTo[i] == null) {
      if (modes[i] === 'center') {
        alignTo[i] = (bounds[0][i] + bounds[1][i]) / 2
      } else if (modes[i] === 'upper') {
        alignTo[i] = bounds[1][i]
      } else if (modes[i] === 'lower') {
        alignTo[i] = bounds[0][i]
      }
    }
  }
  return alignTo
}

const alignGeometries = (geometry, modes, alignTo) => {
  const bounds = measureAggregateBoundingBox(geometry)
  const translation = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    if (modes[i] === 'center') {
      translation[i] = alignTo[i] - (bounds[0][i] + bounds[1][i]) / 2
    } else if (modes[i] === 'upper') {
      translation[i] = alignTo[i] - bounds[1][i]
    } else if (modes[i] === 'lower') {
      translation[i] = alignTo[i] - bounds[0][i]
    }
  }

  return translate(translation, geometry)
}

/**
 * Align the given geometries using the given options.
 * @param {Object} options - options for aligning
 * @param {Array} [options.modes = ['center', 'center', 'lower']] - axis of which to align, true or false
 * @param {Array} [options.alignTo = [0,0,0]] - point of which to align the object upon
 * @param {Array} [options.grouped = false] - point of which to align the object upon
 * @param {...Object} geometries - the geometries to align
 * @return {Object|Array} the aligned geometry, or a list of aligned geometries
 * @alias module:modeling/transforms.align
 *
 * @example
 * let alignedGeometries = align({modes: ['lower', 'center', 'none'], alignTo: [10, null, 10], grouped: true }, geometries)
 */
const align = (options, ...geometries) => {
  options = validateOptions(options)
  let { modes, alignTo, grouped } = options
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('align(): No geometries were provided to act upon')

  if (alignTo.filter(val => val == null).length) {
    const bounds = measureAggregateBoundingBox(geometries)
    alignTo = populateAlignToFromBounds(alignTo, modes, bounds)
  }
  if (grouped) {
    geometries = alignGeometries(geometries, modes, alignTo)
  } else {
    geometries = geometries.map(geometry => {
      return alignGeometries(geometry, modes, alignTo)
    })
  }
  return geometries.length === 1 ? geometries[0] : geometries
}

module.exports = {
  align
}
