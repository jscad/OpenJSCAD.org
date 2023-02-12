import { EPS } from '../maths/constants.js'

export const calculateEpsilonFromBounds = (bounds, dimensions) => {
  let total = 0
  for (let i = 0; i < dimensions; i++) {
    total += bounds[1][i] - bounds[0][i]
  }
  return EPS * total / dimensions
}
