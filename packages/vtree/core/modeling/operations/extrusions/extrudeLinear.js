const { toArray } = require('./arrays')

const extrudeLinear = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'extrudeLinear', params }
}

module.exports = extrudeLinear
