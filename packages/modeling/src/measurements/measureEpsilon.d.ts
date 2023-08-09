import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureEpsilon(geometry: Geometry): number
export function measureEpsilon(geometry: any): 0
export function measureEpsilon(...geometries: RecursiveArray<Geometry | any>): Array<number>
