import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureEpsilon

declare function measureEpsilon(geometry: Geometry): number
declare function measureEpsilon(...geometries: RecursiveArray<Geometry>): Array<number>
