function newCanvas() {
  var wrapper = document.createElement("div");
  var content = document.createElement("div");
  var canvas = document.createElement("canvas");
  content.appendChild(canvas);
  wrapper.appendChild(content);
  document.querySelector("body").appendChild(wrapper);
  wrapper.id = "canvas-modal";
  wrapper.style.display = "none";
  content.className = "content";
  canvas.style.display = "block";
  canvas.width = 540;
  canvas.height = 430;
  var control = undefined;
  function done() {
    wrapper.style.display = "none";
    var img = document.getElementById("hexpreview")
    if (!img) { var img = document.createElement("img"); }
    img.width = "150";
    img.src = canvas.toDataURL();
    img.id = "hexpreview"
    control.appendChild(img);
    control.value = value;
  }
  var button = document.createElement("button");
  button.className = "save";
  button.innerHTML = "Save and close";
  button.onclick = done;
  content.appendChild(button);
  var margin = 60;
  var r = 40;
  var sx = 60;
  var sy = sx/3*4;
  var ctx = canvas.getContext("2d");
  var n_rows = 5,n_cols = 8, value = [];

  for (j=0;j<n_rows;j++) {
    row = [];
    for (i=0;i<n_cols;i++) {
      row.push(0);
    }
    value.push(row);
  }
  value[2][4] = 1;
  value[1][4] = -1;
  //value[2][3] = -1;
  //value[2][2] = 1;
  //value[3][3] = 1;

  function tick(e) {
    // draw grid
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (j=0;j<n_rows;j++) {
      for (i=0;i<n_cols;i++) {
        spin = ((i+j)%2==0)?1:-1;
        var x = sx*i+margin,y=sy*j+margin;
        if (e) {
          var dx = x-e.offsetX, dy = y-e.offsetY;
          if (Math.sqrt(dx*dx+dy*dy) < r*0.75) { value[j][i] = value[j][i]?0:spin; }
        }
        ctx.beginPath();
        _t = spin*Math.PI/2;
        if (spin == 1) { y -= sy/4; }
        ctx.moveTo(x+r*Math.cos(_t),y+r*Math.sin(_t));
        ctx.lineTo(x+r*Math.cos(Math.PI*2/3+_t),y+r*Math.sin(Math.PI*2/3+_t));
        ctx.lineTo(x+r*Math.cos(Math.PI*4/3+_t),y+r*Math.sin(Math.PI*4/3+_t));
        ctx.lineTo(x+r*Math.cos(_t),y+r*Math.sin(_t));
        ctx.fillStyle="#333";
        ctx.stroke();
        if (!!value[j][i]) { ctx.fill() };
      }
    }
  }
  tick();
  canvas.onclick = tick;
  function open() {
    wrapper.style.display = "block";
    tick();
  }
  function getControl() {
    control = document.createElement("div");
    control.id = "hexcontrol";
    var style=document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = "\
#canvas-modal { \
  background: white; \
  display: none; /* hide to start */ \
  left: 50%; \
  margin-left: -270px; \
  margin-top: -215px; \
  position: fixed; \
  top: 50%; \
  z-index: 10; \
}  \
#canvas-modal .content { \
  background: white; \
  position: relative; \
  z-index: 11; \
}  \
#canvas-modal canvas { \
  cursor: pointer;   \
} \
#canvas-modal .save { \
  position: absolute; \
  top: 100%; \
  right: 0; \
} \
#canvas-modal:before { \
  background: rgba(0,0,0,0.25); \
  content: \"\"; \
  display: block; \
  height: 100%; \
  left: 0; \
  position: fixed; \
  top: 0; \
  width: 100%; \
  z-index: 9; \
}";
    control.appendChild(style);
    control.onclick = open;
    done();
    return control;
  }
  return {
    open: open,
    value: value,
    getControl: getControl,
    getValue: function() { return this.value; }
  }
}

function getParameterDefinitions() {
  return [
    //{ name: 'hex_r', type: 'float', initial: 7, caption: "Hex Radius" },
    { name: 'hex_h', type: 'float', initial: 5, caption: "Hex Height" },
    //{ name: 'tri_ro', type: 'float', initial: 12, caption: "Triangle Outer Radius" },
    { name: 'tri_ri', type: 'float', initial: 3.5, caption: "Triangle Inner Radius" },
    { name: 'gap', type: 'float', initial: 0.6, caption: "Gap" },
    { name: 'bisect', type: 'choice', caption: 'Cut in half?', values: [0, 1], captions: ["No", "Yes (nullifies \"Pattern\")"], initial: 0 },
    { name: 'pattern', type: 'custom', constructor: newCanvas, caption: "Pattern"}
  ];
}

