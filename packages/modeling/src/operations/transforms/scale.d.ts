import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function scale(factors: [number, number, number], geometry: Geometry): Geometry
export function scale(factors: [number, number, number], ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleX(factor: number, geometry: Geometry): Geometry
export function scaleX(factor: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleY(factor: number, geometry: Geometry): Geometry
export function scaleY(factor: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleZ(factor: number, geometry: Geometry): Geometry
export function scaleZ(factor: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
