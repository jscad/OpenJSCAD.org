// title      : Colors
// author     : Rene K. Mueller
// license    : MIT License
// description: testing hull() function
// tags       : RGB, RGBA
// file       : hull.jscad

function spread () {
  var a = Array.prototype.slice.call(arguments);
  var p = null;
  var type = 'linear';
  var spacing = 1;

  if (a[0].type) p = a.shift(); // first argument { type: 'something' }?
  if (a[0].length) a = a[0];
  if (p && p.type) type = p.type;
  if (p && p.spacing) spacing = p.spacing;

  if (type === 'circular') {
    ;
  } else {
    var rows = Math.floor(Math.sqrt(a.length));
    if (p && p.rows) rows = p.rows;
    if (rows < 1) rows = 1;
    for (i = 0; i < a.length; i++) {
      a[i] = a[i].translate([(i % rows) * spacing, Math.floor(i / rows) * spacing, 0]);
    }
  }
  return a;
}

function main () {
  var o = [];

  o.push(color([1, 0, 0], sphere()));
  o.push(color([0, 1, 0], cube()));
  o.push(color([0, 0, 1], cylinder()));

  o.push(color('red', sphere()));
  o.push(color('green', cube()));
  o.push(color('blue', cylinder()));

  for (var i = 0; i < 1; i += 1 / 12) {
    o.push(cube().setColor(hsl2rgb(i, 1, 0.5)));
  }
  return spread({type: 'linear', spacing: 3, rows: 3}, o);
}
