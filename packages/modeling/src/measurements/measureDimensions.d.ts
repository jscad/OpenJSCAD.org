import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureDimensions(geometry: Geometry): [number, number, number]
export function measureDimensions(...geometries: RecursiveArray<Geometry>): [number, number, number][]
