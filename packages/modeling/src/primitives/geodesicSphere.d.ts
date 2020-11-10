import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default geodesicSphere

export interface GeodesicSphereOptions {
  radius?: number
  frequency?: number
}

declare function geodesicSphere(options?: GeodesicSphereOptions): Geom3
