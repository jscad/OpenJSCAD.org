/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev

All code released under MIT license

Notes:
1) All functions extend other objects in order to maintain namespaces.
*/
import { CSG, CAG } from '@jscad/csg'
var sax = require('sax')

////////////////////////////////////////////
//
// SVG is a language for describing two-dimensional graphics in XML
// See http://www.w3.org/TR/SVG/Overview.html
//
////////////////////////////////////////////

// standard pixel size at arms length on 90dpi screens
sax.SAXParser.prototype.cssPxUnit = 0.2822222;

// units for converting CSS2 points/length, i.e. CSS2 value / pxPmm
sax.SAXParser.prototype.pxPmm = 1 / 0.2822222;         // used for scaling SVG coordinates(PX) to CAG coordinates(MM)
sax.SAXParser.prototype.inchMM = 1 / (1/0.039370);     // used for scaling SVG coordinates(IN) to CAG coordinates(MM)
sax.SAXParser.prototype.ptMM = 1 / (1/0.039370/72);    // used for scaling SVG coordinates(IN) to CAG coordinates(MM)
sax.SAXParser.prototype.pcMM = 1 / (1/0.039370/72*12); // used for scaling SVG coordinates(PC) to CAG coordinates(MM)

// standard SVG named colors (sRGB values)
sax.SAXParser.prototype.svgColors = {
      'aliceblue':            [240, 248, 255],
      'antiquewhite':         [250, 235, 215],
      'aqua':                 [  0, 255, 255],
      'aquamarine':           [127, 255, 212],
      'azure':                [240, 255, 255],
      'beige':                [245, 245, 220],
      'bisque':               [255, 228, 196],
      'black':                [  0,   0,  0],
      'blanchedalmond':       [255, 235, 205],
      'blue':                 [  0,   0, 255],
      'blueviolet':           [138,  43, 226],
      'brown':                [165,  42,  42],
      'burlywood':            [222, 184, 135],
      'cadetblue':            [ 95, 158, 160],
      'chartreuse':           [127, 255,   0],
      'chocolate':            [210, 105,  30],
      'coral':                [255, 127,  80],
      'cornflowerblue':       [100, 149, 237],
      'cornsilk':             [255, 248, 220],
      'crimson':              [220,  20,  60],
      'cyan':                 [  0, 255, 255],
      'darkblue':             [  0,   0, 139],
      'darkcyan':             [  0, 139, 139],
      'darkgoldenrod':        [184, 134,  11],
      'darkgray':             [169, 169, 169],
      'darkgreen':            [  0, 100,   0],
      'darkgrey':             [169, 169, 169],
      'darkkhaki':            [189, 183, 107],
      'darkmagenta':          [139,   0, 139],
      'darkolivegreen':       [ 85, 107,  47],
      'darkorange':           [255, 140,   0],
      'darkorchid':           [153,  50, 204],
      'darkred':              [139,   0,   0],
      'darksalmon':           [233, 150, 122],
      'darkseagreen':         [143, 188, 143],
      'darkslateblue':        [ 72,  61, 139],
      'darkslategray':        [ 47,  79,  79],
      'darkslategrey':        [ 47,  79,  79],
      'darkturquoise':        [  0, 206, 209],
      'darkviolet':           [148,   0, 211],
      'deeppink':             [255,  20, 147],
      'deepskyblue':          [  0, 191, 255],
      'dimgray':              [105, 105, 105],
      'dimgrey':              [105, 105, 105],
      'dodgerblue':           [ 30, 144, 255],
      'firebrick':            [178,  34,  34],
      'floralwhite':          [255, 250, 240],
      'forestgreen':          [ 34, 139,  34],
      'fuchsia':              [255,   0, 255],
      'gainsboro':            [220, 220, 220],
      'ghostwhite':           [248, 248, 255],
      'gold':                 [255, 215,   0],
      'goldenrod':            [218, 165,  32],
      'gray':                 [128, 128, 128],
      'grey':                 [128, 128, 128],
      'green':                [  0, 128,   0],
      'greenyellow':          [173, 255,  47],
      'honeydew':             [240, 255, 240],
      'hotpink':              [255, 105, 180],
      'indianred':            [205,  92,  92],
      'indigo':               [ 75,   0, 130],
      'ivory':                [255, 255, 240],
      'khaki':                [240, 230, 140],
      'lavender':             [230, 230, 250],
      'lavenderblush':        [255, 240, 245],
      'lawngreen':            [124, 252,   0],
      'lemonchiffon':         [255, 250, 205],
      'lightblue':            [173, 216, 230],
      'lightcoral':           [240, 128, 128],
      'lightcyan':            [224, 255, 255],
      'lightgoldenrodyellow': [250, 250, 210],
      'lightgray':            [211, 211, 211],
      'lightgreen':           [144, 238, 144],
      'lightgrey':            [211, 211, 211],
      'lightpink':            [255, 182, 193],
      'lightsalmon':          [255, 160, 122],
      'lightseagreen':        [ 32, 178, 170],
      'lightskyblue':         [135, 206, 250],
      'lightslategray':       [119, 136, 153],
      'lightslategrey':       [119, 136, 153],
      'lightsteelblue':       [176, 196, 222],
      'lightyellow':          [255, 255, 224],
      'lime':                 [  0, 255,   0],
      'limegreen':            [ 50, 205,  50],
      'linen':                [250, 240, 230],
      'magenta':              [255,   0, 255],
      'maroon':               [128,   0,   0],
      'mediumaquamarine':     [102, 205, 170],
      'mediumblue':           [  0,   0, 205],
      'mediumorchid':         [186,  85, 211],
      'mediumpurple':         [147, 112, 219],
      'mediumseagreen':       [ 60, 179, 113],
      'mediumslateblue':      [123, 104, 238],
      'mediumspringgreen':    [  0, 250, 154],
      'mediumturquoise':      [ 72, 209, 204],
      'mediumvioletred':      [199,  21, 133],
      'midnightblue':         [ 25,  25, 112],
      'mintcream':            [245, 255, 250],
      'mistyrose':            [255, 228, 225],
      'moccasin':             [255, 228, 181],
      'navajowhite':          [255, 222, 173],
      'navy':                 [  0,   0, 128],
      'oldlace':              [253, 245, 230],
      'olive':                [128, 128,   0],
      'olivedrab':            [107, 142,  35],
      'orange':               [255, 165,   0],
      'orangered':            [255,  69,   0],
      'orchid':               [218, 112, 214],
      'palegoldenrod':        [238, 232, 170],
      'palegreen':            [152, 251, 152],
      'paleturquoise':        [175, 238, 238],
      'palevioletred':        [219, 112, 147],
      'papayawhip':           [255, 239, 213],
      'peachpuff':            [255, 218, 185],
      'peru':                 [205, 133,  63],
      'pink':                 [255, 192, 203],
      'plum':                 [221, 160, 221],
      'powderblue':           [176, 224, 230],
      'purple':               [128,   0, 128],
      'red':                  [255,   0,   0],
      'rosybrown':            [188, 143, 143],
      'royalblue':            [ 65, 105, 225],
      'saddlebrown':          [139,  69,  19],
      'salmon':               [250, 128, 114],
      'sandybrown':           [244, 164,  96],
      'seagreen':             [ 46, 139,  87],
      'seashell':             [255, 245, 238],
      'sienna':               [160,  82,  45],
      'silver':               [192, 192, 192],
      'skyblue':              [135, 206, 235],
      'slateblue':            [106,  90, 205],
      'slategray':            [112, 128, 144],
      'slategrey':            [112, 128, 144],
      'snow':                 [255, 250, 250],
      'springgreen':          [  0, 255, 127],
      'steelblue':            [ 70, 130, 180],
      'tan':                  [210, 180, 140],
      'teal':                 [  0, 128, 128],
      'thistle':              [216, 191, 216],
      'tomato':               [255,  99,  71],
      'turquoise':            [ 64, 224, 208],
      'violet':               [238, 130, 238],
      'wheat':                [245, 222, 179],
      'white':                [255, 255, 255],
      'whitesmoke':           [245, 245, 245],
      'yellow':               [255, 255,   0],
      'yellowgreen':          [154, 205,  50],
    };


