/**
 * convert color from rgba object to the array of bytes
 * @param   {object} color `{r: r, g: g, b: b, a: a}`
 * @returns {Array}  `[r, g, b, a]`
 */
function colorBytes (colorRGBA) {
  var result = [colorRGBA.r, colorRGBA.g, colorRGBA.b];
  if (colorRGBA.a !== undefined) result.push (colorRGBA.a);
  return result;
}

function colorRGBA (colorBytes) {
  var result = {r: colorBytes[0], g: colorBytes[1], b: colorBytes[2]};
  if (colorBytes[3] !== undefined) result.a = colorBytes[3];
  return result;
}

function cssFnSingleColor (str) {
  if (str[str.length-1] === '%') {
    return parseInt(str, 10)/100;
  } else {
    return parseInt(str, 10)/255;
  }
}

function parseColor (color) {
  // hsl, hsv, rgba, and #xxyyzz is supported
  var rx = {
    'html3': /^#([a-f0-9]{3})$/i,
    'html6': /^#([a-f0-9]{6})$/i,
    'fn': /^(rgb|hsl|hsv)a?\s*\(([^\)]+)\)$/i,
  }
  var rgba;
  var match;
  if (match = color.match (rx.html6)) {
    rgba = [parseInt (match[1], 16), parseInt (match[2], 16), parseInt (match[3], 16), 1];
  } else if (match = color.match (rx.html3)) {
    rgba = [parseInt (match[1]+match[1], 16), parseInt (match[2]+match[2], 16), parseInt (match[3]+match[3], 16), 1];
  } else if (match = color.match (rx.fn)) {
    if (match[1] === 'rgb' || match[1] === 'rgba') {
      // 0-255 or percentage allowed
      var digits = match[2].split(/\s*,\s*/);
      rgba = [cssFnSingleColor(digits[0]), cssFnSingleColor(digits[1]), cssFnSingleColor(digits[2]), parseFloat(digits[3])]
    }
    // rgba = [match[1], match[2], match[3], match[4]];
    // console.log (rgba);
  }

  // console.log (match);

  return rgba;
}

/**
 * Merge deep two objects, simplified version for config
 * @param   {object} dst destionation object
 * @param   {object} src source object
 * @returns {object} modified destination object
 */
function deepMerge (dst, patch) {
  for (var key in patch) {
    // special check for color strings, we'll parse those strings and put into rgba object
    if (
      patch[key] !== undefined && patch[key].constructor && patch[key].constructor === String
      && dst[key] !== undefined && dst[key].constructor && dst[key].constructor === Object
      && 'r' in dst[key] && 'g' in dst[key] && 'b' in dst[key]
    ) {
      dst[key] = colorRGBA(parseColor(patch[key]));
    } else if (patch[key] !== undefined && patch[key].constructor && patch[key].constructor === Object) {
      dst[key] = dst[key] || {};
      arguments.callee(dst[key], patch[key]);
    } else {
      dst[key] = patch[key];
    }
  }
  return dst;
}

/**
 * Convert legacy options `drawLines`, `drawFaces`, `color` and `bgColor`
 * @param {object} options modern options object
 * @param {object} custom  legacy options object
 */
function applyLegacyOptions (options, custom) {
  if ('drawLines' in custom) {
    options.solid.lines = custom.drawLines;
  }
  if ('drawFaces' in custom) {
    options.solid.faces = custom.drawFaces;
  }
  if ('color' in custom) {
    options.solid.faceColor = {
      r: custom.color[0],
      g: custom.color[1],
      b: custom.color[2],
      a: custom.color[3] || 1,
    };
  }
  if ('bgColor' in custom) {
    options.background.color = {
      r: custom.bgColor[0],
      g: custom.bgColor[1],
      b: custom.bgColor[2],
      a: custom.bgColor[3] || 1,
    };
  }
}

/**
 * A viewer is a WebGL canvas that lets the user view a mesh.
 * The user can tumble it around by dragging the mouse.
 * @param {DOMElement} containerelement container element
 * @param {object}     customization    options for renderer
 */
OpenJsCad.Viewer = function(containerelement, customization) {

  // see the various methods below on how to change these
  var options = OpenJsCad.Viewer.defaults();

  deepMerge (options, customization || {});

  applyLegacyOptions (options, customization || {});

  this.options = options;

  var engine;

  // select drawing engine from options
  if (options.engine && OpenJsCad.Viewer[options.engine]) {
    engine = OpenJsCad.Viewer[options.engine];
  }

  // get one of two exising
  if (!engine) {
    engine = OpenJsCad.Viewer.LightGLEngine || OpenJsCad.Viewer.ThreeEngine
  }

  if (!engine) {
    throw new Error ('Cannot find drawing engine, please define one via "engine" option');
  }

  // mixin methods
  for (var method in OpenJsCad.Viewer.prototype) {
    if (!(method in engine.prototype)) {
      engine.prototype[method] = OpenJsCad.Viewer.prototype[method];
    }
  }

  var e = new engine (containerelement, options);
  e.init();
  return e;
};

