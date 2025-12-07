import type { Path3 } from './type.d.ts'
import type { Vec3 } from '../../maths/vec3/type.d.ts'

export interface FromVerticesOptions {
  closed?: boolean
}

export function fromVertices(options: FromVerticesOptions, vertices: Array<Vec3>): Path3
