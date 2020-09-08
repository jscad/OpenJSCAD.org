/*
// title       : 2D Primitives Demonstration
// author      : Simon Clark
// license     : MIT License
// description : Demonstrating the basics of a variety of 2D primitives
// file        : primitives2D.js
// tags        : circle, square, line, ellipse, polygon, shape, 2d
*/

const { arc, circle, ellipse, line, polygon, rectangle, roundedRectangle, square, star } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  const allPrimitives = [
    arc({ center: [-1, -1], radius: 2, startAngle: 0, endAngle: (Math.PI / 2), makeTangent: false, segments: 32 }),
    line([[1, 1], [-1, -1], [1, -1]]),
    circle({ radius: 1.8, segments: 10 }),
    ellipse({ radius: [0.7, 2] }),
    polygon({ points: [[-3, -1], [3, -1], [3.5, 2], [1.5, 1], [0, 2], [-1.5, 1], [-3.5, 2]] }),
    rectangle({ size: [2, 3] }),
    roundedRectangle({ size: [4, 3], roundRadius: 0.7 }),
    square({ size: 3.5 }),
    star(),
    star({ vertices: 9, outerRadius: 2, innerRadius: 0.8, density: 2, startAngle: Math.PI / 18 })
  ]

  return allPrimitives.map((primitive, index) => {
    return translate([(index % 4 - 2) * 6, Math.floor(index / 4 - 2) * 6, 0], primitive)
  })
}

module.exports = { main }
