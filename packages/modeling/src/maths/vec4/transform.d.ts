import Vec4 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(out: Vec4, vector: Vec4, matrix: Mat4): Vec4
