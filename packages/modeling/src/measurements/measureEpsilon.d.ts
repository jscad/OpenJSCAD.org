import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureEpsilon(geometry: Geometry): number
export function measureEpsilon(geometry: any): 0
export function measureEpsilon(...geometries: RecursiveArray<Geometry | any>): Array<number>
