import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { BoundingBox } from './types'

export default measureBoundingBox

declare function measureBoundingBox(geometry: Geometry): BoundingBox
declare function measureBoundingBox(geometry: any): [[0, 0, 0], [0, 0, 0]]
declare function measureBoundingBox(...geometries: RecursiveArray<Geometry | any>): Array<BoundingBox>
