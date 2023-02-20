import { Geom2, Geom3 } from '../../geometries/types'

export interface ExtrudeRotateOptions {
  angle?: number
  startAngle?: number
  overflow?: 'cap'
  segments?: number;
}

export function extrudeRotate(options: ExtrudeRotateOptions, geometry: Geom2): Geom3
