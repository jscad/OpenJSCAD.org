import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface TorusOptions {
  innerRadius?: number
  outerRadius?: number
  innerSegments?: number
  outerSegments?: number
  innerRotation?: number
  outerRotation?: number
  startAngle?: number
}

export function torus(options?: TorusOptions): Geom3
