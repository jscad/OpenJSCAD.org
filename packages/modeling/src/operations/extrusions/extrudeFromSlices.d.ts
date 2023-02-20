import { Geom3 } from '../../geometries/geom3/type'

import { Slice } from '../../geometries/slice/type'

export interface ExtrudeFromSlicesOptions<Base> {
  numberOfSlices?: number
  capStart?: boolean
  capEnd?: boolean
  close?: boolean
  callback?: (progress: number, index: number, base: Base) => Slice
}

export function extrudeFromSlices<Base>(options: ExtrudeFromSlicesOptions<Base>, base: Base): Geom3
