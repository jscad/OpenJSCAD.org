import * as primitives3d from './primitives3d'
import * as primitives2d from './primitives2d'
import * as booleanOps from './ops-booleans'
import * as transformations from './transformations'
import * as extrusion from './extrusion'
import * as color from './color'
import * as maths from './maths'
import * as text from './text'
import { echo } from './debug'

// these are 'external' to this folder ...needs to be reviewed
import { CAG, CSG } from '../csg'
import { log } from '../jscad/log'

const exportedApi = {
  csg: {CAG, CSG},
  primitives2d,
  primitives3d,
  booleanOps,
  transformations,
  extrusion,
  color,
  maths,
  text,
  OpenJsCad: {OpenJsCad: {log}},
  debug: {echo}
}

export default exportedApi
