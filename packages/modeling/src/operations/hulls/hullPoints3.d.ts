import Vec3 from '../../maths/vec3/type'
import Poly3 from '../../geometries/poly3/type'

export default hullPoints3

declare function hullPoints3(uniquePoints: Array<Vec3>): Array<Poly3>
