import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureArea(geometry: Geometry): number
export function measureArea(geometry: any): 0
export function measureArea(...geometries: RecursiveArray<Geometry | any>): Array<number>