// Calculate the CAG length/size from the given SVG value (float)
sax.SAXParser.prototype.svg2cagX = function(v) {
  return  (v / this.svgUnitsPmm[0]);
}

sax.SAXParser.prototype.svg2cagY = function(v) {
  return  0-(v / this.svgUnitsPmm[1]);
}

// Calculate the CAG length/size from the given CSS value (string)
sax.SAXParser.prototype.cagLengthX = function(css) {
  if (css.indexOf('%') < 0) {
    return this.css2cag(css,this.svgUnitsPmm[0]);
  }
// calculate the units as a percentage of the width
  var v = parseFloat(css); // number part
  if (isNaN(v)) { return 0.0; }
  if (v == 0) return v;
  v = (v / 100) * this.svgUnitsX;
// convert the units to mm
  v = v / this.svgUnitsPmm[0];
  //return v;
  return Math.round(v/-100000)*-100000;
}

sax.SAXParser.prototype.cagLengthY = function(css) {
  if (css.indexOf('%') < 0) {
    return this.css2cag(css,this.svgUnitsPmm[1]);
  }
// calculate the units as a percentage of the width
  var v = parseFloat(css); // number part
  if (isNaN(v)) { return 0.0; }
  if (v == 0) return v;
  v = (v / 100) * this.svgUnitsY;
// convert the units to mm
  v = v / this.svgUnitsPmm[1];
  //return v;
  return Math.round(v/-100000)*-100000;
}

sax.SAXParser.prototype.cagLengthP = function(css) {
  if (css.indexOf('%') < 0) {
    return this.css2cag(css,this.svgUnitsPmm[1]);
  }
// calculate the units as a percentage of the viewport
  var v = parseFloat(css); // number part
  if (isNaN(v)) { return 0.0; }
  if (v == 0) return v;
  v = (v / 100) * this.svgUnitsV;
// convert the units to mm
  v = v / this.svgUnitsPmm[0]; // FIXME should this use X units?
  return v;
}

sax.SAXParser.prototype.css2cag = function(css,unit) {
//console.log('css2cag('+css+','+unit+')');
  var v = parseFloat(css); // number part
  if (isNaN(v)) { return 0.0; }
  if (v == 0) return v;
  if (css.search(/EM/i) > 0) {
    v = v; // font size
  } else
  if (css.search(/EX/i) > 0) {
    v = v; // x-height of font
  } else
  if (css.search(/MM/i) > 0) {
    v = v; // absolute millimeters
  } else
  if (css.search(/CM/i) > 0) {
    v =  (v * 10); // absolute centimeters > millimeters
  } else
  if (css.search(/IN/i) > 0) {
    v = (v / this.inchMM); // absolute inches > millimeters
  } else
  if (css.search(/PT/i) > 0) {
    v = (v / this.ptMM);   // absolute points > millimeters
  } else
  if (css.search(/PC/i) > 0) {
    v = (v / this.pcMM);   // absolute picas > millimeters
  } else {
    v = (v / unit);        // absolute pixels(units) > millimeters
  }
//console.log('v ('+v+')');
  return v;
}

