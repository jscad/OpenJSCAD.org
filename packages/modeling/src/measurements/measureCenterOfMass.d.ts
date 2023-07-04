import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureCenterOfMass

declare function measureCenterOfMass(geometry: Geometry): [number, number, number]
declare function measureCenterOfMass(...geometries: RecursiveArray<Geometry>): [number, number, number][]
