import Geom2 from '../geometries/geom2/type'

export interface TriangleOptions {
  type?: 'AAA' | 'AAS' | 'ASA' | 'SAS' | 'SSA' | 'SSS'
  values?: [number, number, number]
}

export function triangle(options?: TriangleOptions): Geom2
