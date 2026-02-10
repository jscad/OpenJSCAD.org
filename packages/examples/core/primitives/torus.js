/**
 * Torus Variety
 * @category Creating Shapes
 * @skillLevel 2
 * @description Demonstrating the capabilities and variations of the torus() primitive
 * @tags torus, shape, 3d
 * @authors Rene K. Mueller, Simon Clark
 * @licence MIT License
 */

import { torus, translate, TAU } from '@jscad/modeling'

export const main = () => [
  // Top Row - Simple Torii
  translate([-10, 20, 0], torus({ innerRadius: 1, innerSegments: 32, outerRadius: 4, outerSegments: 32, innerRotation: 0, startAngle: 0, outerRotation: TAU })),
  translate([0, 20, 0], torus({ innerRadius: 2, outerRadius: 3 })),
  translate([10, 20, 0], torus({ innerRadius: 0.5 })),

  // Second row - Square Torii
  translate([-10, 10, 0], torus({ innerSegments: 4, outerSegments: 4 })),
  translate([0, 10, 0], torus({ innerSegments: 4, outerSegments: 4, innerRotation: TAU / 8 })),
  translate([10, 10, 0], torus({ outerSegments: 4 })),
  translate([20, 10, 0], torus({ innerSegments: 5, outerSegments: 4, innerRotation: 0 })),

  // Third Row - Pentagonal Torii
  translate([-10, 0, 0], torus({ innerSegments: 4, outerSegments: 5 })),
  translate([0, 0, 0], torus({ innerSegments: 4, innerRotation: TAU / 8, outerSegments: 5 })),
  translate([10, 0, 0], torus({ innerSegments: 32, outerSegments: 5 })),

  // Fourth Row - Other Variations
  translate([-10, -10, 0], torus({ innerSegments: 4 })),
  translate([0, -10, 0], torus({ innerSegments: 4, innerRotation: TAU / 8 })),
  translate([10, -10, 0], torus({ outerSegments: 8 })),
  translate([20, -10, 0], torus({ outerSegments: 3 }))
]
