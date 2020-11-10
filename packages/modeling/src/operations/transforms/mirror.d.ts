import { Geometry } from '../../geometries/types'
import Vec3 from '../../maths/vec3/type'
import RecursiveArray from '../../utils/recursiveArray'

export interface MirrorOptions {
  origin: Vec3
  normal: Vec3
}

export function mirror(options: MirrorOptions, geometry: Geometry): Geometry
export function mirror(options: MirrorOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function mirrorX(geometry: Geometry): Geometry
export function mirrorX(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function mirrorY(geometry: Geometry): Geometry
export function mirrorY(...geometries: RecursiveArray<Geometry>): Array<Geometry>

export function mirrorZ(geometry: Geometry): Geometry
export function mirrorZ(...geometries: RecursiveArray<Geometry>): Array<Geometry>
