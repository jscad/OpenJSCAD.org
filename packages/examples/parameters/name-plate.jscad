// title      : Name Plate
// author     : Rene K. Mueller
// license    : MIT License
// description: create your own name plate
// date       : 2013/04/24
// file       : name_plate.jscad

const getParameterDefinitions = () => {
  return [
    { name: 'name', initial: 'Joe Example', type: 'text', caption: 'Your name', size: 30 },
    { name: 'title', initial: '3D Printer Developer', type: 'text', caption: 'Your title', size: 30 },
    { name: 'thickness', initial: 3, type: 'float', caption: 'Thickness' }
  ]
}

const main = (params) => {
  var o = [] // our stack of objects
  var l = [] // our stack of line segments (when rendering vector text)
  var p = [] // our stack of extruded line segments

  // -- render name & extrude
  l = vectorText(0, 0, params.name)
  l.forEach(function (s) {
    p.push(extrudeRectangular(s, { w: params.thickness, h: params.thickness }))
  })
  o.push(union(p).setColor([1, 1, 0]).scale([1 / 3, 1 / 3, 1 / 3]).center([true, true, false]).translate([0, 0, params.thickness]))

  if (params.title.length) {
    // -- render title & extrude
    l = vectorText(0, 0, params.title)
    p = []
    l.forEach(function (s) {
      p.push(extrudeRectangular(s, { w: params.thickness, h: params.thickness }))
    })
    o.push(union(p).setColor([1, 1, 0]).scale([1 / 8, 1 / 8, 1 / 3]).center([true, true, false]).translate([0, -8, params.thickness]))
  }
  o = [union(o)] // neat: we combine name + title, and make it first entry of an array

  var b = o[0].getBounds()
  var m = 2
  var w = b[1].x - b[0].x + m * 2
  var h = b[1].y - b[0].y + m * 2
  o.push(cube({ size: [w, h, params.thickness], round: true, radius: 0.5 }).translate([b[0].x - m, b[0].y - m, 0]))

  return union(o)
}
