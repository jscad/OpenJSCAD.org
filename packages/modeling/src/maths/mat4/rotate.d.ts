import Mat4 from './type'
import Vec3 from '../vec3/type'

export default rotate

declare function rotate(rad: number, axis: Vec3, matrix: Mat4): Mat4
declare function rotate(out: Mat4, rad: number, axis: Vec3, matrix: Mat4): Mat4
