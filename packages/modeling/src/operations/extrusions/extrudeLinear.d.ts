import { Path2, Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export interface ExtrudeLinearOptions {
  height?: number
  twistAngle?: number
  twistSteps?: number
}

type Geometry = Path2 | Geom2

export function extrudeLinear(options: ExtrudeLinearOptions, geometry: Geometry): Geom3
export function extrudeLinear(options: ExtrudeLinearOptions, ...geometries: RecursiveArray<Geometry>): Geom3
