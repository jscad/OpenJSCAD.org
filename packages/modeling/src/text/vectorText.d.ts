import Vec2 from '../maths/vec2/type'

export default vectorText

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

declare function vectorText(): VectorText
declare function vectorText(text: string): VectorText
declare function vectorText(options: VectorTextOptions): VectorText
declare function vectorText(options: Omit<VectorTextOptions, 'input'>, text: string): VectorText
