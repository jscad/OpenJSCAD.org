import type { Vec2 } from '../../maths/vec2/type.d.ts'

export interface OffsetFromPointsOptions {
  delta?: number
  corners?: 'edge' | 'chamfer' | 'round'
  segments?: number
  closed?: boolean
}

export function offsetFromPoints(options: OffsetFromPointsOptions, points: Array<Vec2>): Array<Vec2>
