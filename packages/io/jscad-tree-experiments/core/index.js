
const { toArray } = require('./arrays')

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
  solids = toArray(solids)
  return {left: solids, type: 'union'}
  // return {left: solids[0], right: solids.slice(1), type: 'union'}
}

const difference = (...solids) => {
  solids = toArray(solids)
  return {left: toArray(solids[0]), right: solids.slice(1), type: 'difference'}
}

const intersection = (...solids) => {
  solids = toArray(solids)
  return {left: toArray(solids[0]), right: solids.slice(1), type: 'intersection'}
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
