import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { BoundingSphere } from './types'

export function measureBoundingSphere(...geometries: RecursiveArray<Geometry>): BoundingSphere
