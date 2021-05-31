import { Geometry } from '../../geometries/types'
import Vec3 from '../../maths/vec3/type'
import RecursiveArray from '../../utils/recursiveArray'

export interface CenterOptions {
  axes?: [boolean, boolean, boolean]
  relativeTo?: Vec3
}

export function center<T extends Geometry>(options: CenterOptions, geometry: T): T
export function center<T extends Geometry>(options: CenterOptions, ...geometries: RecursiveArray<T>): Array<T>
export function center(options: CenterOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function centerX<T extends Geometry>(geometry: T): T
export function centerX<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function centerX(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function centerY<T extends Geometry>(geometry: T): T
export function centerY<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function centerY(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function centerZ<T extends Geometry>(geometry: T): T
export function centerZ<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function centerZ(...geometries: RecursiveArray<Geometry>): Array<Geometry>
