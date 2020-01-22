const { flatten } = require('./arrays')

const union = (...solids) => {
  solids = flatten(toArray(solids))
  return { children: solids, type: 'union', params: undefined }
}

module.exports = union
