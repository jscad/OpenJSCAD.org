const { toArray } = require('./arrays')

const translate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'translate', params }
}

module.exports = translate
