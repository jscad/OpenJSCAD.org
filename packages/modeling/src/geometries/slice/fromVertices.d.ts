import type { Vec2, Vec3 } from '../../maths/types.d.ts'

import type { Slice } from './type.d.ts'

type Vertex = Vec2 | Vec3

export function fromVertices(points: Array<Vertex>): Slice
