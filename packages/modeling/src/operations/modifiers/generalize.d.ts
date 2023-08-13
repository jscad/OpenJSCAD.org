import type { Geometry } from '../../geometries/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export interface GeneralizeOptions {
  snap?: boolean
  simplify?: boolean
  triangulate?: boolean
}

export function generalize<T extends Geometry>(options: GeneralizeOptions, geometry: T): T
export function generalize<T extends Geometry>(options: GeneralizeOptions, ...geometries: RecursiveArray<T>): Array<T>
export function generalize(options: GeneralizeOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
