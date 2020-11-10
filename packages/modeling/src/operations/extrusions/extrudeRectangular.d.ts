import { Path2, Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

import Slice from './slice/type'

export default extrudeRectangular

export interface ExtrudeRectangularOptions {
  size?: number
  height?: number
}

type Geometry = Path2 | Geom2

declare function extrudeRectangular(options: ExtrudeRectangularOptions, geometry: Geometry): Geom3
declare function extrudeRectangular(options: ExtrudeRectangularOptions, ...geometries: RecursiveArray<Geometry>): Geom3
