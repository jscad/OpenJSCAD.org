import Plane from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(out: Plane, plane: Plane, matrix: Mat4): Plane
