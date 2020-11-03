import Poly3 from './type'
import Vec3 from '../../maths/vec3/type'

export default measureBoundingBox

declare function measureBoundingBox(polygon: Poly3): [Vec3, Vec3]
