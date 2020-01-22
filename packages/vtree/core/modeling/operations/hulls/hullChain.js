const { toArray } = require('./arrays')

const hullChain = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'hullChain', params: undefined }
}

module.exports = hullChain
