// == openjscad.js, originally written by Joost Nieuwenhuijse (MIT License)
//   few adjustments by Rene K. Mueller <spiritdude@gmail.com> for OpenJSCAD.org
//
// History:
// 2013/03/12: reenable webgui parameters to fit in current design
// 2013/03/11: few changes to fit design of http://openjscad.org

OpenJsCad = function() { };

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

// A viewer is a WebGL canvas that lets the user view a mesh. The user can
// tumble it around by dragging the mouse.
OpenJsCad.Viewer = function(containerelement, width, height, initialdepth) {
  var gl = GL.create();
  this.gl = gl;
  this.angleX = -60;
  this.angleY = 0;
  this.angleZ = -45;
  this.viewpointX = 0;
  this.viewpointY = -5;
  this.viewpointZ = initialdepth;

  this.touch = {
    lastX: 0,
    lastY: 0,
    scale: 0,
    ctrl: 0,
    shiftTimer: null,
    shiftControl: null,
    cur: null //current state
  };


  // Draw axes flag:
  this.drawAxes = true;
  // Draw triangle lines:
  this.drawLines = false;
  // Set to true so lines don't use the depth buffer
  this.lineOverlay = false;

  // Set up the viewport
  gl.canvas.width = width;
  gl.canvas.height = height;
  gl.viewport(0, 0, width, height);
  gl.matrixMode(gl.PROJECTION);
  gl.loadIdentity();
  gl.perspective(45, width / height, 0.5, 1000);
  gl.matrixMode(gl.MODELVIEW);

  // Set up WebGL state
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0.93, 0.93, 0.93, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.polygonOffset(1, 1);

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
  this.touch.shiftControl = shiftControl;

  $(containerelement).append(gl.canvas)
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

  gl.onmousemove = function(e) {
    _this.onMouseMove(e);
  };
  gl.ondraw = function() {
    _this.onDraw();
  };
  containerelement.onresize = function(e) {    // is not called
     // var viewer = document.getElementById('viewer');
     // fix distortion after resize of canvas
     //gl.perspective(45, viewer.offsetWidth / viewer.offsetHeight, 0.5, 1000);
     //_this.gl.perspective(45, containerelement.offsetWidth / containerelement.offsetHeight, 0.5, 1000);
     alert("canvas has been resized");
  };
  gl.onmousewheel = function(e) {
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
  this.clear();
};

OpenJsCad.Viewer.prototype = {
  setCsg: function(csg) {
    if(0&&csg.length) {                            // preparing multiple CSG's (not union-ed), not yet working
       for(var i=0; i<csg.length; i++)
          this.meshes.concat(OpenJsCad.Viewer.csgToMeshes(csg[i]));
    } else {
       this.meshes = OpenJsCad.Viewer.csgToMeshes(csg);
    }
    this.onDraw();    
  },

  clear: function() {
    // empty mesh list:
    this.meshes = []; 
    this.onDraw();    
  },

  supported: function() {
    return !!this.gl;
  },

  ZOOM_MAX: 1000,
  ZOOM_MIN: 10,
  onZoomChanged: null,
  plate: true,                   // render plate

  setZoom: function(coeff) { //0...1
    coeff=Math.max(coeff, 0);
    coeff=Math.min(coeff, 1);
    this.viewpointZ = this.ZOOM_MIN + coeff * (this.ZOOM_MAX - this.ZOOM_MIN);
    if(this.onZoomChanged) {
      this.onZoomChanged();
    }
    this.onDraw();
  },

  getZoom: function() {
    var coeff = (this.viewpointZ-this.ZOOM_MIN) / (this.ZOOM_MAX - this.ZOOM_MIN);
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
      } else if(e.ctrlKey) {                   // ZOOM IN/OU
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
    gl.translate(this.viewpointX, this.viewpointY, -this.viewpointZ);
    gl.rotate(this.angleX, 1, 0, 0);
    gl.rotate(this.angleY, 0, 1, 0);
    gl.rotate(this.angleZ, 0, 0, 1);

    gl.enable(gl.BLEND);
    //gl.disable(gl.DEPTH_TEST);
    if (!this.lineOverlay) gl.enable(gl.POLYGON_OFFSET_FILL);
    for (var i = 0; i < this.meshes.length; i++) {
      var mesh = this.meshes[i];
      this.lightingShader.draw(mesh, gl.TRIANGLES);
    }
    if (!this.lineOverlay) gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.disable(gl.BLEND);
    //gl.enable(gl.DEPTH_TEST);

    if(this.drawLines) {
      if (this.lineOverlay) gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      for (var i = 0; i < this.meshes.length; i++) {
        var mesh = this.meshes[i];
        this.blackShader.draw(mesh, gl.LINES);
      }
      gl.disable(gl.BLEND);
      if (this.lineOverlay) gl.enable(gl.DEPTH_TEST);
    }
    //EDW: axes
    if (this.drawAxes) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.begin(gl.LINES);
      var plate = 200;
      if(this.plate) {
         gl.color(.8,.8,.8,.5); // -- minor grid
         for(var x=-plate/2; x<=plate/2; x++) {
            if(x%10) {
               gl.vertex(-plate/2, x, 0);
               gl.vertex(plate/2, x, 0);
               gl.vertex(x, -plate/2, 0);
               gl.vertex(x, plate/2, 0);
            }
         }
         gl.color(.5,.5,.5,.5); // -- major grid
         for(var x=-plate/2; x<=plate/2; x+=10) {
            gl.vertex(-plate/2, x, 0);
            gl.vertex(plate/2, x, 0);
            gl.vertex(x, -plate/2, 0);
            gl.vertex(x, plate/2, 0);
         }
      }
      if(0) {
         //X - red
         gl.color(1, 0.5, 0.5, 0.2); //negative direction is lighter
         gl.vertex(-100, 0, 0);
         gl.vertex(0, 0, 0);
   
         gl.color(1, 0, 0, 0.8); //positive direction
         gl.vertex(0, 0, 0);
         gl.vertex(100, 0, 0);
         //Y - green
         gl.color(0.5, 1, 0.5, 0.2); //negative direction is lighter
         gl.vertex(0, -100, 0);
         gl.vertex(0, 0, 0);
   
         gl.color(0, 1, 0, 0.8); //positive direction
         gl.vertex(0, 0, 0);
         gl.vertex(0, 100, 0);
         //Z - black
         gl.color(0.5, 0.5, 0.5, 0.2); //negative direction is lighter
         gl.vertex(0, 0, -100);
         gl.vertex(0, 0, 0);
   
         gl.color(0.2, 0.2, 0.2, 0.8); //positive direction
         gl.vertex(0, 0, 0);
         gl.vertex(0, 0, 100);
      }
      if(0) {
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
      // GL.Mesh.plane({ detailX: 20, detailY: 40 });
    }
  }
};

// Convert from CSG solid to an array of GL.Mesh objects
// limiting the number of vertices per mesh to less than 2^16
OpenJsCad.Viewer.csgToMeshes = function(initial_csg) {
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
  var smoothlighting = false;
  var polygons = csg.toPolygons();
  var numpolygons = polygons.length;
  for(var j = 0; j < numpolygons; j++) {
    var polygon = polygons[j];
    var color = [1,.4,1,1];      // -- default color

    if(polygon.shared && polygon.shared.color) {
      color = polygon.shared.color;
    }
    if(polygon.color) {
      color = polygon.color;
    }

	if (color.length < 4)
		color.push(1.); //opaque

    var indices = polygon.vertices.map(function(vertex) {
      var vertextag = vertex.getTag();
      var vertexindex;
      if(smoothlighting && (vertextag in vertexTag2Index)) {
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
      // start a new mesh
      mesh = new GL.Mesh({ normals: true, colors: true });
      triangles = [];
      colors = [];
      vertices = [];
      meshes.push(mesh);	
    }
  }
  // finalize last mesh
  mesh.triangles = triangles;
  mesh.vertices = vertices;
  mesh.colors = colors;
  mesh.computeWireframe();
  mesh.computeNormals();
  return meshes;
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
  return (navigator.userAgent.search("Chrome") >= 0);
};

// This is called from within the web worker. Execute the main() function of the supplied script
// and post a message to the calling thread when finished
OpenJsCad.runMainInWorker = function(mainParameters) {
  try {
    if(typeof(main) != 'function') throw new Error('Your jscad file should contain a function main() which returns a CSG solid or a CAG area.');
    OpenJsCad.log.prevLogTime = Date.now();    
    var result = main(mainParameters);
    if( (typeof(result) != "object") || ((!(result instanceof CSG)) && (!(result instanceof CAG)))) {
      //throw new Error("Your main() function should return a CSG solid or a CAG area.");
    }
    if(result.length) {                   // main() return an array, we consider it a bunch of CSG not intersecting
       var o = result[0];
       if(o instanceof CAG) {
          o = o.extrude({offset: [0,0,0.1]});
       }
       for(var i=1; i<result.length; i++) {
          var c = result[i];
          if(c instanceof CAG) {
             c = c.extrude({offset: [0,0,0.1]});
          }
          o = o.unionForNonIntersecting(c);
       }
       result = o;
    } 
    var result_compact = result.toCompactBinary();   
    result = null; // not needed anymore
    self.postMessage({cmd: 'rendered', result: result_compact});
  }
  catch(e) {
    var errtxt = e.stack;
    if(!errtxt) {
      errtxt = e.toString();
    } 
    self.postMessage({cmd: 'error', err: errtxt});
  }
};

OpenJsCad.parseJsCadScriptSync = function(script, mainParameters, debugging) {
  var workerscript = "//SYNC\n";
  workerscript += "_includePath = "+JSON.stringify(_includePath)+";\n";
  workerscript += script;
  if(debugging) {
    workerscript += "\n\n\n\n\n\n\n/* -------------------------------------------------------------------------\n";
    workerscript += "OpenJsCad debugging\n\nAssuming you are running Chrome:\nF10 steps over an instruction\nF11 steps into an instruction\n";
    workerscript += "F8  continues running\nPress the (||) button at the bottom to enable pausing whenever an error occurs\n";
    workerscript += "Click on a line number to set or clear a breakpoint\n";
    workerscript += "For more information see: http://code.google.com/chrome/devtools/docs/overview.html\n\n";
    workerscript += "------------------------------------------------------------------------- */\n"; 
    workerscript += "\n\n// Now press F11 twice to enter your main() function:\n\n";
    workerscript += "debugger;\n";
  }
  workerscript += "var me = " + JSON.stringify(me) + ";\n";
  workerscript += "return main("+JSON.stringify(mainParameters)+");";  
// trying to get include() somewhere:
// 1) XHR works for SYNC <---
// 2) importScripts() does not work in SYNC
// 3) _csg_libraries.push(fn) provides only 1 level include()

  workerscript += "function include(fn) {\
  if(0) {\
    _csg_libraries.push(fn);\
  } else if(0) {\
    var url = _includePath!=='undefined'?_includePath:'./';\
    var index = url.indexOf('index.html');\
    if(index!=-1) {\
       url = url.substring(0,index);\
    }\
  	 importScripts(url+fn);\
  } else {\
   console.log('SYNC checking gMemFs for '+fn);\
   if(gMemFs[fn]) {\
      console.log('found locally & eval:',gMemFs[fn].name);\
      eval(gMemFs[fn].source); return;\
   }\
   var xhr = new XMLHttpRequest();\
   xhr.open('GET',_includePath+fn,false);\
   console.log('include:'+_includePath+fn);\
   xhr.onload = function() {\
      var src = this.responseText;\
      eval(src);\
   };\
   xhr.onerror = function() {\
   };\
   xhr.send();\
  }\
}\
";
  //workerscript += "function includePath(p) { _includePath = p; }\n";
  
  if(0) {
    OpenJsCad.log.prevLogTime = Date.now();    
    return eval(workerscript);      // old fashion-way

  } else {
    var f = new Function(workerscript);
    OpenJsCad.log.prevLogTime = Date.now();    
    return f();                     // execute the actual code
  }
};

// callback: should be function(error, csg)
OpenJsCad.parseJsCadScriptASync = function(script, mainParameters, options, callback) {
  var baselibraries = [
    "csg.js",
    "openjscad.js",
    "openscad.js"
    //"jquery/jquery-1.9.1.js",
    //"jquery/jquery-ui.js"
  ];

  var baseurl = document.location.href.replace(/\?.*$/, '');
  baseurl = baseurl.replace(/#.*$/,'');        // remove remote URL 
  var openjscadurl = baseurl;
  if (options['openJsCadPath'] != null) {
    openjscadurl = OpenJsCad.makeAbsoluteUrl( options['openJsCadPath'], baseurl );
  }
        
  var libraries = [];
  if (options['libraries'] != null) {
    libraries = options['libraries'];
  }
  for(var i in gMemFs) {            // let's test all files and check syntax before we do anything
    var src = gMemFs[i].source+"\nfunction include() { }\n";
    var f;
    try {
       f = new Function(src);
    } catch(e) {
      this.setError(i+": "+e.message);
    }
  }
  var workerscript = "//ASYNC\n";
  workerscript += "var me = " + JSON.stringify(me) + ";\n";
  workerscript += "var _csg_baseurl=" + JSON.stringify(baseurl)+";\n";        // -- we need it early for include()
  workerscript += "var _includePath=" + JSON.stringify(_includePath)+";\n";    //        ''            ''
  workerscript += "var gMemFs = [];\n";
  var ignoreInclude = false;
  var mainFile;
  for(var fn in gMemFs) {
     workerscript += "// "+gMemFs[fn].name+":\n";
     //workerscript += gMemFs[i].source+"\n";
     if(!mainFile) 
        mainFile = fn;
     if(fn=='main.jscad'||fn.match(/\/main.jscad$/)) 
        mainFile = fn;
     workerscript += "gMemFs[\""+gMemFs[fn].name+"\"] = "+JSON.stringify(gMemFs[fn].source)+";\n";
     ignoreInclude = true;
  }
  if(ignoreInclude) {
     workerscript += "eval(gMemFs['"+mainFile+"']);\n";
  } else {
     workerscript += script;
  }
  workerscript += "\n\n\n\n//// The following code is added by OpenJsCad + OpenJSCAD.org:\n";

  workerscript += "var _csg_baselibraries=" + JSON.stringify(baselibraries)+";\n";
  workerscript += "var _csg_libraries=" + JSON.stringify(libraries)+";\n";
  workerscript += "var _csg_openjscadurl=" + JSON.stringify(openjscadurl)+";\n";
  workerscript += "var _csg_makeAbsoluteURL=" + OpenJsCad.makeAbsoluteUrl.toString()+";\n";
//  workerscript += "if(typeof(libs) == 'function') _csg_libraries = _csg_libraries.concat(libs());\n";
  workerscript += "_csg_baselibraries = _csg_baselibraries.map(function(l){return _csg_makeAbsoluteURL(l,_csg_openjscadurl);});\n";
  workerscript += "_csg_libraries = _csg_libraries.map(function(l){return _csg_makeAbsoluteURL(l,_csg_baseurl);});\n";
  workerscript += "_csg_baselibraries.map(function(l){importScripts(l)});\n";
  workerscript += "_csg_libraries.map(function(l){importScripts(l)});\n";
  workerscript += "self.addEventListener('message', function(e) {if(e.data && e.data.cmd == 'render'){";
  workerscript += "  OpenJsCad.runMainInWorker("+JSON.stringify(mainParameters)+");";
//  workerscript += "  if(typeof(main) != 'function') throw new Error('Your jscad file should contain a function main() which returns a CSG solid.');\n";
//  workerscript += "  var csg; try {csg = main("+JSON.stringify(mainParameters)+"); self.postMessage({cmd: 'rendered', csg: csg});}";
//  workerscript += "  catch(e) {var errtxt = e.stack; self.postMessage({cmd: 'error', err: errtxt});}";
  workerscript += "}},false);\n";

// trying to get include() somewhere: 
// 1) XHR fails: not allowed in blobs
// 2) importScripts() works for ASYNC <----
// 3) _csg_libraries.push(fn) provides only 1 level include()

  if(!ignoreInclude) {
     workerscript += "function include(fn) {\
  if(0) {\
    _csg_libraries.push(fn);\
  } else if(1) {\
   if(gMemFs[fn]) {\
      eval(gMemFs[fn]); return;\
   }\
    var url = _csg_baseurl+_includePath;\
    var index = url.indexOf('index.html');\
    if(index!=-1) {\
       url = url.substring(0,index);\
    }\
  	 importScripts(url+fn);\
  } else {\
   var xhr = new XMLHttpRequest();\
   xhr.open('GET', _includePath+fn, true);\
   xhr.onload = function() {\
      return eval(this.responseText);\
   };\
   xhr.onerror = function() {\
   };\
   xhr.send();\
  }\
}\
";
  } else {
     //workerscript += "function include() {}\n";
     workerscript += "function include(fn) { eval(gMemFs[fn]); }\n";
  }
  //workerscript += "function includePath(p) { _includePath = p; }\n";
  var blobURL = OpenJsCad.textToBlobUrl(workerscript);
  
  if(!window.Worker) throw new Error("Your browser doesn't support Web Workers. Please try the Chrome or Firefox browser instead.");
  var worker = new Worker(blobURL);
  worker.onmessage = function(e) {
    if(e.data)
    { 
      if(e.data.cmd == 'rendered')
      {
        var resulttype = e.data.result.class;
        var result;
        if(resulttype == "CSG")
        {
          result = CSG.fromCompactBinary(e.data.result);
        }
        else if(resulttype == "CAG")
        {
          result = CAG.fromCompactBinary(e.data.result);
        }
        else
        {
          throw new Error("Cannot parse result");
        }
        callback(null, result);
      }
      else if(e.data.cmd == "error")
      {
        callback(e.data.err, null);
      }
      else if(e.data.cmd == "log")
      {
        console.log(e.data.txt);
      }
    }
  };
  worker.onerror = function(e) {
    var errtxt = "Error in line "+e.lineno+": "+e.message;
    callback(errtxt, null);
  };
  worker.postMessage({
    cmd: "render"
  }); // Start the worker.
  return worker;
};

OpenJsCad.getWindowURL = function() {
  if(window.URL) return window.URL;
  else if(window.webkitURL) return window.webkitURL;
  else throw new Error("Your browser doesn't support window.URL");
};

OpenJsCad.textToBlobUrl = function(txt) {
  var windowURL=OpenJsCad.getWindowURL();
  var blob = new Blob([txt]);
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

OpenJsCad.AlertUserOfUncaughtExceptions = function() {
  window.onerror = function(message, url, line) {
    message = message.replace(/^Uncaught /i, "");
    alert(message+"\n\n("+url+" line "+line+")");
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

OpenJsCad.Processor = function(containerdiv, onchange) {
  this.containerdiv = containerdiv;
  this.onchange = onchange;
  this.viewerdiv = null;
  this.viewer = null;
  this.zoomControl = null;
  //this.viewerwidth = 1200;
  //this.viewerheight = 800;
  this.initialViewerDistance = 100;
  this.processing = false;
  this.currentObject = null;
  this.hasValidCurrentObject = false;
  this.hasOutputFile = false;
  this.worker = null;
  this.paramDefinitions = [];
  this.paramControls = [];
  this.script = null;
  this.hasError = false;
  this.debugging = false;
  this.options = {};
  this.createElements();
};

OpenJsCad.Processor.convertToSolid = function(obj) {
  //echo("typeof="+typeof(obj),obj.length);

  if( (typeof(obj) == "object") && ((obj instanceof CAG)) ) {
    // convert a 2D shape to a thin solid:
    obj = obj.extrude({offset: [0,0,0.1]});

  } else if( (typeof(obj) == "object") && ((obj instanceof CSG)) ) {
    // obj already is a solid, nothing to do
    ;
    
  } else if(obj.length) {                   // main() return an array, we consider it a bunch of CSG not intersecting
    //echo("putting them together");
    var o = obj[0];
    for(var i=1; i<obj.length; i++) {
       o = o.unionForNonIntersecting(obj[i]);
    }
    obj = o;
    //echo("done.");
    
  } else {
    throw new Error("Cannot convert to solid");
  }
  return obj;
};

OpenJsCad.Processor.prototype = {
  createElements: function() {
    var that = this;   // for event handlers

    while(this.containerdiv.children.length > 0)
    {
      this.containerdiv.removeChild(0);
    }
/*    
    if(!OpenJsCad.isChrome() )
    {
      var div = document.createElement("div");
      div.innerHTML = "Please note: OpenJsCad currently only runs reliably on Google Chrome!";
      this.containerdiv.appendChild(div);
    }
*/    
    var viewerdiv = document.createElement("div");
    viewerdiv.className = "viewer";
    viewerdiv.style.width = '100%'; //this.viewerwidth; // + "px";
    viewerdiv.style.height = '100%'; //this.viewerheight; // + "px";
    viewerdiv.style.width = screen.width;
    viewerdiv.style.height = screen.height;
    //viewerdiv.style.overflow = 'hidden';
    viewerdiv.style.backgroundColor = "rgb(200,200,200)";
    this.containerdiv.appendChild(viewerdiv);
    this.viewerdiv = viewerdiv;
    try {
      //this.viewer = new OpenJsCad.Viewer(this.viewerdiv, this.viewerwidth, this.viewerheight, this.initialViewerDistance);
      //this.viewer = new OpenJsCad.Viewer(this.viewerdiv, viewerdiv.offsetWidth, viewer.offsetHeight, this.initialViewerDistance);
      this.viewer = new OpenJsCad.Viewer(this.viewerdiv, screen.width, screen.height, this.initialViewerDistance);
    } catch(e) {
      //      this.viewer = null;
      this.viewerdiv.innerHTML = "<b><br><br>Error: " + e.toString() + "</b><br><br>OpenJsCad currently requires Google Chrome or Firefox with WebGL enabled";
      //      this.viewerdiv.innerHTML = e.toString();
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
       //this.zoomControl.scrollLeft = this.viewer.viewpointZ / this.viewer.ZOOM_MAX * this.zoomControl.offsetWidth;
       this.zoomControl.scrollLeft = this.viewer.viewpointZ / this.viewer.ZOOM_MAX * 
         (this.zoomControl.scrollWidth - this.zoomControl.offsetWidth);

       //end of zoom control
    }
    //this.errordiv = document.createElement("div");
    this.errordiv = document.getElementById("errordiv");
    this.errorpre = document.createElement("pre"); 
    this.errordiv.appendChild(this.errorpre);
    //this.statusdiv = document.createElement("div");
    this.statusdiv = document.getElementById("statusdiv");
    this.statusdiv.className = "statusdiv";
    //this.statusdiv.style.width = this.viewerwidth + "px";
    this.statusspan = document.createElement("span");
    this.statusspan.id = 'statusspan';
    this.statusspan.style.marginRight = '2em';
    this.statusbuttons = document.createElement("span");
    this.statusbuttons.style.float = "right";
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

    //this.parametersdiv = document.createElement("div");            // already created
    this.parametersdiv = document.getElementById("parametersdiv");   // get the info
    this.parametersdiv.id = "parametersdiv";
    // this.parametersdiv.className = "ui-draggable";                   // via jQuery draggable() but it screws up 

    var headerdiv = document.createElement("div");
    //headerdiv.innerText = "Parameters:";
    headerdiv.innerHTML = "Parameters:";
    headerdiv.className = "parameterheader";
    this.parametersdiv.appendChild(headerdiv);

    this.parameterstable = document.createElement("table");
    this.parameterstable.className = "parameterstable";
    this.parametersdiv.appendChild(this.parameterstable);

    var parseParametersButton = document.createElement("button");
    parseParametersButton.innerHTML = "Update";
    parseParametersButton.onclick = function(e) {
      that.rebuildSolid();
    };
    this.parametersdiv.appendChild(parseParametersButton);

    // implementing instantUpdate
    var instantUpdateCheckbox = document.createElement("input");
    instantUpdateCheckbox.type = "checkbox";
    instantUpdateCheckbox.id = "instantUpdate";
    this.parametersdiv.appendChild(instantUpdateCheckbox);

    var instantUpdateCheckboxText = document.createElement("span");
    instantUpdateCheckboxText.innerHTML = "Instant Update";
    instantUpdateCheckboxText.id = "instantUpdateLabel";
    this.parametersdiv.appendChild(instantUpdateCheckboxText);

    this.enableItems();    

    // they exist already, so no appendChild anymore (remains here)
    //this.containerdiv.appendChild(this.statusdiv);
    //this.containerdiv.appendChild(this.errordiv);
    //this.containerdiv.appendChild(this.parametersdiv); 

    this.clearViewer();
  },
  
  setCurrentObject: function(obj) {
    this.currentObject = obj;                                  // CAG or CSG
    if(this.viewer) {
      var csg = OpenJsCad.Processor.convertToSolid(obj);       // enfore CSG to display
      this.viewer.setCsg(csg);
      if(obj.length)             // if it was an array (multiple CSG is now one CSG), we have to reassign currentObject
         this.currentObject = csg;
    }
    this.hasValidCurrentObject = true;
    
    while(this.formatDropdown.options.length > 0)
      this.formatDropdown.options.remove(0);
    
    var that = this;
    this.supportedFormatsForCurrentObject().forEach(function(format) {
      var option = document.createElement("option");
      option.setAttribute("value", format);
      option.appendChild(document.createTextNode(that.formatInfo(format).displayName));
      that.formatDropdown.options.add(option);
    });
    
    this.updateDownloadLink();
  },
  
  selectedFormat: function() {
    return this.formatDropdown.options[this.formatDropdown.selectedIndex].value;
  },

  selectedFormatInfo: function() {
    return this.formatInfo(this.selectedFormat());
  },
  
  updateDownloadLink: function() {
    var ext = this.selectedFormatInfo().extension;
    this.generateOutputFileButton.innerHTML = "Generate "+ext.toUpperCase();
  },
  
  clearViewer: function() {
    this.clearOutputFile();
    this.setCurrentObject(new CSG());
    this.hasValidCurrentObject = false;
    this.enableItems();
  },
  
  abort: function() {
    if(this.processing)
    {
      //todo: abort
      this.processing=false;
      this.statusspan.innerHTML = "Aborted.";
      this.worker.terminate();
      this.enableItems();
      if(this.onchange) this.onchange();
    }
  },
  
  enableItems: function() {
    this.abortbutton.style.display = this.processing? "inline":"none";
    this.formatDropdown.style.display = ((!this.hasOutputFile)&&(this.hasValidCurrentObject))? "inline":"none";
    this.generateOutputFileButton.style.display = ((!this.hasOutputFile)&&(this.hasValidCurrentObject))? "inline":"none";
    this.downloadOutputFileLink.style.display = this.hasOutputFile? "inline":"none";
    this.parametersdiv.style.display = (this.paramControls.length > 0)? "inline-block":"none";     // was 'block' 
    this.errordiv.style.display = this.hasError? "block":"none";
    this.statusdiv.style.display = this.hasError? "none":"block";    
  },

  setOpenJsCadPath: function(path) {
    this.options[ 'openJsCadPath' ] = path;
  },

  addLibrary: function(lib) {
    if( this.options[ 'libraries' ] == null ) {
      this.options[ 'libraries' ] = [];
    }
    this.options[ 'libraries' ].push( lib );
  },
  
  setError: function(txt) {
    this.hasError = (txt != "");
    this.errorpre.innerText = txt;
    this.enableItems();
  },
  
  setDebugging: function(debugging) {
    this.debugging = debugging;
  },
  
  // script: javascript code
  // filename: optional, the name of the .jscad file
  setJsCad: function(script, filename) {
    if(!filename) filename = "openjscad.jscad";
    filename = filename.replace(/\.jscad$/i, "");
    this.abort();
    this.clearViewer();
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
      this.statusspan.innerHTML = "Error.";
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
      if(this.onchange) this.onchange();
    }
  },
  
  getParamValues: function()
  {
    var paramValues = {};
    for(var i = 0; i < this.paramDefinitions.length; i++)
    {
      var paramdef = this.paramDefinitions[i];
      var type = "text";
      if('type' in paramdef)
      {
        type = paramdef.type;
      }
      var control = this.paramControls[i];
      var value = null;
      if( (type == "text") || (type == "float") || (type == "int") || (type == "number") )
      {
        value = control.value;
        if( (type == "float") || (type == "int") || (type == "number") )
        {
          var isnumber = !isNaN(parseFloat(value)) && isFinite(value);
          if(!isnumber)
          {
            throw new Error("Not a number: "+value);
          }
          if(type == "int")
          {
            value = parseInt(value);
          }
          else
          {
            value = parseFloat(value);
          }
        }
      }
      else if(type == "choice")
      {
        value = control.options[control.selectedIndex].value;
      }
      paramValues[paramdef.name] = value;
    }
    return paramValues;
  },
    
  rebuildSolid: function()
  {
    this.abort();
    this.setError("");
    this.clearViewer();
    this.processing = true;
    this.statusspan.innerHTML = "Rendering code, please wait <img id=busy src='imgs/busy.gif'>";
    this.enableItems();
    var that = this;
    var paramValues = this.getParamValues();
    var useSync = this.debugging;

    //useSync = true;
    if(!useSync)
    {
      try
      {
          console.log("trying async compute");
          this.worker = OpenJsCad.parseJsCadScriptASync(this.script, paramValues, this.options, function(err, obj) {
          that.processing = false;
          that.worker = null;
          if(err)
          {
            that.setError(err);
            that.statusspan.innerHTML = "Error.";
          }
          else
          {
            that.setCurrentObject(obj);
            that.statusspan.innerHTML = "Ready.";
          }
          that.enableItems();
          if(that.onchange) that.onchange();
        });
      }
      catch(e)
      {
        console.log("async failed, try sync compute, error: "+e.message);
        useSync = true;
      }
    }
    
    if(useSync)
    {
      try
      {
        this.statusspan.innerHTML = "Rendering code, please wait <img id=busy src='imgs/busy.gif'>";
        var obj = OpenJsCad.parseJsCadScriptSync(this.script, paramValues, this.debugging);
        that.setCurrentObject(obj);
        that.processing = false;
        that.statusspan.innerHTML = "Ready.";
      }
      catch(e)
      {
        that.processing = false;
        var errtxt = e.stack;
        if(!errtxt)
        {
          errtxt = e.toString();
        }
        that.setError(errtxt);
        that.statusspan.innerHTML = "Error.";
      }
      that.enableItems();
      if(that.onchange) that.onchange();
    }
  },
  
  hasSolid: function() {
    return this.hasValidCurrentObject;
  },

  isProcessing: function() {
    return this.processing;
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
      if(this.onchange) this.onchange();
    }
  },

  generateOutputFile: function() {
    this.clearOutputFile();
    if(this.hasValidCurrentObject)
    {
      try
      {
        this.generateOutputFileFileSystem();
      }
      catch(e)
      {
        this.generateOutputFileBlobUrl();
      }
    }
  },

  currentObjectToBlob: function() {
    var format = this.selectedFormat();
    
    var blob;
    if(format == "stla") {      
      blob = this.currentObject.toStlString();        
      blob = new Blob([blob],{ type: this.formatInfo(format).mimetype });
    }
    else if(format == "stlb") {      
      //blob = this.currentObject.fixTJunctions().toStlBinary();   // gives normal errors, but we keep it for now (fixTJunctions() needs debugging)
      blob = this.currentObject.toStlBinary({webBlob: true});     

      // -- binary string -> blob gives bad data, so we request cgs.js already blobbing the binary
      //blob = new Blob([blob],{ type: this.formatInfo(format).mimetype+"/charset=UTF-8" }); 
    }
    else if(format == "amf") {
      blob = this.currentObject.toAMFString({
        producer: "OpenJSCAD.org "+version,
        date: new Date()
      });
      blob = new Blob([blob],{ type: this.formatInfo(format).mimetype });
    }  
    else if(format == "x3d") {
      blob = this.currentObject.fixTJunctions().toX3D(bb);
    }
    else if(format == "dxf") {
      blob = this.currentObject.toDxf();
    }
    else {
      throw new Error("Not supported");
    }    
    return blob;
  },
  
  supportedFormatsForCurrentObject: function() {
    if (this.currentObject instanceof CSG) {
      return ["stlb", "stla", "amf", "x3d"];
    } else if (this.currentObject instanceof CAG) {
      return ["dxf"];
    } else {
      throw new Error("Not supported");
    }
  },
  
  formatInfo: function(format) {
    return {
      stla: {
        displayName: "STL (ASCII)",
        extension: "stl",
        mimetype: "application/sla",
        },
      stlb: {
        displayName: "STL (Binary)",
        extension: "stl",
        mimetype: "application/sla",
        },
      amf: {
        displayName: "AMF (experimental)",
        extension: "amf",
        mimetype: "application/amf+xml",
        },
      x3d: {
        displayName: "X3D",
        extension: "x3d",
        mimetype: "model/x3d+xml",
        },
      dxf: {
        displayName: "DXF",
        extension: "dxf",
        mimetype: "application/dxf",
        }
    }[format];
  },

  downloadLinkTextForCurrentObject: function() {
    var ext = this.selectedFormatInfo().extension;
    return "Download "+ext.toUpperCase();
  },

  generateOutputFileBlobUrl: function() {
    var blob = this.currentObjectToBlob();
    var windowURL=OpenJsCad.getWindowURL();
    this.outputFileBlobUrl = windowURL.createObjectURL(blob);
    if(!this.outputFileBlobUrl) throw new Error("createObjectURL() failed"); 
    this.hasOutputFile = true;
    this.downloadOutputFileLink.href = this.outputFileBlobUrl;
    this.downloadOutputFileLink.innerHTML = this.downloadLinkTextForCurrentObject();
    var ext = this.selectedFormatInfo().extension;
    this.downloadOutputFileLink.setAttribute("download", "openjscad."+ext);
    this.enableItems();
    if(this.onchange) this.onchange();
  },

  generateOutputFileFileSystem: function() {
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    if(!window.requestFileSystem)
    {
      throw new Error("Your browser does not support the HTML5 FileSystem API. Please try the Chrome browser instead.");
    }
    // create a random directory name:
    var dirname = "OpenJsCadOutput1_"+parseInt(Math.random()*1000000000, 10)+"."+extension;
    var extension = this.selectedFormatInfo().extension;
    var filename = "output."+extension;
    var that = this;
    window.requestFileSystem(TEMPORARY, 20*1024*1024, function(fs){
        fs.root.getDirectory(dirname, {create: true, exclusive: true}, function(dirEntry) {
            that.outputFileDirEntry = dirEntry;
            dirEntry.getFile(filename, {create: true, exclusive: true}, function(fileEntry) {
                 fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                      that.hasOutputFile = true;
                      that.downloadOutputFileLink.href = fileEntry.toURL();
                      that.downloadOutputFileLink.type = that.selectedFormatInfo().mimetype; 
                      that.downloadOutputFileLink.innerHTML = that.downloadLinkTextForCurrentObject();
                      that.downloadOutputFileLink.setAttribute("download", fileEntry.name);
                      that.enableItems();
                      if(that.onchange) that.onchange();
                    };
                    fileWriter.onerror = function(e) {
                      throw new Error('Write failed: ' + e.toString());
                    };
                    var blob = that.currentObjectToBlob();
                    console.log(blob,blob.length);                
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
  
  createParamControls: function() {
    this.parameterstable.innerHTML = "";
    this.paramControls = [];
    var paramControls = [];
    var tablerows = [];
    for(var i = 0; i < this.paramDefinitions.length; i++)
    {
      var errorprefix = "Error in parameter definition #"+(i+1)+": ";
      var paramdef = this.paramDefinitions[i];
      if(!('name' in paramdef))
      {
        throw new Error(errorprefix + "Should include a 'name' parameter");
      }
      var type = "text";
      if('type' in paramdef)
      {
        type = paramdef.type;
      }
      if( (type !== "text") && (type !== "int") && (type !== "float") && (type !== "choice") && (type !== "number") )
      {
        throw new Error(errorprefix + "Unknown parameter type '"+type+"'");
      }
      var control;
      if( (type == "text") || (type == "int") || (type == "float") || (type == "number") )
      {
        control = document.createElement("input");
        if (type == "number")
            control.type = "number";
        else
            control.type = "text";
        if('default' in paramdef)
        {
          control.value = paramdef["default"];
        }
        else if('initial' in paramdef)
          control.value = paramdef.initial;
        else
        {
          if( (type == "int") || (type == "float") || (type == "number") )
          {
            control.value = "0";
          }
          else
          {
            control.value = "";
          }
        }
        if(paramdef.size!==undefined) 
           control.size = paramdef.size;
        for (var property in paramdef)
            if (paramdef.hasOwnProperty (property))
                if ((property != "name") && (property != "type") && (property != "default") && (property != "initial") && (property != "caption"))
                    control.setAttribute (property, paramdef[property]);
      }
      else if(type == "choice")
      {
        if(!('values' in paramdef))
        {
          throw new Error(errorprefix + "Should include a 'values' parameter");
        }        
        control = document.createElement("select");
        var values = paramdef.values;
        var captions;
        if('captions' in paramdef)
        {
          captions = paramdef.captions;
          if(captions.length != values.length)
          {
            throw new Error(errorprefix + "'captions' and 'values' should have the same number of items");
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
          if('default' in paramdef)
          {
            if(paramdef["default"] == values[valueindex])
            {
              selectedindex = valueindex;
            }
          }
          else if('initial' in paramdef)
          {
            if(paramdef.initial == values[valueindex])
            {
              selectedindex = valueindex;
            }
          }
        }
        if(values.length > 0)
        {
          control.selectedIndex = selectedindex;
        }        
      }
      // implementing instantUpdate
      control.onchange = function() { 
         if(document.getElementById("instantUpdate").checked==true) {
            that.rebuildSolid();
         }
      };
      paramControls.push(control);
      var tr = document.createElement("tr");
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
      tr.appendChild(td);
      tablerows.push(tr);
    }
    var that = this;
    tablerows.map(function(tr){
      that.parameterstable.appendChild(tr);
    }); 
    this.paramControls = paramControls;
  },
};


