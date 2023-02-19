import { Colored, Geometry } from '../geometries/types'
import RecursiveArray from '../utils/recursiveArray'

import { RGB, RGBA } from './types'

// Single Geom3 returns Colored Geom3
export function colorize<T extends Geometry>(color: RGB | RGBA, object: T): T & Colored

// List of Geom3 returns list of Colored Geom3
export function colorize<T extends Geometry>(color: RGB | RGBA, ...objects: RecursiveArray<T>): Array<T & Colored>
// List of mixed geometries returns list of colored geometries
export function colorize(color: RGB | RGBA, ...objects: RecursiveArray<Geometry>): Array<Geometry & Colored>
