import Mat4 from './type'
import Plane from '../plane/type'

export default mirrorByPlane

declare function mirrorByPlane(plane: Plane): Mat4
declare function mirrorByPlane(out: Mat4, plane: Plane): Mat4
