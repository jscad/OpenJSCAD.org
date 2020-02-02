const { toArray } = require('@jscad/array-utils')

const extrudeLinear = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'extrudeLinear', params }
}

module.exports = extrudeLinear
