import Geom2 from '../geometries/geom2/type'
import Geom3 from '../geometries/geom3/type'
import Path2 from '../geometries/path2/type'
import Poly3 from '../geometries/poly3/type'

type Obj = Geom2 | Geom3 | Path2 | Poly3
type Color = [number, number, number, number]

export default colorize

declare function colorize(color: Color, ...objects: Array<Obj>): Obj | Array<Obj>
