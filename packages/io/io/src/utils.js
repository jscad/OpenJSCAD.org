export function vt2jscad (v, t, n, c) {     // vertices, triangles, normals and colors
  var src = ''
  src += 'polyhedron({ points: [\n\t'
  for (var i = 0, j = 0; i < v.length; i++) {
    if (j++) src += ',\n\t'
    src += '[' + v[i] + ']' // .join(", ");
  }
  src += '],\n\tpolygons: [\n\t'
  for (var i = 0, j = 0; i < t.length; i++) {
    if (j++) src += ',\n\t'
    src += '[' + t[i] + ']' // .join(', ');
  }
  if (c && t.length == c.length) {
    src += '],\n\tcolors: [\n\t'
    for (var i = 0, j = 0; i < c.length; i++) {
      if (j++) src += ',\n\t'
      src += '[' + c[i] + ']' // .join(', ');
    }
  }
  src += '] })\n'
  return src
}
