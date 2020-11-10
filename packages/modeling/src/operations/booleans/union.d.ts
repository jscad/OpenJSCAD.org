import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default union

declare function union(...geometries: RecursiveArray<Geom2>): Geom2
declare function union(...geometries: RecursiveArray<Geom3>): Geom3
