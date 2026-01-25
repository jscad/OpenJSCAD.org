/**
 * Hull and HullChain 2D example
 * @category Creating Shapes
 * @skillLevel 8
 * @description Demonstrating the basics of Hulls in two dimensions
 * @tags hull, hullchain
 * @authors Simon Clark
 * @licence MIT License
 */

import { circle, rectangle } from '@jscad/modeling'
import { translate } from '@jscad/modeling'
import { hull, hullChain } from '@jscad/modeling'

export const getParameterDefinitions = () => [
  { name: 'doHull', type: 'radio', caption: 'Show:', values: ['shapes', 'hull', 'chain'], captions: ['Original Shapes', 'Hull', 'Hull Chain'], initial: 'shapes' }
]

export const main = (params) => {
  const shapes = [
    translate([15, 0, 0], circle({ radius: 2, segments: 16 })),
    translate([8, 6, 0], circle({ radius: 3.5, segments: 16 })),
    translate([0, -4, 0], circle({ radius: 5, segments: 16 })),
    translate([-15, 5, 0], rectangle({ size: [5, 17] }))
  ]
  if (params.doHull === 'hull') {
    return hull(shapes)
  } else if (params.doHull === 'chain') {
    return hullChain(shapes)
  } else {
    return shapes
  }
}

