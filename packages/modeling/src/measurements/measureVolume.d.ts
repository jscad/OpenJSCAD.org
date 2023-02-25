import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureVolume(geometry: Geometry): number
export function measureVolume(geometry: any): 0
export function measureVolume(...geometries: RecursiveArray<Geometry | any>): Array<number>
