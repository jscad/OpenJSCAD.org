import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureArea(geometry: Geometry): number
export function measureArea(geometry: any): 0
export function measureArea(...geometries: RecursiveArray<Geometry | any>): Array<number>
