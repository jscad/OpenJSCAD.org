import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureArea

declare function measureArea(geometry: Geometry): number
declare function measureArea(...geometries: RecursiveArray<Geometry>): Array<number>
