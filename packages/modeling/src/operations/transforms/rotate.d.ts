import type { Geometry } from '../../geometries/types.d.ts'
import type { Vec } from '../../maths/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export function rotate<T extends Geometry>(angles: Vec, geometry: T): T
export function rotate<T extends Geometry>(angles: Vec, ...geometries: RecursiveArray<T>): Array<T>
export function rotate(angles: Vec, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateX<T extends Geometry>(angle: number, geometry: T): T
export function rotateX<T extends Geometry>(angle: number, ...geometries: RecursiveArray<T>): Array<T>
export function rotateX(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateY<T extends Geometry>(angle: number, geometry: T): T
export function rotateY<T extends Geometry>(angle: number, ...geometries: RecursiveArray<T>): Array<T>
export function rotateY(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateZ<T extends Geometry>(angle: number, geometry: T): T
export function rotateZ<T extends Geometry>(angle: number, ...geometries: RecursiveArray<T>): Array<T>
export function rotateZ(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
