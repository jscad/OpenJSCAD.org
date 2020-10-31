import Vec3 = require('../maths/vec3/type')

export = Connector

declare interface Connector {
  point: Vec3
  axis: Vec3
  normal: Vec3
}
