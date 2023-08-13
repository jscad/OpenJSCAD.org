import type { Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

import type { BoundingSphere } from './types.d.ts'

export function measureBoundingSphere(...geometries: RecursiveArray<Geometry>): BoundingSphere
