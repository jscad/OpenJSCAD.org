import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureVolume

declare function measureVolume(geometry: Geometry): number
declare function measureVolume(geometry: any): 0
declare function measureVolume(...geometries: RecursiveArray<Geometry | any>): Array<number>
