import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export function translate(offset: [number, number, number], geometry: Geometry): Geometry
export function translate(offset: [number, number, number], ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function translateX(offset: number, geometry: Geometry): Geometry
export function translateX(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function translateY(offset: number, geometry: Geometry): Geometry
export function translateY(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function translateZ(offset: number, geometry: Geometry): Geometry
export function translateZ(offset: number, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
