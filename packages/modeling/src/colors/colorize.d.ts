import { Colored, Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { RGB, RGBA } from './types'

export default colorize

declare function colorize<T extends Geometry>(color: RGB | RGBA, object: T): T
declare function colorize<T>(color: RGB | RGBA, object: T): T & Colored

declare function colorize<T extends Geometry>(color: RGB | RGBA, ...objects: RecursiveArray<T>): Array<T>
declare function colorize<T>(color: RGB | RGBA, ...objects: RecursiveArray<T>): Array<T & Colored>
declare function colorize(color: RGB | RGBA, ...objects: RecursiveArray<any>): Array<any & Colored>
