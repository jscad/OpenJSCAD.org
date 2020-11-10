import { Geometry } from '../../geometries/types'
import Mat4 from '../../maths/mat4/type'
import RecursiveArray from '../../utils/recursiveArray'

export default transform

declare function transform(matrix: Mat4, geometry: Geometry): Geometry
declare function transform(matrix: Mat4, geometry: RecursiveArray<Geometry>): Array<Geometry>
