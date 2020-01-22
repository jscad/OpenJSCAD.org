const { toArray } = require('./arrays')

const contract = (radius, n, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'contract', radius, n }
}

const expand = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'expand', params }
}

module.exports = expand
