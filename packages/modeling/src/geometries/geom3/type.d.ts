import Poly3 = require('../poly3/type')
import Mat4 = require('../../maths/mat4/type')

export = Geom3

declare interface Geom3 {
  polygons: Array<Poly3>
  isRetesselated: boolean
  transforms: Mat4
}
