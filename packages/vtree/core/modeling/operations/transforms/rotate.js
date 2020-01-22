const { toArray } = require('./arrays')

const rotate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'rotate', params }
}

module.exports = rotate
