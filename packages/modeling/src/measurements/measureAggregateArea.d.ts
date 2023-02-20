import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureAggregateArea(...geometries: RecursiveArray<Geometry>): number
