// title      : Polyhedron
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: testing polyhedron() function
// file       : polyhedron.jscad

function main () {
  return polyhedron({
    points: [
      [0, -10, 60], [0, 10, 60], [0, 10, 0], [0, -10, 0], [60, -10, 60], [60, 10, 60],
      [10, -10, 50], [10, 10, 50], [10, 10, 30], [10, -10, 30], [30, -10, 50], [30, 10, 50]
    ],
    triangles: [
      [0, 3, 2], [0, 2, 1], [4, 0, 5], [5, 0, 1], [5, 2, 4], [4, 2, 3],
      [6, 8, 9], [6, 7, 8], [6, 10, 11], [6, 11, 7], [10, 8, 11],
      [10, 9, 8], [3, 0, 9], [9, 0, 6], [10, 6, 0], [0, 4, 10],
      [3, 9, 10], [3, 10, 4], [1, 7, 11], [1, 11, 5], [1, 8, 7],
      [2, 8, 1], [8, 2, 11], [5, 11, 2]
    ]
  });
}
