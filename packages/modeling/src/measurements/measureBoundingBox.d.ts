import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { BoundingBox } from './types'

export function measureBoundingBox(geometry: Geometry): BoundingBox
export function measureBoundingBox(geometry: any): [[0, 0, 0], [0, 0, 0]]
export function measureBoundingBox(...geometries: RecursiveArray<Geometry | any>): Array<BoundingBox>