// convert the SVG color specification to CAG RGB
sax.SAXParser.prototype.cagColor = function(value) {
//  var rgb = [0,0,0]; // default is black
  var rgb = null;
  value = value.toLowerCase();
  if (value in this.svgColors) {
    rgb = this.svgColors[value];
    rgb = [rgb[0]/255,rgb[1]/255,rgb[2]/255]; // converted to 0.0-1.0 values
  } else {
    if (value[0] == '#') {
      if (value.length == 4) {
      // short HEX specification
        value = '#'+value[1]+value[1]+value[2]+value[2]+value[3]+value[3];
      }
      if (value.length == 7) {
      // HEX specification
        rgb = [ parseInt('0x'+value.slice(1,3))/255,
                parseInt('0x'+value.slice(3,5))/255,
                parseInt('0x'+value.slice(5,7))/255 ];
      }
    } else {
      var pat = /rgb\(.+,.+,.+\)/;
      var s = pat.exec(value);
      if (s !== null) {
      // RGB specification
        s = s[0];
        s = s.slice(s.indexOf('(')+1,s.indexOf(')'));
        rgb = s.split(',');
        if (s.indexOf('%') > 0) {
        // rgb(#%,#%,#%)
          rgb = [parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])];
          rgb = [rgb[0]/100,rgb[1]/100,rgb[2]/100]; // converted to 0.0-1.0 values
        } else {
        // rgb(#,#,#)
          rgb = [parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])];
          rgb = [rgb[0]/255,rgb[1]/255,rgb[2]/255]; // converted to 0.0-1.0 values
        }
      }
    }
  }
  return rgb;
}

sax.SAXParser.prototype.cssStyle = function(element,name) {
  if ('STYLE' in element) {
    var list = element.STYLE;
    var pat = name+'\\s*:\\s*\\S+;';
    var exp = new RegExp(pat,'i');
    var v = exp.exec(list);
    if (v !== null) {
      v = v[0];
      var i = v.length;
      while (v[i] != ' ') i--;
      v = v.slice(i+1,v.length-1);
      return v;
    }
  }
  return null;
}

sax.SAXParser.prototype.svgCore = function(obj,element) {
  if ('ID' in element) { obj.id = element.ID; }
}

sax.SAXParser.prototype.svgPresentation = function(obj,element) {
// presentation attributes for all
  if ('DISPLAY' in element) { obj.visible = element.DISPLAY; }
// presentation attributes for solids
  if ('COLOR' in element) { obj.fill = this.cagColor(element.COLOR); }
  if ('OPACITY' in element) { obj.opacity = element.OPACITY; }
  if ('FILL' in element) {
    obj.fill = this.cagColor(element.FILL);
  } else {
    var s = this.cssStyle(element,'fill');
    if (s !== null) {
      obj.fill = this.cagColor(s);
    }
  }
  if ('FILL-OPACITY' in element) { obj.opacity = element['FILL-OPACITY']; }
// presentation attributes for lines
  if ('STROKE-WIDTH' in element) {
    obj.strokeWidth = element['STROKE-WIDTH'];
  } else {
    var sw = this.cssStyle(element,'stroke-width');
    if (sw !== null) {
      obj.strokeWidth = sw;
    }
  }
  if ('STROKE' in element) {
    obj.stroke = this.cagColor(element.STROKE);
  } else {
    var s = this.cssStyle(element,'stroke');
    if (s !== null) {
      obj.stroke = this.cagColor(s);
    }
  }
  if ('STROKE-OPACITY' in element) { obj.strokeOpacity = element['STROKE-OPACITY']; }
}

sax.SAXParser.prototype.svgTransforms = function(cag,element) {
  var list = null;
  if ('TRANSFORM' in element) {
    list = element.TRANSFORM;
  } else {
    var s = this.cssStyle(element,'transform');
    if (s !== null) { list = s; }
  }
  if (list !== null) {
    cag.transforms = [];
    var exp = new RegExp('\\w+\\(.+\\)','i');
    var v = exp.exec(list);
    while (v !== null) {
      var s = exp.lastIndex;
      var e = list.indexOf(')')+1;
      var t = list.slice(s,e); // the transform
      t = t.trim();
    // add the transform to the CAG
    // which are applied in the order provided
      var n = t.slice(0,t.indexOf('('));
      var a = t.slice(t.indexOf('(')+1,t.indexOf(')')).trim();
      if (a.indexOf(',') > 0) { a = a.split(','); } else { a = a.split(' '); }
      switch (n) {
        case 'translate':
          var o = {translate: [a[0], a[1]]};
          cag.transforms.push(o);
          break;
        case 'scale':
          if (a.length == 1) a.push(a[0]); // as per SVG
          var o = {scale: [a[0], a[1]]};
          cag.transforms.push(o);
          break;
        case 'rotate':
          var o = {rotate: a};
          cag.transforms.push(o);
          break;
        //case 'matrix':
        //case 'skewX':
        //case 'skewY':
        default:
          break;
      }
    // shorten the list and continue
      list = list.slice(e,list.length);
      v = exp.exec(list);
    }
  }
}

