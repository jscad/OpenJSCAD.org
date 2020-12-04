import Poly3 from './type'
import Vec3 from '../../maths/vec3/type'
import Plane from '../../maths/plane/type'

export default fromPointsAndPlane

declare function fromPointsAndPlane(vertices: Array<Vec3>, plane: Plane): Poly3
