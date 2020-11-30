import Path2 from './type'
import Vec2 from '../../maths/vec2/type'

export default eachPoint

export interface EachPointOptions {}
export type EachPointThunk = (value: Vec2, index: number, array: Array<Vec2>) => void

declare function eachPoint(options: EachPointOptions, thunk: EachPointThunk, path: Path2): void
