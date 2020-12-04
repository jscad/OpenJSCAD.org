import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default cylinderElliptic

export interface CylinderEllipticOptions {
  center?: Vec3
  height?: number
  startRadius?: [number, number]
  startAngle?: number
  endRadius?: [number, number]
  endAngle?: number
  segments?: number
}

declare function cylinderElliptic(options?: CylinderEllipticOptions): Geom3
