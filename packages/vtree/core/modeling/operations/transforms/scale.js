const { toArray } = require('@jscad/array-utils')

const scale = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'scale', params }
}

module.exports = scale
