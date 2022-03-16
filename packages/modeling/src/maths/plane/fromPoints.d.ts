import Plane from './type'
import Vec3 from '../vec3/type'

export default fromPoints

declare function fromPoints(out: Plane, ...vertices: Array<Vec3>): Plane
