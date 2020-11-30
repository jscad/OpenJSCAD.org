import Vec3 from './type'

export default lerp

declare function lerp(t: number, a: Vec3, b: Vec3): Vec3
declare function lerp(out: Vec3, t: number, a: Vec3, b: Vec3): Vec3
