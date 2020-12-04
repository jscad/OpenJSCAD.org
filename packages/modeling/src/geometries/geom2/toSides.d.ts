import Geom2 from './type'
import Vec2 from '../../maths/vec2/type'

export default toSides

declare function toSides(geometry: Geom2): Array<[Vec2, Vec2]>
