import { Geometry } from '../../geometries/types'
import { Vec1, Vec2, Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

type Vec = Vec1 | Vec2 | Vec3

export function rotate<T extends Geometry>(angles: Vec, geometry: T): T
export function rotate<T extends RecursiveArray<Geometry>>(angles: Vec, ...geometries: T): T

export function rotateX<T extends Geometry>(angle: number, geometry: T): T
export function rotateX<T extends RecursiveArray<Geometry>>(angle: number, ...geometries: T): T

export function rotateY<T extends Geometry>(angle: number, geometry: T): T
export function rotateY<T extends RecursiveArray<Geometry>>(angle: number, ...geometries: T): T

export function rotateZ<T extends Geometry>(angle: number, geometry: T): T
export function rotateZ<T extends RecursiveArray<Geometry>>(angle: number, ...geometries: T): T
