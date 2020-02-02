
const { toArray } = require('@jscad/array-utils')

const color = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'color', params }
}

module.exports = color
