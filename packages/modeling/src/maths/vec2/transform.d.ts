import Vec2 from './type'
import Mat4 from '../mat4/type'

export default transform

declare function transform(matrix: Mat4, vec: Vec2): Vec2
declare function transform(out: Vec2, matrix: Mat4, vec: Vec2): Vec2
