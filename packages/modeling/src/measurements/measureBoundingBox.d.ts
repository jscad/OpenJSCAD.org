import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

import type { BoundingBox } from './types.d.ts'

export function measureBoundingBox(geometry: Geometry): BoundingBox
export function measureBoundingBox(geometry: any): [[0, 0, 0], [0, 0, 0]]
export function measureBoundingBox(...geometries: RecursiveArray<Geometry | any>): Array<BoundingBox>
