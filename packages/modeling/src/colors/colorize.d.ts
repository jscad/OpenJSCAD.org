import { Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { RGB, RGBA } from './types'

export default colorize

declare function colorize<T extends Geometry>(color: RGB | RGBA, object: T): T
declare function colorize(color: RGB | RGBA, ...objects: RecursiveArray<Geometry>): Array<Geometry>
