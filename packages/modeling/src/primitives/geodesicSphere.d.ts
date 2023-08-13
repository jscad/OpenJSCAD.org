import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface GeodesicSphereOptions {
  radius?: number
  frequency?: number
}

export function geodesicSphere(options?: GeodesicSphereOptions): Geom3
