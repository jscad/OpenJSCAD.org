import Poly2 from './type'
import Vec2 from '../../maths/vec2/type'

export default measureBoundingBox

declare function measureBoundingBox(polygon: Poly2): [Vec2, Vec2]
