import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureDimensions

declare function measureDimensions(...geometries: RecursiveArray<Geometry>): [number, number, number] | [number, number, number][]
