import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureAggregateEpsilon

declare function measureAggregateEpsilon(...geometries: RecursiveArray<Geometry>): number
