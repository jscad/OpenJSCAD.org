import { Path2, Geom2 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

type Geometry = Path2 | Geom2

export default offset

export interface OffsetOptions {
  delta?: number
  corners?: 'edge' | 'chamfer' | 'round'
  segments?: number
}

declare function offset<T extends Geometry>(options: OffsetOptions, geometry: T): T
declare function offset(options?: OffsetOptions, ...geometries: RecursiveArray<Geometry>): Geometry
