const { toArray } = require('./arrays')

const mirror = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'mirror', params }
}

module.exports = mirror
