import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface TriangleOptions {
  type?: 'AAA' | 'AAS' | 'ASA' | 'SAS' | 'SSA' | 'SSS'
  values?: [number, number, number]
}

export function triangle(options?: TriangleOptions): Geom2
