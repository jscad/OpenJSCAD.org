import { Path2, Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

type Geometry = Path2 | Geom2 | Geom3

export default expand

export interface ExpandOptions {
  delta?: number
  corners?: 'edge' | 'chamfer' | 'round'
  segments?: number
}

declare function expand<T extends Geometry>(options: ExpandOptions, geometry: T): T
declare function expand(options?: ExpandOptions, ...geometries: RecursiveArray<Geometry>): Geometry
