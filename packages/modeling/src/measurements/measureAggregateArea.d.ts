import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureAggregateArea

declare function measureAggregateArea(...geometries: RecursiveArray<Geometry>): number
