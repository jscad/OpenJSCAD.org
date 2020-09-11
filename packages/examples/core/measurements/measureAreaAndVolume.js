/*
// title       : Measure Area & Volume
// authors     : Simon Clark
// license     : MIT License
// description : Examples of measureArea() and measureVolume() function
// tags        : measurements, area, volume, text
*/

const { circle, sphere, cube, square, star } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms
const { measureArea, measureVolume } = require('@jscad/modeling').measurements
const { vectorText } = require('@jscad/modeling').text
const { path2 } = require('@jscad/modeling').geometries

const getParameterDefinitions = () => {
  return [
    { name: 'shape', type: 'choice', caption: 'Shape:', values: ['circle', 'square', 'star', 'sphere', 'cube'], initial: 'circle' },
    { name: 'size', type: 'number', initial: 10.0, min: 0.1, max: 10.0, step: 0.01, caption: 'Size:' },
    { name: 'segments', type: 'choice', values: [8, 16, 32, 64, 128], initial: 16, caption: 'Segments:' }
  ]
}

const textPaths = (text, y) => {
  const lineSegmentPointArrays = vectorText({ x: -20, y: -10, input: text })
  let textSegments = lineSegmentPointArrays.map((points) => { return path2.fromPoints({ closed: false }, points) })
  textSegments = scale([0.2, 0.2, 0.2], textSegments)
  return translate([-25, y - 10, 0], textSegments)
}

const getShape = (params) => {
  if (params.shape === 'circle') {
    return circle({ radius: params.size, segments: params.segments })
  } else if (params.shape === 'square') {
    return square({ size: params.size })
  } else if (params.shape === 'star') {
    return star({ vertices: 5, outerRadius: params.size, innerRadius: params.size / 2 })
  } else if (params.shape === 'sphere') {
    return sphere({ radius: params.size, segments: params.segments })
  } else if (params.shape === 'cube') {
    return cube({ size: params.size })
  }
  throw (new Error('Shape not provided'))
}

/**
 * Measure the area and volume of different geometries at different resolutions.
 * @param {String} params.shape - The shape to create. ( circle | square | star | sphere | cube )
 * @param {Number} params.size - The size of shape to create.
 * @param {Number} params.segments - The resolution of the shape to create. Affects only circle and sphere.
 * @returns {[geometry]} The created shape, and text describing its area and volume.
 */
const main = (params) => {
  const shape = getShape(params)

  const area = measureArea(shape)
  const areaText = textPaths('area: ' + area.toFixed(4), -2 - params.size)

  const volume = measureVolume(shape)
  const volumeText = textPaths('volume: ' + volume.toFixed(4), -8 - params.size)

  return [shape, ...areaText, ...volumeText]
}

module.exports = { main, getParameterDefinitions }
