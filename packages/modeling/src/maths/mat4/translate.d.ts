import Mat4 from './type'
import Vec3 from '../vec3/type'

export default translate

declare function translate(offsets: Vec3, matrix: Mat4): Mat4
declare function translate(out: Mat4, offsets: Vec3, matrix: Mat4): Mat4
