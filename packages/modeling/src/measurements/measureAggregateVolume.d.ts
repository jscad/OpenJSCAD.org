import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureAggregateVolume(...geometries: RecursiveArray<Geometry>): number
