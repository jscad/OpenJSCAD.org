import Geom2 from '../geometries/geom2/type'

export default triangle

export interface TriangleOptions {
  type?: 'AAA' | 'AAS' | 'ASA' | 'SAS' | 'SSA' | 'SSS'
  values?: [number, number, number]
}

declare function triangle(options?: TriangleOptions): Geom2
