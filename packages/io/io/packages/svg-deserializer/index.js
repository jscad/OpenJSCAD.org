/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev
              2017 Mark 'kaosat-dev' Moissette

* The upgrades (direct CSG output from this deserializer) and refactoring
have been very kindly sponsored by [Copenhagen Fabrication / Stykka](https://www.stykka.com/)***

All code released under MIT license
*/

const sax = require('sax')
const {CAG} = require('@jscad/csg')

const {cagLengthX, cagLengthY} = require('./helpers')
const {svgSvg, svgRect, svgCircle, svgGroup, svgLine, svgPath, svgEllipse, svgPolygon, svgPolyline, svgUse} = require('./svgElementHelpers')
const shapesMapCsg = require('./shapesMapCsg')
const shapesMapJscad = require('./shapesMapJscad')
// FIXE: should these be kept here ? any risk of side effects ?
let svgUnitsX
let svgUnitsY
let svgUnitsV
// processing controls
let svgObjects = []    // named objects
let svgGroups = []    // groups of objects
let svgInDefs = false // svg DEFS element in process
let svgObj = null  // svg in object form
let svgUnitsPmm = [1, 1]

const objectify = function (group) {
  const level = svgGroups.length
  // add this group to the heiarchy
  svgGroups.push(group)
  // create an indent for the generated code
  let i = level
  while (i > 0) {
    i--
  }

  let lnCAG = new CAG()

  const params = {
    svgUnitsPmm,
    svgUnitsX,
    svgUnitsY,
    svgUnitsV,
    level,
    svgGroups
  }
  // generate code for all objects
  for (i = 0; i < group.objects.length; i++) {
    const obj = group.objects[i]
    let onCAG = shapesMapCsg(obj, objectify, params)

    if ('fill' in obj) {
    // FIXME when CAG supports color
    //  code += indent+on+' = '+on+'.setColor(['+obj.fill[0]+','+obj.fill[1]+','+obj.fill[2]+']);\n';
    }
    if ('transforms' in obj) {
      // NOTE: SVG specifications require that transforms are applied in the order given.
      // But these are applied in the order as required by CSG/CAG
      let tr
      let ts
      let tt

      for (let j = 0; j < obj.transforms.length; j++) {
        const t = obj.transforms[j]
        if ('rotate' in t) { tr = t }
        if ('scale' in t) { ts = t }
        if ('translate' in t) { tt = t }
      }
      if (ts !== null) {
        const x = ts.scale[0]
        const y = ts.scale[1]
        onCAG = onCAG.scale([x, y])
      }
      if (tr !== null) {
        const z = 0 - tr.rotate
        onCAG = onCAG.rotateZ(z)
      }
      if (tt !== null) {
        const x = cagLengthX(tt.translate[0], svgUnitsPmm, svgUnitsX)
        const y = (0 - cagLengthY(tt.translate[1], svgUnitsPmm, svgUnitsY))
        onCAG = onCAG.translate([x, y])
      }
    }
    lnCAG = lnCAG.union(onCAG)
  }

  // remove this group from the hiearchy
  svgGroups.pop()

  return lnCAG
}

const codify = function (group) {
  const level = svgGroups.length
  // add this group to the heiarchy
  svgGroups.push(group)
  // create an indent for the generated code
  var indent = '  '
  var i = level
  while (i > 0) {
    indent += '  '
    i--
  }
// pre-code
  var code = ''
  if (level === 0) {
    code += 'function main(params) {\n'
  }
  var ln = 'cag' + level
  code += indent + 'var ' + ln + ' = new CAG();\n'

  // generate code for all objects
  for (i = 0; i < group.objects.length; i++) {
    const obj = group.objects[i]
    const on = ln + i

    const params = {
      level,
      indent,
      ln,
      on,
      svgUnitsPmm,
      svgUnitsX,
      svgUnitsY,
      svgUnitsV,
      svgGroups
    }

    let tmpCode = shapesMapJscad(obj, codify, params)
    code += tmpCode

    if ('fill' in obj) {
    // FIXME when CAG supports color
    //  code += indent+on+' = '+on+'.setColor(['+obj.fill[0]+','+obj.fill[1]+','+obj.fill[2]+']);\n';
    }
    if ('transforms' in obj) {
      // NOTE: SVG specifications require that transforms are applied in the order given.
      //       But these are applied in the order as required by CSG/CAG
      let tr
      let ts
      let tt

      for (let j = 0; j < obj.transforms.length; j++) {
        var t = obj.transforms[j]
        if ('rotate' in t) { tr = t }
        if ('scale' in t) { ts = t }
        if ('translate' in t) { tt = t }
      }
      if (ts !== null) {
        const x = ts.scale[0]
        const y = ts.scale[1]
        code += indent + on + ' = ' + on + '.scale([' + x + ',' + y + ']);\n'
      }
      if (tr !== null) {
        const z = 0 - tr.rotate
        code += indent + on + ' = ' + on + '.rotateZ(' + z + ');\n'
      }
      if (tt !== null) {
        const x = cagLengthX(tt.translate[0], svgUnitsPmm, svgUnitsX)
        const y = (0 - cagLengthY(tt.translate[1], svgUnitsPmm, svgUnitsY))
        code += indent + on + ' = ' + on + '.translate([' + x + ',' + y + ']);\n'
      }
    }
    code += indent + ln + ' = ' + ln + '.union(' + on + ');\n'
  }
  // post-code
  if (level === 0) {
    code += indent + 'return ' + ln + ';\n'
    code += '}\n'
  }
  // remove this group from the hiearchy
  svgGroups.pop()

  return code
}

function createSvgParser (src, pxPmm) {
  // create a parser for the XML
  const parser = sax.parser(false, {trim: true, lowercase: false, position: true})
  if (pxPmm !== undefined && pxPmm > parser.pxPmm) {
    parser.pxPmm = pxPmm
  }
  // extend the parser with functions
  parser.onerror = e => console.log('error: line ' + e.line + ', column ' + e.column + ', bad character [' + e.c + ']')

  parser.onopentag = function (node) {
    // console.log('opentag: '+node.name+' at line '+this.line+' position '+this.column);
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
      DEFS: () => { svgInDefs = true },
      DESC: () => undefined, // ignored by design
      TITLE: () => undefined, // ignored by design
      STYLE: () => undefined, // ignored by design
      undefined: () => console.log('Warning: Unsupported SVG element: ' + node.name)
    }
    let obj = objMap[node.name] ? objMap[node.name](node.attributes, {svgObjects, customPxPmm: pxPmm}) : null

    // case 'SYMBOL':
    // this is just like an embedded SVG but does NOT render directly, only named
    // this requires another set of control objects
    // only add to named objects for later USE
    //  break;
    // console.log('node',node)

    if (obj !== null) {
      // add to named objects if necessary
      if ('id' in obj) {
        svgObjects[obj.id] = obj
      }
      if (obj.type === 'svg') {
        // initial SVG (group)
        svgGroups.push(obj)
        // console.log('units', obj.unitsPmm)
        svgUnitsPmm = obj.unitsPmm
        svgUnitsX = obj.viewW
        svgUnitsY = obj.viewH
        svgUnitsV = obj.viewP
      } else {
        // add the object to the active group if necessary
        if (svgGroups.length > 0 && svgInDefs === false) {
          var group = svgGroups.pop()
          if ('objects' in group) {
            // console.log('push object ['+obj.type+']');
            // console.log(JSON.stringify(obj));
          // TBD apply presentation attributes from the group
            group.objects.push(obj)
          }
          svgGroups.push(group)
        }
        if (obj.type === 'group') {
          // add GROUPs to the stack
          svgGroups.push(obj)
        }
      }
    }
  }

  parser.onclosetag = function (node) {
    // console.log('closetag: '+node)
    const popGroup = () => svgGroups.pop()
    const objMap = {
      SVG: popGroup,
      DEFS: () => { svgInDefs = false },
      USE: popGroup,
      G: popGroup,
      undefined: () => {}
    }
    const obj = objMap[node] ? objMap[node]() : undefined

    // check for completeness
    if (svgGroups.length === 0) {
      svgObj = obj
    }
  }

  // parser.onattribute = function (attr) {};
  // parser.ontext = function (t) {};

  parser.onend = function () {
  //  console.log('SVG parsing completed')
  }
  // start the parser
  parser.write(src).close()
  return parser
}

