
function deserialize (gcode, filename, options) {
  options && options.statusCallback && options.statusCallback({ progress: 0 })
  // http://reprap.org/wiki/G-code
  const defaults = { version: '0.0.0', addMetaData: true, output: 'jscad' }
  options = Object.assign({}, defaults, options)
  const { version, addMetaData } = options
  // just as experiment ...
  const l = gcode.split(/[\n]/) // for now just GCODE ASCII
  let srci = ''
  let d = 0
  const pos = []
  const lpos = []
  let le = 0
  let p = []
  const origin = [-100, -100]
  let layers = 0
  let lh = 0.35
  let lz = 0

  for (let i = 0; i < l.length; i++) {
    const val = ''
    let k
    let e = 0
    if (l[i].match(/^\s*;/)) { continue }
    const c = l[i].split(/\s+/)
    for (let j = 0; j < c.length; j++) {
      if (c[j].match(/G(\d+)/)) {
        const n = parseInt(RegExp.$1)
        if (n === 1) d++
        if (n === 90) pos.type = 'abs'
        if (n === 91) pos.type = 'rel'
      } else if (c[j].match(/M(\d+)/)) {
        const n = parseInt(RegExp.$1)
        if (n === 104 || n === 109) { k = 'temp' }
      } else if (c[j].match(/S([\d.]+)/)) {
        const v = parseInt(RegExp.$1)
        if (k !== undefined) {
          val[k] = v
        }
      } else if (c[j].match(/([XYZE])([-\d.]+)/)) {
        const a = RegExp.$1
        const v = parseFloat(RegExp.$2)
        if (pos.type === 'abs') {
          if (d) pos[a] = v
        } else {
          if (d) pos[a] += v
        }
        // console.log(d,a,pos.E,lpos.E)
        if (d && a === 'E' && lpos.E === undefined) {
          lpos.E = pos.E
        }
        if (d && a === 'E' && (pos.E - lpos.E) > 0) {
          // console.log(pos.E,lpos.E)
          e++
        }
      }
    }
    if (d && pos.X && pos.Y) {
      if (e) {
        if (!le && lpos.X && lpos.Y) {
          // console.log(lpos.X,lpos.Y)
          p.push('[' + (lpos.X + origin[0]) + ',' + (lpos.Y + origin[1]) + ']')
        }
        p.push('[' + (pos.X + origin[0]) + ',' + (pos.Y + origin[1]) + ']')
      }
      if (!e && le && p.length > 1) {
        if (srci.length) srci += ',\n\t\t'
        if (pos.Z !== lz) {
          lh = pos.Z - lz
          layers++
        }
        srci += 'EX([' + p.join(', ') + '],{w: ' + lh * 1.1 + ', h:' + lh * 1.02 + ', fn:1, closed: false}).translate([0,0,' + pos.Z + '])'
        p = []
        lz = pos.Z
        // if(layers>2)
        //   break
      }
      le = e
      lpos.X = pos.X
      lpos.Y = pos.Y
      lpos.Z = pos.Z
      lpos.E = pos.E
    }
    options && options.statusCallback && options.statusCallback({ progress: 100 * i / l.length })
  }

  let code = addMetaData ? `//
  // producer: OpenJSCAD.org Compatibility${version} GCode deserializer
  // date: ${new Date()}
  // source: ${filename}
  //
  ` : ''
  code += `// layers: ${layers}
  function main() {\n\tvar EX = function(p,opt) { return rectangular_extrude(p,opt); }\n\treturn [
    ${srci}
  }
}
  `
  // if (err) src += '// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n'

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return code
}

module.exports = {
  deserialize
}
