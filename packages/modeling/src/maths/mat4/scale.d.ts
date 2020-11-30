import Mat4 from './type'
import Vec3 from '../vec3/type'

export default scale

declare function scale(dimensions: Vec3, matrix: Mat4): Mat4
declare function scale(out: Mat4, dimensions: Vec3, matrix: Mat4): Mat4
