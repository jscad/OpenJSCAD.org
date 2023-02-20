import { Vec2 } from '../maths/vec2/type'

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

export function vectorChar(): VectorChar
export function vectorChar(char: string): VectorChar
export function vectorChar(options: VectorCharOptions): VectorChar
export function vectorChar(options: Omit<VectorCharOptions, 'input'>, char: string): VectorChar
