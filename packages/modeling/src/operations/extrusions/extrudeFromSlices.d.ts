import type { Geom3 } from '../../geometries/geom3/type.d.ts'
import type { Slice } from '../../geometries/slice/type.d.ts'

export interface ExtrudeFromSlicesOptions<Base> {
  numberOfSlices?: number
  capStart?: boolean
  capEnd?: boolean
  close?: boolean
  callback?: (progress: number, index: number, base: Base) => Slice
}

export function extrudeFromSlices<Base>(options: ExtrudeFromSlicesOptions<Base>, base: Base): Geom3
