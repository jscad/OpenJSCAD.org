const vec3 = require('../../maths/vec3')
const measureEpsilon = require('../../measurements/measureEpsilon')

const geom3 = require('../../geometries/geom3')

// returns array numerically sorted and duplicates removed
const sortNb = (array) => array.sort((a, b) => a - b).filter((item, pos, ary) => !pos || item !== ary[pos - 1])

const insertMapping = (map, point, polygonIndex) => {
  const key = `${point}`
  const mapping = map.get(key)
  if (mapping === undefined) {
    map.set(key, [polygonIndex])
  } else {
    mapping.push(polygonIndex)
  }
}

const findMapping = (map, point) => {
  const key = `${point}`
  return map.get(key)
}

const scissionGeom3 = (geometry) => {
  // construit table de correspondance entre polygones
  // build polygons lookup table
  const eps = measureEpsilon(geometry)
  const polygons = geom3.toPolygons(geometry)
  const pl = polygons.length

  const polygonIndexesPerPoint = new Map()
  const temp = vec3.create()
  polygons.forEach((polygon, polygonIndex) => {
    polygon.vertices.forEach((point) => {
      insertMapping(polygonIndexesPerPoint, vec3.snap(temp, point, eps), polygonIndex)
    })
  })

  const zz = polygons.map((polygon, polygonIndex) => {
    const indexes = []
    polygon.vertices.forEach((point) => {
      indexes.push(...findMapping(polygonIndexesPerPoint, vec3.snap(temp, point, eps)))
    })
    return { e: 1, d: sortNb(indexes) } // for each polygon, push the list of indexes
  })

  polygonIndexesPerPoint.clear()

  // regroupe les correspondances des polygones se touchant
  // boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
  // merge lookup data from linked polygons as long as possible
  let merges = 0
  for (let i = 0; i < zz.length; i++) {
    const mapi = zz[i]
    // merge mappings if necessary
    if (mapi.e > 0) {
      const indexes = new Array(pl)
      indexes[i] = true // include ourself
      do {
        merges = 0
        // loop through the known indexes
        indexes.forEach((e, j) => {
          const mapj = zz[j]
          // merge this mapping if necessary
          if (mapj.e > 0) {
            mapj.e = -1 // merged
            for (let d = 0; d < mapj.d.length; d++) {
              indexes[mapj.d[d]] = true
            }
            merges++
          }
        })
      } while (merges > 0)
      mapi.indexes = indexes
    }
  }

  // construit le tableau des geometry à retourner
  // build array of geometry to return
  const newgeometries = []
  const zzl = zz.length
  for (let i = 0; i < zzl; i++) {
    if (zz[i].indexes) {
      const newpolygons = []
      zz[i].indexes.forEach((e, p) => newpolygons.push(polygons[p]))
      newgeometries.push(geom3.create(newpolygons))
    }
  }

  return newgeometries
}

module.exports = scissionGeom3
