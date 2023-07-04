import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

export default measureCenter

declare function measureCenter(geometry: Geometry): [number, number, number]
declare function measureCenter(...geometries: RecursiveArray<Geometry>): [number, number, number][]
