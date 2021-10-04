import { Geometry } from '../../geometries/types'
import { Vec1, Vec2, Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

export function rotate<T extends Geometry>(angles: Vec1 | Vec2 | Vec3, geometry: T): T
export function rotate<T extends Geometry>(angles: Vec1 | Vec2 | Vec3, ...geometries: RecursiveArray<T>): Array<T>
export function rotate(angles: Vec1 | Vec2 | Vec3, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateX<T extends Geometry>(angle: number, geometry: T): T
export function rotateX<T extends Geometry>(angle: number, ...geometries: RecursiveArray<T>): Array<T>
export function rotateX(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateY<T extends Geometry>(angle: number, geometry: T): T
export function rotateY<T extends Geometry>(angle: number, ...geometries: RecursiveArray<T>): Array<T>
export function rotateY(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateZ<T extends Geometry>(angle: number, geometry: T): T
export function rotateZ<T extends Geometry>(angle: number, ...geometries: RecursiveArray<T>): Array<T>
export function rotateZ(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
