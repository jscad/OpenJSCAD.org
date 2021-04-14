import Line3 from './type'
import Plane from '../plane/type'
import Vec3 from '../vec3/type'

export default intersectPointOfLineAndPlane

declare function intersectPointOfLineAndPlane(plane: Plane, line: Line3): Vec3
