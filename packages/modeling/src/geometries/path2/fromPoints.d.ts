import Path2 from './type'
import Vec2 from '../../maths/vec2/type'

export interface FromPointsOptions {
  closed?: boolean
}

export function fromPoints(options: FromPointsOptions, points: Array<Vec2>): Path2
