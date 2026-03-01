import type { Geom3 } from '../../geometries/types'

export function minkowskiSum(geometryA: Geom3, geometryB: Geom3): Geom3
export function minkowskiSum(...geometries: Geom3[]): Geom3
