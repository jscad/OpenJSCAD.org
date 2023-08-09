import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

export function measureCenter(geometry: Geometry): [number, number, number]
export function measureCenter(...geometries: RecursiveArray<Geometry>): [number, number, number][]
