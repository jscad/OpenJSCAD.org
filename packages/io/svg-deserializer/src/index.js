/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev
              2017 Mark 'kaosat-dev' Moissette

The upgrades (direct geometry instantiation from this deserializer) and refactoring
have been very kindly sponsored by [Copenhagen Fabrication / Stykka](https://www.stykka.com/)

All code released under MIT license
*/

const saxes = require('saxes')

const { colors, transforms } = require('@jscad/modeling')
const { toArray } = require('@jscad/array-utils')

const version = require('../package.json').version

const { cagLengthX, cagLengthY, svgColorForTarget } = require('./helpers')
const { svgSvg, svgRect, svgCircle, svgGroup, svgLine, svgPath, svgEllipse, svgPolygon, svgPolyline, svgUse } = require('./svgElementHelpers')
const shapesMapGeometry = require('./shapesMapGeometry')
const shapesMapJscad = require('./shapesMapJscad')

/**
 * Deserializer of SVG source data to JSCAD geometries.
 * @see {@link https://github.com/jscad/OpenJSCAD.org/blob/master/packages/io/svg-deserializer/README.md|README} for supported conversion of SVG elements.
 * @module io/svg-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/svg-deserializer')
 */

/**
 * Deserialize the given SVG source into either a script or an array of geometries
 * @see {@link https://www.w3.org/TR/SVG/intro.html|SVG Specification}
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {string} [options.filename='svg'] - filename of original SVG source
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {float} [options.pxPmm] - custom pixels per mm unit
 * @param {integer} [options.segments] - number of segments for rounded shapes
 * @param {string} [options.target] - target 2D geometry; 'geom2' or 'path2'
 * @param {string} [options.version='0.0.0'] - version number to add to the metadata
 * @param {string} [options.pathSelfClosed='error'] - [error||trim||split] if path self-closes with one of commands without stop command right after
 * @param {string} input - SVG source data
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/svg-deserializer.deserialize
 */
const deserialize = (options, input) => {
  const defaults = {
    addMetaData: true,
    filename: 'svg',
    output: 'script',
    pxPmm: require('./constants').pxPmm,
    segments: 32,
    target: 'path', // target - 'geom2' or 'path'
    pathSelfClosed: 'error',
    version
  }
  options = Object.assign({}, defaults, options)
  return options.output === 'script' ? translate(input, options) : instantiate(input, options)
}

/*
 * Parse the given SVG source and return a set of geometries.
 * @param  {string} src - svg data as text
 * @param  {object} options - options (optional) anonymous object with:
 *  pxPmm {number} pixels per milimeter for calcuations
 *  version: {string} version number to add to the metadata
 *  addMetadata: {boolean} flag to enable/disable injection of metadata (producer, date, source)
 *
 * @return {[geometry]} a set of geometries
 */
const instantiate = (src, options) => {
  const { pxPmm } = options

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  // parse the SVG source
  createSvgParser(src, pxPmm)
  if (!svgObj) {
    throw new Error('SVG parsing failed, no valid SVG data retrieved')
  }

  options && options.statusCallback && options.statusCallback({ progress: 50 })

  const result = objectify(options, svgObj)

  options && options.statusCallback && options.statusCallback({ progress: 100 })
  return result
}

/*
 * Parse the given SVG source and return a JSCAD script
 * @param  {string} src svg data as text
 * @param  {object} options options (optional) anonymous object with:
 *  pxPmm {number: pixels per milimeter for calcuations
 *  version: {string} version number to add to the metadata
 *  addMetadata: {boolean} flag to enable/disable injection of metadata (producer, date, source)
 *    at the start of the file
 * @return {string} a string (JSCAD script)
 */
const translate = (src, options) => {
  const { filename, version, pxPmm, addMetaData } = options

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  // parse the SVG source
  createSvgParser(src, pxPmm)
  if (!svgObj) {
    throw new Error('SVG parsing failed, no valid SVG data retrieved')
  }

  // convert the internal objects to JSCAD code
  let code = addMetaData
    ? `//
  // producer: JSCAD SVG Deserializer ${version}
  // date: ${new Date()}
  // source: ${filename}
  //
`
    : ''
  code += 'const { colors, geometries, primitives, transforms } = require(\'@jscad/modeling\')\n\n'

  options && options.statusCallback && options.statusCallback({ progress: 50 })

  const scadCode = codify(options, svgObj)
  code += scadCode
  code += '\nmodule.exports = { main }'

  options && options.statusCallback && options.statusCallback({ progress: 100 })
  return code
}

// FIXME: should these be kept here ? any risk of side effects ?
let svgUnitsX
let svgUnitsY
let svgUnitsV
// processing controls
const svgObjects = [] // named objects
const svgGroups = [] // groups of objects
const svgDefs = [] // defined objects
let svgInDefs = false // svg DEFS element in process
let svgObj // svg in object form
let svgUnitsPmm = [1, 1]

/*
 * Convert the given group (of objects) into geometries
 */
const objectify = (options, group) => {
  const { target, segments, pathSelfClosed } = options
  const level = svgGroups.length
  // add this group to the heiarchy
  svgGroups.push(group)
  // create an indent for the generated code
  let i = level
  while (i > 0) {
    i--
  }

  let geometries = []

  const params = {
    svgUnitsPmm,
    svgUnitsX,
    svgUnitsY,
    svgUnitsV,
    level,
    target,
    svgGroups,
    segments,
    pathSelfClosed
  }
  // apply base level attributes to all shapes
  for (i = 0; i < group.objects.length; i++) {
    const obj = group.objects[i]
    let shapes = toArray(shapesMapGeometry(obj, objectify, params))
    shapes = shapes.map((shape) => {
      if ('transforms' in obj) {
        // NOTE: SVG specifications require that transforms are applied in the order given.
        // But these are applied in the order as required by JSCAD
        let rotateAttribute = null
        let scaleAttribute = null
        let translateAttribute = null

        for (let j = 0; j < obj.transforms.length; j++) {
          const t = obj.transforms[j]
          if ('rotate' in t) { rotateAttribute = t }
          if ('scale' in t) { scaleAttribute = t }
          if ('translate' in t) { translateAttribute = t }
        }
        if (scaleAttribute !== null) {
          let x = Math.abs(scaleAttribute.scale[0])
          let y = Math.abs(scaleAttribute.scale[1])
          shape = transforms.scale([x, y, 1], shape)
          // and mirror if necessary
          x = scaleAttribute.scale[0]
          y = scaleAttribute.scale[1]
          if (x < 0) {
            shape = transforms.mirrorX(shape)
          }
          if (y < 0) {
            shape = transforms.mirrorY(shape)
          }
        }
        if (rotateAttribute !== null) {
          const z = 0 - rotateAttribute.rotate * 0.017453292519943295 // radians
          shape = transforms.rotateZ(z, shape)
        }
        if (translateAttribute !== null) {
          const x = cagLengthX(translateAttribute.translate[0], svgUnitsPmm, svgUnitsX)
          const y = (0 - cagLengthY(translateAttribute.translate[1], svgUnitsPmm, svgUnitsY))
          shape = transforms.translate([x, y, 0], shape)
        }
      }
      const color = svgColorForTarget(target, obj)
      if (color) shape = colors.colorize(color, shape)
      return shape
    })
    geometries = geometries.concat(shapes)
  }

  // remove this group from the hiearchy
  svgGroups.pop()

  return geometries
}

/*
 * Convert the given group into JSCAD script
 */
const codify = (options, group) => {
  const { target, segments } = options
  const level = svgGroups.length
  // add this group to the heiarchy
  svgGroups.push(group)
  // create an indent for the generated code
  let indent = '  '
  let i = level
  while (i > 0) {
    indent += '  '
    i--
  }
  // pre-code
  let code = ''
  if (level === 0) {
    code += 'function main(params) {\n  let levels = {}\n  let paths = {}\n  let parts\n'
  }
  const ln = 'levels.l' + level
  code += `${indent}${ln} = []\n`

  // generate code for all objects
  for (i = 0; i < group.objects.length; i++) {
    const obj = group.objects[i]
    const on = 'paths.p' + i

    const params = {
      level,
      indent,
      ln,
      on,
      svgUnitsPmm,
      svgUnitsX,
      svgUnitsY,
      svgUnitsV,
      svgGroups,
      target,
      segments
    }

    const tmpCode = shapesMapJscad(obj, codify, params)
    code += tmpCode

    if ('transforms' in obj) {
      // NOTE: SVG specifications require that transforms are applied in the order given.
      // But these are applied in the order as required by JSCAD
      let rotateAttribute = null
      let scaleAttribute = null
      let translateAttribute = null

      for (let j = 0; j < obj.transforms.length; j++) {
        const t = obj.transforms[j]
        if ('rotate' in t) { rotateAttribute = t }
        if ('scale' in t) { scaleAttribute = t }
        if ('translate' in t) { translateAttribute = t }
      }
      if (scaleAttribute !== null) {
        let x = Math.abs(scaleAttribute.scale[0])
        let y = Math.abs(scaleAttribute.scale[1])
        code += `${indent}${on} = transforms.scale([${x}, ${y}, 1], ${on})\n`
        // and mirror if necessary
        x = scaleAttribute.scale[0]
        y = scaleAttribute.scale[1]
        if (x < 0) {
          code += `${indent}${on} = transforms.mirrorX(${on})\n`
        }
        if (y < 0) {
          code += `${indent}${on} = transforms.mirrorY(${on})\n`
        }
      }
      if (rotateAttribute !== null) {
        const z = 0 - rotateAttribute.rotate * 0.017453292519943295 // radians
        code += `${indent}${on} = transforms.rotateZ(${z}, ${on})\n`
      }
      if (translateAttribute !== null) {
        const x = cagLengthX(translateAttribute.translate[0], svgUnitsPmm, svgUnitsX)
        const y = (0 - cagLengthY(translateAttribute.translate[1], svgUnitsPmm, svgUnitsY))
        code += `${indent}${on} = transforms.translate([${x}, ${y}, 0], ${on})\n`
      }
    }
    const color = svgColorForTarget(target, obj)
    if (color) {
      code += `${indent}${on} = colors.colorize([${color}], ${on})\n`
    }
    code += `${indent}${ln} = ${ln}.concat(${on})\n\n`
  }
  // post-code
  if (level === 0) {
    code += indent + 'return ' + ln + '\n'
    code += '}\n'
  }
  // remove this group from the hiearchy
  svgGroups.pop()

  return code
}

const createSvgParser = (src, pxPmm) => {
  // create a parser for the XML
  const parser = new saxes.SaxesParser()
  if (pxPmm !== undefined && pxPmm > parser.pxPmm) {
    parser.pxPmm = pxPmm
  }
  // extend the parser with functions
  parser.on('error', (e) => {
    console.log(`ERROR: SVG file, line ${parser.line}, column ${parser.column}`)
    console.log(e)
  })

  parser.on('opentag', (node) => {
    const objMap = {
      SVG: svgSvg,
      G: svgGroup,
      RECT: svgRect,
      CIRCLE: svgCircle,
      ELLIPSE: svgEllipse,
      LINE: svgLine,
      POLYLINE: svgPolyline,
      POLYGON: svgPolygon,
      PATH: svgPath,
      USE: svgUse,
      DEFS: () => { svgInDefs = true; return undefined },
      DESC: () => undefined, // ignored by design
      TITLE: () => undefined, // ignored by design
      STYLE: () => undefined, // ignored by design
      undefined: () => console.log('WARNING: unsupported SVG element: ' + node.name)
    }
    node.attributes.position = [parser.line + 1, parser.column + 1]

    const elementName = node.name.toUpperCase()
    const obj = objMap[elementName] ? objMap[elementName](node.attributes, { svgObjects, customPxPmm: pxPmm }) : undefined

    // case 'SYMBOL':
    // this is just like an embedded SVG but does NOT render directly, only named
    // this requires another set of control objects
    // only add to named objects for later USE
    //  break;

    if (obj) {
      // add to named objects if necessary
      if ('id' in obj) {
        svgObjects[obj.id] = obj
      }
      if (obj.type === 'svg') {
        // initial SVG (group)
        svgGroups.push(obj)
        svgUnitsPmm = obj.unitsPmm
        svgUnitsX = obj.viewW
        svgUnitsY = obj.viewH
        svgUnitsV = obj.viewP
      } else {
        // add the object to the active group if necessary
        if (svgInDefs === true) {
          if (svgDefs.length > 0) {
            const group = svgDefs.pop()
            if ('objects' in group) {
              group.objects.push(obj)
            }
            svgDefs.push(group)
          }
          if (obj.type === 'group') {
            svgDefs.push(obj)
          }
        } else {
          if (svgGroups.length > 0) {
            const group = svgGroups.pop()
            if ('objects' in group) {
            // TBD apply presentation attributes from the group
              group.objects.push(obj)
            }
            svgGroups.push(group)
          }
          if (obj.type === 'group') {
            svgGroups.push(obj)
          }
        }
      }
    }
  })

  parser.on('closetag', (node) => {
    const popGroup = () => {
      if (svgInDefs === true) {
        return svgDefs.pop()
      } else {
        return svgGroups.pop()
      }
    }

    const objMap = {
      SVG: popGroup,
      DEFS: () => { svgInDefs = false },
      USE: popGroup,
      G: popGroup,
      undefined: () => {}
    }
    const elementName = node.name.toUpperCase()
    const obj = objMap[elementName] ? objMap[elementName]() : undefined

    // check for completeness
    if (svgGroups.length === 0) {
      svgObj = obj
    }
  })

  parser.on('end', () => {
    // console.log('SVG parsing completed')
  })

  // start the parser
  parser.write(src).close()
  return parser
}

const extension = 'svg'

module.exports = {
  deserialize,
  extension
}