function torus2(p) {
  var ri = 1, ro = 4, fni = 16, fno = 32, rotx = 0, roty = 0, rotz = 0;
  if(p) {
    if(p.ri) ri = p.ri;
    if(p.fni) fni = p.fni;
    if(p.rotx) rotx = p.rotx;
    if(p.roty) roty = p.roty;
    if(p.rotz) rotz = p.rotz;
    if(p.ro) ro = p.ro;
    if(p.fno) fno = p.fno;
  }
  if(fni<3) fni = 3;
  if(fno<3) fno = 3;
  var c = circle({r:ri,fn:fni,center:true});
  if(rotx) c = c.rotateX(rotx);
  if(roty) c = c.rotateY(roty);
  if(rotz) c = c.rotateZ(rotz);
  return rotate_extrude({fn:fno},c.translate([ro,0,0]));
} 
function generate_hex(_d) {
  var hex = linear_extrude({height:_d.hex.h},circle(_d.hex)).rotateZ(30).center(true);
  var skew = 1.25;
  return hex.scale([1,skew,1])
}
function generate_link(_d) {
  var c = circle(_d.hex.h/2).center(true);
  var offset = _d.hex.r/2;
  var link = hull(c.translate([offset,0,0]),c.translate([-offset,0,0]));
  return linear_extrude({height:_d.hex.h},link).rotateX(90).center(true);
}
function get_unit_cell(_d) {
  var tri = torus2(_d.tri);
  var r_total = (_d.dy-_d.tri.ro)-_d.hex.r*cos(30)+0.2; //distance to move hexagon... the minor radius of triangle
  _d.otri = {fno:3,ri:_d.tri.ri+_d.gap,ro:_d.tri.ro,rotx:_d.tri.rotx};
  var otri = torus2(_d.otri);
  var osq = cube([_d.otri.ri,_d.hex.r*2,_d.otri.ri/2]).center(true).translate([-r_total/3*2,0,-_d.otri.ri/4]);
  var join = generate_hex(_d).translate([-r_total,0,0]);
  half_join = difference(
    join,
    cube(2*r_total).scale([1,2,1]).center(true).translate([-r_total*2,0,0]), // bisect hex
    otri, //round hole
    osq //square hole
  )
  var cylinder = linear_extrude({height:_d.hex.h/2},circle(_d.tri.ri/3).center(true))
    .translate([_d.tri.ro,0,-_d.hex.h/2]);
  tri_big = torus2({fno:3,ro:_d.hex.r*cos(30)+_d.tri.ro,ri:0.1}) // outer calibration triangle
  var unit_cell = union([
    //tri_big, //useful for trying to get the triangles lined up
    tri,
    half_join,
    half_join.rotateZ(120),
    half_join.rotateZ(-120),
    cylinder,
    cylinder.rotateZ(120),
    cylinder.rotateZ(-120),
  ])
  return unit_cell;
}
function main(p) {
  _d = {
    hex: {fn:6,rotx:45},
    tri: {fno:3,rotx:60,roty:15},
  }
  // These first two don't work well when you edit the pattern
  _d.hex.r = 7; //p.hex_r;
  _d.tri.ro = 12; //p.tri_ro;
  _d.hex.h = p.hex_h;
  _d.tri.ri = p.tri_ri;
  _d.gap = p.gap;
  _d.dx = sin(30)*(2*_d.tri.ro + _d.hex.r); //height of unit_cell
  _d.dy = cos(30)*(2*_d.tri.ro + _d.hex.r); //width of unit_cell
  var unit_cell = get_unit_cell(_d).translate([0,0,_d.hex.h/2]);
  if (p.bisect == 1) { return difference(unit_cell,cube(100).center(true).translate([0,50,0])) }
  var y_shift = _d.dy-(1+cos(30))*_d.tri.ro;
  var from_pattern = [];
  for (var ri=0; ri<p.pattern.length; ri++) {
    for (var ci=0; ci<p.pattern[ri].length; ci++) {
      if (p.pattern[ri][ci] == 0) { continue; }
      t = unit_cell;
      if (p.pattern[ri][ci] == -1) { t = t.rotateZ(60).translate([2*y_shift,0,0]); } // this translate is bs'd
      t = t.translate([(ri-3)*_d.dy,(ci-2)*_d.dx,0]);
      from_pattern.push(t);
    }
  }
  return union(from_pattern);
}
