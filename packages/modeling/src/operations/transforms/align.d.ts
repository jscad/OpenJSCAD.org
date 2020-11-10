import { Geometry } from '../../geometries/types'
import Vec3 from '../../maths/vec3/type'
import RecursiveArray from '../../utils/recursiveArray'

export default align

export interface AlignOptions {
  modes?: Array<'center' | 'max' | 'min' | 'none'>
  alignTo?: Vec3
  grouped?: boolean
}

declare function align(options: AlignOptions, geometry: Geometry): Geometry
declare function align(options: AlignOptions, ...geometries: RecursiveArray<Geometry>): Array<Geometry>
