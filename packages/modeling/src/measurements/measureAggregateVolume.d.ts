import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureAggregateVolume

declare function measureAggregateVolume(...geometries: RecursiveArray<Geometry>): number
