import type { Geom2, Geom3 } from '../../geometries/types.d.ts'

export interface ExtrudeHelicalOptions {
  angle?: number
  startAngle?: number
  pitch?: number
  height?: number
  endOffset?: number
  segments?: number
}

export function extrudeHelical(options: ExtrudeHelicalOptions, geometry: Geom2): Geom3
