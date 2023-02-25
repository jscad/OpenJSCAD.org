import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { BoundingBox } from './types'

export function measureAggregateBoundingBox(...geometries: RecursiveArray<Geometry>): BoundingBox
