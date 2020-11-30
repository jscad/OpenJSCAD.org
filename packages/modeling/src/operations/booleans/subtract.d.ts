import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default subtract

declare function subtract(...geometries: RecursiveArray<Geom2>): Geom2
declare function subtract(...geometries: RecursiveArray<Geom3>): Geom3
