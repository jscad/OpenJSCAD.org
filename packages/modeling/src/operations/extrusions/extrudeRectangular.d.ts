import { Path2, Geom2, Geom3 } from '../../geometries/types'
import { Corners } from '../../utils/corners'
import RecursiveArray from '../../utils/recursiveArray'

export interface ExtrudeRectangularOptions {
  size?: number
  height?: number
  corners?: Corners
  segments?: number
}

type Geometry = Path2 | Geom2

export function extrudeRectangular(options: ExtrudeRectangularOptions, geometry: Geometry): Geom3
export function extrudeRectangular(options: ExtrudeRectangularOptions, ...geometries: RecursiveArray<Geometry>): Geom3
