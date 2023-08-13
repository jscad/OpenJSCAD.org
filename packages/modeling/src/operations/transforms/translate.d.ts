import type { Geometry } from '../../geometries/types.d.ts'
import type { Vec } from '../../maths/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

export function translate<T extends Geometry>(offset: Vec, geometry: T): T
export function translate<T extends Geometry>(offset: Vec, ...geometries: RecursiveArray<T>): Array<T>
export function translate(offset: Vec, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function translateX<T extends Geometry>(offset: number, geometry: T): T
export function translateX<T extends Geometry>(offset: number, ...geometries: RecursiveArray<T>): Array<T>
export function translateX(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function translateY<T extends Geometry>(offset: number, geometry: T): T
export function translateY<T extends Geometry>(offset: number, ...geometries: RecursiveArray<T>): Array<T>
export function translateY(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function translateZ<T extends Geometry>(offset: number, geometry: T): T
export function translateZ<T extends Geometry>(offset: number, ...geometries: RecursiveArray<T>): Array<T>
export function translateZ(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