/**
 * return defaults which can be customized later
 * @returns {object} [[Description]]
 */
OpenJsCad.Viewer.defaults = function () {
  return {
    camera: {
      fov: 45,                           // field of view
      angle:    {x: -60,y:  0,z:  -45},  // view angle about XYZ axis
      position: {x:   0,y:  0,z:  100},  // initial position at XYZ
      clip:     {min: 0.5,  max: 1000},  // rendering outside this range is clipped
    },
    plate: {
      draw: true,                // draw or not
      size: 200,                 // plate size (X and Y)
      // minor grid settings
      m: {
        i:  1, // number of units between minor grid lines
        color: {r: .8, g: .8, b: .8, a: .5}, // color
      },
      // major grid settings
      M: {
        i: 10, // number of units between major grid lines
        color: {r: .5, g: .5, b: .5, a: .5}, // color
      },
    },
    axis: {
      draw: false,                // draw or not
      x: {
        neg: {r: 1., g: .5, b: .5, a: .5}, // color in negative direction
        pos: {r: 1., g:  0, b:  0, a: .8}, // color in positive direction
      },
      y: {
        neg: {r: .5, g: 1., b: .5, a: .5}, // color in negative direction
        pos: {r:  0, g: 1., b:  0, a: .8}, // color in positive direction
      },
      z: {
        neg: {r: .5, g: .5, b: 1., a: .5}, // color in negative direction
        pos: {r:  0, g:  0, b: 1., a: .8}, // color in positive direction
      },
    },
    solid: {
      draw:    true,              // draw or not
      lines:   false,             // draw outlines or not
      faces:   true,
      overlay: false,             // use overlay when drawing lines or not
      smooth:  false,             // use smoothing or not
      faceColor:    {r: 1., g: .4, b: 1., a: 1.},        // default face color
      outlineColor: {r: .0, g: .0, b: .0, a: .1},        // default outline color
    },
    background: {
      color: {r: .93, g: .93, b: .93, a: 1.}
    }
  };
};

OpenJsCad.Viewer.prototype = {
  parseSizeParams: function() {
    // essentially, allow all relative + px. Not cm and such.
    var winResizeUnits = ['%', 'vh', 'vw', 'vmax', 'vmin'];
    var width, height;
    var containerStyle = this.containerEl.style;
    var wUnit = containerStyle.width.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
    var hUnit = typeof containerStyle.height == 'string'
      ? containerStyle.height.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
      : '';
    // whether unit scales on win resize
    var isDynUnit
      = containerStyle.width.match(/^calc\(/)
      || containerStyle.height.match(/^calc\(/)
      || winResizeUnits.indexOf(wUnit) != -1
      || winResizeUnits.indexOf(hUnit) != -1;
    // e.g if units are %, need to keep resizing canvas with dom
    if (isDynUnit) {
      window.addEventListener('resize', this.handleResize.bind(this))
    }
  },
  resizeCanvas: function () {

    var canvas = this.canvas;

    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width  = this.containerEl.clientWidth  * devicePixelRatio;
    canvas.height = this.containerEl.clientHeight * devicePixelRatio;

  },
  setCsg: function(csg) {
    if(0&&csg.length) {                            // preparing multiple CSG's (not union-ed), not yet working
      for(var i=0; i<csg.length; i++)
        this.meshes.concat(this.csgToMeshes(csg[i]));
    } else {
      this.meshes = this.csgToMeshes(csg);
    }
    this.state = 2; // showing, object
    this.onDraw();
  },

  clear: function() {
    // empty mesh list:
    this.meshes = [];
    this.state = 1; // cleared, no object
    this.onDraw();
  },

  resetCamera: function() {
    // reset perpective (camera) to initial settings
    this.angleX = this.options.camera.angle.x;
    this.angleY = this.options.camera.angle.y;
    this.angleZ = this.options.camera.angle.z;
    this.viewpointX = this.options.camera.position.x;
    this.viewpointY = this.options.camera.position.y;
    this.viewpointZ = this.options.camera.position.z;
    this.onDraw();
  },

  supported: function() {
    return !!this.gl;
  },

  setCameraOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.options.camera) {
      if (x in options) { this.options.camera[x] = options[x]; }
    }
  },

  setPlateOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.options.plate) {
      if (x in options) { this.options.plate[x] = options[x]; }
    }
  },

  setAxisOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.options.axis) {
      if (x in options) this.options.axis[x] = options[x];
    }
  },

  setSolidOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.options.solid) {
      if (x in options) this.options.solid[x] = options[x];
    }
  }
};
