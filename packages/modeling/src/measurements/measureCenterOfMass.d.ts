import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureCenterOfMass(geometry: Geometry): [number, number, number]
export function measureCenterOfMass(...geometries: RecursiveArray<Geometry>): [number, number, number][]
