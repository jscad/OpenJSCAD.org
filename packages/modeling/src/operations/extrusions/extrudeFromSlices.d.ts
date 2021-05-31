import Geom3 from '../../geometries/geom3/type'

import Slice from './slice/type'

export default extrudeFromSlices

export interface ExtrudeFromSlicesOptions<Base> {
  numberOfSlices?: number
  capStart?: boolean
  capEnd?: boolean
  close?: boolean
  callback?: (progress: number, index: number, base: Base) => Slice
}

declare function extrudeFromSlices<Base>(options: ExtrudeFromSlicesOptions<Base>, base: Base): Geom3
