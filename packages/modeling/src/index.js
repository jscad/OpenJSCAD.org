export * from './colors/index.js'
export * from './curves/index.js'
export * from './geometries/index.js'
export * from './maths/index.js'
export * from './measurements/index.js'
export * from './primitives/index.js'
export * from './text/index.js'
export { degToRad, flatten, radiusToSegments, radToDeg } from './utils/index.js'

export * from './operations/booleans/index.js'
export * from './operations/extrusions/index.js'
export * from './operations/hulls/index.js'
export * from './operations/minkowski/index.js'
export * from './operations/modifiers/index.js'
export * from './operations/offsets/index.js'
export * from './operations/transforms/index.js'

// V2 API compatibility:
export * as colors from './colors/index.js'
export * as curves from './curves/index.js'
import { geom2, geom3, path2, poly2, poly3 } from './geometries/index.js'
export const geometries = {
  geom2: {
    ...geom2,
    create: (sides) => geom2.fromSides(sides),
    fromPoints: (points) => geometries.geom2.create([points])
  },
  geom3,
  path2,
  poly2,
  poly3: {
    ...poly3,
    fromPoints: (points) => poly3.create([points]),
    fromPointsAndPlane: poly3.fromVerticesAndPlane,
    toPoints: poly3.toVertices
  }
}
export * as maths from './maths/index.js'
export * as measurements from './measurements/index.js'
export * as primitives from './primitives/index.js'
export * as text from './text/index.js'
export * as booleans from './operations/booleans/index.js'
import * as extrusion from './operations/extrusions/index.js'
import * as offsets from './operations/offsets/index.js'
export const extrusions = {
  ...extrusion,
  extrudeRectangular: (opt, geom) => extrusions.extrudeLinear(opt, offsets.offset(opt, geom)),
  slice: geometries.slice
}
export * as hulls from './operations/hulls/index.js'
export * as modifiers from './operations/modifiers/index.js'
export const expansions = {
  ...offsets,
  expand: offsets.offset
}
export * as transforms from './operations/transforms/index.js'
export * as utils from './utils/index.js'
