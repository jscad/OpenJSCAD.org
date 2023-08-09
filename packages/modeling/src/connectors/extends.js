import * as vec3 from '../maths/vec3/index.js'

import { fromPointAxisNormal } from './fromPointAxisNormal.js'

/*
 * Creates a new connector, with the connection point moved in the direction of the axis
 * @param {number} distance the distance to extend the connector to
 * @param {connector} connector the connector to extend
 * @returns {connector} a normalized connector
 */
export const extend = (distance, connector) => {
  const newPoint = vec3.add(connector.point, vec3.scale(distance, vec3.normalize(connector.axis)))
  return fromPointAxisNormal(newPoint, connector.axis, connector.normal)
}
