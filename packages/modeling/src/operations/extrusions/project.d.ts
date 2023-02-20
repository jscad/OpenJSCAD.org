import { Geom2, Geom3 } from '../../geometries/types'
import { Vec3 } from '../../maths/vec3'
import RecursiveArray from '../../utils/recursiveArray'

export interface ProjectOptions {
  axis?: Vec3
  origin?: Vec3
}

export function project(options: ProjectOptions, geometry: Geom3): Geom2
export function project(options: ProjectOptions, ...geometries: RecursiveArray<Geom3>): Array<Geom2>
export function project(options: ProjectOptions, ...geometries: RecursiveArray<any>): Array<any>
