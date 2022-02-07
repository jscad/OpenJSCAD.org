import Poly3 from '../../../geometries/poly3/type'

import Slice from './type'

export default toTriangles

declare function toTriangles(slice: Slice): Array<Poly3>
