
const { toArray, flatten } = require('@jscad/array-utils')

const color = (params, ...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'color', params }
}

// attempt at workaround for non tree items that need access to data before final evaluation
let specials = []
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

  color: Object.assign({}, require('@jscad/csg/api').color, { color }),
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

  color,

  measureArea,
  measureVolume,
  measureBounds,

  // seperate
  specials
}
