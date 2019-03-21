function findMaterial (materials, id) {
  let lastmaterial = null // FIXME: shoud this be outside this scope ?

  if (lastmaterial && lastmaterial.id === id) return lastmaterial
  for (let i = 0; i < materials.length; i++) {
    if (materials[i].id && materials[i].id === id) {
      lastmaterial = materials[i]
      return lastmaterial
    }
  }
  return null
}

function getValue (objects, type) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].type === type) return objects[i].value
  }
  return null
}
function getColor (objects) {
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    if (obj.type === 'color') {
      let r = parseFloat(getValue(obj.objects, 'r'))
      let g = parseFloat(getValue(obj.objects, 'g'))
      let b = parseFloat(getValue(obj.objects, 'b'))
      let a = parseFloat(getValue(obj.objects, 'a'))
      if (Number.isNaN(r)) r = 1.0 // AMF default color
      if (Number.isNaN(g)) g = 1.0
      if (Number.isNaN(b)) b = 1.0
      if (Number.isNaN(a)) a = 1.0
      return [r, g, b, a]
    }
  }
  return null
}

function findColorByMaterial (materials, id) {
  let m = findMaterial(materials, id)
  if (m) {
    return getColor(m.objects)
  }
  return null
}

// convert all objects to CSG based code
function createObject (obj, index, data, options) {
  let vertices = [] // [x,y,z]
  let faces = [] // [v1,v2,v3]
  let colors = [] // [r,g,b,a]

  function addCoord (coord, cidx) {
    if (coord.type === 'coordinates') {
      // console.log('coords', coord.objects)
      let x = parseFloat(getValue(coord.objects, 'x'))
      let y = parseFloat(getValue(coord.objects, 'y'))
      let z = parseFloat(getValue(coord.objects, 'z'))
      // console.log('[' + x + ',' + y + ',' + z + ']')
      vertices.push([x, y, z])
    }
    // normal is possible
  }
  function addVertex (vertex, vidx) {
    if (vertex.type === 'vertex') {
      vertex.objects.map(addCoord)
    }
    // edge is possible
  }
  function addTriangle (tri, tidx) {
    if (tri.type === 'triangle') {
      let v1 = parseInt(getValue(tri.objects, 'v1'))
      let v2 = parseInt(getValue(tri.objects, 'v2'))
      let v3 = parseInt(getValue(tri.objects, 'v3'))
      // console.log('['+v1+','+v2+','+v3+']');
      faces.push([v1, v2, v3]) // HINT: reverse order for polyhedron()
      let c = getColor(tri.objects)
      if (c) {
        colors.push(c)
      } else {
        colors.push(tricolor)
      }
    }
  }
  let tricolor = null // for found colors
  function addPart (part, pidx) {
    // console.log(part.type);
    switch (part.type) {
      case 'vertices':
        part.objects.map(addVertex, data)
        break
      case 'volume':
        tricolor = getColor(part.objects)
        if (part.materialid) {
        // convert material to color
          tricolor = findColorByMaterial(part.materialid)
        }
        part.objects.map(addTriangle, data)
        break
      default:
        break
    }
  }
  function addMesh (mesh, midx) {
    // console.log(mesh.type);
    if (mesh.type === 'mesh') {
      mesh.objects.map(addPart, data)
    }
  }

  // const output =
  if (options.csg === true) {
    const {CSG} = require('@jscad/csg')
    const scale = options.amf.scale
    const vertex = scale !== 1.0 ? ([x, y, z]) => new CSG.Vertex(new CSG.Vector3D(x * scale, y * scale, z * scale))
      : ([x, y, z]) => new CSG.Vertex(new CSG.Vector3D(x, y, z))
    const polygon = a => new CSG.Polygon(a)

    obj.objects.map(addMesh, data)
    let polys = []

    let fcount = faces.length
    let vcount = vertices.length
    // console.log('here', fcount, vcount)

    for (let i = 0; i < fcount; i++) {
      let subData = []
      for (let j = 0; j < faces[i].length; j++) {
        if (faces[i][j] < 0 || faces[i][j] >= vcount) {
          // if (err.length === '') err += 'bad index for vertice (out of range)'
          continue
        }
        // console.log('bla', vertices[faces[i][j]])

        subData.push(vertex(vertices[faces[i][j]]))
      }
      const color = colors[i] ? colors[i] : undefined
      const polygonData = color ? polygon(subData).setColor([color[0], color[1], color[2], color[3]]) : polygon(subData)
      polys.push(polygonData)
    }
    return CSG.fromPolygons(polys)
  }

  let code = ''
  if (obj.objects.length > 0) {
    obj.objects.map(addMesh, data)

    let fcount = faces.length
    let vcount = vertices.length

    code += `// Object ${obj.id}
//  faces   : ${fcount}
//  vertices: ${vcount}
function createObject${obj.id}() {
  let polys = [];
`

    // convert the results into function calls
    for (let i = 0; i < fcount; i++) {
      code += '  polys.push(\n'
      code += '    PP([\n'
      for (let j = 0; j < faces[i].length; j++) {
        if (faces[i][j] < 0 || faces[i][j] >= vcount) {
          // if (err.length === '') err += 'bad index for vertice (out of range)'
          continue
        }
        if (j) code += ',\n'
        code += '      VV(' + vertices[faces[i][j]] + ')'
      }
      code += '])'
      if (colors[i]) {
        let c = colors[i]
        code += '.setColor([' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + '])'
      }
      code += ');\n'
    }
    code += '  return CSG.fromPolygons(polys);\n'
    code += '}\n'
  }
  return code
}

module.exports = createObject
