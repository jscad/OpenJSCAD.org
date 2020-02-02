const { toArray } = require('@jscad/array-utils')

const offset = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'offset', params }
}

module.exports = offset
