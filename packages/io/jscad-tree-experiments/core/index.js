
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

const cylinder = params => {
  const defaults = {
    size: 1,
    center: [true, true, true]
  }
  const _params = Object.assign({}, defaults, params)

  return Object.assign({}, _params, {type: 'cylinder'})
}

const union = (...solids) => {
  solids = flatten(toArray(solids))
  return {children: solids, type: 'union', params: undefined}
}

const difference = (...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'difference', params: undefined}
}

const intersection = (...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'intersection', params: undefined}
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

const mirror = (params, ...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'mirror', params}
}

const hull = (...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'hull', params: undefined}
}

const color = (params, ...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'color', params}
}

const square = (params) => {
  return {type: 'square', params}
}

const circle = (params) => {
  return {type: 'circle', params}
}

const linear_extrude = (params, ...solids) => {
  solids = toArray(solids)
  return {children: solids, type: 'linear_extrude', params}
}

const rectangular_extrude = (solids, params) => {
  solids = toArray(solids)
  return {children: solids, type: 'rectangular_extrude', params}
}
// not sure about this one
const vector_text = (...params) => {
  return {type: 'vector_text', params}
}

module.exports = {
  cube,
  sphere,
  cylinder,

  square,
  circle,

  union,
  difference,
  intersection,

  translate,
  rotate,
  scale,
  mirror,
  hull,

  linear_extrude,
  rectangular_extrude,

  vector_text,

  color
}
