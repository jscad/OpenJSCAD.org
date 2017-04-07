import { version } from '../../jscad/version'

export function parseGCode (gcode, fn) {   // http://reprap.org/wiki/G-code
                                  // just as experiment ...
  var l = gcode.split(/[\n]/)   // for now just GCODE ASCII
  var srci = ''
  var d = 0, pos = [], lpos = [], le = 0, ld = 0, p = []
  var origin = [-100, -100]
  var layers = 0
  var lh = 0.35, lz = 0

  for (var i = 0; i < l.length; i++) {
    var val = '', k, e = 0
    if (l[i].match(/^\s*;/)) { continue }
    var c = l[i].split(/\s+/)
    for (var j = 0; j < c.length; j++) {
      if (c[j].match(/G(\d+)/)) {
        var n = parseInt(RegExp.$1)
        if (n == 1) d++
        if (n == 90) pos.type = 'abs'
        if (n == 91) pos.type = 'rel'
      } else if (c[j].match(/M(\d+)/)) {
        var n = parseInt(RegExp.$1)
        if (n == 104 || n == 109) { k = 'temp' }
      } else if (c[j].match(/S([\d\.]+)/)) {
        var v = parseInt(RegExp.$1)
        if (k !== undefined) {
          val[k] = v
        }
      } else if (c[j].match(/([XYZE])([\-\d\.]+)/)) {
        var a = RegExp.$1, v = parseFloat(RegExp.$2)
        if (pos.type == 'abs') {
          if (d) pos[a] = v
        } else {
          if (d) pos[a] += v
        }
            // console.log(d,a,pos.E,lpos.E);
        if (d && a == 'E' && lpos.E === undefined) {
          lpos.E = pos.E
        }
        if (d && a == 'E' && (pos.E - lpos.E) > 0) {
               // console.log(pos.E,lpos.E);
          e++
        }
      }
    }
    if (d && pos.X && pos.Y) {
      if (e) {
        if (!le && lpos.X && lpos.Y) {
               // console.log(lpos.X,lpos.Y);
          p.push('[' + (lpos.X + origin[0]) + ',' + (lpos.Y + origin[1]) + ']')
        }
        p.push('[' + (pos.X + origin[0]) + ',' + (pos.Y + origin[1]) + ']')
      }
      if (!e && le && p.length > 1) {
        if (srci.length) srci += ',\n\t\t'
        if (pos.Z != lz) {
          lh = pos.Z - lz
          layers++
        }
        srci += 'EX([' + p.join(', ') + '],{w: ' + lh * 1.1 + ', h:' + lh * 1.02 + ', fn:1, closed: false}).translate([0,0,' + pos['Z'] + '])'
        p = []
        lz = pos.Z
            // if(layers>2)
            //   break;
      }
      le = e
      lpos.X = pos.X
      lpos.Y = pos.Y
      lpos.Z = pos.Z
      lpos.E = pos.E
    }
    ld = d
  }

  var src = ''
  src += '// producer: OpenJSCAD Compatibility (' + version + ') GCode Importer\n'
  src += '// date: ' + (new Date()) + '\n'
  src += '// source: ' + fn + '\n'
  src += '\n'
   // if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
  src += '// layers: ' + layers + '\n'
  src += 'function main() {\n\tvar EX = function(p,opt) { return rectangular_extrude(p,opt); }\n\treturn ['
  src += srci
  src += '\n\t];\n}\n'
  return src
}
