export const formats = {
  stla: { displayName: 'STL (ASCII)', description: 'STereoLithography, ASCII', extension: 'stl', mimetype: 'application/sla', convertCSG: true, convertCAG: false },
  stlb: { displayName: 'STL (Binary)', description: 'STereoLithography, Binary', extension: 'stl', mimetype: 'application/sla', convertCSG: true, convertCAG: false },
  amf: { displayName: 'AMF (experimental)', description: 'Additive Manufacturing File Format', extension: 'amf', mimetype: 'application/amf+xml', convertCSG: true, convertCAG: false },
  x3d: { displayName: 'X3D', description: 'X3D File Format', extension: 'x3d', mimetype: 'model/x3d+xml', convertCSG: true, convertCAG: false },
  dxf: { displayName: 'DXF', description: 'AutoCAD Drawing Exchange Format', extension: 'dxf', mimetype: 'application/dxf', convertCSG: false, convertCAG: true },
  jscad: { displayName: 'JSCAD', description: 'OpenJSCAD.org Source', extension: 'jscad', mimetype: 'application/javascript', convertCSG: true, convertCAG: true },
  svg: { displayName: 'SVG', description: 'Scalable Vector Graphics Format', extension: 'svg', mimetype: 'image/svg+xml', convertCSG: false, convertCAG: true },
  js: { displayName: 'js', description: 'JavaScript Source'},
  gcode: {displayName: 'gcode', description: 'G Programming Language File Format'},
  json: {displayName: 'json', description: 'JavaScript Object Notation Format'}
}
