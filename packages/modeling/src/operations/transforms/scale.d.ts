import type { Geometry } from '../../geometries/types.d.ts'
import type { Vec } from '../../maths/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

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
