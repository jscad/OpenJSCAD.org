import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { RGB, RGBA } from './types'

type Color = RGB | RGBA

export default colorize

declare function colorize<T extends Geometry>(color: Color, object: T): T
declare function colorize(color: Color, ...objects: RecursiveArray<Geometry>): Array<Geometry>
