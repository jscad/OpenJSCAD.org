const { toArray } = require('@jscad/array-utils')

const extrudeFromSlices = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'extrudeFromSlices', params }
}

module.exports = extrudeFromSlices
