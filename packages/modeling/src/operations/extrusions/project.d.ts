import type { Geom2, Geom3 } from '../../geometries/types.d.ts'
import type { Vec3 } from '../../maths/vec3/index.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export interface ProjectOptions {
  axis?: Vec3
  origin?: Vec3
}

export function project(options: ProjectOptions, geometry: Geom3): Geom2
export function project(options: ProjectOptions, ...geometries: RecursiveArray<Geom3>): Array<Geom2>
export function project(options: ProjectOptions, ...geometries: RecursiveArray<any>): Array<any>
