import type { Poly3 } from './type.d.ts'
import type { Vec4 } from '../../maths/vec4/type.d.ts'

export function measureBoundingSphere(out: Vec4, polygon: Poly3): Vec4
export function measureBoundingSphereAndCache(polygon: Poly3): Vec4
