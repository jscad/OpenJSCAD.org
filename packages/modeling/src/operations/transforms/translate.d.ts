import { Geometry } from '../../geometries/types'
import { Vec1, Vec2, Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

type Vec = Vec1 | Vec2 | Vec3

export function translate<T extends Geometry>(offset: Vec, geometry: T): T
export function translate<T extends RecursiveArray<Geometry>>(offset: Vec, ...geometries: T): T

export function translateX<T extends Geometry>(offset: number, geometry: T): T
export function translateX<T extends RecursiveArray<Geometry>>(offset: number, ...geometries: T): T

export function translateY<T extends Geometry>(offset: number, geometry: T): T
export function translateY<T extends RecursiveArray<Geometry>>(offset: number, ...geometries: T): T

export function translateZ<T extends Geometry>(offset: number, geometry: T): T
export function translateZ<T extends RecursiveArray<Geometry>>(offset: number, ...geometries: T): T
