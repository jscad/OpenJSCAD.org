
const primitives3d = require('./primitives3d-api')
const primitives2d = require('./primitives2d-api')
const booleanOps = require('./booleans/ops-booleans')
const transformations = require('./transformations/ops-transformations')
const extrusions = require('./ops-extrusions')
const color = require('./color')
const maths = require('./maths')
const { echo } = require('./debug')

// these are 'external' to this api and we basically just re-export for old api compatibility
// ...needs to be reviewed
const { CAG, CSG } = require('../../csg')

const exportedApi = {
  csg: {CAG, CSG},
  primitives2d,
  primitives3d,
  booleanOps,
  transformations,
  extrusions,
  color,
  maths,
  debug: {echo}
}

// easier to access
// const flatApi = Object.assign({}, primitives2d, primitives3d, booleanOps, transformations, extrusions, color)

module.exports = exportedApi
