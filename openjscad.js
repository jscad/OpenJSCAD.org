// == openjscad.js, originally written by Joost Nieuwenhuijse (MIT License)
//   few adjustments by Rene K. Mueller <spiritdude@gmail.com> for OpenJSCAD.org
//
// History:
// 2016/10/01: 0.5.2: enhanced Processor constructor to support Viewer options
//                    enhanced Processor to allow a selection from multiple returned objects
// 2016/06/27: 0.5.1: incrementing version number for release
// 2016/05/01: 0.5.0: added SVG import and export, added options to Processor and View classes, allow more flexibility in HTML by Z3 Dev
// 2016/02/25: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev
// 2013/03/12: reenable webgui parameters to fit in current design
// 2013/03/11: few changes to fit design of http://openjscad.org

(function(module) {

var OpenJsCad = function() { };

OpenJsCad.version = '0.5.2 (2016/10/01)';

OpenJsCad.log = function(txt) {
  var timeInMs = Date.now();
  var prevtime = OpenJsCad.log.prevLogTime;
  if(!prevtime) prevtime = timeInMs;
  var deltatime = timeInMs - prevtime;
  OpenJsCad.log.prevLogTime = timeInMs;
  var timefmt = (deltatime*0.001).toFixed(3);
  txt = "["+timefmt+"] "+txt;
  if( (typeof(console) == "object") && (typeof(console.log) == "function") ) {
    console.log(txt);
  } else if( (typeof(self) == "object") && (typeof(self.postMessage) == "function") ) {
    self.postMessage({cmd: 'log', txt: txt});
  }
  else throw new Error("Cannot log");
};

// See Processor.setStatus()
// Note: leave for compatibility
OpenJsCad.status = function(s) {
  OpenJsCad.log(s);
}

OpenJsCad.env = function() {
  var env = "OpenJSCAD "+OpenJsCad.version;
  if(typeof document !== 'undefined') {
    var w = document.defaultView;
    env = env+" ["+w.navigator.userAgent+"]";
  } else {
    if (typeof require == 'function') {
      var os = require("os");
      env = env+" ["+os.type()+":"+os.release()+","+os.platform()+":"+os.arch()+"]";
    }
  }
  console.log(env);
}

// A viewer is a WebGL canvas that lets the user view a mesh. The user can
// tumble it around by dragging the mouse.
OpenJsCad.Viewer = function(containerelement,options) {
  if (options === undefined) options = {};
// see the various methods below on how to change these
  this.camera = {
    fov: 45,                           // field of view
    angle:    {x: -60,y:  0,z:  -45},  // view angle about XYZ axis
    position: {x:   0,y:  0,z:  100},  // initial position at XYZ
    clip:     {min: 0.5,  max: 1000},  // rendering outside this range is clipped
  };
  this.plate = {
    draw: true,                // draw or not
    size: 200,                 // plate size (X and Y)
  // minor grid settings
    m: {
      i:  1, // number of units between minor grid lines
      r: .8, g: .8, b: .8, a: .5, // color
    },
  // major grid settings
    M: {
      i: 10, // number of units between major grid lines
      r: .5, g: .5, b: .5, a: .5, // color
    },
  };
  this.axis = {
    draw: false,                // draw or not
    x: {
      neg: {r: 1, g: .5, b: .5, a: .5}, // color in negative direction
      pos: {r: 1, g:  0, b:  0, a: .8}, // color in positive direction
    },
    y: {
      neg: {r: .5, g: 1, b: .5, a: .5}, // color in negative direction
      pos: {r:  0, g: 1, b:  0, a: .8}, // color in positive direction
    },
    z: {
      neg: {r: .5, g: .5, b: 1, a: .5}, // color in negative direction
      pos: {r:  0, g:  0, b: 1, a: .8}, // color in positive direction
    },
  };
  this.solid = {
    draw:    true,              // draw or not
    lines:   false,             // draw outlines or not
    overlay: false,             // use overlay when drawing lines or not
    smooth:  false,             // use smoothing or not
    color:   [1,.4,1,1],        // default color
  };
// apply all options found
  if ("camera" in options) { this.setCameraOptions(options["camera"]); }
  if ("plate"  in options) { this.setPlateOptions(options["plate"]); }
  if ("axis"   in options) { this.setAxisOptions(options["axis"]); }
  if ("solid"  in options) { this.setSolidOptions(options["solid"]); }

  // Set up WebGL state
  var gl = GL.create();
  this.gl = gl;
  this.gl.lineWidth(1); // don't let the library choose

  // Set up the viewport
  this.gl.canvas.width  = $(containerelement).width();
  this.gl.canvas.height = $(containerelement).height();
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height); // pixels
  this.gl.matrixMode(this.gl.PROJECTION);
  this.gl.loadIdentity();
  this.gl.perspective(this.camera.fov, this.gl.canvas.width / this.gl.canvas.height, this.camera.clip.min, this.camera.clip.max);
  this.gl.matrixMode(this.gl.MODELVIEW);

  this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  this.gl.clearColor(0.93, 0.93, 0.93, 1);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);

  // Black shader for wireframe
  this.blackShader = new GL.Shader('\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }', '\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\
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

  var shiftControl = $('<div class="shift-scene"><div class="arrow arrow-left" />\
    <div class="arrow arrow-right" />\
    <div class="arrow arrow-top" />\
    <div class="arrow arrow-bottom" /></div>');

  $(containerelement).append(this.gl.canvas)
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

  this.gl.ondraw = function() {
    _this.onDraw();
  };

  this.gl.resizeCanvas = function() {
    var canvasWidth  = _this.gl.canvas.clientWidth;
    var canvasHeight = _this.gl.canvas.clientHeight;
    if (_this.gl.canvas.width  != canvasWidth ||
        _this.gl.canvas.height != canvasHeight) {
      _this.gl.canvas.width  = canvasWidth;
      _this.gl.canvas.height = canvasHeight;
      _this.gl.viewport(0, 0, _this.gl.canvas.width, _this.gl.canvas.height);
      _this.gl.matrixMode( _this.gl.PROJECTION );
      _this.gl.loadIdentity();
      _this.gl.perspective(_this.camera.fov, _this.gl.canvas.width / _this.gl.canvas.height, _this.camera.clip.min, _this.camera.clip.max );
      _this.gl.matrixMode( _this.gl.MODELVIEW );
      _this.onDraw();
    }
  };
  // only window resize is available, so add an event callback for the canvas
  window.addEventListener( 'resize', this.gl.resizeCanvas );

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

// state variables, i.e. used for storing values, etc

  // state of viewer
  // 0 - initialized, no object
  // 1 - cleared, no object
  // 2 - showing, object
  this.state = 0;

  // state of perpective (camera)
  this.angleX = this.camera.angle.x;
  this.angleY = this.camera.angle.y;
  this.angleZ = this.camera.angle.z;
  this.viewpointX = this.camera.position.x;
  this.viewpointY = this.camera.position.y;
  this.viewpointZ = this.camera.position.z;

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

OpenJsCad.Viewer.prototype = {
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
    this.angleX = this.camera.angle.x;
    this.angleY = this.camera.angle.y;
    this.angleZ = this.camera.angle.z;
    this.viewpointX = this.camera.position.x;
    this.viewpointY = this.camera.position.y;
    this.viewpointZ = this.camera.position.z;
    this.onDraw();
  },

  supported: function() {
    return !!this.gl;
  },

  setCameraOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.camera) {
      if (x in options) { this.camera[x] = options[x]; }
    }
  },

  setPlateOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.plate) {
      if (x in options) { this.plate[x] = options[x]; }
    }
  },

  setAxisOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.axis) {
      if (x in options) this.axis[x] = options[x];
    }
  },

  setSolidOptions: function(options) {
    options = options || {};
  // apply all options found
    for (var x in this.solid) {
      if (x in options) this.solid[x] = options[x];
    }
  },

  setZoom: function(coeff) { //0...1
    coeff=Math.max(coeff, 0);
    coeff=Math.min(coeff, 1);
    this.viewpointZ = this.camera.clip.min + coeff * (this.camera.clip.max - this.camera.clip.min);
    if(this.onZoomChanged) {
      this.onZoomChanged();
    }
    this.onDraw();
  },

  getZoom: function() {
    var coeff = (this.viewpointZ-this.camera.clip.min) / (this.camera.clip.max - this.camera.clip.min);
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
    if(this.solid.draw) {
      gl.enable(gl.BLEND);
      if (!this.solid.overlay) gl.enable(gl.POLYGON_OFFSET_FILL);
      for (var i = 0; i < this.meshes.length; i++) {
        var mesh = this.meshes[i];
        this.lightingShader.draw(mesh, gl.TRIANGLES);
      }
      if (!this.solid.overlay) gl.disable(gl.POLYGON_OFFSET_FILL);
      gl.disable(gl.BLEND);

      if(this.solid.lines) {
        if (this.solid.overlay) gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        for (var i = 0; i < this.meshes.length; i++) {
          var mesh = this.meshes[i];
          this.blackShader.draw(mesh, gl.LINES);
        }
        gl.disable(gl.BLEND);
        if (this.solid.overlay) gl.enable(gl.DEPTH_TEST);
      }
    }
  // draw the plate and the axis 
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.begin(gl.LINES);

    if(this.plate.draw) {
      var m = this.plate.m; // short cut
      var M = this.plate.M; // short cut
      var size = this.plate.size/2;
    // -- minor grid
      gl.color(m.r,m.g,m.b,m.a);
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
      gl.color(M.r,M.g,M.b,M.a);
      for(var x=-size; x<=size; x+=MG) {
        gl.vertex(-size, x, 0);
        gl.vertex(size, x, 0);
        gl.vertex(x, -size, 0);
        gl.vertex(x, size, 0);
      }
    }
    if (this.axis.draw) {
      var size = this.plate.size/2;
    // X axis
      var c = this.axis.x.neg;
      gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
      gl.vertex(-size, 0, 0);
      gl.vertex(0, 0, 0);
      c = this.axis.x.pos;
      gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
      gl.vertex(0, 0, 0);
      gl.vertex(size, 0, 0);
    // Y axis
      c = this.axis.y.neg;
      gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
      gl.vertex(0, -size, 0);
      gl.vertex(0, 0, 0);
      c = this.axis.y.pos;
      gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
      gl.vertex(0, 0, 0);
      gl.vertex(0, size, 0);
    // Z axis
      c = this.axis.z.neg;
      gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
      gl.vertex(0, 0, -size);
      gl.vertex(0, 0, 0);
      c = this.axis.z.pos;
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
    var smoothlighting = this.solid.smooth;
    var polygons = csg.toPolygons();
    var numpolygons = polygons.length;
    for(var j = 0; j < numpolygons; j++) {
      var polygon = polygons[j];
      var color = this.solid.color;  // default color
  
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
  },
};

// this is a bit of a hack; doesn't properly supports urls that start with '/'
// but does handle relative urls containing ../
OpenJsCad.makeAbsoluteUrl = function(url, baseurl) {
  if(!url.match(/^[a-z]+\:/i)) {
    var basecomps = baseurl.split("/");
    if(basecomps.length > 0) {
      basecomps.splice(basecomps.length - 1, 1);
    }
    var urlcomps = url.split("/");
    var comps = basecomps.concat(urlcomps);
    var comps2 = [];
    comps.map(function(c) {
      if(c == "..") {
        if(comps2.length > 0) {
          comps2.splice(comps2.length - 1, 1);
        }
      } else {
        comps2.push(c);
      }
    });
    url = "";
    for(var i = 0; i < comps2.length; i++) {
      if(i > 0) url += "/";
      url += comps2[i];
    }
  }
  return url;
};

OpenJsCad.isChrome = function() {
  return (window.navigator.userAgent.search("Chrome") >= 0);
};

OpenJsCad.isSafari = function() {
  return /Version\/[\d\.]+.*Safari/.test(window.navigator.userAgent); // FIXME WWW says don't use this
}

OpenJsCad.getWindowURL = function() {
  if(window.URL) return window.URL;
  else if(window.webkitURL) return window.webkitURL;
  else throw new Error("Your browser doesn't support window.URL");
};

OpenJsCad.textToBlobUrl = function(txt) {
  var windowURL=OpenJsCad.getWindowURL();
  var blob = new Blob([txt], { type : 'application/javascript' });
  var blobURL = windowURL.createObjectURL(blob);
  if(!blobURL) throw new Error("createObjectURL() failed");
  return blobURL;
};

OpenJsCad.revokeBlobUrl = function(url) {
  if(window.URL) window.URL.revokeObjectURL(url);
  else if(window.webkitURL) window.webkitURL.revokeObjectURL(url);
  else throw new Error("Your browser doesn't support window.URL");
};

OpenJsCad.FileSystemApiErrorHandler = function(fileError, operation) {
  var errormap = {
    1: 'NOT_FOUND_ERR',
    2: 'SECURITY_ERR',
    3: 'ABORT_ERR',
    4: 'NOT_READABLE_ERR',
    5: 'ENCODING_ERR',
    6: 'NO_MODIFICATION_ALLOWED_ERR',
    7: 'INVALID_STATE_ERR',
    8: 'SYNTAX_ERR',
    9: 'INVALID_MODIFICATION_ERR',
    10: 'QUOTA_EXCEEDED_ERR',
    11: 'TYPE_MISMATCH_ERR',
    12: 'PATH_EXISTS_ERR',
  };
  var errname;
  if(fileError.code in errormap)
  {
    errname = errormap[fileError.code];
  }
  else
  {
    errname = "Error #"+fileError.code;
  }
  var errtxt = "FileSystem API error: "+operation+" returned error "+errname;
  throw new Error(errtxt);
};

// Call this routine to install a handler for uncaught exceptions
OpenJsCad.AlertUserOfUncaughtExceptions = function() {
  window.onerror = function(message, url, line) {
    var msg = "uncaught exception";
    switch (arguments.length) {
      case 1: // message
        msg = arguments[0];
        break;
      case 2: // message and url
        msg = arguments[0]+'\n('+arguments[1]+')';
        break;
      case 3: // message and url and line#
        msg = arguments[0]+'\nLine: '+arguments[2]+'\n('+arguments[1]+')';
        break;
      case 4: // message and url and line# and column#
      case 5: // message and url and line# and column# and Error
        msg = arguments[0]+'\nLine: '+arguments[2]+',col: '+arguments[3]+'\n('+arguments[1]+')';
        break;
      default:
        break;
    }
    if(typeof document == 'object') {
      var e = document.getElementById("errordiv");
      if (e !== null) {
        e.firstChild.textContent = msg;
        e.style.display = "block";
      }
    } else {
      console.log(msg);
    }
    return false;
  };
};

// parse the jscad script to get the parameter definitions
OpenJsCad.getParamDefinitions = function(script) {
  var scriptisvalid = true;
  script += "\nfunction include() {}";    // at least make it not throw an error so early
  try
  {
    // first try to execute the script itself
    // this will catch any syntax errors
    //    BUT we can't introduce any new function!!!
    (new Function(script))();
  }
  catch(e) {
    scriptisvalid = false;
  }
  var params = [];
  if(scriptisvalid)
  {
    var script1 = "if(typeof(getParameterDefinitions) == 'function') {return getParameterDefinitions();} else {return [];} ";
    script1 += script;
    var f = new Function(script1);
    params = f();
    if( (typeof(params) != "object") || (typeof(params.length) != "number") )
    {
      throw new Error("The getParameterDefinitions() function should return an array with the parameter definitions");
    }
  }
  return params;
};

OpenJsCad.Processor = function(containerdiv, options) {
  if (options === undefined) options = {};
// the default options
  this.opts = {
    debug: false,
    libraries: ['csg.js','formats.js','openjscad.js','openscad.js'],
    openJsCadPath: '',
    useAsync: true,
    useSync:  true,
    viewer: {},
  };
// apply all options found
  for (var x in this.opts) {
    if (x in options) this.opts[x] = options[x];
  }

  this.containerdiv = containerdiv;

  this.viewer = null;
  this.worker = null;
  this.zoomControl = null;

// callbacks
  this.onchange = null;   // function(Processor) for callback
  this.ondownload = null; // function(Processor) for callback

  this.currentObjects = [];  // list of objects returned from rebuildObject*
  this.viewedObject = null;  // the object being rendered

  this.selectStartPoint = 0;
  this.selectEndPoint = 0;

  this.hasOutputFile = false;
  this.hasError = false;
  this.paramDefinitions = [];
  this.paramControls = [];
  this.script = null;
  this.formats = null;

  this.baseurl = document.location.href;
  this.baseurl = this.baseurl.replace(/#.*$/,''); // remove remote URL
  this.baseurl = this.baseurl.replace(/\?.*$/,''); // remove parameters
  if (this.baseurl.lastIndexOf('/') != (this.baseurl.length-1)) {
    this.baseurl = this.baseurl.substring(0,this.baseurl.lastIndexOf('/')+1);
  }

// state of the processor
// 0 - initialized - no viewer, no parameters, etc
// 1 - processing  - processing JSCAD script
// 2 - complete    - completed processing
// 3 - incomplete  - incompleted due to errors in processing
  this.state = 0; // initialized

  this.createElements();
};

OpenJsCad.Processor.convertToSolid = function(objs) {
  if (!Array.isArray(objs)) {
    if ((objs instanceof CAG) || (objs instanceof CSG)) {
      objs = [objs];
    } else {
      throw new Error("Cannot convert object ("+typeof(objs)+") to solid");
    }
  }

  var solid = null;
  for(var i=0; i<objs.length; i++) {
    var obj = objs[i];
    if (obj instanceof CAG) {
      obj = obj.extrude({offset: [0,0,0.1]}); // convert CAG to a thin solid CSG
    }
    if (solid !== null) {
      solid = solid.unionForNonIntersecting(obj);
    } else {
      solid = obj;
    }
  }
  return solid;
};

OpenJsCad.Processor.prototype = {
  createElements: function() {
    var that = this;   // for event handlers

    while(this.containerdiv.children.length > 0)
    {
      this.containerdiv.removeChild(0);
    }

    var viewerdiv = document.createElement("div");
    viewerdiv.className = "viewer";
    viewerdiv.style.width = '100%';
    viewerdiv.style.height = '100%';
    this.containerdiv.appendChild(viewerdiv);
    try {
      this.viewer = new OpenJsCad.Viewer(viewerdiv,this.opts.viewer);
    } catch(e) {
      viewerdiv.innerHTML = "<b><br><br>Error: " + e.toString() + "</b><br><br>A browser with support for WebGL is required";
    }
    //Zoom control
    if(0) {
      var div = document.createElement("div");
      this.zoomControl = div.cloneNode(false);
      this.zoomControl.style.width = this.viewerwidth + 'px';
      this.zoomControl.style.height = '20px';
      this.zoomControl.style.backgroundColor = 'transparent';
      this.zoomControl.style.overflowX = 'scroll';
      div.style.width = this.viewerwidth * 11 + 'px';
      div.style.height = '1px';
      this.zoomControl.appendChild(div);
      this.zoomChangedBySlider = false;
      this.zoomControl.onscroll = function(event) {
        var zoom = that.zoomControl;
        var newzoom=zoom.scrollLeft / (10 * zoom.offsetWidth);
        that.zoomChangedBySlider=true; // prevent recursion via onZoomChanged
        that.viewer.setZoom(newzoom);
        that.zoomChangedBySlider=false;
      };
      this.viewer.onZoomChanged = function() {
        if(!that.zoomChangedBySlider)
        {
          var newzoom = that.viewer.getZoom();
          that.zoomControl.scrollLeft = newzoom * (10 * that.zoomControl.offsetWidth);
        }
      };

      this.containerdiv.appendChild(this.zoomControl);
      this.zoomControl.scrollLeft = this.viewer.viewpointZ / this.viewer.camera.clip.max *
         (this.zoomControl.scrollWidth - this.zoomControl.offsetWidth);

      //end of zoom control
    }

    this.selectdiv = this.containerdiv.parentElement.querySelector("div#selectdiv");
    if (!this.selectdiv) {
      this.selectdiv = document.createElement("div");
      this.selectdiv.id = 'selectdiv';
      this.containerdiv.parentElement.appendChild(this.selectdiv);
    }
    element = document.createElement("input");
    element.setAttribute("type", "range"); 
    element.id = 'startRange';
    element.min = 0;
    element.max = 100;
    element.step = 1;
    element.oninput = function(e) {
      if( that.state == 2 ) {
        that.updateView();
        that.updateFormats();
        that.updateDownloadLink();
      }
    };
    this.selectdiv.appendChild(element);
    element = document.createElement("input");
    element.setAttribute("type", "range"); 
    element.id = 'endRange';
    element.min = 0;
    element.max = 100;
    element.step = 1;
    element.oninput = function(e) {
      if( that.state == 2 ) {
        that.updateView();
        that.updateFormats();
        that.updateDownloadLink();
      }
    };
    this.selectdiv.appendChild(element);

    this.errordiv = this.containerdiv.parentElement.querySelector("div#errordiv");
    if (!this.errordiv) {
      this.errordiv = document.createElement("div");
      this.errordiv.id = 'errordiv';
      this.containerdiv.parentElement.appendChild(this.errordiv);
    }
    this.errorpre = document.createElement("pre");
    this.errordiv.appendChild(this.errorpre);

    this.statusdiv = this.containerdiv.parentElement.querySelector("div#statusdiv");
    if (!this.statusdiv) {
      this.statusdiv = document.createElement("div");
      this.statusdiv.id = "statusdiv";
      this.containerdiv.parentElement.appendChild(this.statusdiv);
    }
    this.statusspan = document.createElement("span");
    this.statusspan.id = 'statusspan';
    this.statusbuttons = document.createElement("span");
    this.statusbuttons.id = 'statusbuttons';
    this.statusdiv.appendChild(this.statusspan);
    this.statusdiv.appendChild(this.statusbuttons);
    this.abortbutton = document.createElement("button");
    this.abortbutton.innerHTML = "Abort";
    this.abortbutton.onclick = function(e) {
      that.abort();
    };
    this.statusbuttons.appendChild(this.abortbutton);
    this.formatDropdown = document.createElement("select");
    this.formatDropdown.onchange = function(e) {
      that.currentFormat = that.formatDropdown.options[that.formatDropdown.selectedIndex].value;
      that.updateDownloadLink();
    };
    this.statusbuttons.appendChild(this.formatDropdown);
    this.generateOutputFileButton = document.createElement("button");
    this.generateOutputFileButton.onclick = function(e) {
      that.generateOutputFile();
    };
    this.statusbuttons.appendChild(this.generateOutputFileButton);
    this.downloadOutputFileLink = document.createElement("a");
    this.downloadOutputFileLink.className = "downloadOutputFileLink"; // so we can css it
    this.statusbuttons.appendChild(this.downloadOutputFileLink);

    this.parametersdiv = this.containerdiv.parentElement.querySelector("div#parametersdiv");
    if (!this.parametersdiv) {
      this.parametersdiv = document.createElement("div");
      this.parametersdiv.id = "parametersdiv";
      this.containerdiv.parentElement.appendChild(this.parametersdiv);
    }
    this.parameterstable = document.createElement("table");
    this.parameterstable.className = "parameterstable";
    this.parametersdiv.appendChild(this.parameterstable);

    element = this.parametersdiv.querySelector("button#updateButton");
    if (element === null) {
      element = document.createElement("button");
      element.innerHTML = "Update";
      element.id = "updateButton";
    }
    element.onclick = function(e) {
      that.rebuildSolid();
    };
    this.parametersdiv.appendChild(element);

    // implementing instantUpdate
    var instantUpdateCheckbox = document.createElement("input");
    instantUpdateCheckbox.type = "checkbox";
    instantUpdateCheckbox.id = "instantUpdate";
    this.parametersdiv.appendChild(instantUpdateCheckbox);

    element = document.getElementById("instantUpdateLabel");
    if (element === null) {
      element = document.createElement("label");
      element.innerHTML = "Instant Update";
      element.id = "instantUpdateLabel";
    }
    element.setAttribute("for",instantUpdateCheckbox.id);
    this.parametersdiv.appendChild(element);

    this.enableItems();

    this.clearViewer();
  },

  setCurrentObjects: function(objs) {
    if (!Array.isArray(objs)) {
      objs = [objs]; // create a list
    }
    this.currentObjects = objs;                                   // list of CAG or CSG objects

    this.updateSelection();
    this.selectStartPoint = -1; // force view update
    this.updateView();
    this.updateFormats();
    this.updateDownloadLink();

    if(this.onchange) this.onchange(this);
  },

  selectedFormat: function() {
    return this.formatDropdown.options[this.formatDropdown.selectedIndex].value;
  },

  selectedFormatInfo: function() {
    return this.formatInfo(this.selectedFormat());
  },

  updateDownloadLink: function() {
    var info = this.selectedFormatInfo();
    var ext = info.extension;
    this.generateOutputFileButton.innerHTML = "Generate "+ext.toUpperCase();
  },

  updateSelection: function() {
    var range = document.getElementById("startRange");
    range.min = 0;
    range.max = this.currentObjects.length - 1;
    range.value = 0;
    range = document.getElementById("endRange");
    range.min = 0;
    range.max = this.currentObjects.length - 1;
    range.value = this.currentObjects.length - 1;
  },

  updateView: function() {
    var startpoint = parseInt(document.getElementById("startRange").value);
    var endpoint = parseInt(document.getElementById("endRange").value);
    if (startpoint == this.selectStartPoint && endpoint == this.selectEndPoint) { return; }

  // build a list of objects to view
    this.selectStartPoint = startpoint;
    this.selectEndPoint   = endpoint;
    if (startpoint > endpoint) { startpoint = this.selectEndPoint; endpoint = this.selectStartPoint; };

    var objs = this.currentObjects.slice(startpoint,endpoint+1);
    this.viewedObject = OpenJsCad.Processor.convertToSolid(objs); // enforce CSG to display

    if(this.viewer) {
      this.viewer.setCsg(this.viewedObject);
    }
  },

  updateFormats: function() {
    while(this.formatDropdown.options.length > 0) {
      this.formatDropdown.options.remove(0);
    }

    var that = this;
    var formats = this.supportedFormatsForCurrentObjects();
    formats.forEach(function(format) {
      var option = document.createElement("option");
      var info = that.formatInfo(format);
      option.setAttribute("value", format);
      option.appendChild(document.createTextNode(info.displayName));
      that.formatDropdown.options.add(option);
    });
  },

  clearViewer: function() {
    this.clearOutputFile();
    if (this.viewedObject) {
      this.viewer.clear();
      this.viewedObject = null;
      if(this.onchange) this.onchange(this);
    }
    this.enableItems();
  },

  abort: function() {
  // abort if state is processing
    if(this.state == 1)
    {
      //todo: abort
      this.setStatus("Aborted.");
      this.worker.terminate();
      this.state = 3; // incomplete
      this.enableItems();
      if(this.onchange) this.onchange(this);
    }
  },

  enableItems: function() {
    this.abortbutton.style.display = (this.state == 1) ? "inline":"none";
    this.formatDropdown.style.display = ((!this.hasOutputFile)&&(this.viewedObject))? "inline":"none";
    this.generateOutputFileButton.style.display = ((!this.hasOutputFile)&&(this.viewedObject))? "inline":"none";
    this.downloadOutputFileLink.style.display = this.hasOutputFile? "inline":"none";
    this.parametersdiv.style.display = (this.paramControls.length > 0)? "inline-block":"none";     // was 'block'
    this.errordiv.style.display = this.hasError? "block":"none";
    this.statusdiv.style.display = this.hasError? "none":"block";
    this.selectdiv.style.display = (this.currentObjects.length > 1) ? "none":"none"; // FIXME once there's a data model
  },

  setDebugging: function(debugging) {
    this.opts.debug = debugging;
  },

  addLibrary: function(lib) {
    this.opts['libraries'].push(lib);
  },

  setOpenJsCadPath: function(path) {
    this.opts['openJsCadPath'] = path;
  },

  setError: function(txt) {
    this.hasError = (txt != "");
    this.errorpre.textContent = txt;
    this.enableItems();
  },

  setStatus: function(txt) {
    if(typeof document !== 'undefined') {
      this.statusspan.innerHTML = txt;
    } else {
      OpenJsCad.log(txt);
    }
  },

  // script: javascript code
  // filename: optional, the name of the .jscad file
  setJsCad: function(script, filename) {
    if(!filename) filename = "openjscad.jscad";
    this.abort();
    this.paramDefinitions = [];
    this.paramControls = [];
    this.script = null;
    this.setError("");
    var scripthaserrors = false;
    try
    {
      this.paramDefinitions = OpenJsCad.getParamDefinitions(script);
      this.createParamControls();
    }
    catch(e)
    {
      this.setError(e.toString());
      this.setStatus("Error.");
      scripthaserrors = true;
    }
    if(!scripthaserrors)
    {
      this.script = script;
      this.filename = filename;
      this.rebuildSolid();
    }
    else
    {
      this.enableItems();
    }
  },

  getParamValues: function()
  {
    var paramValues = {};
    for(var i = 0; i < this.paramControls.length; i++)
    {
      var control = this.paramControls[i];
      switch (control.paramType) {
        case 'choice':
          paramValues[control.paramName] = control.options[control.selectedIndex].value;
          break;
        case 'float':
        case 'number':
          var value = control.value;
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            paramValues[control.paramName] = parseFloat(value);
          } else {
            throw new Error("Parameter ("+control.paramName+") is not a valid number ("+value+")");
          }
          break;
        case 'int':
          var value = control.value;
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            paramValues[control.paramName] = parseInt(value);
          } else {
            throw new Error("Parameter ("+control.paramName+") is not a valid number ("+value+")");
          }
          break;
        case 'checkbox':
        case 'radio':
          if (control.checked == true && control.value.length > 0) {
            paramValues[control.paramName] = control.value;
          } else {
            paramValues[control.paramName] = control.checked;
          }
          break;
        default:
          paramValues[control.paramName] = control.value;
          break;
      }
      //console.log(control.paramName+":"+paramValues[control.paramName]);
    }
    return paramValues;
  },

  getFullScript: function()
  {
    var script = "";
  // add the file cache
    script += 'var gMemFs = [';
    if (typeof(gMemFs) == 'object') {
      var comma = '';
      for(var fn in gMemFs) {
        script += comma;
        script += JSON.stringify(gMemFs[fn]);
        comma = ',';
      }
    }
    script += '];\n';
    script += '\n';
  // add the main script
    script += this.script;
    return script;
  },

  rebuildSolidAsync: function()
  {
    var parameters = this.getParamValues();
    var script     = this.getFullScript();

    if(!window.Worker) throw new Error("Worker threads are unsupported.");

  // create the worker
    var that = this;
    that.state = 1; // processing
    that.worker = OpenJsCad.createJscadWorker( this.baseurl+this.filename, script,
    // handle the results
      function(err, objs) {
        that.worker = null;
        if(err) {
          that.setError(err);
          that.setStatus("Error.");
          that.state = 3; // incomplete
        } else {
          that.setCurrentObjects(objs);
          that.setStatus("Ready.");
          that.state = 2; // complete
        }
        that.enableItems();
      }
    );
  // pass the libraries to the worker for import
    var libraries = this.opts.libraries.map( function(l) {
                      return this.baseurl+this.opts.openJsCadPath+l;
                    }, this);
  // start the worker
    that.worker.postMessage({cmd: "render", parameters: parameters, libraries: libraries});
  },

  rebuildSolidSync: function()
  {
    var parameters = this.getParamValues();
    try {
      this.state = 1; // processing
      var func = OpenJsCad.createJscadFunction(this.baseurl+this.filename, this.script);
      var objs = func(parameters);
      this.setCurrentObjects(objs);
      this.setStatus("Ready.");
      this.state = 2; // complete
    }
    catch(err)
    {
      var errtxt = err.toString();
      if(err.stack) {
        errtxt += '\nStack trace:\n'+err.stack;
      }
      this.setError(errtxt);
      this.setStatus("Error.");
      this.state = 3; // incomplete
    }
    this.enableItems();
  },

  rebuildSolid: function()
  {
  // clear previous solid and settings
    this.abort();
    this.setError("");
    this.clearViewer();
    this.enableItems();
    this.setStatus("Rendering. Please wait <img id=busy src='imgs/busy.gif'>");
  // rebuild the solid
    if (this.opts.useAsync) {
      try {
        this.rebuildSolidAsync();
        return;
      } catch(err) {
        if (! this.opts.useSync) {
          var errtxt = err.toString();
          if(err.stack) {
            errtxt += '\nStack trace:\n'+err.stack;
          }
          this.setError(errtxt);
          this.setStatus("Error.");
          this.state = 3; // incomplete
          this.enableItems();
        }
      }
    }
    if (this.opts.useSync) {
      this.rebuildSolidSync();
    }
  },

  getState: function() {
    return this.state;
  },

  clearOutputFile: function() {
    if(this.hasOutputFile)
    {
      this.hasOutputFile = false;
      if(this.outputFileDirEntry)
      {
        this.outputFileDirEntry.removeRecursively(function(){});
        this.outputFileDirEntry=null;
      }
      if(this.outputFileBlobUrl)
      {
        OpenJsCad.revokeBlobUrl(this.outputFileBlobUrl);
        this.outputFileBlobUrl = null;
      }
      this.enableItems();
    }
  },

  generateOutputFile: function() {
    this.clearOutputFile();
    if(this.viewedObject) {
      try
      {
        this.generateOutputFileFileSystem();
      }
      catch(e)
      {
        this.generateOutputFileBlobUrl();
      }
      if(this.ondownload) this.ondownload(this);
    }
  },

  currentObjectsToBlob: function() {
    var startpoint = this.selectStartPoint;
    var endpoint   = this.selectEndPoint;
    if (startpoint > endpoint) { startpoint = this.selectEndPoint; endpoint = this.selectStartPoint; };

    var objs = this.currentObjects.slice(startpoint,endpoint+1);

    return this.convertToBlob(objs,this.selectedFormat());
  },

  convertToBlob: function(objs,format) {
    var formatInfo = this.formatInfo(format);
  // review the given objects
    var i;
    var foundCSG = false;
    var foundCAG = false;
    for (i = 0; i < objs.length; i++ ) {
      if (objs[i] instanceof CSG) { foundCSG = true; }
      if (objs[i] instanceof CAG) { foundCAG = true; }
    }
  // convert based on the given format
    foundCSG = foundCSG && formatInfo.convertCSG;
    foundCAG = foundCAG && formatInfo.convertCAG;
    if (foundCSG && foundCAG) { foundCAG = false; } // use 3D conversion

    var object = new CSG();
    if ( foundCSG == false ) { object = new CAG(); }
    for (i = 0; i < objs.length; i++ ) {
      if (foundCSG == true && objs[i] instanceof CAG) {
        object = object.union(objs[i].extrude({offset: [0,0,0.1]})); // convert CAG to a thin solid CSG
        continue;
      }
      if (foundCAG == true && objs[i] instanceof CSG) {
        continue;
      }
      object = object.union(objs[i]);
    }

    var blob = null;
    switch(format) {
      case 'stla':
        blob = object.toStlString();
        //blob = object.fixTJunctions().toStlString();
        break;
      case 'stlb':
        //blob = this.viewedObject.fixTJunctions().toStlBinary();   // gives normal errors, but we keep it for now (fixTJunctions() needs debugging)
        blob = object.toStlBinary({webBlob: true});
        break;
      case 'amf':
        blob = object.toAMFString({
          producer: "OpenJSCAD.org "+OpenJsCad.version,
          date: new Date()
        });
        blob = new Blob([blob],{ type: formatInfo.mimetype });
        break;
      case 'x3d':
        blob = object.fixTJunctions().toX3D();
        break;
      case 'dxf':
        blob = object.toDxf();
        break;
      case 'svg':
        blob = object.toSvg();
        break;
      case 'jscad':
        blob = new Blob([this.script], {type: formatInfo.mimetype });
        break;
      case 'json':
        blob = object.toJSON();
        break;
      default:
        throw new Error("Not supported");
    }
    return blob;
  },

  supportedFormatsForCurrentObjects: function() {
    var startpoint = this.selectStartPoint;
    var endpoint   = this.selectEndPoint;
    if (startpoint > endpoint) { startpoint = this.selectEndPoint; endpoint = this.selectStartPoint; };

    var objs = this.currentObjects.slice(startpoint,endpoint+1);

    this.formatInfo("stla"); // make sure the formats are initialized

    var objectFormats = [];
    var i;
    var format;
    var foundCSG = false;
    var foundCAG = false;
    for (i = 0; i < objs.length; i++ ) {
      if (objs[i] instanceof CSG) { foundCSG = true; }
      if (objs[i] instanceof CAG) { foundCAG = true; }
    }
    for (format in this.formats) {
      if (foundCSG && this.formats[format].convertCSG == true ) {
          objectFormats[objectFormats.length] = format;
          continue; // only add once
      }
      if (foundCAG && this.formats[format].convertCAG == true ) {
          objectFormats[objectFormats.length] = format;
      }
    }
    return objectFormats;
  },

  formatInfo: function(format) {
    if ( this.formats === null ) {
      this.formats = {
          stla:  { displayName: "STL (ASCII)", extension: "stl", mimetype: "application/sla", convertCSG: true, convertCAG: false },
          stlb:  { displayName: "STL (Binary)", extension: "stl", mimetype: "application/sla", convertCSG: true, convertCAG: false },
          amf:   { displayName: "AMF (experimental)", extension: "amf", mimetype: "application/amf+xml", convertCSG: true, convertCAG: false },
          x3d:   { displayName: "X3D", extension: "x3d", mimetype: "model/x3d+xml", convertCSG: true, convertCAG: false },
          dxf:   { displayName: "DXF", extension: "dxf", mimetype: "application/dxf", convertCSG: false, convertCAG: true },
          jscad: { displayName: "JSCAD", extension: "jscad", mimetype: "application/javascript", convertCSG: true, convertCAG: true },
          svg:   { displayName: "SVG", extension: "svg", mimetype: "image/svg+xml", convertCSG: false, convertCAG: true },
        };
    }
    return this.formats[format];
  },

  downloadLinkTextForCurrentObject: function() {
    var ext = this.selectedFormatInfo().extension;
    return "Download "+ext.toUpperCase();
  },

  generateOutputFileBlobUrl: function() {
    if (OpenJsCad.isSafari()) {
      //console.log("Trying download via DATA URI");
    // convert BLOB to DATA URI
      var blob = this.currentObjectsToBlob();
      var that = this;
      var reader = new FileReader();
      reader.onloadend = function() {
        if (reader.result) {
          that.hasOutputFile = true;
          that.downloadOutputFileLink.href = reader.result;
          that.downloadOutputFileLink.innerHTML = that.downloadLinkTextForCurrentObject();
          var ext = that.selectedFormatInfo().extension;
          that.downloadOutputFileLink.setAttribute("download","openjscad."+ext);
          that.downloadOutputFileLink.setAttribute("target", "_blank");
          that.enableItems();
        }
      };
      reader.readAsDataURL(blob);
    } else {
      //console.log("Trying download via BLOB URL");
    // convert BLOB to BLOB URL (HTML5 Standard)
      var blob = this.currentObjectsToBlob();
      var windowURL=OpenJsCad.getWindowURL();
      this.outputFileBlobUrl = windowURL.createObjectURL(blob);
      if(!this.outputFileBlobUrl) throw new Error("createObjectURL() failed");
      this.hasOutputFile = true;
      this.downloadOutputFileLink.href = this.outputFileBlobUrl;
      this.downloadOutputFileLink.innerHTML = this.downloadLinkTextForCurrentObject();
      var ext = this.selectedFormatInfo().extension;
      this.downloadOutputFileLink.setAttribute("download", "openjscad."+ext);
      this.enableItems();
    }
  },

  generateOutputFileFileSystem: function() {
    var request = window.requestFileSystem || window.webkitRequestFileSystem;
    if(!request) {
      throw new Error("Your browser does not support the HTML5 FileSystem API. Please try the Chrome browser instead.");
    }
    //console.log("Trying download via FileSystem API");
    // create a random directory name:
    var extension = this.selectedFormatInfo().extension;
    var dirname = "OpenJsCadOutput1_"+parseInt(Math.random()*1000000000, 10)+"_"+extension;
    var filename = "output."+extension; // FIXME this should come from this.filename
    var that = this;
    request(TEMPORARY, 20*1024*1024, function(fs){
        fs.root.getDirectory(dirname, {create: true, exclusive: true}, function(dirEntry) {
            that.outputFileDirEntry = dirEntry; // save for later removal
            dirEntry.getFile(filename, {create: true, exclusive: true}, function(fileEntry) {
                 fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                      that.hasOutputFile = true;
                      that.downloadOutputFileLink.href = fileEntry.toURL();
                      that.downloadOutputFileLink.type = that.selectedFormatInfo().mimetype;
                      that.downloadOutputFileLink.innerHTML = that.downloadLinkTextForCurrentObject();
                      that.downloadOutputFileLink.setAttribute("download", fileEntry.name);
                      that.enableItems();
                    };
                    fileWriter.onerror = function(e) {
                      throw new Error('Write failed: ' + e.toString());
                    };
                    var blob = that.currentObjectsToBlob();
                    fileWriter.write(blob);
                  },
                  function(fileerror){OpenJsCad.FileSystemApiErrorHandler(fileerror, "createWriter");}
                );
              },
              function(fileerror){OpenJsCad.FileSystemApiErrorHandler(fileerror, "getFile('"+filename+"')");}
            );
          },
          function(fileerror){OpenJsCad.FileSystemApiErrorHandler(fileerror, "getDirectory('"+dirname+"')");}
        );
      },
      function(fileerror){OpenJsCad.FileSystemApiErrorHandler(fileerror, "requestFileSystem");}
    );
  },

  createGroupControl: function(definition) {
    var control = document.createElement("title");
    control.paramName = definition.name;
    control.paramType = definition.type;
    if('caption' in definition) {
      control.text = definition.caption;
      control.className = 'caption';
    } else {
      control.text = definition.name;
    }
    return control;
  },

  createChoiceControl: function(definition) {
    if(!('values' in definition))
    {
      throw new Error("Definition of choice parameter ("+definition.name+") should include a 'values' parameter");
    }
    var control = document.createElement("select");
    control.paramName = definition.name;
    control.paramType = definition.type;
    var values = definition.values;
    var captions;
    if('captions' in definition)
    {
      captions = definition.captions;
      if(captions.length != values.length)
      {
        throw new Error("Definition of choice parameter ("+definition.name+") should have the same number of items for 'captions' and 'values'");
      }
    }
    else
    {
      captions = values;
    }
    var selectedindex = 0;
    for(var valueindex = 0; valueindex < values.length; valueindex++)
    {
      var option = document.createElement("option");
      option.value = values[valueindex];
      option.text = captions[valueindex];
      control.add(option);
      if('default' in definition)
      {
        if(definition["default"] == values[valueindex])
        {
          selectedindex = valueindex;
        }
      }
      else if('initial' in definition)
      {
        if(definition.initial == values[valueindex])
        {
          selectedindex = valueindex;
        }
      }
    }
    if(values.length > 0)
    {
      control.selectedIndex = selectedindex;
    }
    return control;
  },

  createControl: function(definition) {
    var control_list = [
      {type: "text"    , control: "text"    , required: ["index","type","name"], initial: ""},
      {type: "int"     , control: "number"  , required: ["index","type","name"], initial: 0},
      {type: "float"   , control: "number"  , required: ["index","type","name"], initial: 0.0},
      {type: "number"  , control: "number"  , required: ["index","type","name"], initial: 0.0},
      {type: "checkbox", control: "checkbox", required: ["index","type","name","checked"], initial: ""},
      {type: "radio"   , control: "radio"   , required: ["index","type","name","checked"], initial: ""},
      {type: "color"   , control: "color"   , required: ["index","type","name"], initial: "#000000"},
      {type: "date"    , control: "date"    , required: ["index","type","name"], initial: ""},
      {type: "email"   , control: "email"   , required: ["index","type","name"], initial: ""},
      {type: "password", control: "password", required: ["index","type","name"], initial: ""},
      {type: "url"     , control: "url"     , required: ["index","type","name"], initial: ""},
      {type: "slider"  , control: "range"   , required: ["index","type","name","min","max"], initial: 0, label: true},
    ];
  // check for required parameters
    if(!('type' in definition)) {
      throw new Error("Parameter definition ("+definition.index+ ") must include a 'type' parameter");
    }
    var control = document.createElement("input");
    var i,j,c_type,p_name;
    for (i = 0; i < control_list.length; i++) {
      c_type = control_list[i];
      if (c_type.type == definition.type) {
        for (j = 0; j < c_type.required.length; j++) {
          p_name = c_type.required[j];
          if(p_name in definition) {
            if(p_name == "index") continue;
            if(p_name == "type") continue;
            if (p_name == "checked") { // setAttribute() only accepts strings
              control.checked = definition.checked;
            } else {
              control.setAttribute(p_name, definition[p_name]);
            }
          } else {
            throw new Error("Parameter definition ("+definition.index+ ") must include a '"+p_name+"' parameter");
          }
        }
        break;
      }
    }
    if (i == control_list.length) {
      throw new Error("Parameter definition ("+definition.index+ ") is not a valid 'type'");
    }
  // set the control type
    control.setAttribute("type", c_type.control);
  // set name and type for obtaining values
    control.paramName = definition.name;
    control.paramType = definition.type;
  // determine initial value of control
    if('initial' in definition) {
      control.value = definition.initial;
    } else if('default' in definition) {
      control.value = definition.default;
    } else {
      control.value = c_type.initial;
    }
  // set generic HTML attributes
    for (var property in definition) {
      if (definition.hasOwnProperty(property)) {
        if (c_type.required.indexOf(property) < 0) {
          control.setAttribute(property, definition[property]);
        }
      }
    }
  // add a label if necessary
    if('label' in c_type) {
      control.label = document.createElement("label");
      control.label.innerHTML = control.value;
    }
    return control;
  },

  createParamControls: function() {
    this.parameterstable.innerHTML = "";
    this.paramControls = [];

    for(var i = 0; i < this.paramDefinitions.length; i++)
    {
      var paramdef = this.paramDefinitions[i];
      paramdef.index = i+1;

      var control = null;
      var type = paramdef.type.toLowerCase();
      switch (type) {
        case 'choice':
          control = this.createChoiceControl(paramdef);
          break;
        case 'group':
          control = this.createGroupControl(paramdef);
          break;
        default:
          control = this.createControl(paramdef);
          break;
      }
    // add the appropriate element to the table
      var tr = document.createElement("tr");
      if(type == "group") {
        var th = document.createElement("th");
        if('className' in control) {
          th.className = control.className;
        }
        th.innerHTML = control.text;
        tr.appendChild(th);
      } else {
        // implementing instantUpdate
        var that = this;
        control.onchange = function(e) {
          var l = e.currentTarget.nextElementSibling;
          if(l !== null && l.nodeName == "LABEL") {
            l.innerHTML = e.currentTarget.value;
          }
          if(document.getElementById("instantUpdate").checked==true) {
            that.rebuildSolid();
          }
        };
        this.paramControls.push(control);

        var td = document.createElement("td");
        var label = paramdef.name + ":";
        if('caption' in paramdef)
        {
          label = paramdef.caption;
          td.className = 'caption';
        }
        td.innerHTML = label;
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(control);
        if("label" in control) {
          td.appendChild(control.label);
        }
        tr.appendChild(td);
      }
      this.parameterstable.appendChild(tr);
    }
  },
};

module.OpenJsCad = OpenJsCad;

})(this);
