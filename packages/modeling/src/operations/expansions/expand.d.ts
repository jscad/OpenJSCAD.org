import { Path2, Geom2, Geom3 } from '../../geometries/types'
import { Corners } from '../../utils/corners'
import RecursiveArray from '../../utils/recursiveArray'

export interface ExpandOptions {
  delta?: number
  corners?: Corners
  segments?: number
}

type Geom = Path2 | Geom2 | Geom3

export function expand(options: ExpandOptions, geometry: Path2 | Geom2): Geom2
export function expand(options: ExpandOptions, geometry: Geom3): Geom3
export function expand<T extends Geom>(options?: ExpandOptions, ...geometries: RecursiveArray<T>): Array<T>
export function expand(options?: ExpandOptions, ...geometries: RecursiveArray<Geom>): Array<Geom>
