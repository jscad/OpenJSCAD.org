import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { BoundingBox } from './types'

export default measureBoundingBox

declare function measureBoundingBox(geometry: Geometry): BoundingBox
declare function measureBoundingBox(...geometries: RecursiveArray<Geometry>): Array<BoundingBox>
