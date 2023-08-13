import type { Geom2, Geom3, Path2 } from '../../geometries/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export function hullChain(...geometries: RecursiveArray<Geom2>): Geom2
export function hullChain(...geometries: RecursiveArray<Geom3>): Geom3
export function hullChain(...geometries: RecursiveArray<Path2>): Path2
