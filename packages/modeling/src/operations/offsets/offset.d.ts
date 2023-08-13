import type { Geometry } from '../../geometries/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export interface OffsetOptions {
  delta?: number
  corners?: 'edge' | 'chamfer' | 'round'
  segments?: number
  expandHoles?: boolean
}

export function offset<T extends Geometry>(options: OffsetOptions, geometry: T): T
export function offset(options?: OffsetOptions, ...geometries: RecursiveArray<Geometry>): Geometry
