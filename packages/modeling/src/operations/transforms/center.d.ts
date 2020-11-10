import { Geometry } from '../../geometries/types'
import Vec3 from '../../maths/vec3/type'
import RecursiveArray from '../../utils/recursiveArray'

export interface CenterOptions {
  axes?: [boolean, boolean, boolean]
  center?: Vec3
}

export function center(options: CenterOptions, geometry: Geometry): Geometry
export function center(options: CenterOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function centerX(geometry: Geometry): Geometry
export function centerX(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function centerY(geometry: Geometry): Geometry
export function centerY(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function centerZ(geometry: Geometry): Geometry
export function centerZ(...geometries: RecursiveArray<Geometry>): Array<Geometry>
