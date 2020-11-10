import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default torus

export interface TorusOptions {
  innerRadius?: number
  outerRadius?: number
  innerSegments?: number
  outerSegments?: number
  innerRotation?: number
  outerRotation?: number
  startAngle?: number
}

declare function torus(options?: TorusOptions): Geom3
