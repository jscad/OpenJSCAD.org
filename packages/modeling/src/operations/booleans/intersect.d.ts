import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function intersect(...geometries: RecursiveArray<Geom2>): Geom2
export function intersect(...geometries: RecursiveArray<Geom3>): Geom3
