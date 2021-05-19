import Plane from './type'
import Vec3 from '../vec3/type'

export default fromPoints

declare function fromPoints(out: Plane, a: Vec3, b: Vec3, c: Vec3): Plane
