import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'
import { RGB, RGBA } from '../colors/types'

export default polyhedron

export interface PolyhedronOptions {
  points: Array<Vec3>
  faces: Array<Array<number>>
  colors?: Array<RGB | RGBA>
  orientation?: 'outward' | 'inward'
}

declare function polyhedron(options: PolyhedronOptions): Geom3
