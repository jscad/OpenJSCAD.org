const { toArray } = require('./arrays')

const scale = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'scale', params }
}

module.exports = scale
