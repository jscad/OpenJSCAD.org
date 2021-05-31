import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureEpsilon

declare function measureEpsilon(geometry: Geometry): number
declare function measureEpsilon(geometry: any): 0
declare function measureEpsilon(...geometries: RecursiveArray<Geometry | any>): Array<number>
