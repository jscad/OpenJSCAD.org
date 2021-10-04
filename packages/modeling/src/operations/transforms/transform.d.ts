import { Geometry } from '../../geometries/types'
import Mat4 from '../../maths/mat4/type'
import RecursiveArray from '../../utils/recursiveArray'

export function transform<T extends Geometry>(matrix: Mat4, geometry: T): T
export function transform<T extends Geometry>(matrix: Mat4, ...geometries: RecursiveArray<T>): Array<T>
export function transform(matrix: Mat4, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
