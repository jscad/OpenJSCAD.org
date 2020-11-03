import Geom3 from './type'
import Mat4 from '../../maths/mat4/type'

export default transform

declare function transform(matrix: Mat4, geometry: Geom3): Geom3
