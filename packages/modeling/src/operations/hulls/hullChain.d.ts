import { Geom2, Geom3, Path2 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function hullChain(...geometries: RecursiveArray<Geom2>): Geom2
export function hullChain(...geometries: RecursiveArray<Geom3>): Geom3
export function hullChain(...geometries: RecursiveArray<Path2>): Path2
