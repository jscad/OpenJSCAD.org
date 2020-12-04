import Vec3 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(matrix: Mat4, vec: Vec3): Vec3
declare function transform(out: Vec3, matrix: Mat4, vec: Vec3): Vec3
