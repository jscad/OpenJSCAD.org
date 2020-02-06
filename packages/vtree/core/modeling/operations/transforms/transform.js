const { toArray } = require('@jscad/array-utils')

const transform = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'transform', params }
}

module.exports = transform
