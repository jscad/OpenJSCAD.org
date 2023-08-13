import type { Path2, Geom2, Geom3 } from '../../geometries/types.d.ts'
import type { Corners } from '../../utils/corners.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export interface ExtrudeRectangularOptions {
  size?: number
  height?: number
  corners?: Corners
  segments?: number
}

type Geometry = Path2 | Geom2

export function extrudeRectangular(options: ExtrudeRectangularOptions, geometry: Geometry): Geom3
export function extrudeRectangular(options: ExtrudeRectangularOptions, ...geometries: RecursiveArray<Geometry>): Geom3