sax.SAXParser.prototype.svgSvg = function(element) {
// default SVG with no viewport
  var obj = {type: 'svg', x: 0, y: 0, width: '100%', height: '100%', strokeWidth: '1'};

// default units per mm
  obj.unitsPmm = [this.pxPmm,this.pxPmm];

  if ('PXPMM' in element) {
  // WOW! a supplied value for pixels per milimeter!!!
    obj.pxPmm = element.PXPMM;
    obj.unitsPmm = [obj.pxPmm,obj.pxPmm];
  }
  if ('WIDTH' in element)  { obj.width  = element.WIDTH; }
  if ('HEIGHT' in element) { obj.height = element.HEIGHT; }
  if ('VIEWBOX' in element) {
    var list = element.VIEWBOX.trim();
    var exp = new RegExp('([\\d\\.\\-]+)[\\s,]+([\\d\\.\\-]+)[\\s,]+([\\d\\.\\-]+)[\\s,]+([\\d\\.\\-]+)','i');
    var v = exp.exec(list);
    if (v !== null) {
      obj.viewX = parseFloat(v[1]);
      obj.viewY = parseFloat(v[2]);
      obj.viewW = parseFloat(v[3]);
      obj.viewH = parseFloat(v[4]);
    }
  // apply the viewbox
    if (obj.width.indexOf('%') < 0) {
    // calculate a scaling from width and viewW
      var s = this.css2cag(obj.width,this.pxPmm); // width in millimeters
      s = obj.viewW / s;
    // scale the default units
      //obj.unitsPmm[0] = obj.unitsPmm[0] * s;
      obj.unitsPmm[0] = s;
    } else {
    // scale the default units by the width (%)
      var u = obj.unitsPmm[0] * (parseFloat(obj.width) / 100.0);
      obj.unitsPmm[0] = u;
    }
    if (obj.height.indexOf('%') < 0) {
    // calculate a scaling from height and viewH
      var s = this.css2cag(obj.height,this.pxPmm) // height in millimeters
      s = obj.viewH / s;
    // scale the default units
      //obj.unitsPmm[1] = obj.unitsPmm[1] * s;
      obj.unitsPmm[1] = s;
    } else {
    // scale the default units by the width (%)
      var u = obj.unitsPmm[1] * (parseFloat(obj.height) / 100.0);
      obj.unitsPmm[1] = u;
    }
  } else {
    obj.viewX = 0;
    obj.viewY = 0;
    obj.viewW = 1920 / obj.unitsPmm[0]; // average screen size / pixels per unit
    obj.viewH = 1080 / obj.unitsPmm[1]; // average screen size / pixels per unit
  }
  obj.viewP = Math.sqrt((obj.viewW*obj.viewW) + (obj.viewH*obj.viewH))/Math.SQRT2;

// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);

  obj.objects = [];
  //console.log(JSON.stringify(obj));
  return obj;
}

sax.SAXParser.prototype.svgEllipse = function(element) {
  var obj = {type: 'ellipse', cx: '0', cy: '0', rx: '0', ry: '0'};
  if ('CX' in element) { obj.cx = element.CX; }
  if ('CY' in element) { obj.cy = element.CY; }
  if ('RX' in element) { obj.rx = element.RX; }
  if ('RY' in element) { obj.ry = element.RY; }
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);
  return obj;
}

sax.SAXParser.prototype.svgLine = function(element) {
  var obj = {type: 'line', x1: '0', y1: '0', x2: '0', y2: '0'};
  if ('X1' in element) { obj.x1 = element.X1; }
  if ('Y1' in element) { obj.y1 = element.Y1; }
  if ('X2' in element) { obj.x2 = element.X2; }
  if ('Y2' in element) { obj.y2 = element.Y2; }
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);
  return obj;
}

sax.SAXParser.prototype.svgListOfPoints = function(list) {
  var points = [];
  var exp = new RegExp('([\\d\\-\\+\\.]+)[\\s,]+([\\d\\-\\+\\.]+)[\\s,]*','i');
  list = list.trim();
  var v = exp.exec(list);
  while (v !== null) {
    var point = v[0];
    var next = exp.lastIndex+point.length;
    point = {x: v[1], y: v[2]};
    points.push(point);
    list = list.slice(next,list.length);
    v = exp.exec(list);
  }
  return points;
}

sax.SAXParser.prototype.svgPolyline = function(element) {
  var obj = {type: 'polyline'};
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);

  if ('POINTS' in element) {
    obj.points = this.svgListOfPoints(element.POINTS);
  }
  return obj;
}

sax.SAXParser.prototype.svgPolygon = function(element) {
  var obj = {type: 'polygon'};
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);

  if ('POINTS' in element) {
    obj.points = this.svgListOfPoints(element.POINTS);
  }
  return obj;
}

sax.SAXParser.prototype.svgRect = function(element) {
  var obj = {type:'rect', x: '0', y: '0', rx: '0', ry: '0', width: '0', height: '0'};

  if ('X' in element) { obj.x = element.X; }
  if ('Y' in element) { obj.y = element.Y; }
  if ('RX' in element) {
    obj.rx = element.RX;
    if (!('RY' in element)) { obj.ry = obj.rx } // by SVG specification
  }
  if ('RY' in element) {
    obj.ry = element.RY;
    if (!('RX' in element)) { obj.rx = obj.ry } // by SVG specification
  }
  if (obj.rx != obj.ry) {
    console.log('Warning: Unsupported RECT with RX and RY radius');
  }
  if ('WIDTH' in element) { obj.width = element.WIDTH; }
  if ('HEIGHT' in element) { obj.height = element.HEIGHT; }
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);
  return obj;
}

sax.SAXParser.prototype.svgCircle = function(element) {
  var obj = {type: 'circle', x: '0', y: '0', radius: '0'};

  if ('CX' in element) { obj.x = element.CX; }
  if ('CY' in element) { obj.y = element.CY; }
  if ('R'  in element) { obj.radius = element.R; }
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);
  return obj;
}

sax.SAXParser.prototype.svgGroup = function(element) {
  var obj = {type:'group'};
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);

  obj.objects = [];
  return obj;
}

