import Vec3 from '../../maths/vec3/type'
import { Colored } from '../types'

export default Poly3

declare interface Poly3 extends Colored {
  vertices: Array<Vec3>
}
