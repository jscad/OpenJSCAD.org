import { Geometry } from '../../geometries/types'
import { Vec1, Vec2, Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

type Vec = Vec1 | Vec2 | Vec3

export function scale<T extends Geometry>(factors: Vec, geometry: T): T
export function scale<T extends Geometry>(factors: Vec, ...geometries: RecursiveArray<T>): Array<T>
export function scale(factors: Vec, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleX<T extends Geometry>(factor: number, geometry: T): T
export function scaleX<T extends Geometry>(factor: number, ...geometries: RecursiveArray<T>): Array<T>
export function scaleX(factor: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleY<T extends Geometry>(factor: number, geometry: T): T
export function scaleY<T extends Geometry>(factor: number, ...geometries: RecursiveArray<T>): Array<T>
export function scaleY(factor: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleZ<T extends Geometry>(factor: number, geometry: T): T
export function scaleZ<T extends Geometry>(factor: number, ...geometries: RecursiveArray<T>): Array<T>
export function scaleZ(factor: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
