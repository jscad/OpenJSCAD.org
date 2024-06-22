import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default function snap<T extends Geometry>(geometry: T): T
export default function snap<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export default function snap(...geometries: RecursiveArray<Geometry>): Array<Geometry>
