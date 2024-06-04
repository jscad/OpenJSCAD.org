import type { Geom2 } from '../../geometries/geom2/type.d.ts'
import type { Geom3 } from '../../geometries/geom3/type.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export function scission(...geometries: RecursiveArray<Geom2>): Geom2
export function scission(...geometries: RecursiveArray<Geom3>): Geom3
