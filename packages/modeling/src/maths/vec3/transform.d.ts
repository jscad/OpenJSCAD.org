import Vec3 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(out: Vec3, vector: Vec3, matrix: Mat4): Vec3
