// example JSCAD script
import { flatten } from '@jscad/array-utils'
import { arc, ellipse } from '@jscad/modeling'

import { createPart } from './part.js'

export const getParameterDefinitions = () => {
  return flatten([
    { name: 'segments', caption: 'Segments:', type: 'int', initial: 10, min: 5, max: 20, step: 1 }
  ])
}

export const main = (params) => {
  // parameters
  const segments = params.segments || 16

  // shapes
  const apath2 = arc({ segments })
  const ageom2 = ellipse({ segments, center: [5, 5] })
  const ageom3 = createPart(segments)

  return [apath2, ageom2, ageom3]
}
