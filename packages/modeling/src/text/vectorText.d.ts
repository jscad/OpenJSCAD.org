import type { Vec2 } from '../maths/vec2/type.d.ts'

export interface VectorText extends Array<Array<Vec2>> {}

export interface VectorTextOptions {
  xOffset?: number
  yOffset?: number
  height?: number
  lineSpacing?: number
  letterSpacing?: number
  align?: 'left' | 'center' | 'right'
  extrudeOffset?: number
}

export function vectorText(options: VectorTextOptions, text): VectorText
