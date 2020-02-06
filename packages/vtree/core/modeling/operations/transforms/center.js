const { toArray } = require('@jscad/array-utils')

const center = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'center', params: undefined }
}

module.exports = center
