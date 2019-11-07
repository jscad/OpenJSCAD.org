const flatten = require('../../utils/flatten')

const { geom2, geom3, path2, poly3 } = require('../../geometry')

/*
 * Measure the volume of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an volume
 *
 * @param {Path2} geometry - geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfPath2 = () => 0

/*
 * Measure the volume of the given geometry.
 * NOTE: 2D geometry are infinitely thin and do not have an volume
 *
 * @param {Geom2} geometry - 2D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfGeom2 = () => 0

/*
 * Measure the volume of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfGeom3 = (geometry) => {
  const polygons = geom3.toPolygons(geometry)
  return polygons.reduce((volume, polygon) => volume + poly3.measureSignedVolume(polygon), 0)
}

/**
 * Measure the volume of the given geometry(s).
 * @param {...geometries} geometries - the geometry(s) to measure
 * @return {Number|Number[]} the volume for each geometry
 *
 * @example
 * let volume = measureVolume(sphere())
 */
const measureVolume = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureVolumeOfPath2(geometry)
    if (geom2.isA(geometry)) return measureVolumeOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureVolumeOfGeom3(geometry)
    return 0
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureVolume
