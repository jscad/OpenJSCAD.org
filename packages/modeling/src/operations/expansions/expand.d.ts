import { Path2, Geom2, Geom3 } from '../../geometries/types'
import { Corners } from '../../utils/corners'
import RecursiveArray from '../../utils/recursiveArray'

export default expand

export interface ExpandOptions {
  delta?: number
  corners?: Corners
  segments?: number
}

type Geom = Path2 | Geom2 | Geom3

declare function expand(options: ExpandOptions, geometry: Path2 | Geom2): Geom2
declare function expand(options: ExpandOptions, geometry: Geom3): Geom3
declare function expand<T extends Geom>(options?: ExpandOptions, ...geometries: RecursiveArray<T>): Array<T>
declare function expand(options?: ExpandOptions, ...geometries: RecursiveArray<Geom>): Array<Geom>
