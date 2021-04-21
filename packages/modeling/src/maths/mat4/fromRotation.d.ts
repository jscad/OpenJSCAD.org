import Mat4 from './type'
import Vec3 from '../vec3/type'

export default fromRotation

declare function fromRotation(out: Mat4, rad: number, axis: Vec3): Mat4
