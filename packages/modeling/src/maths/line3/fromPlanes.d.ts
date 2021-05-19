import Line3 from './type'
import Plane from '../plane/type'

export default fromPlanes

declare function fromPlanes(out: Line3, a: Plane, b: Plane): Line3
