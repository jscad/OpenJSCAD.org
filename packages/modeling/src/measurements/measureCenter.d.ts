import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export function measureCenter(geometry: Geometry): [number, number, number]
export function measureCenter(...geometries: RecursiveArray<Geometry>): [number, number, number][]
