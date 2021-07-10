import Poly3 from '../poly3/type'
import Mat4 from '../../maths/mat4/type'
import { Colored } from '../types'

export default Geom3

declare interface Geom3 extends Colored {
  polygons: Array<Poly3>
  isRetesselated: boolean
  transforms: Mat4
}
