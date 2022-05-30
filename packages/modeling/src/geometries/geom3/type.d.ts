import Poly3 from '../poly3/type'
import Mat4 from '../../maths/mat4/type'
import { Color } from '../types'

export default Geom3

declare interface Geom3 {
  polygons: Array<Poly3>
  transforms: Mat4
  color?: Color
}
