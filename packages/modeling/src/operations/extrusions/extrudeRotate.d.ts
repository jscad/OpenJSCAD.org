import { Geom2, Geom3 } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

import Slice from './slice/type'

export default extrudeRotate

export interface ExtrudeRotateOptions {
  angle?: number
  startAngle?: number
  overflow?: 'cap'
  segments?: number;
}

declare function extrudeRotate(options: ExtrudeRotateOptions, geometry: Geom2): Geom3
