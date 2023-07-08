import Bezier from './type'

export interface ArcLengthToTOptions {
  distance?: Number
  segments?: Number
}

export function arcLengthToT(options: ArcLengthToTOptions, bezier: Bezier): number
