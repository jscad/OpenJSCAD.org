import Poly3 from './type'
import Vec3 from '../../maths/vec3/type'

export default measureBoundingSphere

declare function measureBoundingSphere(polygon: Poly3): [Vec3, Vec3]
