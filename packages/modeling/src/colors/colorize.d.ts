import { Colored, Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { RGB, RGBA } from './types'

export default colorize

// Single Geom3 returns Colored Geom3
declare function colorize<T extends Geometry>(color: RGB | RGBA, object: T): T & Colored

// List of Geom3 returns list of Colored Geom3
declare function colorize<T extends Geometry>(color: RGB | RGBA, ...objects: RecursiveArray<T>): Array<T & Colored>
// List of mixed geometries returns list of colored geometries
declare function colorize(color: RGB | RGBA, ...objects: RecursiveArray<Geometry>): Array<Geometry & Colored>
