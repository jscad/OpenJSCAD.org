/*
// title       : Polyhedron
// author      : Rene K. Mueller
// license     : MIT License
// description : Demonstrating the polyhedron() function
// tags        : polyhedron, geom3, modelling
// file        : polyhedron.js
*/

const { polyhedron } = require('@jscad/modeling').primitives

const main = () => {
  return polyhedron({
    points: [
      [0, -10, 60], [0, 10, 60], [0, 10, 0], [0, -10, 0], [60, -10, 60], [60, 10, 60],
      [10, -10, 50], [10, 10, 50], [10, 10, 30], [10, -10, 30], [30, -10, 50], [30, 10, 50]
    ],
    faces: [
      [0, 2, 3], [0, 1, 2], [4, 5, 0], [5, 1, 0], [5, 4, 2], [4, 3, 2],
      [6, 9, 8], [6, 8, 7], [6, 11, 10], [6, 7, 11], [10, 11, 8], [10, 8, 9],
      [3, 9, 0], [9, 6, 0], [10, 0, 6], [0, 10, 4], [3, 10, 9], [3, 4, 10],
      [1, 11, 7], [1, 5, 11], [1, 7, 8], [2, 1, 8], [8, 11, 2], [5, 2, 11]
    ]
  })
}

module.exports = { main }
