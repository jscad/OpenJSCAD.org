import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { BoundingBox } from './types'

export default measureAggregateBoundingBox

declare function measureAggregateBoundingBox(...geometries: RecursiveArray<Geometry>): BoundingBox
