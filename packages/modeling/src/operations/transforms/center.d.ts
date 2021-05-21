import { Geometry } from '../../geometries/types'
import Vec3 from '../../maths/vec3/type'
import RecursiveArray from '../../utils/recursiveArray'

export interface CenterOptions {
  axes?: [boolean, boolean, boolean]
  relativeTo?: Vec3
}

export function center<T extends Geometry>(options: CenterOptions, geometry: T): T
export function center<T extends RecursiveArray<Geometry>>(options: CenterOptions, ...geometries: T): T

export function centerX<T extends Geometry>(geometry: T): T
export function centerX<T extends RecursiveArray<Geometry>>(...geometries: T): T

export function centerY<T extends Geometry>(geometry: T): T
export function centerY<T extends RecursiveArray<Geometry>>(...geometries: T): T

export function centerZ<T extends Geometry>(geometry: T): T
export function centerZ<T extends RecursiveArray<Geometry>>(...geometries: T): T
