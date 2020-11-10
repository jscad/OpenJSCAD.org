import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureVolume

declare function measureVolume(geometry: Geometry): number
declare function measureVolume(...geometries: RecursiveArray<Geometry>): Array<number>
