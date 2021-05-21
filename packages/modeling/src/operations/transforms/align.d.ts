import { Geometry } from '../../geometries/types'
import { Vec1, Vec2, Vec3 } from '../../maths/types'
import RecursiveArray from '../../utils/recursiveArray'

export default align

export interface AlignOptions {
  modes?: Array<'center' | 'max' | 'min' | 'none'>
  relativeTo?: Vec1 | Vec2 | Vec3
  grouped?: boolean
}

declare function align<T extends Geometry>(options: AlignOptions, geometry: T): T
declare function align<T extends RecursiveArray<Geometry>>(options: AlignOptions, ...geometries: T): T
