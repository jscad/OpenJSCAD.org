import Vec2 from '../maths/vec2/type'

export interface VectorText extends Array<Array<Vec2>> {}

export interface VectorTextOptions {
  xOffset?: number
  yOffset?: number
  height?: number
  lineSpacing?: number
  letterSpacing?: number
  align?: 'left' | 'center' | 'right'
  extrudeOffset?: number
  input?: string
}

export function vectorText(): VectorText
export function vectorText(text: string): VectorText
export function vectorText(options: VectorTextOptions): VectorText
export function vectorText(options: Omit<VectorTextOptions, 'input'>, text: string): VectorText
