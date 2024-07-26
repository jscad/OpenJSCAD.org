import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default scission

declare function scission(...geometries: RecursiveArray<Geom2>): Geom2 | Geom2[]
declare function scission(...geometries: RecursiveArray<Geom3>): Geom3 | Geom3[]