//
// Convert the PATH element into object representation
//
sax.SAXParser.prototype.svgPath = function(element) {
  var obj = {type:'path'};
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  //this.svgPresentation(obj,element);

  obj.commands = [];
  if ('D' in element) {
    var co = null; // current command
    var bf = '';

    var i = 0;
    var l = element.D.length;
    while (i < l) {
      var c = element.D[i];
      switch (c) {
      // numbers
      // FIXME support E notation numbers
        case '-':
          if (bf.length > 0) {
            co.p.push(bf);
            bf = '';
          }
          bf += c;
          break;
        case '.':
          if (bf.length > 0) {
            if (bf.indexOf('.') >= 0) {
              co.p.push(bf);
              bf = '';
            }
          }
          bf += c;
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          bf += c;
          break;
      // commands
        case 'a':
        case 'A':
        case 'c':
        case 'C':
        case 'h':
        case 'H':
        case 'l':
        case 'L':
        case 'v':
        case 'V':
        case 'm':
        case 'M':
        case 'q':
        case 'Q':
        case 's':
        case 'S':
        case 't':
        case 'T':
        case 'z':
        case 'Z':
          if (co !== null) {
            if (bf.length > 0) {
              co.p.push(bf);
              bf = '';
            }
            obj.commands.push(co);
          }
          co = {c: c,p: []};
          break;
      // white space
        case ',':
        case ' ':
        case '\n':
          if (co !== null) {
            if (bf.length > 0) {
              co.p.push(bf);
              bf = '';
            }
          }
          break;
        default:
          break;
      }
      i++;
    }
    if (i == l && co !== null) {
      if (bf.length > 0) {
        co.p.push(bf);
      }
      obj.commands.push(co);
    }
  }
  return obj;
}

// generate GROUP with attributes from USE element
// - except X,Y,HEIGHT,WIDTH,XLINK:HREF
// - append translate(x,y) if X,Y available
// deep clone the referenced OBJECT and add to group
// - clone using JSON.parse(JSON.stringify(obj))
sax.SAXParser.prototype.svgUse = function(element) {
  var obj = {type:'group'};
// transforms
  this.svgTransforms(obj,element);
// core attributes
  this.svgCore(obj,element);
// presentation attributes
  this.svgPresentation(obj,element);

  if ('X' in element && 'Y' in element) {
    if (!('transforms' in obj)) obj.transforms = [];
    var o = {translate: [element.X, element.Y]};
    obj.transforms.push(o);
  }

  obj.objects = [];
  if ('XLINK:HREF' in element) {
  // lookup the named object
    var ref = element['XLINK:HREF'];
    if (ref[0] == '#') { ref = ref.slice(1,ref.length); }
    if (this.svgObjects[ref] !== undefined) {
      ref = this.svgObjects[ref];
      ref = JSON.parse(JSON.stringify(ref));
      obj.objects.push(ref);
    }
  }
  return obj;
}

// processing controls
sax.SAXParser.prototype.svgObjects  = [];    // named objects
sax.SAXParser.prototype.svgGroups   = [];    // groups of objects
sax.SAXParser.prototype.svgInDefs   = false; // svg DEFS element in process
sax.SAXParser.prototype.svgObj      = null;  // svg in object form
sax.SAXParser.prototype.svgUnitsPmm = [1,1];
sax.SAXParser.prototype.svgUnitsPer = 0;

sax.SAXParser.prototype.reflect = function(x,y,px,py) {
  var ox = x-px;
  var oy = y-py;
  if (x == px && y == px) return [x,y];
  if (x == px) return [x,py+(-oy)];
  if (y == py) return [px+(-ox),y];
  return [px+(-ox),py+(-oy)];
}

// Return the value for the given attribute from the group hiearchy
sax.SAXParser.prototype.groupValue = function(name) {
  var i = this.svgGroups.length;
  while (i > 0) {
    var g = this.svgGroups[i-1];
    if (name in g) {
      return g[name];
    }
    i--;
  }
  return null;
}

