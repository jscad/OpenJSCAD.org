import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureVolume(geometry: Geometry): number
export function measureVolume(geometry: any): 0
export function measureVolume(...geometries: RecursiveArray<Geometry | any>): Array<number>
