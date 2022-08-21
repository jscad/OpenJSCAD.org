import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function snap<T extends Geometry>(geometry: T): T
export function snap<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function snap(...geometries: RecursiveArray<Geometry>): Array<Geometry>
