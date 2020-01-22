const { toArray } = require('./arrays')

const extrudeRotate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'extrudeRotate', params }
}

module.exports = extrudeRotate
