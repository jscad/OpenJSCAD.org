import Mat4 from './type'
import Vec3 from '../vec3/type'

export default fromTranslation

declare function fromTranslation(vec: Vec3): Mat4
declare function fromTranslation(out: Mat4, vec: Vec3): Mat4
