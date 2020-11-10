import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function scale(factors: [number, number, number], geometry: Geometry): Geometry
export function scale(factors: [number, number, number], ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleX(offset: number, geometry: Geometry): Geometry
export function scaleX(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleY(offset: number, geometry: Geometry): Geometry
export function scaleY(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function scaleZ(offset: number, geometry: Geometry): Geometry
export function scaleZ(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
