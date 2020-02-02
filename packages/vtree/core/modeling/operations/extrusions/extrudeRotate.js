const { toArray } = require('@jscad/array-utils')

const extrudeRotate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'extrudeRotate', params }
}

module.exports = extrudeRotate
