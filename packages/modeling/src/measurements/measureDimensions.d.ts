import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureDimensions

declare function measureDimensions(geometry: Geometry): [number, number, number]
declare function measureDimensions(...geometries: RecursiveArray<Geometry>): [number, number, number][]
