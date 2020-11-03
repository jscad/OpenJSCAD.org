import Line2 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(matrix: Mat4, line: Line2): Line2
declare function transform(out: Line2, matrix: Mat4, line: Line2): Line2
