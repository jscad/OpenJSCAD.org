import Vec4 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(matrix: Mat4, vec: Vec4): Vec4
declare function transform(out: Vec4, matrix: Mat4, vec: Vec4): Vec4
