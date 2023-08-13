import type { Geometry } from '../../geometries/types.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export function transform<T extends Geometry>(matrix: Mat4, geometry: T): T
export function transform<T extends Geometry>(matrix: Mat4, ...geometries: RecursiveArray<T>): Array<T>
export function transform(matrix: Mat4, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
