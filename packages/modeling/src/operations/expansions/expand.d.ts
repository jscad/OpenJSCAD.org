import { Path2, Geom2, Geom3 } from '../../geometries/types'
import { Corners } from '../../utils/corners'
import RecursiveArray from '../../utils/recursiveArray'

export default expand

export interface ExpandOptions {
  delta?: number
  corners?: Corners
  segments?: number
}

declare function expand(options: ExpandOptions, geometry: Path2 | Geom2): Geom2
declare function expand(options: ExpandOptions, geometry: Geom3): Geom3
declare function expand(options?: ExpandOptions, ...geometries: RecursiveArray<Path2 | Geom2>): Geom2
declare function expand(options?: ExpandOptions, ...geometries: RecursiveArray<Path2 | Geom2 | Geom3>): Geom3
