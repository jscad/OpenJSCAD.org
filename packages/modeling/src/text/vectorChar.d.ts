import type { Vec2 } from '../maths/vec2/type.d.ts'

export interface VectorChar {
  width: number
  height: number
  segments: Array<Array<Vec2>>
}

export interface VectorCharOptions {
  xOffset?: number
  yOffset?: number
  height?: number
  extrudeOffset?: number
}

export function vectorChar(options: VectorCharOptions, text: string): VectorChar
