import type { Path2, Geom2, Geom3 } from '../../geometries/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export interface ExtrudeLinearOptions {
  height?: number
  twistAngle?: number
  twistSteps?: number
}

type Geometry = Path2 | Geom2

export function extrudeLinear(options: ExtrudeLinearOptions, geometry: Geometry): Geom3
export function extrudeLinear(options: ExtrudeLinearOptions, ...geometries: RecursiveArray<Geometry>): Geom3
