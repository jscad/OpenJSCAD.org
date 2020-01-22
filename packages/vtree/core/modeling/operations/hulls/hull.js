const { toArray } = require('./arrays')

const hull = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'hull', params: undefined }
}
module.exports = hull
