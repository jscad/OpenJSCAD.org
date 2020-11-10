import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function rotate(angles: [number, number, number], geometry: Geometry): Geometry
export function rotate(angles: [number, number, number], ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateX(angle: number, geometry: Geometry): Geometry
export function rotateX(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateY(angle: number, geometry: Geometry): Geometry
export function rotateY(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function rotateZ(angle: number, geometry: Geometry): Geometry
export function rotateZ(angle: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
