import Plane from './type'
import Vec3 from '../vec3/type'

export default fromNoisyPoints

declare function fromNoisyPoints(out: Plane, ...vertices: Array<Vec3>): Plane
