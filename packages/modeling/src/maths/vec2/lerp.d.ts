import Vec2 from './type'

export default lerp

declare function lerp(t: number, a: Vec2, b: Vec2): Vec2
declare function lerp(out: Vec2, t: number, a: Vec2, b: Vec2): Vec2
