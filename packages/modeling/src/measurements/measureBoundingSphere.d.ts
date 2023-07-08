import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

type Centroid = [number, number, number]

export default measureBoundingSphere

declare function measureBoundingSphere(geometry: Geometry): [Centroid, number]
declare function measureBoundingSphere(...geometries: RecursiveArray<Geometry>): [Centroid, number][]
