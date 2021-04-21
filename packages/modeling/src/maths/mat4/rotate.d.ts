import Mat4 from './type'
import Vec3 from '../vec3/type'

export default rotate

declare function rotate(out: Mat4, matrix: Mat4, radians: number, axis: Vec3): Mat4
