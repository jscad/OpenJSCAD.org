/*
 * positions
 * triangles
 * normals
 * colors
 */
const vt2jscad = (positions, triangles, normals, colors) => {
  // console.log('***** vt2jscad',positions.length,triangles.length,colors.length)
  let src = ''
  src += 'primitives.polyhedron({orientation: \'inward\', points: [\n  '
  for (let i = 0, j = 0; i < positions.length; i++) {
    if (j++) src += ',\n  '
    src += '[' + positions[i] + ']' // .join(", ");
  }
  src += '],\n  faces: [\n  '
  for (let i = 0, j = 0; i < triangles.length; i++) {
    if (j++) src += ',\n  '
    src += '[' + triangles[i] + ']' // .join(', ');
  }
  if (colors && triangles.length === colors.length) {
    src += '],\n\tcolors: [\n  '
    for (let i = 0, j = 0; i < colors.length; i++) {
      if (j++) src += ',\n  '
      src += '[' + colors[i] + ']' // .join(', ');
    }
  }
  src += '] })\n'
  return src
}

module.exports = {
  vt2jscad
}
