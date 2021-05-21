import { Geometry } from '../../geometries/types'
import { Vec1, Vec2, Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

type Vec = Vec1 | Vec2 | Vec3

export function scale<T extends Geometry>(factors: Vec, geometry: T): T
export function scale<T extends RecursiveArray<Geometry>>(factors: Vec, ...geometries: T): T

export function scaleX<T extends Geometry>(factor: number, geometry: T): T
export function scaleX<T extends RecursiveArray<Geometry>>(factor: number, ...geometries: T): T

export function scaleY<T extends Geometry>(factor: number, geometry: T): T
export function scaleY<T extends RecursiveArray<Geometry>>(factor: number, ...geometries: T): T

export function scaleZ<T extends Geometry>(factor: number, geometry: T): T
export function scaleZ<T extends RecursiveArray<Geometry>>(factor: number, ...geometries: T): T
