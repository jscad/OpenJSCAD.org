import { Vec2, Vec3 } from '../../../maths/types'

import Slice from './type'

type Point = Vec2 | Vec3

export default fromPoints

declare function fromPoints(points: Array<Point>): Slice
