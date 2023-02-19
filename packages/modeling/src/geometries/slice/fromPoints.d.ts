import { Vec2, Vec3 } from '../../../maths/types'

import Slice from './type'

type Point = Vec2 | Vec3

export function fromPoints(points: Array<Point>): Slice
