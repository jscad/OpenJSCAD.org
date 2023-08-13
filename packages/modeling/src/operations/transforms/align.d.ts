import type { Geometry } from '../../geometries/types.d.ts'
import type { RecursiveArray } from '../../utils/recursiveArray.d.ts'

type NullableNumber = null | number

export interface AlignOptions {
  modes?: Array<'center' | 'max' | 'min' | 'none'>
  relativeTo?: [NullableNumber] | [NullableNumber, NullableNumber] | [NullableNumber, NullableNumber, NullableNumber]
  grouped?: boolean
}

export function align<T extends Geometry>(options: AlignOptions, geometry: T): T
export function align<T extends Geometry>(options: AlignOptions, ...geometries: RecursiveArray<T>): Array<T>
export function align(options: AlignOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
