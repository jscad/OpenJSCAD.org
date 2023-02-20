import { Vec2 } from '../maths/vec2/type'
import { Geom2 } from '../geometries/geom2/type'

export interface CircleOptions {
  center?: Vec2
  radius?: number
  startAngle?: number
  endAngle?: number
  segments?: number
}

export function circle(options?: CircleOptions): Geom2
