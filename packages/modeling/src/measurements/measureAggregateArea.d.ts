import { Geometry } from '../geometries'
import RecursiveArray from '../utils/recursiveArray'

export default measureAggregateArea

declare function measureAggregateArea(...geometries: RecursiveArray<Geometry>): number
