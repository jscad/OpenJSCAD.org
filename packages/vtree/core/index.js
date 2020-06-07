
const { toArray, flatten } = require('./arrays')

const cube = params => {
  /* const defaults = {
    size: [1, 1, 1],
    center: [true, true, true]
  } */
  const _params = Object.assign({}, params)

  return Object.assign({}, _params, { type: 'cube' })
}

const sphere = params => {
  /* const defaults = {
    size: 1,
    center: [true, true, true]
  } */
  const _params = Object.assign({}, params)

  return Object.assign({}, _params, { type: 'sphere' })
}

const cylinder = params => {
  const _params = Object.assign({}, params)

  return Object.assign({}, _params, { type: 'cylinder' })
}

const union = (...solids) => {
  solids = flatten(toArray(solids))
  return { children: solids, type: 'union', params: undefined }
}

const difference = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'difference', params: undefined }
}

const intersection = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'intersection', params: undefined }
}

const translate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'translate', params }
}

const rotate = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'rotate', params }
}

const scale = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'scale', params }
}

const mirror = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'mirror', params }
}

const hull = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'hull', params: undefined }
}

const chain_hull = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'chain_hull', params: undefined }
}

const contract = (radius, n, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'contract', radius, n }
}

const expand = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'expand', params }
}

const colorize = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'colors', params }
}

const square = (params) => {
  const _params = params
  return Object.assign({}, _params, { type: 'square' })
}

const circle = (params) => {
  const _params = params
  return Object.assign({}, _params, { type: 'circle' })
}

const linear_extrude = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'linear_extrude', params }
}

const rotate_extrude = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'rotate_extrude', params }
}

const rectangular_extrude = (solids, params) => {
  console.log('rectangular_extrude')
  solids = toArray(solids)
  return { children: solids, type: 'rectangular_extrude', params }
}

// attempt at workaround for non tree items that need access to data before final evaluation
const specials = []
const measureArea = require('./api-measurements').makeMeasureArea(specials)
const measureVolume = require('./api-measurements').makeMeasureVolume(specials)
const measureBounds = require('./api-measurements').makeMeasureBounds(specials)

// not sure about this one
/* const vector_text = (...params) => {
  console.log('vector_text',params)
  return params
  // return {type: 'vector_text', params}
} */

// this is a convenience object, that mimicks the structure of the jscad functional api
const apiClone = {
  primitives3d: {
    cube,
    sphere,
    cylinder
  },
  primitives2d: {
    circle,
    square
  },
  booleanOps: {
    union,
    difference,
    intersection
  },
  transformations: {
    translate,
    rotate,
    scale,
    mirror,
    contract,
    hull,
    chain_hull
  },
  extrusions: {
    linear_extrude,
    rotate_extrude,
    rectangular_extrude
  },
  text: {
    vector_text: require('@jscad/csg/api').text.vector_text
  },

  measurements: {
    measureArea,
    measureVolume,
    measureBounds
  },

  colors: Object.assign({}, require('@jscad/csg/api').colors, { colors }),
  csg: require('@jscad/csg/api').csg,
  // these are obsolete, but keeping the same API for now ...
  maths: require('@jscad/csg/api').maths,
  OpenJsCad: require('@jscad/csg/api').OpenJsCad,
  debug: require('@jscad/csg/api').debug

}

module.exports = {
  apiClone,

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
  chain_hull,
  contract,
  expand,

  linear_extrude,
  rectangular_extrude,

  colors,

  measureArea,
  measureVolume,
  measureBounds,

  // seperate
  specials
}
