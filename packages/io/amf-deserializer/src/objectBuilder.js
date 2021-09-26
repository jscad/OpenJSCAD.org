const { maths, geometries } = require('@jscad/modeling')

let lastmaterial

const findMaterial = (materials, id) => {
  if (lastmaterial && lastmaterial.id === id) return lastmaterial
  for (let i = 0; i < materials.length; i++) {
    if (materials[i].id && materials[i].id === id) {
      lastmaterial = materials[i]
      return lastmaterial
    }
  }
  return null
}

const getValue = (objects, type) => {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].type === type) return objects[i].value
  }
  return null
}

const getColor = (objects) => {
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
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

const findColorByMaterial = (materials, id) => {
  const m = findMaterial(materials, id)
  if (m) {
    return getColor(m.objects)
  }
  return null
}

// convert all objects to CSG based code
const createObject = (obj, index, data, options) => {
  const vertices = [] // [x,y,z]
  const faces = [] // [v1,v2,v3]
  const colors = [] // [r,g,b,a]
  const materials = data.amfMaterials

  const addCoord = (coord, cidx) => {
    if (coord.type === 'coordinates') {
      const x = parseFloat(getValue(coord.objects, 'x'))
      const y = parseFloat(getValue(coord.objects, 'y'))
      const z = parseFloat(getValue(coord.objects, 'z'))
      vertices.push([x, y, z])
    }
    // normal is possible
  }

  const addVertex = (vertex, vidx) => {
    if (vertex.type === 'vertex') {
      vertex.objects.forEach(addCoord)
    }
    // edge is possible
  }

  const addTriangle = (tri, tidx) => {
    if (tri.type === 'triangle') {
      const v1 = parseInt(getValue(tri.objects, 'v1'))
      const v2 = parseInt(getValue(tri.objects, 'v2'))
      const v3 = parseInt(getValue(tri.objects, 'v3'))
      faces.push([v1, v2, v3]) // HINT: reverse order for polyhedron()
      const c = getColor(tri.objects)
      if (c) {
        colors.push(c)
      } else {
        colors.push(tricolor)
      }
    }
  }

  let tricolor = null // for found colors

  const addPart = (part, pidx) => {
    switch (part.type) {
      case 'vertices':
        part.objects.forEach(addVertex)
        break
      case 'volume':
        tricolor = getColor(part.objects)
        if (part.materialid) {
        // convert material to color
          tricolor = findColorByMaterial(materials, part.materialid)
        }
        part.objects.forEach(addTriangle)
        break
      default:
        break
    }
  }

  const addMesh = (mesh, midx) => {
    if (mesh.type === 'mesh') {
      mesh.objects.forEach(addPart)
    }
  }

  // const output =
  if (options.instantiate === true) {
    const scale = options.amf.scale
    const vertex = scale !== 1.0
      ? ([x, y, z]) => maths.vec3.fromValues(x * scale, y * scale, z * scale)
      : (v) => maths.vec3.clone(v)

    obj.objects.forEach(addMesh)
    const ocolor = getColor(obj.objects)

    const fcount = faces.length
    const vcount = vertices.length

    const polygons = []
    for (let i = 0; i < fcount; i++) {
      const subData = []
      for (let j = 0; j < faces[i].length; j++) {
        if (faces[i][j] < 0 || faces[i][j] >= vcount) {
          continue
        }
        subData.push(vertex(vertices[faces[i][j]]))
      }
      const polygon = geometries.poly3.fromPoints(subData)
      const pcolor = colors[i] ? colors[i] : undefined
      if (pcolor) polygon.color = pcolor
      polygons.push(polygon)
    }
    let shape = geometries.geom3.create(polygons)
    if (ocolor) {
      shape = shape.color = ocolor
    }
    return shape
  }

  let code = ''
  if (obj.objects.length > 0) {
    // build a list of faces and vertices
    obj.objects.forEach(addMesh)
    const ocolor = getColor(obj.objects)

    const fcount = faces.length
    const vcount = vertices.length

    code += `
// Object ${obj.id}
//  faces   : ${fcount}
//  vertices: ${vcount}
const createObject${obj.id} = () => {
  let polygons = []
  let polygon
`

    // convert the results into function calls
    for (let i = 0; i < fcount; i++) {
      code += '  polygon = geometries.poly3.fromPoints([\n'
      for (let j = 0; j < faces[i].length; j++) {
        if (faces[i][j] < 0 || faces[i][j] >= vcount) {
          continue
        }
        code += `      [${vertices[faces[i][j]]}],\n`
      }
      code += '  ])\n'

      const c = colors[i]
      if (c) {
        code += `  polygon.color = [${c}]\n`
      }
      code += '  polygons.push(polygon)\n'
    }
    code += '  let shape = geometries.geom3.create(polygons)\n'

    const scale = options.scale ? options.scale : 1.0
    if (scale !== 1.0) {
      code += `  shape = transforms.scale([${scale},${scale},${scale}], shape)\n`
    }
    if (ocolor) {
      code += `  shape = colors.colorize([${ocolor}], shape)\n`
    }

    code += '  return shape\n}\n'
  }
  return code
}

module.exports = createObject
