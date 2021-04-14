import { Geom2, Geom3, Path2 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default hullChain

declare function hullChain(...geometries: RecursiveArray<Geom2>): Geom2
declare function hullChain(...geometries: RecursiveArray<Geom3>): Geom3
declare function hullChain(...geometries: RecursiveArray<Path2>): Path2
