import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureDimensions(geometry: Geometry): [number, number, number]
export function measureDimensions(...geometries: RecursiveArray<Geometry>): [number, number, number][]
