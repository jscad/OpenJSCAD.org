import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default intersect

declare function intersect(...geometries: RecursiveArray<Geom2>): Geom2
declare function intersect(...geometries: RecursiveArray<Geom3>): Geom3
