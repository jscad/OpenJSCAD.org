import Plane from '../../maths/plane/type'
import Vec3 from '../../maths/vec3/type'
import { Color } from '../types'

export default Poly3

declare interface Poly3 {
  vertices: Array<Vec3>
  color?: Color
  plane?: Plane
}
