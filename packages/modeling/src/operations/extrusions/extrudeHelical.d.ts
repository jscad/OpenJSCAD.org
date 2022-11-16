import { Geom2, Geom3 } from '../../geometries/types'

export default extrudeHelical

export interface ExtrudeHelicalOptions {
  angle?: number
  startAngle?: number
  pitch?: number
  height?: number
  endOffset?: number
  segments?: number
}

declare function extrudeHelical(options: ExtrudeHelicalOptions, geometry: Geom2): Geom3
