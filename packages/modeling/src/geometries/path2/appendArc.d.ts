import Path2 from './type'
import Vec2 from '../../maths/vec2/type'

export default appendArc

export interface AppendArcOptions {
  endpoint: Vec2
  radius?: Vec2
  xaxisrotation?: number
  clockwise?: boolean
  large?: boolean
  segments?: number
}

declare function appendArc(options: AppendArcOptions, geometry: Path2): Path2
