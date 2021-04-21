import Line3 from './type'
import Plane from '../plane/type'
import Vec3 from '../vec3/type'

export default intersectPointOfLineAndPlane

declare function intersectPointOfLineAndPlane(line: Line3, plane: Plane): Vec3
