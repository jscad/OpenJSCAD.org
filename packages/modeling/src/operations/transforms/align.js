const flatten = require('../../utils/flatten')
const padArrayToLength = require('../../utils/padArrayToLength')
const measureAggregateBoundingBox = require('../../measurements/measureAggregateBoundingBox')
const { translate } = require('./translate')

const validateOptions = (options) => {
  if (!Array.isArray(options.modes) || options.modes.length > 3) throw new Error('align(): modes must be an array of length <= 3')
  options.modes = padArrayToLength(options.modes, 'none', 3)
  if (options.modes.filter(mode => ['center', 'max', 'min', 'none'].includes(mode)).length !== 3) throw new Error('align(): all modes must be one of "center", "max" or "min"')

  if (!Array.isArray(options.alignTo) || options.alignTo.length > 3) throw new Error('align(): alignTo must be an array of length <= 3')
  options.alignTo = padArrayToLength(options.alignTo, 0, 3)
  if (options.alignTo.filter(alignVal => (Number.isFinite(alignVal) || alignVal == null)).length !== 3) throw new Error('align(): all alignTo values must be a number, or null.')

  if (typeof options.grouped !== 'boolean') throw new Error('align(): grouped must be a boolean value.')

  return options
}

const populateAlignToFromBounds = (alignTo, modes, bounds) => {
  for (let i = 0; i < 3; i++) {
    if (alignTo[i] == null) {
      if (modes[i] === 'center') {
        alignTo[i] = (bounds[0][i] + bounds[1][i]) / 2
      } else if (modes[i] === 'max') {
        alignTo[i] = bounds[1][i]
      } else if (modes[i] === 'min') {
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
    } else if (modes[i] === 'max') {
      translation[i] = alignTo[i] - bounds[1][i]
    } else if (modes[i] === 'min') {
      translation[i] = alignTo[i] - bounds[0][i]
    }
  }

  return translate(translation, geometry)
}

/**
 * Align the boundaries of the given geometries using the given options.
 * @param {Object} options - options for aligning
 * @param {Array} [options.modes = ['center', 'center', 'min']] - the point on the geometries to align to for each axis. Valid options are "center", "max", "min", and "none".
 * @param {Array} [options.alignTo = [0,0,0]] - The point one each axis on which to align the geometries upon.  If the value is null, then the corresponding value from the group's bounding box is used.
 * @param {Array} [options.grouped = false] - if true, transform all geometries by the same amount, maintaining the relative positions to each other.
 * @param {...Object} geometries - the geometries to align
 * @return {Object|Array} the aligned geometry, if only one was provided, or an array of aligned geometries
 * @alias module:modeling/transforms.align
 *
 * @example
 * let alignedGeometries = align({modes: ['min', 'center', 'none'], alignTo: [10, null, 10], grouped: true }, geometries)
 */
const align = (options, ...geometries) => {
  const defaults = {
    modes: ['center', 'center', 'min'],
    alignTo: [0, 0, 0],
    grouped: false
  }
  options = Object.assign({}, defaults, options)

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

module.exports = align
