import { Geom2, Geom3, Path2 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default hull

declare function hull(...geometries: RecursiveArray<Geom2>): Geom2
declare function hull(...geometries: RecursiveArray<Geom3>): Geom3
declare function hull(...geometries: RecursiveArray<Path2>): Path2
