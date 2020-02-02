const { toArray } = require('@jscad/array-utils')

const hull = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'hull', params: undefined }
}
module.exports = hull