sax.SAXParser.prototype.codify = function(group) {
  var level = this.svgGroups.length;
// add this group to the heiarchy
  this.svgGroups.push(group);
// create an indent for the generated code
  var indent = '  ';
  var i = level;
  while (i > 0) {
    indent += '  ';
    i--;
  }
// pre-code
  var code = '';
  if (level == 0) {
    code += 'function main(params) {\n';
  }
  var ln = 'cag'+level;
  code += indent + 'var '+ln+' = new CAG();\n';
// generate code for all objects
  for (i = 0; i < group.objects.length; i++) {
    var obj = group.objects[i];
    var on  = ln+i;
    switch (obj.type) {
      case 'group':
        code += this.codify(obj);
        code += indent+'var '+on+' = cag'+(level+1)+';\n';
        break;
      case 'rect':
        var x  = this.cagLengthX(obj.x);
        var y  = (0-this.cagLengthY(obj.y));
        var w  = this.cagLengthX(obj.width);
        var h  = this.cagLengthY(obj.height);
        var rx = this.cagLengthX(obj.rx);
        var ry = this.cagLengthY(obj.ry);
        if (w > 0 && h > 0) {
          x = (x+(w/2)).toFixed(4);  // position the object via the center
          y = (y-(h/2)).toFixed(4);  // position the object via the center
          if (rx == 0) {
            code += indent+'var '+on+' = CAG.rectangle({center: ['+x+','+y+'], radius: ['+w/2+','+h/2+']});\n';
          } else {
            code += indent+'var '+on+' = CAG.roundedRectangle({center: ['+x+','+y+'], radius: ['+w/2+','+h/2+'], roundradius: '+rx+'});\n';
          }
        }
        break;
      case 'circle':
        var x = this.cagLengthX(obj.x);
        var y = (0-this.cagLengthY(obj.y));
        var r = this.cagLengthP(obj.radius);
        if (r > 0) {
          code += indent+'var '+on+' = CAG.circle({center: ['+x+','+y+'], radius: '+r+'});\n';
        }
        break;
      case 'ellipse':
        var rx = this.cagLengthX(obj.rx);
        var ry = this.cagLengthY(obj.ry);
        var cx = this.cagLengthX(obj.cx);
        var cy = (0-this.cagLengthY(obj.cy));
        if (rx > 0 && ry > 0) {
          code += indent+'var '+on+' = CAG.ellipse({center: ['+cx+','+cy+'], radius: ['+rx+','+ry+']});\n';
        }
        break;
      case 'line':
        var x1 = this.cagLengthX(obj.x1);
        var y1 = (0-this.cagLengthY(obj.y1));
        var x2 = this.cagLengthX(obj.x2);
        var y2 = (0-this.cagLengthY(obj.y2));
        var r = this.cssPxUnit; // default
        if ('strokeWidth' in obj) {
          r  = this.cagLengthP(obj.strokeWidth)/2;
        } else {
          var v = this.groupValue('strokeWidth');
          if (v !== null) {
            r  = this.cagLengthP(v)/2;
          }
        }
        code += indent+'var '+on+' = new CSG.Path2D([['+x1+','+y1+'],['+x2+','+y2+']],false);\n';
        code += indent+on+' = '+on+'.expandToCAG('+r+',CSG.defaultResolution2D);\n';
        break;
      case 'polygon':
        code += indent+'var '+on+' = new CSG.Path2D([\n';
        var j = 0;
        for (j = 0; j < obj.points.length; j++) {
          var p = obj.points[j];
          if ('x' in p && 'y' in p) {
            var x = this.cagLengthX(p.x);
            var y = (0-this.cagLengthY(p.y));
            code += indent+'  ['+x+','+y+'],\n';
          }
        }
        code += indent+'],true);\n';
        code += indent+on+' = '+on+'.innerToCAG();\n';
        break;
      case 'polyline':
        var r = this.cssPxUnit; // default
        if ('strokeWidth' in obj) {
          r  = this.cagLengthP(obj.strokeWidth)/2;
        } else {
          var v = this.groupValue('strokeWidth');
          if (v !== null) {
            r  = this.cagLengthP(v)/2;
          }
        }
        code += indent+'var '+on+' = new CSG.Path2D([\n';
        var j = 0;
        for (j = 0; j < obj.points.length; j++) {
          var p = obj.points[j];
          if ('x' in p && 'y' in p) {
            var x = this.cagLengthX(p.x);
            var y = (0-this.cagLengthY(p.y));
            code += indent+'  ['+x+','+y+'],\n';
          }
        }
        code += indent+'],false);\n';
        code += indent+on+' = '+on+'.expandToCAG('+r+',CSG.defaultResolution2D);\n';
        break;
      case 'path':
        code += indent+'var '+on+' = new CAG();\n';

        var r = this.cssPxUnit; // default
        if ('strokeWidth' in obj) {
          r  = this.cagLengthP(obj.strokeWidth)/2;
        } else {
          var v = this.groupValue('strokeWidth');
          if (v !== null) {
            r  = this.cagLengthP(v)/2;
          }
        }
      // Note: All values are SVG values
        var sx = 0;     // starting position
        var sy = 0;
        var cx = 0;     // current position
        var cy = 0;
        var pi = 0;     // current path index
        var pn = on+pi; // current path name
        var pc = false; // current path closed
        var bx = 0;     // 2nd control point from previous C command
        var by = 0;     // 2nd control point from previous C command
        var qx = 0;     // 2nd control point from previous Q command
        var qy = 0;     // 2nd control point from previous Q command
        var j = 0;
        for (j = 0; j < obj.commands.length; j++) {
          var co = obj.commands[j];
          var pts = co.p;
          //console.log('postion: ['+cx+','+cy+'] before '+co.c);
          switch (co.c) {
            case 'm': // relative move to X,Y
            // special case, if at beginning of path then treat like absolute M
              if (j == 0) {
                cx = 0; cy = 0;
              }
            // close the previous path
              if (pi > 0 && pc === false) {
                code += indent+pn+' = '+pn+'.expandToCAG('+r+',CSG.defaultResolution2D);\n';
              }
            // open a new path
              if (pts.length >= 2) {
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                pi++;
                pn = on+pi;
                pc = false;
                code += indent+'var '+pn+' = new CSG.Path2D([['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']],false);\n';
                sx = cx; sy = cy;
              }
              break;
              break;
            case 'M': // absolute move to X,Y
            // close the previous path
              if (pi > 0 && pc === false) {
                code += indent+pn+' = '+pn+'.expandToCAG('+r+',CSG.defaultResolution2D);\n';
              }
            // open a new path
              if (pts.length >= 2) {
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                pi++;
                pn = on+pi;
                pc = false;
                code += indent+'var '+pn+' = new CSG.Path2D([['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']],false);\n';
                sx = cx; sy = cy;
              }
              break;
            case 'a': // relative elliptical arc
              while (pts.length >= 7) {
                var rx = parseFloat(pts.shift());
                var ry = parseFloat(pts.shift());
                var ro = 0-parseFloat(pts.shift());
                var lf = (pts.shift() == '1');
                var sf = (pts.shift() == '1');
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendArc(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+'],{xradius: '+this.svg2cagX(rx)+',yradius: '+this.svg2cagY(ry)+',xaxisrotation: '+ro+',clockwise: '+sf+',large: '+lf+'});\n';
              }
              break;
            case 'A': // absolute elliptical arc
              while (pts.length >= 7) {
                var rx = parseFloat(pts.shift());
                var ry = parseFloat(pts.shift());
                var ro = 0-parseFloat(pts.shift());
                var lf = (pts.shift() == '1');
                var sf = (pts.shift() == '1');
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendArc(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+'],{xradius: '+this.svg2cagX(rx)+',yradius: '+this.svg2cagY(ry)+',xaxisrotation: '+ro+',clockwise: '+sf+',large: '+lf+'});\n';
              }
              break;
            case 'c': // relative cubic Bézier
              while (pts.length >= 6) {
                var x1 = cx+parseFloat(pts.shift());
                var y1 = cy+parseFloat(pts.shift());
                bx = cx+parseFloat(pts.shift());
                by = cy+parseFloat(pts.shift());
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(x1)+','+this.svg2cagY(y1)+'],['+this.svg2cagX(bx)+','+this.svg2cagY(by)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(bx,by,cx,cy);
                bx = rf[0];
                by = rf[1];
              }
              break;
            case 'C': // absolute cubic Bézier
              while (pts.length >= 6) {
                var x1 = parseFloat(pts.shift());
                var y1 = parseFloat(pts.shift());
                bx = parseFloat(pts.shift());
                by = parseFloat(pts.shift());
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(x1)+','+this.svg2cagY(y1)+'],['+this.svg2cagX(bx)+','+this.svg2cagY(by)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(bx,by,cx,cy);
                bx = rf[0];
                by = rf[1];
              }
              break;
            case 'q': // relative quadratic Bézier
              while (pts.length >= 4) {
                qx = cx+parseFloat(pts.shift());
                qy = cy+parseFloat(pts.shift());
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(qx,qy,cx,cy);
                qx = rf[0];
                qy = rf[1];
              }
              break;
            case 'Q': // absolute quadratic Bézier
              while (pts.length >= 4) {
                qx = parseFloat(pts.shift());
                qy = parseFloat(pts.shift());
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(qx,qy,cx,cy);
                qx = rf[0];
                qy = rf[1];
              }
              break;
            case 't': // relative quadratic Bézier shorthand
              while (pts.length >= 2) {
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+cx+','+cy+']]);\n';
                var rf = this.reflect(qx,qy,cx,cy);
                qx = rf[0];
                qy = rf[1];
              }
              break;
            case 'T': // absolute quadratic Bézier shorthand
              while (pts.length >= 2) {
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(qx)+','+this.svg2cagY(qy)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(qx,qy,cx,cy);
                qx = rf[0];
                qy = rf[1];
              }
              break;
            case 's': // relative cubic Bézier shorthand
              while (pts.length >= 4) {
                var x1 = bx; // reflection of 2nd control point from previous C
                var y1 = by; // reflection of 2nd control point from previous C
                bx = cx+parseFloat(pts.shift());
                by = cy+parseFloat(pts.shift());
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(x1)+','+this.svg2cagY(y1)+'],['+this.svg2cagX(bx)+','+this.svg2cagY(by)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(bx,by,cx,cy);
                bx = rf[0];
                by = rf[1];
              }
              break;
            case 'S': // absolute cubic Bézier shorthand
              while (pts.length >= 4) {
                var x1 = bx; // reflection of 2nd control point from previous C
                var y1 = by; // reflection of 2nd control point from previous C
                bx = parseFloat(pts.shift());
                by = parseFloat(pts.shift());
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendBezier([['+this.svg2cagX(x1)+','+this.svg2cagY(y1)+'],['+this.svg2cagX(bx)+','+this.svg2cagY(by)+'],['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']]);\n';
                var rf = this.reflect(bx,by,cx,cy);
                bx = rf[0];
                by = rf[1];
              }
              break;
            case 'h': // relative Horzontal line to
              while (pts.length >= 1) {
                cx = cx+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendPoint(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']);\n';
              }
              break;
            case 'H': // absolute Horzontal line to
              while (pts.length >= 1) {
                cx = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendPoint(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']);\n';
              }
              break;
            case 'l': // relative line to
              while (pts.length >= 2) {
                cx = cx+parseFloat(pts.shift());
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendPoint(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']);\n';
              }
              break;
            case 'L': // absolute line to
              while (pts.length >= 2) {
                cx = parseFloat(pts.shift());
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendPoint(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']);\n';
              }
              break;
            case 'v': // relative Vertical line to
              while (pts.length >= 1) {
                cy = cy+parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendPoint(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']);\n';
              }
              break;
            case 'V': // absolute Vertical line to
              while (pts.length >= 1) {
                cy = parseFloat(pts.shift());
                code += indent+pn+' = '+pn+'.appendPoint(['+this.svg2cagX(cx)+','+this.svg2cagY(cy)+']);\n';
              }
              break;
            case 'z': // close current line
            case 'Z':
              code += indent+pn+' = '+pn+'.close();\n';
              code += indent+pn+' = '+pn+'.innerToCAG();\n';
              code += indent+on+' = '+on+'.union('+pn+');\n';
              cx =  sx; cy = sy; // return to the starting point
              pc = true;
              break;
            default:
              console.log('Warning: Unknow PATH command ['+co.c+']');
              break;
          }
          //console.log('postion: ['+cx+','+cy+'] after '+co.c);
        }
        if (pi > 0) {
          if (pc === false) {
            code += indent+pn+' = '+pn+'.expandToCAG('+r+',CSG.defaultResolution2D);\n';
            code += indent+on+' = '+on+'.union('+pn+');\n';
          }
        }
        break;
      default:
        break;
    }
    if ('fill' in obj) {
    // FIXME when CAG supports color
    //  code += indent+on+' = '+on+'.setColor(['+obj.fill[0]+','+obj.fill[1]+','+obj.fill[2]+']);\n';
    }
    if ('transforms' in obj) {
    // NOTE: SVG specifications require that transforms are applied in the order given.
    //       But these are applied in the order as required by CSG/CAG
      var tr = null;
      var ts = null;
      var tt = null;

      var j = 0;
      for (j = 0; j < obj.transforms.length; j++) {
        var t = obj.transforms[j];
        if ('rotate' in t)    { tr = t; }
        if ('scale' in t)     { ts = t; }
        if ('translate' in t) { tt = t; }
      }
      if (ts !== null) {
        var x = ts.scale[0];
        var y = ts.scale[1];
        code += indent+on+' = '+on+'.scale(['+x+','+y+']);\n';
      }
      if (tr !== null) {
        var z = 0-tr.rotate;
        code += indent+on+' = '+on+'.rotateZ('+z+');\n';
      }
      if (tt !== null) {
        var x = this.cagLengthX(tt.translate[0]);
        var y = (0-this.cagLengthY(tt.translate[1]));
        code += indent+on+' = '+on+'.translate(['+x+','+y+']);\n';
      }
    }
    code += indent + ln +' = '+ln+'.union('+on+');\n';
  }
// post-code
  if (level == 0) {
    code += indent+'return '+ln+';\n';
    code += '}\n';
  }
// remove this group from the hiearchy
  this.svgGroups.pop();

  return code;
}

function createSvgParser (src, pxPmm) {
// create a parser for the XML
  var parser = sax.parser(false, {trim: true, lowercase: false, position: true});
  if (pxPmm !== undefined) {
    if (pxPmm > parser.pxPmm) parser.pxPmm = pxPmm;
  }
// extend the parser with functions
  parser.onerror = function (e) {
    console.log('error: line '+e.line+', column '+e.column+', bad character ['+e.c+']');
  };

  //parser.ontext = function (t) {
  //};

  parser.onopentag = function (node) {
    //console.log('opentag: '+node.name+' at line '+this.line+' position '+this.column);
    //for (x in node.attributes) {
    //  console.log('    '+x+'='+node.attributes[x]);
    //}
    var obj = null;
    switch (node.name) {
      case 'SVG':
        obj = this.svgSvg(node.attributes);
        break;
      case 'G':
        obj = this.svgGroup(node.attributes);
        break;
      case 'RECT':
        obj = this.svgRect(node.attributes);
        break;
      case 'CIRCLE':
        obj = this.svgCircle(node.attributes);
        break;
      case 'ELLIPSE':
        obj = this.svgEllipse(node.attributes);
        break;
      case 'LINE':
        obj = this.svgLine(node.attributes);
        break;
      case 'POLYLINE':
        obj = this.svgPolyline(node.attributes);
        break;
      case 'POLYGON':
        obj = this.svgPolygon(node.attributes);
        break;
      //case 'SYMBOL':
      // this is just like an embedded SVG but does NOT render directly, only named
      // this requires another set of control objects
      // only add to named objects for later USE
      //  break;
      case 'PATH':
        obj = this.svgPath(node.attributes);
        break;
      case 'USE':
        obj = this.svgUse(node.attributes);
        break;
      case 'DEFS':
        this.svgInDefs = true;
        break;
      case 'DESC':
      case 'TITLE':
      case 'STYLE':
      // ignored by design
        break;
      default:
        console.log('Warning: Unsupported SVG element: '+node.name);
        break;
    }

    if (obj !== null) {
    // add to named objects if necessary
      if ('id' in obj) {
        this.svgObjects[obj.id] = obj;
        //console.log('saved object ['+obj.id+','+obj.type+']');
      }
      if (obj.type == 'svg') {
      // initial SVG (group)
        this.svgGroups.push(obj);
        this.svgUnitsPmm = obj.unitsPmm;
        this.svgUnitsX = obj.viewW;
        this.svgUnitsY = obj.viewH;
        this.svgUnitsV = obj.viewP;
      } else {
      // add the object to the active group if necessary
        if (this.svgGroups.length > 0 && this.svgInDefs == false) {
          var group = this.svgGroups.pop();
          if ('objects' in group) {
            //console.log('push object ['+obj.type+']');
            //console.log(JSON.stringify(obj));
          // TBD apply presentation attributes from the group
            group.objects.push(obj);
          }
          this.svgGroups.push(group);
        }
        if (obj.type == 'group') {
        // add GROUPs to the stack
          this.svgGroups.push(obj);
        }
      }
    }
  };

  parser.onclosetag = function (node) {
    //console.log('closetag: '+node);
    var obj = null;
    switch (node) {
      case 'SVG':
        obj = this.svgGroups.pop();
        //console.log("groups: "+groups.length);
        break;
      case 'DEFS':
        this.svgInDefs = false;
        break;
      case 'USE':
        obj = this.svgGroups.pop();
        //console.log("groups: "+groups.length);
        break;
      case 'G':
        obj = this.svgGroups.pop();
        //console.log("groups: "+groups.length);
        break;
      default:
        break;
    }
  // check for completeness
    if (this.svgGroups.length === 0) {
      this.svgObj = obj;
    }
  };

  //parser.onattribute = function (attr) {
  //};

  parser.onend = function () {
  //  console.log('SVG parsing completed');
  };
// start the parser
  parser.write(src).close();

  return parser;
};

//
// Parse the given SVG source and return a JSCAD script
//
// fn (optional) original filename of SVG source
// options (optional) anonymous object with:
//   pxPmm: pixels per milimeter for calcuations
//
export function parseSVG (src, fn, options) {
  var fn = fn || 'svg'
  const defaults = {pxPmm: undefined, version: '0.0.0'}
  options = Object.assign({}, defaults, options)
  const {version} = options

// parse the SVG source
  var parser = createSvgParser(src, pxPmm)
// convert the internal objects to JSCAD code
  var code = '';
  code += '//\n';
  code += "// producer: OpenJSCAD.org "+version+" SVG Importer\n";
  code += "// date: "+(new Date())+"\n";
  code += "// source: "+fn+"\n";
  code += '//\n';
  if (parser.svgObj !== null) {
    //console.log(JSON.stringify(parser.svgObj));
    code += parser.codify(parser.svgObj);
  } else {
    console.log('Warning: SVG parsing failed');
  }
  return code;
};

//
// Parse the given SVG source and return a CAG object
//
// options (optional) anonymous object with:
//   pxPmm: pixels per milimeter for calcuations
//
function fromSVG(src, options) {
  var options = options || {};
  var pxPmm;
  if ('pxPmm' in options) { pxPmm = options.pxPmm; }
// parse the SVG source
  var parser = createSvgParser(src, pxPmm);
// convert the internal objects to CAG
  var cag = new CAG();
  if (parser.svgObj !== null) {
    console.log(JSON.stringify(parser.svgObj));
    // tbw cag = parser.objectfy(parser.svgObj);
  } else {
    console.log('Warning: SVG parsing failed');
  }
  return cag;
};
