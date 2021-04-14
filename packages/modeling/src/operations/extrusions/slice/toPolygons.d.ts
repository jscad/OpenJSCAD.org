import Poly3 from '../../../geometries/poly3/type'

import Slice from './type'

export default toPolygons

declare function toPolygons(slice: Slice): Array<Poly3>
