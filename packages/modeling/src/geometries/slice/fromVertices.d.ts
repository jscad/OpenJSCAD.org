import { Vec2, Vec3 } from '../../maths/types'

import { Slice } from './type'

type Vertex = Vec2 | Vec3

export function fromVertices(points: Array<Vertex>): Slice
