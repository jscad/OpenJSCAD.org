import { Vec3 } from '../../maths/vec3/type'
import { Color } from '../types'

export interface Poly3 {
  vertices: Array<Vec3>
  color?: Color
}
