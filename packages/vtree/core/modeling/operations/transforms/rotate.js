const { toArray } = require('@jscad/array-utils')

const rotate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'rotate', params }
}

module.exports = rotate
