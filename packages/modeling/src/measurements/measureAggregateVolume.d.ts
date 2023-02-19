import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureAggregateVolume(...geometries: RecursiveArray<Geometry>): number
