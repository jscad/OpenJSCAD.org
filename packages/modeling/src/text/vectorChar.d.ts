import Vec2 from '../maths/vec2/type'

export default vectorChar

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
  input?: string
}

declare function vectorChar(): VectorChar
declare function vectorChar(char: string): VectorChar
declare function vectorChar(options: VectorCharOptions): VectorChar
declare function vectorChar(options: Omit<VectorCharOptions, 'input'>, char: string): VectorChar
