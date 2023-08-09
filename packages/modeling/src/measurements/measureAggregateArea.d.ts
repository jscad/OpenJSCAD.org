import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureAggregateArea(...geometries: RecursiveArray<Geometry>): number
