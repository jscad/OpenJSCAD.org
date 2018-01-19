
const primitives3d = require('./primitives3d-api')
const primitives2d = require('./primitives2d-api')
const booleanOps = require('./ops-booleans')
const transformations = require('./ops-transformations')
const extrusions = require('./ops-extrusions')
const color = require('./color')
const maths = require('./maths')
const text = require('./text')
const { echo } = require('./debug')

// these are 'external' to this api and we basically just re-export for old api compatibility
// ...needs to be reviewed
const { CAG, CSG } = require('../../csg')
const { log } = require('./log') // FIXME: this is a duplicate of the one in openjscad itself,*/

// mostly likely needs to be removed since it is in the OpenJsCad namespace anyway, leaving here
// for now

const exportedApi = {
  csg: {CAG, CSG},
  primitives2d,
  primitives3d,
  booleanOps,
  transformations,
  extrusions,
  color,
  maths,
  text,
  OpenJsCad: {OpenJsCad: {log}},
  debug: {echo}
}

module.exports = exportedApi
