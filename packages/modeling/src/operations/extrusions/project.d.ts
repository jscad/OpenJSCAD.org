import { Geom2, Geom3 } from '../../geometries/types'
import { Vec3 } from '../../maths/vec3'
import RecursiveArray from '../../utils/recursiveArray'

export default project

export interface ProjectOptions {
  axis?: Vec3
  origin?: Vec3
}

declare function project(options: ProjectOptions, geometry: Geom3): Geom2
declare function project(options: ProjectOptions, ...geometries: RecursiveArray<Geom3>): Array<Geom2>
declare function project(options: ProjectOptions, ...geometries: RecursiveArray<any>): Array<any>
