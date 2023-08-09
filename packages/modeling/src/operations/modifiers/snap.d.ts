import type { Geometry } from '../../geometries/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export function snap<T extends Geometry>(geometry: T): T
export function snap<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function snap(...geometries: RecursiveArray<Geometry>): Array<Geometry>
