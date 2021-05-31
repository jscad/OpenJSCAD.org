import { Geometry } from '../../geometries/types'
import { Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

export interface MirrorOptions {
  origin?: Vec3
  normal?: Vec3
}

export function mirror<T extends Geometry>(options: MirrorOptions, geometry: T): T
export function mirror<T extends Geometry>(options: MirrorOptions, ...geometries: RecursiveArray<T>): Array<T>
export function mirror(options: MirrorOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function mirrorX<T extends Geometry>(geometry: T): T
export function mirrorX<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function mirrorX(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function mirrorY<T extends Geometry>(geometry: T): T
export function mirrorY<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function mirrorY(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function mirrorZ<T extends Geometry>(geometry: T): T
export function mirrorZ<T extends Geometry>(...geometries: RecursiveArray<T>): Array<T>
export function mirrorZ(...geometries: RecursiveArray<Geometry>): Array<Geometry>
