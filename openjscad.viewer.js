function parseColor (color) {
  // hsl, hsv, rgba, and #xxyyzz is supported
  var rx = {
    'html': /^#(?:([a-f0-9]{3})|([a-f0-9]{6}))$/i,
    'fn': /^(rgb|hsl|hsv)a?\s*\(([^\)]+)\)$/i,
  };
  var rgba;
  var match;
  if (match = color.match (rx.html)) {
    rgba = [parseInt (match[1], 16), parseInt (match[2], 16), parseInt (match[3], 16), 1];
  } else if (match = color.match (rx.fn)) {
    rgba = [match[1], match[2], match[3], match[4]];
  }

  console.log (match);

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
      && dst[key] !== undefined && patch[key].constructor && patch[key].constructor === Object
      && 'r' in dst[key] && 'g' in dst[key] && 'b' in dst[key]
    ) {

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
 * @param {object}     size             viewer size
 * @param {object}     options          options for renderer
 */
OpenJsCad.Viewer = function(containerelement, size, customization) {
  // see the various methods below on how to change these
  var options = OpenJsCad.Viewer.defaults();

  deepMerge (options, customization || {});

  applyLegacyOptions (options, customization || {});

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

  var e = new engine (containerelement, size, options);
  e.init();
  return e;

}

OpenJsCad.Viewer.prototype = {
  parseSizeParams: function() {
    // essentially, allow all relative + px. Not cm and such.
    var winResizeUnits = ['%', 'vh', 'vw', 'vmax', 'vmin'];
    var width, height;
    if (!this.size.width) {
      this.size.width = this.size.widthDefault;
    }
    if (!this.size.height) {
      this.size.height = this.size.heightDefault;
    }
    var wUnit = this.size.width.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
    var hUnit = typeof this.size.height == 'string' ?
        this.size.height.match(/^(\d+(?:\.\d+)?)(.*)$/)[2] :
    '';
    // whether unit scales on win resize
    var isDynUnit = winResizeUnits.indexOf(wUnit) != -1 ||
        winResizeUnits.indexOf(hUnit) != -1;
    // e.g if units are %, need to keep resizing canvas with dom
    if (isDynUnit) {
      window.addEventListener('resize', this.handleResize.bind(this))
    }
  },
  resizeCanvas: function (canvas) {
    var hIsRatio = typeof this.size.height != 'string';

    // apply css, then check px size. This is in case css is not in px
    canvas.style.width = this.size.width;
    if (!hIsRatio) {
      canvas.style.height = this.size.height;
    }

    var widthInPx = canvas.clientWidth;
    var heightInPx = hIsRatio
    ? widthInPx * this.size.height
    : canvas.clientHeight;  // size.height.match(/^(\d+(?:\.\d+)?)(.*)$/)[1];

    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = widthInPx * devicePixelRatio;
    canvas.height = heightInPx * devicePixelRatio;
  },

  setCameraOptions: function(options) {
    options = options || {};
    // apply all options found
    for (var x in this.options.camera) {
      if (x in options) this.options.camera[x] = options[x];
    }

    this.render();
  },

  setGridOptions: function(options) {
    options = options || {};
    // apply all options found
    for (var x in this.options.grid) {
      if (x in options) this.options.grid[x] = options[x];
    }

    this.render();
  },

  setAxesOptions: function(options) {
    options = options || {};
    // apply all options found
    for (var x in this.options.axes) {
      if (x in options) this.options.axes[x] = options[x];
    }

    this.render();
  },

  setSolidOptions: function(options) {
    options = options || {};
    // apply all options found
    for (var x in this.options.solid) {
      if (x in options) this.options.solid[x] = options[x];
    }

    this.render();
  },
};

/**
 * return defaults which can be mutated later
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
    grid: {
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
    axes: {
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
      faceColor:   {r: 1., g: .4, b: 1., a: 1.},        // default face color
      lineColor:   {r: .2, g: .2, b: .2, a: .9},        // default line color
    },
    background: {
      color: {r: .93, g: .93, b: .93, a: 1.}
    }
  };
};
