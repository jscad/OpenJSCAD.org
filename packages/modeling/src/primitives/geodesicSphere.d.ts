import Geom3 from '../geometries/geom3/type'

export interface GeodesicSphereOptions {
  radius?: number
  frequency?: number
}

export function geodesicSphere(options?: GeodesicSphereOptions): Geom3
