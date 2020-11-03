import Line3 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(matrix: Mat4, line: Line3): Line3
declare function transform(out: Line3, matrix: Mat4, line: Line3): Line3
