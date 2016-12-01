/**
 * convert color from rgba object to the array of bytes
 * @param   {object} color `{r: r, g: g, b: b, a: a}`
 * @returns {Array}  `[r, g, b, a]`
 */
function colorBytes (color) {
  var result = [color.r, color.g, color.b];
  if (color.a !== undefined) result.push (color.a);
  return result;
}

function parseColor (color) {
  // hsl, hsv, rgba, and #xxyyzz is supported
  var rx = {
    'html': /^#(?:([a-f0-9]{3})|([a-f0-9]{6}))$/i,
    'fn': /^(rgb|hsl|hsv)a?\s*\(([^\)]+)\)$/i,
  }
  var rgba;
  var match;
  if (match = color.match (rx.html)) {
    rgba = [parseInt (match[1], 16), parseInt (match[2], 16), parseInt (match[3], 16), 1];
  } else if (match = color.match (rx.fn)) {
    rgba = [match[1], match[2], match[3], match[4]];
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
    var isDynUnit = winResizeUnits.indexOf(wUnit) != -1
    || winResizeUnits.indexOf(hUnit) != -1;
    // e.g if units are %, need to keep resizing canvas with dom
    if (isDynUnit) {
      window.addEventListener('resize', this.handleResize.bind(this))
    }
  },
  resizeCanvas: function () {

    var canvas = this.gl.canvas;

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

  reset: function() {
    // reset camera to initial settings
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

/**
 * A viewer is a WebGL canvas that lets the user view a mesh.
 * The user can tumble it around by dragging the mouse.
 * @param {DOMElement} containerelement container element
 * @param {object}     options    options for renderer
 */

OpenJsCad.Viewer.LightGLEngine = function(containerelement, options) {

  this.options = options;

  this.containerEl = containerelement;

  // Set up WebGL state
  var gl = GL.create();
  this.gl = gl;
  this.gl.lineWidth(1); // don't let the library choose

  this.meshes = [];

  this.containerEl.appendChild (this.gl.canvas);

  this.handleResize();
  this.gl.resizeCanvas = this.handleResize.bind (this);
  // only window resize is available, so add an event callback for the canvas
  // window.addEventListener( 'resize', this.handleResize.bind (this) );

  this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  this.gl.clearColor.apply(this.gl, colorBytes(this.options.background.color));
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);

  var outlineColor = this.options.solid.outlineColor;

  // Black shader for wireframe
  this.blackShader = new GL.Shader('\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }', '\
    void main() {\
      gl_FragColor = vec4(' + colorBytes(outlineColor).join(', ') + ');\
    }'
  );

  // Shader with diffuse and specular lighting
  this.lightingShader = new GL.Shader('\
    varying vec3 color;\
    varying float alpha;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      const vec3 lightDir = vec3(1.0, 2.0, 3.0) / 3.741657386773941;\
      light = lightDir;\
      color = gl_Color.rgb;\
      alpha = gl_Color.a;\
      normal = gl_NormalMatrix * gl_Normal;\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }',
    '\
    varying vec3 color;\
    varying float alpha;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      vec3 n = normalize(normal);\
      float diffuse = max(0.0, dot(light, n));\
      float specular = pow(max(0.0, -reflect(light, n).z), 10.0) * sqrt(diffuse);\
      gl_FragColor = vec4(mix(color * (0.3 + 0.7 * diffuse), vec3(1.0), specular), alpha);\
    }'
  );

  var _this=this;

  var shiftControl = this.createControls (this.gl.canvas);

  this.gl.ondraw = function() {
    _this.onDraw();
  };

  // state variables, i.e. used for storing values, etc

  // state of viewer
  // 0 - initialized, no object
  // 1 - cleared, no object
  // 2 - showing, object
  this.state = 0;

  // state of perpective (camera)
  this.angleX = this.options.camera.angle.x;
  this.angleY = this.options.camera.angle.y;
  this.angleZ = this.options.camera.angle.z;
  this.viewpointX = this.options.camera.position.x;
  this.viewpointY = this.options.camera.position.y;
  this.viewpointZ = this.options.camera.position.z;

  this.onZoomChanged = null;

  this.touch = {
    lastX: 0,
    lastY: 0,
    scale: 0,
    ctrl: 0,
    shiftTimer: null,
    shiftControl: shiftControl,
    cur: null //current state
  };

  this.meshes = [];

  this.clear(); // and draw the inital viewer
};

OpenJsCad.Viewer.LightGLEngine.prototype = {
  init: function () {

  },
  handleResize: function () {
    // Set up the viewport

    this.resizeCanvas (this.gl.canvas);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height); // pixels
    this.gl.matrixMode(this.gl.PROJECTION);
    this.gl.loadIdentity();
    this.gl.perspective(this.options.camera.fov, this.gl.canvas.width / this.gl.canvas.height, this.options.camera.clip.min, this.options.camera.clip.max);
    this.gl.matrixMode(this.gl.MODELVIEW);

    this.onDraw();
  },
  createControls: function () {
    var _this = this;
    var shiftControl = $('<div class="shift-scene"><div class="arrow arrow-left" />\
<div class="arrow arrow-right" />\
<div class="arrow arrow-top" />\
<div class="arrow arrow-bottom" /></div>');

    $(this.containerEl)
      .append(shiftControl)
      .hammer({//touch screen control
      drag_lock_to_axis: true
    }).on("transform", function(e){
      if (e.gesture.touches.length >= 2) {
        _this.clearShift();
        _this.onTransform(e);
        e.preventDefault();
      }
    }).on("touch", function(e) {
      if (e.gesture.pointerType != 'touch'){
        e.preventDefault();
        return;
      }

      if (e.gesture.touches.length == 1) {
        var point = e.gesture.center;
        _this.touch.shiftTimer = setTimeout(function(){
          shiftControl.addClass('active').css({
            left: point.pageX + 'px',
            top: point.pageY + 'px'
          });
          _this.touch.shiftTimer = null;
          _this.touch.cur = 'shifting';
        }, 500);
      } else {
        _this.clearShift();
      }
    }).on("drag", function(e) {
      if (e.gesture.pointerType != 'touch') {
        e.preventDefault();
        return;
      }

      if (!_this.touch.cur || _this.touch.cur == 'dragging') {
        _this.clearShift();
        _this.onPanTilt(e);
      } else if (_this.touch.cur == 'shifting') {
        _this.onShift(e);
      }
    }).on("touchend", function(e) {
      _this.clearShift();
      if (_this.touch.cur) {
        shiftControl.removeClass('active shift-horizontal shift-vertical');
      }
    }).on("transformend dragstart dragend", function(e) {
      if ((e.type == 'transformend' && _this.touch.cur == 'transforming') ||
          (e.type == 'dragend' && _this.touch.cur == 'shifting') ||
          (e.type == 'dragend' && _this.touch.cur == 'dragging'))
        _this.touch.cur = null;
      _this.touch.lastX = 0;
      _this.touch.lastY = 0;
      _this.touch.scale = 0;
    });

    this.gl.onmousemove = function(e) {
      _this.onMouseMove(e);
    };

    this.gl.onmousewheel = function(e) {
      var wheelDelta = 0;
      if (e.wheelDelta) {
        wheelDelta = e.wheelDelta;
      } else if (e.detail) {
        // for firefox, see http://stackoverflow.com/questions/8886281/event-wheeldelta-returns-undefined
        wheelDelta = e.detail * -40;
      }
      if(wheelDelta) {
        var factor = Math.pow(1.003, -wheelDelta);
        var coeff = _this.getZoom();
        coeff *= factor;
        _this.setZoom(coeff);
      }
    };

    return shiftControl;
  },
  setZoom: function(coeff) { //0...1
    coeff=Math.max(coeff, 0);
    coeff=Math.min(coeff, 1);
    this.viewpointZ = this.options.camera.clip.min + coeff * (this.options.camera.clip.max - this.options.camera.clip.min);
    if(this.onZoomChanged) {
      this.onZoomChanged();
    }
    this.onDraw();
  },

  getZoom: function() {
    var coeff = (this.viewpointZ-this.options.camera.clip.min) / (this.options.camera.clip.max - this.options.camera.clip.min);
    return coeff;
  },

  onMouseMove: function(e) {
    if (e.dragging) {
      //console.log(e.which,e.button);
      var b = e.button;
      if(e.which) {                            // RANT: not even the mouse buttons are coherent among the brand (chrome,firefox,etc)
        b = e.which;
      }
      e.preventDefault();
      if(e.altKey||b==3) {                     // ROTATE X,Y (ALT or right mouse button)
        this.angleY += e.deltaX;
        this.angleX += e.deltaY;
        //this.angleX = Math.max(-180, Math.min(180, this.angleX));
      } else if(e.shiftKey||b==2) {            // PAN  (SHIFT or middle mouse button)
        var factor = 5e-3;
        this.viewpointX += factor * e.deltaX * this.viewpointZ;
        this.viewpointY -= factor * e.deltaY * this.viewpointZ;
      } else if(e.ctrlKey||e.metaKey) {                   // ZOOM IN/OU
        var factor = Math.pow(1.006, e.deltaX+e.deltaY);
        var coeff = this.getZoom();
        coeff *= factor;
        this.setZoom(coeff);
      } else {                                 // ROTATE X,Z  left mouse button
        this.angleZ += e.deltaX;
        this.angleX += e.deltaY;
      }
      this.onDraw();
    }
  },

  clearShift: function() {
    if(this.touch.shiftTimer) {
      clearTimeout(this.touch.shiftTimer);
      this.touch.shiftTimer = null;
    }
    return this;
  },

  //pan & tilt with one finger
  onPanTilt: function(e) {
    this.touch.cur = 'dragging';
    var delta = 0;
    if (this.touch.lastY && (e.gesture.direction == 'up' || e.gesture.direction == 'down')) {
      //tilt
      delta = e.gesture.deltaY - this.touch.lastY;
      this.angleX += delta;
    } else if (this.touch.lastX && (e.gesture.direction == 'left' || e.gesture.direction == 'right')) {
      //pan
      delta = e.gesture.deltaX - this.touch.lastX;
      this.angleZ += delta;
    }
    if (delta)
      this.onDraw();
    this.touch.lastX = e.gesture.deltaX;
    this.touch.lastY = e.gesture.deltaY;
  },

  //shift after 0.5s touch&hold
  onShift: function(e) {
    this.touch.cur = 'shifting';
    var factor = 5e-3;
    var delta = 0;

    if (this.touch.lastY && (e.gesture.direction == 'up' || e.gesture.direction == 'down')) {
      this.touch.shiftControl
          .removeClass('shift-horizontal')
          .addClass('shift-vertical')
          .css('top', e.gesture.center.pageY + 'px');
      delta = e.gesture.deltaY - this.touch.lastY;
      this.viewpointY -= factor * delta * this.viewpointZ;
      this.angleX += delta;
    }
    if (this.touch.lastX && (e.gesture.direction == 'left' || e.gesture.direction == 'right')) {
      this.touch.shiftControl
          .removeClass('shift-vertical')
          .addClass('shift-horizontal')
          .css('left', e.gesture.center.pageX + 'px');
      delta = e.gesture.deltaX - this.touch.lastX;
      this.viewpointX += factor * delta * this.viewpointZ;
      this.angleZ += delta;
    }
    if (delta)
      this.onDraw();
    this.touch.lastX = e.gesture.deltaX;
    this.touch.lastY = e.gesture.deltaY;
  },

  //zooming
  onTransform: function(e) {
    this.touch.cur = 'transforming';
    if (this.touch.scale) {
      var factor = 1 / (1 + e.gesture.scale - this.touch.scale);
      var coeff = this.getZoom();
      coeff *= factor;
      this.setZoom( coeff);
    }
    this.touch.scale = e.gesture.scale;
    return this;
  },

  onDraw: function(e) {
    var gl = this.gl;
    gl.makeCurrent();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    // set the perspective based on the camera postion
    gl.translate(this.viewpointX, this.viewpointY, -this.viewpointZ);
    gl.rotate(this.angleX, 1, 0, 0);
    gl.rotate(this.angleY, 0, 1, 0);
    gl.rotate(this.angleZ, 0, 0, 1);
    // draw the solid (meshes)
    if(this.options.solid.draw) {
      gl.enable(gl.BLEND);
      if (!this.options.solid.overlay) gl.enable(gl.POLYGON_OFFSET_FILL);
      for (var i = 0; i < this.meshes.length; i++) {
        var mesh = this.meshes[i];
        this.lightingShader.draw(mesh, gl.TRIANGLES);
      }
      if (!this.options.solid.overlay) gl.disable(gl.POLYGON_OFFSET_FILL);
      gl.disable(gl.BLEND);

      if(this.options.solid.lines) {
        if (this.options.solid.overlay) gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        for (var i = 0; i < this.meshes.length; i++) {
          var mesh = this.meshes[i];
          this.blackShader.draw(mesh, gl.LINES);
        }
        gl.disable(gl.BLEND);
        if (this.options.solid.overlay) gl.enable(gl.DEPTH_TEST);
      }
    }
    // draw the plate and the axis
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.begin(gl.LINES);

    if(this.options.plate.draw) {
      var m = this.options.plate.m; // short cut
      var M = this.options.plate.M; // short cut
      var size = this.options.plate.size/2;
      // -- minor grid
      gl.color.apply(gl, colorBytes (m.color));
      var mg = m.i;
      var MG = M.i;
      for(var x=-size; x<=size; x+=mg) {
        if(x%MG) { // draw only minor grid line
          gl.vertex(-size, x, 0);
          gl.vertex(size, x, 0);
          gl.vertex(x, -size, 0);
          gl.vertex(x, size, 0);
        }
      }
      // -- major grid
      gl.color.apply(gl, colorBytes (M.color));
      for(var x=-size; x<=size; x+=MG) {
        gl.vertex(-size, x, 0);
        gl.vertex(size, x, 0);
        gl.vertex(x, -size, 0);
        gl.vertex(x, size, 0);
      }
    }
    if (this.options.axis.draw) {
      var size = this.options.plate.size/2;
      // X axis
      var c = this.options.axis.x.neg;
      gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
      gl.vertex(-size, 0, 0);
      gl.vertex(0, 0, 0);
      c = this.options.axis.x.pos;
      gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
      gl.vertex(0, 0, 0);
      gl.vertex(size, 0, 0);
      // Y axis
      c = this.options.axis.y.neg;
      gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
      gl.vertex(0, -size, 0);
      gl.vertex(0, 0, 0);
      c = this.options.axis.y.pos;
      gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
      gl.vertex(0, 0, 0);
      gl.vertex(0, size, 0);
      // Z axis
      c = this.options.axis.z.neg;
      gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
      gl.vertex(0, 0, -size);
      gl.vertex(0, 0, 0);
      c = this.options.axis.z.pos;
      gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
      gl.vertex(0, 0, 0);
      gl.vertex(0, 0, size);
    }
    gl.end();
    gl.disable(gl.BLEND);
  },

  // Convert from CSG solid to an array of GL.Mesh objects
  // limiting the number of vertices per mesh to less than 2^16
  csgToMeshes: function(initial_csg) {
    var csg = initial_csg.canonicalized();
    var mesh = new GL.Mesh({ normals: true, colors: true });
    var meshes = [ mesh ];
    var vertexTag2Index = {};
    var vertices = [];
    var colors = [];
    var triangles = [];
    // set to true if we want to use interpolated vertex normals
    // this creates nice round spheres but does not represent the shape of
    // the actual model
    var smoothlighting = this.options.solid.smooth;
    var polygons = csg.toPolygons();
    var numpolygons = polygons.length;
    for(var j = 0; j < numpolygons; j++) {
      var polygon = polygons[j];
      var color = colorBytes(this.options.solid.faceColor);  // default color

      if(polygon.shared && polygon.shared.color) {
        color = polygon.shared.color;
      } else if(polygon.color) {
        color = polygon.color;
      }

      if (color.length < 4)
        color.push(1.); //opaque

      var indices = polygon.vertices.map(function(vertex) {
        var vertextag = vertex.getTag();
        var vertexindex = vertexTag2Index[vertextag];
        var prevcolor = colors[vertexindex];
        if(smoothlighting && (vertextag in vertexTag2Index) &&
          (prevcolor[0] == color[0]) &&
          (prevcolor[1] == color[1]) &&
          (prevcolor[2] == color[2])
        ) {
          vertexindex = vertexTag2Index[vertextag];
        } else {
          vertexindex = vertices.length;
          vertexTag2Index[vertextag] = vertexindex;
          vertices.push([vertex.pos.x, vertex.pos.y, vertex.pos.z]);
          colors.push(color);
        }
        return vertexindex;
      });
      for (var i = 2; i < indices.length; i++) {
        triangles.push([indices[0], indices[i - 1], indices[i]]);
      }
      // if too many vertices, start a new mesh;
      if (vertices.length > 65000) {
        // finalize the old mesh
        mesh.triangles = triangles;
        mesh.vertices = vertices;
        mesh.colors = colors;
        mesh.computeWireframe();
        mesh.computeNormals();

        if ( mesh.vertices.length ) {
          meshes.push(mesh);
        }

        // start a new mesh
        mesh = new GL.Mesh({ normals: true, colors: true });
        triangles = [];
        colors = [];
        vertices = [];
      }
    }
    // finalize last mesh
    mesh.triangles = triangles;
    mesh.vertices = vertices;
    mesh.colors = colors;
    mesh.computeWireframe();
    mesh.computeNormals();

    if ( mesh.vertices.length ) {
      meshes.push(mesh);
    }

    return meshes;
  }
};
