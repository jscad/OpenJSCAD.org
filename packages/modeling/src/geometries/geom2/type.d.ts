import Poly2 from '../../maths/poly2/type'
import Mat4 from '../../maths/mat4/type'
import { Color } from '../types'

export default Geom2

declare interface Geom2 {
  outlines: Array<Poly2>
  transforms: Mat4
  color?: Color
}
