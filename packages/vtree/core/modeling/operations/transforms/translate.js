const { toArray } = require('@jscad/array-utils')

const translate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'translate', params }
}

module.exports = translate
