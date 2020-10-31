import Vec3 from '../maths/vec3/type'

export default Connector

declare interface Connector {
  point: Vec3
  axis: Vec3
  normal: Vec3
}
