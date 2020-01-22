const { toArray } = require('./arrays')

const difference = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'difference', params: undefined }
}

module.exports = difference
