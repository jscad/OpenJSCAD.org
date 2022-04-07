import { Geom2, Geom3, Path2 } from '../geometries/types'
import { Vec2, Vec3 } from '../maths/types'

export default uniquePoints

declare function uniquePoints(...geometries: Array<Geom2>): Array<Vec2>
declare function uniquePoints(...geometries: Array<Geom3>): Array<Vec3>
declare function uniquePoints(...geometries: Array<Path2>): Array<Vec2>
