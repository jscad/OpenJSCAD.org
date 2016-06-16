// A viewer is a WebGL canvas that lets the user view a mesh. The user can
// tumble it around by dragging the mouse.
OpenJsCad.Viewer.LightGLEngine = function(containerEl, size, options) {

  this.options = options;
  this.size    = size;

  // the element to contain the canvas
  this.containerEl = containerEl;

  this.createScene();
  this.createCamera();
  this.parseSizeParams();

  // createRenderer will also call render
  this.createRenderer(options.noWebGL);
  this.animate();

};

OpenJsCad.Viewer.LightGLEngine.prototype = {
  init: function () {},
  createScene: function () {
    // TODO: move axes and grid creation here
  },
  createCamera: function () {
    // TODO: move camera and light creation here
  },
  createControls: function (canvas) {
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
        this.clearShift();
        this.onTransform(e);
        e.preventDefault();
      }
    }.bind (this)).on("touch", function(e) {
      if (e.gesture.pointerType != 'touch'){
        e.preventDefault();
        return;
      }

      if (e.gesture.touches.length == 1) {
        var point = e.gesture.center;
        this.touch.shiftTimer = setTimeout(function(){
          shiftControl.addClass('active').css({
            left: point.pageX + 'px',
            top: point.pageY + 'px'
          });
          this.touch.shiftTimer = null;
          this.touch.cur = 'shifting';
        }.bind (this), 500);
      } else {
        this.clearShift();
      }
    }.bind (this)).on("drag", function(e) {
      if (e.gesture.pointerType != 'touch') {
        e.preventDefault();
        return;
      }

      if (!this.touch.cur || this.touch.cur == 'dragging') {
        this.clearShift();
        this.onPanTilt(e);
      } else if (this.touch.cur == 'shifting') {
        this.onShift(e);
      }
    }.bind (this)).on("touchend", function(e) {
      this.clearShift();
      if (this.touch.cur) {
        shiftControl.removeClass('active shift-horizontal shift-vertical');
      }
    }.bind (this)).on("transformend dragstart dragend", function(e) {
      if ((e.type == 'transformend' && this.touch.cur == 'transforming') ||
          (e.type == 'dragend' && this.touch.cur == 'shifting') ||
          (e.type == 'dragend' && this.touch.cur == 'dragging'))
        this.touch.cur = null;
      this.touch.lastX = 0;
      this.touch.lastY = 0;
      this.touch.scale = 0;
    }.bind (this));

    this.gl.onmousemove = function(e) {
      this.onMouseMove(e);
    }.bind (this);

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
        var coeff = this.getZoom();
        coeff *= factor;
        this.setZoom(coeff);
      }
    }.bind (this);

    return shiftControl;
  },
  createRenderer: function (noWebGL) {
    // Set up WebGL state
    var gl = GL.create();
    this.gl = gl;
    this.gl.lineWidth(1); // don't let the library choose

    this.meshes = [];

    this.containerEl.appendChild (this.gl.canvas);

    this.parseSizeParams();
    this.handleResize();
    this.gl.resizeCanvas = this.handleResize.bind (this);
    // only window resize is available, so add an event callback for the canvas
    // window.addEventListener( 'resize', this.handleResize.bind (this) );

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    // background color

    var bgColor = this.options.background.color;
    this.gl.clearColor(bgColor.r, bgColor.g, bgColor.b, bgColor.a || 1.);
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

    this.clear(); // and draw the inital viewer
  },
  animate: function () {
    // TODO?
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
    // camera rotation
    gl.rotate(this.angleX, 1, 0, 0);
    gl.rotate(this.angleY, 0, 1, 0);
    gl.rotate(this.angleZ, 0, 0, 1);
    // draw the solid (meshes)
    if(this.options.solid.draw) {
      gl.enable(gl.BLEND);
      if(this.options.solid.faces) {
        if (!this.options.solid.overlay) gl.enable(gl.POLYGON_OFFSET_FILL);
        for (var i = 0; i < this.meshes.length; i++) {
          var mesh = this.meshes[i];
          this.lightingShader.draw(mesh, gl.TRIANGLES);
        }
        if (!this.options.solid.overlay) gl.disable(gl.POLYGON_OFFSET_FILL);
        gl.disable(gl.BLEND);
      }

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

    if(this.options.grid.draw) {
      this.drawGrid();
    }
    if (this.options.axes.draw) {
      this.drawAxes();
    }
    if(0) { // WHAT IS THIS FOR?
      gl.triangle();
      gl.color(0.6, 0.2, 0.6, 0.2); //positive direction
      gl.vertex(-plate,-plate,0);
      gl.vertex(plate,-plate,0);
      gl.vertex(plate,plate,0);
      gl.end();
      gl.triangle();
      gl.color(0.6, 0.2, 0.6, 0.2); //positive direction
      gl.vertex(plate,plate,0);
      gl.vertex(-plate,plate,0);
      gl.vertex(-plate,-plate,0);
      gl.end();
    }
    gl.end();
    gl.disable(gl.BLEND);
  },
  drawAxes: function () {
    var gl = this.gl;
    var size = this.options.grid.size/2;
    var axes = this.options.axes;
    // X axis
    var c = axes.x.neg;
    gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
    gl.vertex(-size, 0, 0);
    gl.vertex(0, 0, 0);
    c = axes.x.pos;
    gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
    gl.vertex(0, 0, 0);
    gl.vertex(size, 0, 0);
    // Y axis
    c = axes.y.neg;
    gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
    gl.vertex(0, -size, 0);
    gl.vertex(0, 0, 0);
    c = axes.y.pos;
    gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
    gl.vertex(0, 0, 0);
    gl.vertex(0, size, 0);
    // Z axis
    c = axes.z.neg;
    gl.color(c.r, c.g, c.b, c.a); //negative direction is lighter
    gl.vertex(0, 0, -size);
    gl.vertex(0, 0, 0);
    c = axes.z.pos;
    gl.color(c.r, c.g, c.b, c.a); //positive direction is lighter
    gl.vertex(0, 0, 0);
    gl.vertex(0, 0, size);
  },
  drawGrid: function () {
    var gl = this.gl;
    var m = this.options.grid.m; // short cut
    var M = this.options.grid.M; // short cut
    var size = this.options.grid.size/2;
    // -- minor grid
    gl.color(m.color.r,m.color.g,m.color.b,m.color.a);
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
    gl.color(M.color.r,M.color.g,M.color.b,M.color.a);
    for(var x=-size; x<=size; x+=MG) {
      gl.vertex(-size, x, 0);
      gl.vertex(size, x, 0);
      gl.vertex(x, -size, 0);
      gl.vertex(x, size, 0);
    }
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
      var faceColor = this.options.solid.faceColor;
      var color = [faceColor.r, faceColor.g, faceColor.b, faceColor.a || 1];  // default color

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
  handleResize: function () {
    var canvas = this.gl.canvas;

    this.resizeCanvas (canvas);

    this.gl.viewport(0, 0, canvas.width, canvas.height);
    this.gl.matrixMode( this.gl.PROJECTION );
    this.gl.loadIdentity();
    this.gl.perspective(this.options.camera.fov, canvas.width / canvas.height, this.options.camera.clip.min, this.options.camera.clip.max );
    this.gl.matrixMode(this.gl.MODELVIEW );
    this.onDraw();
  }
};
