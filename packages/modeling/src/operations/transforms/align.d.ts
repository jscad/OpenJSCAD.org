import { Geometry } from '../../geometries/types'
import RecursiveArray from '../../utils/recursiveArray'

export default align

type NullableNumber = null | number

export interface AlignOptions {
  modes?: Array<'center' | 'max' | 'min' | 'none'>
  relativeTo?: [NullableNumber] | [NullableNumber, NullableNumber] | [NullableNumber, NullableNumber, NullableNumber]
  grouped?: boolean
}

declare function align<T extends Geometry>(options: AlignOptions, geometry: T): T
declare function align<T extends Geometry>(options: AlignOptions, ...geometries: RecursiveArray<T>): Array<T>
declare function align(options: AlignOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
