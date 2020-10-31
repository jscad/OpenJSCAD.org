import Poly3 from '../poly3/type'
import Mat4 from '../../maths/mat4/type'

export default Geom3

declare interface Geom3 {
  polygons: Array<Poly3>
  isRetesselated: boolean
  transforms: Mat4
}
