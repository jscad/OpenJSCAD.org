import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function subtract(...geometries: RecursiveArray<Geom2>): Geom2
export function subtract(...geometries: RecursiveArray<Geom3>): Geom3
