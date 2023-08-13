import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

import type { BoundingBox } from './types.d.ts'

export function measureAggregateBoundingBox(...geometries: RecursiveArray<Geometry>): BoundingBox
