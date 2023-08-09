import type { Colored, Geometry } from '../geometries/types.d.ts'
import type { RecursiveArray } from '../utils/recursiveArray.d.ts'

import type { RGB, RGBA } from './types.d.ts'

// Single Geom3 returns Colored Geom3
export function colorize<T extends Geometry>(color: RGB | RGBA, object: T): T & Colored

// List of Geom3 returns list of Colored Geom3
export function colorize<T extends Geometry>(color: RGB | RGBA, ...objects: RecursiveArray<T>): Array<T & Colored>
// List of mixed geometries returns list of colored geometries
export function colorize(color: RGB | RGBA, ...objects: RecursiveArray<Geometry>): Array<Geometry & Colored>
