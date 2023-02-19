import Geom2 from './geom2/type'
import Geom3 from './geom3/type'
import Path2 from './path2/type'
import Poly3 from './poly3/type'
import Slice from './slice/type'
import { RGB, RGBA } from '../colors'

// NOTE (@ahdinosaur): Poly2 is not included as not well-supported.
// see https://github.com/jscad/OpenJSCAD.org/pull/726#issuecomment-724575265
export type Geometry = Geom2 | Geom3 | Poly3 | Path2

export type Color = RGB | RGBA

export interface Colored {
  color: Color
}

export { Geom2 } from './geom2/type'
export { Geom3 } from './geom3/type'
export { Path2 } from './path2/type'
export { Poly2 } from './poly2/type'
export { Poly3 } from './poly3/type'
export { Slice } from './slice/type'
