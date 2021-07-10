import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureArea

declare function measureArea(geometry: Geometry): number
declare function measureArea(geometry: any): 0
declare function measureArea(...geometries: RecursiveArray<Geometry | any>): Array<number>
