import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface PolygonOptions {
  points: Array<Vec2> | Array<Array<Vec2>>
  paths?: Array<number> | Array<Array<number>>
  orientation?: 'counterclockwise' | 'clockwise'
}

export function polygon(options: PolygonOptions): Geom2
