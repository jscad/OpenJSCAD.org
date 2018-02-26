
const { toArray, flatten } = require('./arrays')

const cube = params => {
  const defaults = {
    size: [1, 1, 1],
    center: [true, true, true]
  }
  const _params = Object.assign({}, defaults, params)

  return Object.assign({}, _params, {type: 'cube'})
}

const sphere = params => {
  const defaults = {
    size: 1,
    center: [true, true, true]
  }
  const _params = Object.assign({}, defaults, params)

  return Object.assign({}, _params, {type: 'sphere'})
}

const union = (...solids) => {
  solids = flatten(toArray(solids))
  return {children: solids, type: 'union'}
}

const difference = (...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'difference'}
}

const intersection = (...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'intersection'}
}

const translate = (params, ...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'translate', params}
}

const rotate = (params, ...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'rotate', params}
}

const scale = (params, ...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'scale', params}
}

module.exports = {
  cube,
  sphere,
  union,
  difference,
  intersection,

  translate,
  rotate,
  scale
}
