import Bezier from './type'

export default arcLengthToT

export interface ArcLengthToTOptions {
  distance?: Number
  segments?: Number
}

declare function arcLengthToT(options: ArcLengthToTOptions, bezier: Bezier): number
