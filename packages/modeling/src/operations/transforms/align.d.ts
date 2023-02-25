import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

type NullableNumber = null | number

export interface AlignOptions {
  modes?: Array<'center' | 'max' | 'min' | 'none'>
  relativeTo?: [NullableNumber] | [NullableNumber, NullableNumber] | [NullableNumber, NullableNumber, NullableNumber]
  grouped?: boolean
}

export function align<T extends Geometry>(options: AlignOptions, geometry: T): T
export function align<T extends Geometry>(options: AlignOptions, ...geometries: RecursiveArray<T>): Array<T>
export function align(options: AlignOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
