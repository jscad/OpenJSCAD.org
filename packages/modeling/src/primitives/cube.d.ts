import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default cube

export interface CubeOptions {
  center?: Vec3
  size?: number
}

declare function cube(options?: CubeOptions): Geom3