/**
 * Parse the given SVG source and return a JSCAD script
 * @param  {string} src svg data as text
 * @param  {string} filename (optional) original filename of SVG source
 * @param  {object} options options (optional) anonymous object with:
 *  pxPmm {number: pixels per milimeter for calcuations
 *  version: {string} version number to add to the metadata
 *  addMetadata: {boolean} flag to enable/disable injection of metadata (producer, date, source)
 *
 * @return a CAG (2D CSG) object
 */
function deserializeToCSG (src, filename, options) {
  filename = filename || 'svg'
  const defaults = {pxPmm: require('./constants').pxPmm, version: '0.0.0', addMetaData: true}
  options = Object.assign({}, defaults, options)
  const {version, pxPmm, addMetaData} = options

  // parse the SVG source
  const parser = createSvgParser(src, pxPmm)
  // convert the internal objects to JSCAD code
  const metadata = {
    producer: `OpenJSCAD.org ${version} SVG Importer`,
    date: new Date(),
    source: filename
  }

  if (!svgObj) {
    throw new Error('SVG parsing failed, no valid svg data retrieved')
  }

  return objectify(svgObj)
}

/**
 * Parse the given SVG source and return a JSCAD script
 * @param  {string} src svg data as text
 * @param  {string} filename (optional) original filename of SVG source
 * @param  {object} options options (optional) anonymous object with:
 *  pxPmm {number: pixels per milimeter for calcuations
 *  version: {string} version number to add to the metadata
 *  addMetadata: {boolean} flag to enable/disable injection of metadata (producer, date, source)
 *    at the start of the file
 * @return a CAG (2D CSG) object
 */
function translate (src, filename, options) {
  filename = filename || 'svg'
  const defaults = {pxPmm: require('./constants').pxPmm, version: '0.0.0', addMetaData: true}
  options = Object.assign({}, defaults, options)
  const {version, pxPmm, addMetaData} = options

  // parse the SVG source
  const parser = createSvgParser(src, pxPmm)
  // convert the internal objects to JSCAD code
  let code = addMetaData ? `//
  // producer: OpenJSCAD.org ${version} SVG Importer
  // date: ${new Date()}
  // source: ${filename}
  //
  ` : ''

  if (!svgObj) {
    throw new Error('SVG parsing failed, no valid svg data retrieved')
  }

  const scadCode = codify(svgObj)
  code += scadCode

  return code
}

const deserialize = function (src, filename, options) {
  const defaults = {
    output: 'jscad'
  }
  options = Object.assign({}, defaults, options)
  return options.output === 'jscad' ? translate(src, filename, options) : deserializeToCSG(src, filename, options)
}

module.exports = {deserialize}
