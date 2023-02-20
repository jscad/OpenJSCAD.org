import { Vec2 } from '../maths/vec2/type'
import { Geom2 } from '../geometries/geom2/type'

export interface PolygonOptions {
  points: Array<Vec2> | Array<Array<Vec2>>
  paths?: Array<number> | Array<Array<number>>
}

export function polygon(options: PolygonOptions): Geom2
