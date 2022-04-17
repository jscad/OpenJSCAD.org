const setPoints = (points, p, i) => {
  points[i++] = p[0]
  points[i++] = p[1]
  points[i++] = p[2] || 0
}

function CSG2Vertices (csg, { letfHanded = false } = {}) {
  let vLen = 0; let iLen = 0
  for (const poly of csg.polygons) {
    const len = poly.vertices.length
    vLen += len * 3
    iLen += 3 * (len - 2)
  }
  const vertices = new Float32Array(vLen)
  const normals = new Float32Array(vLen)
  const indices = vLen > 65535 ? new Uint32Array(iLen) : new Uint16Array(iLen)

  let vertOffset = 0
  let indOffset = 0
  let posOffset = 0
  let first = 0
  const idx1 = letfHanded ? 0 : -1
  const idx2 = letfHanded ? -1 : 0
  for (const poly of csg.polygons) {
    const arr = poly.vertices
    const normal = calculateNormal(arr)
    const len = arr.length
    first = posOffset
    vertices.set(arr[0], vertOffset)
    normals.set(normal, vertOffset)
    vertOffset += 3
    vertices.set(arr[1], vertOffset)
    normals.set(normal, vertOffset)
    vertOffset += 3
    posOffset += 2
    for (let i = 2; i < len; i++) {
      vertices.set(arr[i], vertOffset)
      normals.set(normal, vertOffset)

      indices[indOffset++] = first
      indices[indOffset++] = first + i + idx1
      indices[indOffset++] = first + i + idx2
      vertOffset += 3
      posOffset += 1
    }
  }
  return { type: 'mesh', vertices, indices, normals }
}

const calculateNormal = (vertices) => {
  const v0 = vertices[0]
  const v1 = vertices[1]
  const v2 = vertices[2]

  const Ax = v1[0] - v0[0]
  const Ay = v1[1] - v0[1]
  const Az = v1[2] - v0[2]

  const Bx = v2[0] - v0[0]
  const By = v2[1] - v0[1]
  const Bz = v2[2] - v0[2]

  const Nx = Ay * Bz - Az * By
  const Ny = Az * Bx - Ax * Bz
  const Nz = Ax * By - Ay * Bx

  const len = Math.hypot(Nx, Ny, Nz)
  return [Nx / len, Ny / len, Nz / len]
}

function CSG2LineVertices (csg) {
  let vLen = csg.points.length * 3
  if (csg.isClosed) vLen += 3

  const vertices = new Float32Array(vLen)

  csg.points.forEach((p, idx) => setPoints(vertices, p, idx * 3))

  if (csg.isClosed) {
    setPoints(vertices, csg.points[0], vertices.length - 3)
  }
  return { type: 'line', vertices }
}

function CSG2LineSegmentsVertices (csg) {
  const vLen = csg.sides.length * 6

  const vertices = new Float32Array(vLen)
  csg.sides.forEach((side, idx) => {
    const i = idx * 6
    setPoints(vertices, side[0], i)
    setPoints(vertices, side[1], i + 3)
  })
  return { type: 'lines', vertices }
}

function CSGCached (func, data, cacheKey, transferable, unique, options) {
  cacheKey = cacheKey || data

  let geo = CSGToBuffers.cache.get(cacheKey)
  if (!geo) {
    geo = func(data, options)
    geo.id = CSGToBuffers.sequence++

    // fill transferable array for postMessage optimization
    if (transferable) {
      const { vertices, indices, normals } = geo
      transferable.push(vertices)
      if (indices) transferable.push(indices)
      if (normals) transferable.push(normals)
    }

    CSGToBuffers.cache.set(cacheKey, geo)
  }
  // flll unique map for exports that reuse stuff like 3mf
  if (unique) unique.set(geo.id, geo)

  return geo
}

/** Prepare lists of geometries gouped by type with format suitable for webgl if possible or type:unknown.
 *
 * @returns object separating converted geometries by type: line,lines,mesh,instance,unknown
 * */
CSGToBuffers.prepare = (list, transferable) => {
  const map = { line: [], lines: [], mesh: [], instance: [], unknown: [], all: [], unique: new Map() }

  const instanceMap = new Map()
  const add = data => {
    map[data.type].push(data)
    map.all.push(data)
  }

  const extract = list => {
    list.forEach(csg => {
      if (!csg) return
      if (csg instanceof Array) {
        extract(csg)
      } else {
        const obj = CSGToBuffers(csg, transferable, map.unique)
        // transparency in instanced mesh is problematic
        // transparent objects need ordering,  and that breaks thing for rendering instances
        if (obj.type === 'mesh' && (!csg.color || csg.color.length === 3 || csg.color[3] === 1)) {
          let old = instanceMap.get(obj)
          if (!old) {
            old = { csg, ...obj, list: [] }
            instanceMap.set(obj, old)
          }
          old.list.push(csg)
        } else {
          add({ csg, ...obj })
        }
      }
    })
  }

  if (list) extract(list)
  instanceMap.forEach(data => {
    if (data.list.length === 1) {
      delete data.list
    } else {
      data.type = 'instance'
    }
    add(data)
  })

  return map
}

export function CSGToBuffers (csg, transferable, unique, options) {
  if (csg instanceof Array) return csg.map(csg2 => CSGToBuffers(csg2, transferable, unique, options))
  let obj

  if (csg.polygons) obj = CSGCached(CSG2Vertices, csg, csg.polygons, transferable, unique, options)
  if (csg.sides && !csg.points) obj = CSGCached(CSG2LineSegmentsVertices, csg, csg.sides, transferable, unique, options)
  if (csg.points) obj = CSGCached(CSG2LineVertices, csg, csg.points, transferable, unique, options)
  if (csg.vertices) { // coer a case where the object already has the format
    obj = csg
    // avoid filling transferable multiple times
    if (!CSGToBuffers.cache.get(obj)) {
      CSGToBuffers.cache.set(obj, obj)
      if (transferable) {
        transferable.push(obj.vertices)
        if (obj.indices) transferable.push(obj.indices)
      }
    }
  }

  return obj || { csg, type: 'unknown' }
}

CSGToBuffers.clearCache = () => {
  CSGToBuffers.cache = new WeakMap()
  CSGToBuffers.sequence = 1
}

CSGToBuffers.clearCache()
