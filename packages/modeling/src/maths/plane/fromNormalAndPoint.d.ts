import Plane from './type'
import Vec3 from '../vec3/type'

export default fromNormalAndPoint

declare function fromNormalAndPoint(out: Plane, normal: Vec3, point: Vec3): Plane
