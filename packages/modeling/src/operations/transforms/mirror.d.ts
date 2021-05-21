import { Geometry } from '../../geometries/types'
import { Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

export interface MirrorOptions {
  origin?: Vec3
  normal: Vec3
}

export function mirror<T extends Geometry>(options: MirrorOptions, geometry: T): T
export function mirror<T extends RecursiveArray<Geometry>>(options: MirrorOptions, ...geometries: T): T

export function mirrorX<T extends Geometry>(geometry: T): T
export function mirrorX<T extends RecursiveArray<Geometry>>(...geometries: T): T

export function mirrorY<T extends Geometry>(geometry: T): T
export function mirrorY<T extends RecursiveArray<Geometry>>(...geometries: T): T

export function mirrorZ<T extends Geometry>(geometry: T): T
export function mirrorZ<T extends RecursiveArray<Geometry>>(...geometries: T): T
