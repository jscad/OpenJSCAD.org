import type { Bezier } from './type.d.ts'

export interface ArcLengthToTOptions {
  distance?: Number
  segments?: Number
}

export function arcLengthToT(options: ArcLengthToTOptions, bezier: Bezier): number
