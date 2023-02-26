import * as vec3 from '../maths/vec3/index.js'

import { fromPointAxisNormal } from './fromPointAxisNormal.js'

/*
 * Normalize the given connector, calculating new axis and normal
 * @param {connector} connector - the connector to normalize
 * @returns {connector} a new connector
 */
export const normalize = (connector) => {
  const newAxis = vec3.normalize(connector.axis)

  // make the normal vector truly normal
  const newNormal = vec3.normalize(vec3.cross(connector.normal, connector.axis))
  vec3.cross(newNormal, newAxis, newNormal)

  return fromPointAxisNormal(connector.point, newAxis, newNormal)
}
