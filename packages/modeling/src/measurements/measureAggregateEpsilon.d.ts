import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureAggregateEpsilon(...geometries: RecursiveArray<Geometry>): number
