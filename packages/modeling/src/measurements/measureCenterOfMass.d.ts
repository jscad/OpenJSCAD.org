import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureCenterOfMass(geometry: Geometry): [number, number, number]
export function measureCenterOfMass(...geometries: RecursiveArray<Geometry>): [number, number, number][]
