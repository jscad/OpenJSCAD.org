// vertices, triangles, normals and colors
function vt2jscad (vertices, triangles, normals, colors) {
  let src = ''
  src += 'polyhedron({ points: [\n\t'
  for (let i = 0, j = 0; i < vertices.length; i++) {
    if (j++) src += ',\n\t'
    src += '[' + vertices[i] + ']' // .join(", ");
  }
  src += '],\n\tpolygons: [\n\t'
  for (let i = 0, j = 0; i < triangles.length; i++) {
    if (j++) src += ',\n\t'
    src += '[' + triangles[i] + ']' // .join(', ');
  }
  if (colors && triangles.length === colors.length) {
    src += '],\n\tcolors: [\n\t'
    for (let i = 0, j = 0; i < colors.length; i++) {
      if (j++) src += ',\n\t'
      src += '[' + colors[i] + ']' // .join(', ');
    }
  }
  src += '] })\n'
  return src
}

module.exports = {
  vt2jscad
}
