import Line3 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(out: Line3, line: Line3, matrix: Mat4): Line3
