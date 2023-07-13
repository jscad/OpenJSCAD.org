/*
JSCAD Object to SVG Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     SVG GROUP containing a continous SVG PATH that contains the outlines of the geometry
2) geom3 conversion to:
     none
3) path2 conversion to:
     SVG GROUP containing a SVG PATH for each path
*/

/**
 * Serializer of JSCAD geometries to SVG source (XML).
 *
 * The serialization of the following geometries are possible.
 * - serialization of 2D geometry (geom2) to SVG path (a continous path containing the outlines of the geometry)
 * - serialization of 2D geometry (path2) to SVG path
 *
 * Colors are added to SVG shapes when found on the geometry.
 * Special attributes (id and class) are added to SVG shapes when found on the geometry.
 *
 * @module io/svg-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/svg-serializer')
 */

const { geometries, maths, measurements, utils } = require('@jscad/modeling')

const stringify = require('onml/lib/stringify')

const version = require('./package.json').version

const mimeType = 'image/svg+xml'

/**
 * Serialize the give objects to SVG code (XML).
 * @see https://www.w3.org/TR/SVG/Overview.html
 * @param {Object} options - options for serialization, REQUIRED
 * @param {String} [options.unit='mm'] - unit of design; em, ex, px, in, cm, mm, pt, pc
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {Object|Array} objects - objects to serialize as SVG
 * @returns {Array} serialized contents, SVG code (XML string)
 * @alias module:io/svg-serializer.serialize
 * @example
 * const geometry = primitives.square()
 * const svgData = serializer({unit: 'mm'}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    unit: 'mm', // em | ex | px | in | cm | mm | pt | pc
    decimals: 10000,
    version,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = utils.flatten(objects)

  // convert only 2D geometries
  const objects2d = objects.filter((object) => geometries.geom2.isA(object) || geometries.path2.isA(object))

  if (objects2d.length === 0) throw new Error('only 2D geometries can be serialized to SVG')
  if (objects.length !== objects2d.length) console.warn('some objects could not be serialized to SVG')

  options.statusCallback && options.statusCallback({ progress: 0 })

  // get the lower and upper bounds of ALL convertable objects
  const bounds = getBounds(objects2d)

  let width = 0
  let height = 0
  if (bounds) {
    width = Math.round((bounds[1][0] - bounds[0][0]) * options.decimals) / options.decimals
    height = Math.round((bounds[1][1] - bounds[0][1]) * options.decimals) / options.decimals
  }

  let body = ['svg',
    {
      width: width + options.unit,
      height: height + options.unit,
      viewBox: ('0 0 ' + width + ' ' + height),
      fill: 'none',
      'fill-rule': 'evenodd',
      'stroke-width': '0.1px',
      version: '1.1',
      baseProfile: 'tiny',
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink'
    }
  ]
  if (bounds) {
    body = body.concat(convertObjects(objects2d, bounds, options))
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
${stringify(body, 2)}`

  options.statusCallback && options.statusCallback({ progress: 100 })
  return [svg]
}

/*
 * Measure the bounds of the given objects, which is required to offset all points to positive X/Y values.
 */
const getBounds = (objects) => {
  const allbounds = measurements.measureBoundingBox(objects)

  if (objects.length === 1) return allbounds

  // create a sum of the bounds
  const sumofbounds = allbounds.reduce((sum, bounds) => {
    maths.vec3.min(sum[0], sum[0], bounds[0])
    maths.vec3.max(sum[1], sum[1], bounds[1])
    return sum
  }, [[0, 0, 0], [0, 0, 0]])
  return sumofbounds
}

const convertObjects = (objects, bounds, options) => {
  const xoffset = 0 - bounds[0][0] // offset to X=0
  const yoffset = 0 - bounds[1][1] // offset to Y=0

  const contents = []
  objects.forEach((object, i) => {
    options.statusCallback && options.statusCallback({ progress: 100 * i / objects.length })

    if (geometries.geom2.isA(object)) {
      contents.push(convertGeom2(object, [xoffset, yoffset], options))
    }
    if (geometries.path2.isA(object)) {
      contents.push(convertPaths([object], [xoffset, yoffset], options))
    }
  })
  return contents
}

const reflect = (x, y, px, py) => {
  const ox = x - px
  const oy = y - py
  if (x === px && y === px) return [x, y]
  if (x === px) return [x, py - (oy)]
  if (y === py) return [px - (-ox), y]
  return [px - (-ox), py - (oy)]
}

const convertGeom2 = (object, offsets, options) => {
  const outlines = geometries.geom2.toOutlines(object)
  const paths = outlines.map((outline) => geometries.path2.fromPoints({ closed: true }, outline))

  options.color = 'black' // SVG initial color
  if (object.color) options.color = convertColor(object.color)
  options.id = null
  if (object.id) options.id = object.id
  options.class = null
  if (object.class) options.class = object.class

  return convertToContinousPath(paths, offsets, options)
}

const convertToContinousPath = (paths, offsets, options) => {
  let instructions = ''
  paths.forEach((path) => (instructions += convertPath(path, offsets, options)))
  const d = { fill: options.color, d: instructions }
  if (options.id) d.id = options.id
  if (options.class) d.class = options.class
  return ['g', ['path', d]]
}

const convertPaths = (paths, offsets, options) => paths.reduce((res, path, i) => {
  const d = { d: convertPath(path, offsets, options) }
  if (path.color) d.stroke = convertColor(path.color)
  if (path.id) d.id = path.id
  if (path.class) d.class = path.class
  return res.concat([['path', d]])
}, ['g'])

const convertPath = (path, offsets, options) => {
  let str = ''
  const numpointsClosed = path.points.length + (path.isClosed ? 1 : 0)
  for (let pointindex = 0; pointindex < numpointsClosed; pointindex++) {
    let pointindexwrapped = pointindex
    if (pointindexwrapped >= path.points.length) pointindexwrapped -= path.points.length
    const point = path.points[pointindexwrapped]
    const offpoint = [point[0] + offsets[0], point[1] + offsets[1]]
    const svgpoint = reflect(offpoint[0], offpoint[1], 0, 0)
    const x = Math.round(svgpoint[0] * options.decimals) / options.decimals
    const y = Math.round(svgpoint[1] * options.decimals) / options.decimals
    if (pointindex > 0) {
      str += `L${x} ${y}`
    } else {
      str += `M${x} ${y}`
    }
  }
  return str
}

const convertColor = (color) => `rgba(${color[0] * 255},${color[1] * 255},${color[2] * 255},${color[3]})`

module.exports = {
  serialize,
  mimeType
}
