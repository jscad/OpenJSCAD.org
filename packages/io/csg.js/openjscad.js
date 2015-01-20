OpenJsCad = function() {
};

OpenJsCad.log = function(txt) {
  var timeInMs = Date.now();
  var prevtime = OpenJsCad.log.prevLogTime;
  if(!prevtime) prevtime = timeInMs;
  var deltatime = timeInMs - prevtime;
  OpenJsCad.log.prevLogTime = timeInMs;
  var timefmt = (deltatime*0.001).toFixed(3);
  txt = "["+timefmt+"] "+txt;
  if( (typeof(console) == "object") && (typeof(console.log) == "function") )
  {
    console.log(txt);
  }
  else if( (typeof(self) == "object") && (typeof(self.postMessage) == "function") )
  {
    self.postMessage({cmd: 'log', txt: txt});
  }
  else throw new Error("Cannot log");
};

// A viewer is a WebGL canvas that lets the user view a mesh. The user can
// tumble it around by dragging the mouse.
OpenJsCad.Viewer = function(containerelement, width, height, initialdepth, displayW, displayH, options) {
  options = options || {};
  this.color = options.color || [0,0,1];
  this.bgColor = options.bgColor || [0.93, 0.93, 0.93, 1];
  var gl = GL.create();
  this.gl = gl;
  this.angleX = -60;
  this.angleY = 0;
  this.angleZ = -45;
  this.viewpointX = 0;
  this.viewpointY = 0;
  this.viewpointZ = initialdepth;

  // Draw axes flag:
  this.drawAxes = true;
  // Draw triangle lines:
  this.drawLines = options.showLines || false;
  // Set to true so lines don't use the depth buffer
  this.lineOverlay = options.showLines || false;

  gl.canvas.style.width = displayW;
  gl.canvas.style.height = displayH;
  // Set up the viewport
  gl.canvas.width = width;
  gl.canvas.height = height;
  gl.viewport(0, 0, width, height);
  gl.matrixMode(gl.PROJECTION);
  gl.loadIdentity();
  gl.perspective(45, width / height, 0.5, 100000);
  gl.matrixMode(gl.MODELVIEW);

  // Set up WebGL state
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  // gl.clearColor(0.93, 0.93, 0.93, 1);
  gl.clearColor.apply(gl, this.bgColor);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.polygonOffset(1, 1);

  // Black shader for wireframe
  this.blackShader = new GL.Shader('\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ', '\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\
    }\
  ');

  // Shader with diffuse and specular lighting
  this.lightingShader = new GL.Shader('\
    varying vec3 color;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      const vec3 lightDir = vec3(1.0, 2.0, 3.0) / 3.741657386773941;\
      light = lightDir;\
      color = gl_Color.rgb;\
      normal = gl_NormalMatrix * gl_Normal;\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ', '\
    varying vec3 color;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      vec3 n = normalize(normal);\
      float diffuse = max(0.0, dot(light, n));\
      float specular = pow(max(0.0, -reflect(light, n).z), 10.0) * sqrt(diffuse);\
      gl_FragColor = vec4(mix(color * (0.3 + 0.7 * diffuse), vec3(1.0), specular), 1.0);\
    }\
  ');

  containerelement.appendChild(gl.canvas);

  var _this=this;

  gl.onmousemove = function(e) {
    _this.onMouseMove(e);
  };
  gl.ondraw = function() {
    _this.onDraw();
  };
  gl.onmousewheel = function(e) {
    var wheelDelta = 0;
    if (e.wheelDelta)
    {
      wheelDelta = e.wheelDelta;
    }
    else if (e.detail)
    {
      // for firefox, see http://stackoverflow.com/questions/8886281/event-wheeldelta-returns-undefined
      wheelDelta = e.detail * -40;
    }
    if(wheelDelta)
    {
      var factor = Math.pow(1.003, -wheelDelta);
      var coeff = _this.getZoom();
      coeff = Math.max(coeff, 1e-3);
      coeff *= factor;
      _this.setZoom(coeff);
    }
  };
  this.clear();
};

OpenJsCad.Viewer.prototype = {
  setCsg: function(csg) {
    this.gl.makeCurrent();
    this.meshes = OpenJsCad.Viewer.csgToMeshes(csg, this.color);
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

  ZOOM_MAX: 10000,
  ZOOM_MIN: 10,
  onZoomChanged: null,

  setZoom: function(coeff) { //0...1
    coeff=Math.max(coeff, 0);
    coeff=Math.min(coeff, 1);
    this.viewpointZ = this.ZOOM_MIN + coeff * (this.ZOOM_MAX - this.ZOOM_MIN);
    if(this.onZoomChanged)
    {
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
      e.preventDefault();
      if(e.altKey) {
        //ROTATE X, Y
        this.angleY += e.deltaX * 2;
        this.angleX += e.deltaY * 2;
        //this.angleX = Math.max(-180, Math.min(180, this.angleX));
      } else if(e.shiftKey) {//PAN
        var factor = 5e-3;
        this.viewpointX += factor * e.deltaX * this.viewpointZ;
        this.viewpointY -= factor * e.deltaY * this.viewpointZ;
      } else {
        //ROTATE Z, X
        this.angleZ += e.deltaX * 2;
        this.angleX += e.deltaY * 2;
      }
      this.onDraw();
    }
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

    if (!this.lineOverlay) gl.enable(gl.POLYGON_OFFSET_FILL);
    for (var i = 0; i < this.meshes.length; i++) {
      var mesh = this.meshes[i];
      this.lightingShader.draw(mesh, gl.TRIANGLES);
    }
    if (!this.lineOverlay) gl.disable(gl.POLYGON_OFFSET_FILL);

    if(this.drawLines)
    {
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

      gl.end();
      gl.disable(gl.BLEND);
    }
  }
};

// Convert from CSG solid to an array of GL.Mesh objects
// limiting the number of vertices per mesh to less than 2^16
OpenJsCad.Viewer.csgToMeshes = function(csg, defaultColor) {
  csg = csg.canonicalized();
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
  for(var polygonindex = 0; polygonindex < numpolygons; polygonindex++)
  {
    var polygon = polygons[polygonindex];
    var color = defaultColor || [0,0,1];
    if(polygon.shared && polygon.shared.color)
    {
      color = polygon.shared.color;
    }
    var indices = polygon.vertices.map(function(vertex) {
      var vertextag = vertex.getTag();
      var vertexindex;
      if(smoothlighting && (vertextag in vertexTag2Index))
      {
        vertexindex = vertexTag2Index[vertextag];
      }
      else
      {
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

// make a full url path out of a base path and url component.
// url argument is interpreted as a folder name if it ends with a slash
OpenJsCad.makeAbsoluteUrl = function(url, baseurl) {
  if(!url.match(/^[a-z]+\:/i))
  {
    var re = /^\/|\/$/g;
    if (baseurl[baseurl.length - 1] != '/') {
      // trailing part is a file, not part of base - remove
      baseurl = baseurl.replace(/[^\/]*$/, "");
    }
    if (url[0] == '/') {
      var basecomps = baseurl.split('/');
      url = basecomps[0] + '//' + basecomps[2] + '/' + url.replace(re, "");
    }
    else {
      url = (baseurl.replace(re, "") + '/' + url.replace(re, ""))
        .replace(/[^\/]+\/\.\.\//g, "");
    }
  }
  return url;
};

OpenJsCad.isChrome = function()
{
  return (navigator.userAgent.search("Chrome") >= 0);
};

// This is called from within the web worker. Execute the main() function of the supplied script
// and post a message to the calling thread when finished
OpenJsCad.runMainInWorker = function(mainParameters)
{
  try
  {
    if(typeof(main) != 'function') throw new Error('Your jscad file should contain a function main() which returns a CSG solid or a CAG area.');
    OpenJsCad.log.prevLogTime = Date.now();
    var result = main(mainParameters);
    result=OpenJsCad.expandResultObjectArray(result);
    OpenJsCad.checkResult(result);
    var result_compact = OpenJsCad.resultToCompactBinary(result);
    result = null; // not needed anymore
    self.postMessage({cmd: 'rendered', result: result_compact});
  }
  catch(e)
  {
    var errtxt = e.toString();
    if(e.stack) 
    {
      errtxt += '\nStack trace:\n'+e.stack;
    }
    self.postMessage({cmd: 'error', err: errtxt});
  }
};

// expand an array of CSG or CAG objects into an array of objects [{data: <CAG or CSG object>}]
OpenJsCad.expandResultObjectArray = function(result) {
    if(result instanceof Array)
    {
        result=result.map(function(resultelement){
            if( (resultelement instanceof CSG) || (resultelement instanceof CAG) )
            {
                resultelement = {data: resultelement};
            }
            return resultelement;
        });
    }
    return result;
};

// check whether the supplied script returns valid object(s)
OpenJsCad.checkResult = function(result) {
  var ok=true;
  if(typeof(result) != "object")
  {
    ok=false;
  }
  else
  {
    if(result instanceof Array)
    {
      if(result.length < 1)
      {
        ok=false;
      }
      else
      {
        result.forEach(function(resultelement){
          if(! ("data" in resultelement))
          {
            ok=false;
          }
          else
          {
            if( (resultelement.data instanceof CSG) || (resultelement.data instanceof CAG) )
            {
              // ok
            }
            else
            {
              ok=false;
            }
          }
        });
      }

    }
    else if( (result instanceof CSG) || (result instanceof CAG) )
    {
    }
    else
    {
      ok=false;
    }
  }
  if(!ok)
  {
    throw new Error("Your main() function does not return valid data. It should return one of the following: a CSG object, a CAG object, an array of CSG/CAG objects, or an array of objects: [{name:, caption:, data:}, ...] where data contains a CSG or CAG object.");
  }
};

// convert the result to a compact binary representation, to be copied from the webworker to the main thread.
// it is assumed that checkResult() has been called already so the data is valid.
OpenJsCad.resultToCompactBinary = function(resultin) {
  var resultout;
  if(resultin instanceof Array)
  {
    resultout=resultin.map(function(resultelement){
      var r=resultelement;
      r.data=resultelement.data.toCompactBinary();
      return r;
    });
  }
  else
  {
    resultout=resultin.toCompactBinary();
  }
  return resultout;
};

OpenJsCad.resultFromCompactBinary = function(resultin) {
  function fromCompactBinary(r)
  {
    var result;
    if(r.class == "CSG")
    {
      result=CSG.fromCompactBinary(r);
    }
    else if(r.class == "CAG")
    {
      result=CAG.fromCompactBinary(r);
    }
    else
    {
      throw new Error("Cannot parse result");
    }
    return result;
  }
  var resultout;
  if(resultin instanceof Array)
  {
    resultout=resultin.map(function(resultelement){
      var r=resultelement;
      r.data=fromCompactBinary(resultelement.data);
      return r;
    });
  }
  else
  {
    resultout=fromCompactBinary(resultin);
  }
  return resultout;
};


OpenJsCad.parseJsCadScriptSync = function(script, mainParameters, debugging) {
  var workerscript = "";
  workerscript += script;
  if(debugging)
  {
    workerscript += "\n\n\n\n\n\n\n/* -------------------------------------------------------------------------\n";
    workerscript += "OpenJsCad debugging\n\nAssuming you are running Chrome:\nF10 steps over an instruction\nF11 steps into an instruction\n";
    workerscript += "F8  continues running\nPress the (||) button at the bottom to enable pausing whenever an error occurs\n";
    workerscript += "Click on a line number to set or clear a breakpoint\n";
    workerscript += "For more information see: http://code.google.com/chrome/devtools/docs/overview.html\n\n";
    workerscript += "------------------------------------------------------------------------- */\n";
    workerscript += "\n\n// Now press F11 twice to enter your main() function:\n\n";
    workerscript += "debugger;\n";
  }
  workerscript += "return main("+JSON.stringify(mainParameters)+");";
  var f = new Function(workerscript);
  OpenJsCad.log.prevLogTime = Date.now();
  var result = f();
  result=OpenJsCad.expandResultObjectArray(result);
  OpenJsCad.checkResult(result);
  return result;
};

// callback: should be function(error, csg)
OpenJsCad.parseJsCadScriptASync = function(script, mainParameters, options, callback) {
  var baselibraries = [
    "src/csg.js",
    "src/openjscad.js"
  ];

  var baseurl = document.location.href.replace(/\?.*$/, '');
  var openjscadurl = baseurl;
  if (typeof options['openJsCadPath'] != 'undefined') {
    // trailing '/' indicates it is a folder. This is necessary because makeAbsoluteUrl is called
    // on openjscadurl
    openjscadurl = OpenJsCad.makeAbsoluteUrl( options['openJsCadPath'], baseurl ) + '/';
  }

  var libraries = [];
  if (typeof options['libraries'] != 'undefined') {
    libraries = options['libraries'];
  }

  var workerscript = "";
  workerscript += script;
  workerscript += "\n\n\n\n//// The following code is added by OpenJsCad:\n";
  workerscript += "var _csg_baselibraries=" + JSON.stringify(baselibraries)+";\n";
  workerscript += "var _csg_libraries=" + JSON.stringify(libraries)+";\n";
  workerscript += "var _csg_baseurl=" + JSON.stringify(baseurl)+";\n";
  workerscript += "var _csg_openjscadurl=" + JSON.stringify(openjscadurl)+";\n";
  workerscript += "var _csg_makeAbsoluteURL=" + OpenJsCad.makeAbsoluteUrl.toString()+";\n";
  workerscript += "_csg_baselibraries = _csg_baselibraries.map(function(l){return _csg_makeAbsoluteURL(l,_csg_openjscadurl);});\n";
  workerscript += "_csg_libraries = _csg_libraries.map(function(l){return _csg_makeAbsoluteURL(l,_csg_baseurl);});\n";
  workerscript += "_csg_baselibraries.map(function(l){importScripts(l)});\n";
  workerscript += "_csg_libraries.map(function(l){importScripts(l)});\n";
  workerscript += "self.addEventListener('message', function(e) {if(e.data && e.data.cmd == 'render'){";
  workerscript += "  OpenJsCad.runMainInWorker("+JSON.stringify(mainParameters)+");";
  workerscript += "}},false);\n";
    
  var blobURL = OpenJsCad.textToBlobUrl(workerscript);
  
  if(!window.Worker) throw new Error("Your browser doesn't support Web Workers. Please try the Chrome browser instead.");
  var worker = new Worker(blobURL);
  worker.onmessage = function(e) {
    if(e.data)
    {
      if(e.data.cmd == 'rendered')
      {
        var resulttype = e.data.result.class;
        var result = OpenJsCad.resultFromCompactBinary(e.data.result);
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
  try
  {
    // first try to execute the script itself
    // this will catch any syntax errors
    var f = new Function(script);
    f();
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

/**
 * options parameter:
 * - showLines: display all triangle lines without respecting depth buffer
 * - bgColor: canvas background color
 * - color: object color
 * - viewerwidth, viewerheight: set rendering size. If in pixels, both canvas resolution and
 * display size are affected. If not (e.g. in %), canvas resolution is unaffected, but gets zoomed
 * to display size
 */
OpenJsCad.Processor = function(containerdiv, options, onchange) {
  this.containerdiv = containerdiv;
  this.onchange = onchange;
  this.viewerdiv = null;
  this.viewer = null;
  this.zoomControl = null;
  this.options = options || {};
  this.viewerwidth = this.options.viewerwidth || "800px";
  this.viewerheight = this.options.viewerheight || "600px";
  this.initialViewerDistance = 200;
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
  this.createElements();
};

OpenJsCad.Processor.convertToSolid = function(obj) {
  if( (typeof(obj) == "object") && ((obj instanceof CAG)) )
  {
    // convert a 2D shape to a thin solid:
    obj=obj.extrude({offset: [0,0,0.1]});
  }
  else if( (typeof(obj) == "object") && ((obj instanceof CSG)) )
  {
    // obj already is a solid
  }
  else
  {
    throw new Error("Cannot convert to solid");
  }
  return obj;
};

OpenJsCad.Processor.prototype = {
  setLineDisplay: function(bool) {
    // Draw triangle lines:
    this.viewer.drawLines = bool;
    // Set to true so lines don't use the depth buffer
    this.viewer.lineOverlay = bool;
  },

  createElements: function() {
    var that = this;//for event handlers

    while(this.containerdiv.children.length > 0)
    {
      this.containerdiv.removeChild(this.containerdiv.children[0]);
    }
  
    var viewerdiv = document.createElement("div");
    viewerdiv.className = "viewer";
    viewerdiv.style.width = this.viewerwidth;
    viewerdiv.style.height = this.viewerheight;
    // viewerdiv.style.backgroundColor = "rgb(200,200,200)";
    this.containerdiv.appendChild(viewerdiv);
    this.viewerdiv = viewerdiv;
    // if viewerdiv sizes in px -> size canvas accordingly. Else use 800x600, canvas will then scale
    var wArr = this.viewerwidth.match(/^(\d+(?:\.\d+)?)(.*)$/);
    var hArr = this.viewerheight.match(/^(\d+(?:\.\d+)?)(.*)$/);
    var canvasW = wArr[2] == 'px' ? wArr[1] : '800';
    var canvasH = hArr[2] == 'px' ? hArr[1] : '600';
    try
    {
      this.viewer = new OpenJsCad.Viewer(this.viewerdiv, canvasW, canvasH,
          this.initialViewerDistance, this.viewerwidth, this.viewerheight, this.options);
    } catch(e) {
      //      this.viewer = null;
      this.viewerdiv.innerHTML = "<b><br><br>Error: " + e.toString() + "</b><br><br>OpenJsCad requires a WebGL enabled browser. Try a recent version of Chrome of Firefox.";
      //      this.viewerdiv.innerHTML = e.toString();
    }
    //Zoom control
    var div = document.createElement("div");
    this.zoomControl = div.cloneNode(false);
    this.zoomControl.style.width = this.viewerwidth;
    this.zoomControl.style.height = '20px';
    this.zoomControl.style.backgroundColor = 'transparent';
    this.zoomControl.style.overflowX = 'scroll';
    // div.style.width = this.viewerwidth * 11 + 'px';
    // FIXME - below doesn't behave as expected if
    // options.viewerwidth not in pixels
    div.style.width = this.viewerdiv.canvasW * 11 + 'px';
    div.style.height = '1px';
    this.zoomControl.appendChild(div);
    this.zoomChangedBySlider=false;
    this.zoomControl.onscroll = function(event) {
      var zoom = that.zoomControl;
      var newzoom=zoom.scrollLeft / (10 * zoom.offsetWidth);
      that.zoomChangedBySlider=true; // prevent recursion via onZoomChanged 
      that.viewer.setZoom(newzoom);
      that.zoomChangedBySlider=false;
    };
    if(this.viewer)
    {
      this.viewer.onZoomChanged = function() {
        if(!that.zoomChangedBySlider)
        {
          var newzoom = that.viewer.getZoom();
          that.zoomControl.scrollLeft = newzoom * (10 * that.zoomControl.offsetWidth);
        }
      };
      this.zoomControl.scrollLeft = this.viewer.viewpointZ / this.viewer.ZOOM_MAX *
        (this.zoomControl.scrollWidth - this.zoomControl.offsetWidth);
    }

    this.containerdiv.appendChild(this.zoomControl);
    //this.zoomControl.scrollLeft = this.viewer.viewpointZ / this.viewer.ZOOM_MAX * this.zoomControl.offsetWidth;

    //end of zoom control

    this.errordiv = document.createElement("div");
    this.errorpre = document.createElement("pre");
    this.errordiv.appendChild(this.errorpre);
    this.statusdiv = document.createElement("div");
    this.statusdiv.className = "statusdiv";
    //this.statusdiv.style.width = this.viewerwidth + "px";
    this.statusspan = document.createElement("span");
    this.statusbuttons = document.createElement("div");
    this.statusbuttons.style.float = "right";
    this.statusdiv.appendChild(this.statusspan);
    this.statusdiv.appendChild(this.statusbuttons);
    this.abortbutton = document.createElement("button");
    this.abortbutton.innerHTML = "Abort";
    this.abortbutton.onclick = function(e) {
      that.abort();
    };
    this.statusbuttons.appendChild(this.abortbutton);

    this.renderedElementDropdown = document.createElement("select");
    this.renderedElementDropdown.onchange = function(e) {
      that.setSelectedObjectIndex(that.renderedElementDropdown.selectedIndex);
    };
    this.renderedElementDropdown.style.display = "none";
    this.statusbuttons.appendChild(this.renderedElementDropdown);

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
    this.statusbuttons.appendChild(this.downloadOutputFileLink);
    this.parametersdiv = document.createElement("div");
    this.parametersdiv.className = "parametersdiv";
    var headerdiv = document.createElement("div");
    headerdiv.textContent = "Parameters:";
    headerdiv.className = "header";
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
    this.enableItems();
    this.containerdiv.appendChild(this.statusdiv);
    this.containerdiv.appendChild(this.errordiv);
    this.containerdiv.appendChild(this.parametersdiv);
    this.clearViewer();
  },

  getFilenameForRenderedObject: function() {
    var filename = this.filename;
    if(!filename) filename = "openjscad";
    var index = this.renderedElementDropdown.selectedIndex;
    if(index >= 0)
    {
      var renderedelement = this.currentObjects[index];
      if('name' in renderedelement)
      {
        filename = renderedelement.name;
      }
      else
      {
        filename += "_"+(index + 1);
      }
    }
    return filename;
  },

  setRenderedObjects: function(obj) {
    // if obj is a single CSG or CAG, convert to the array format:
    if(obj === null)
    {
      obj=[];
    }
    else
    {
      if( !(obj instanceof Array))
      {
        obj=[
          {
            data: obj,
          },
        ];
      }
    }
    this.currentObjects=obj;
    while(this.renderedElementDropdown.options.length > 0) this.renderedElementDropdown.options.remove(0);
    
    for(var i=0; i < obj.length; ++i)
    {
      var renderedelement = obj[i];
      var caption;
      if('caption' in renderedelement)
      {
        caption = renderedelement.caption;
      }
      else if('name' in renderedelement)
      {
        caption = renderedelement.name;
      }
      else
      {
        caption = "Element #"+(i+1);
      }
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(caption));
      this.renderedElementDropdown.options.add(option);
    }
    this.renderedElementDropdown.style.display = (obj.length >= 2)? "inline":"none";
    this.setSelectedObjectIndex( (obj.length > 0)? 0:-1);
  },

  setSelectedObjectIndex: function(index) {
    this.clearOutputFile();
    this.renderedElementDropdown.selectedIndex = index;
    var obj;
    if(index < 0)
    {
      obj=new CSG();
    }
    else
    {
      obj=this.currentObjects[index].data;
    }
    this.currentObjectIndex = index;
    this.currentObject = obj;
    if(this.viewer)
    {
      var csg = OpenJsCad.Processor.convertToSolid(obj);
      this.viewer.setCsg(csg);
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
    this.setRenderedObjects(null);
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
    this.parametersdiv.style.display = (this.paramControls.length > 0)? "block":"none";
    this.errordiv.style.display = this.hasError? "block":"none";
    this.statusdiv.style.display = this.hasError? "none":"block";
  },

  setOpenJsCadPath: function(path) {
    this.options[ 'openJsCadPath' ] = path;
  },

  addLibrary: function(lib) {
    if( typeof this.options[ 'libraries' ] == 'undefined' ) {
      this.options[ 'libraries' ] = [];
    }
    this.options[ 'libraries' ].push( lib );
  },
  
  setError: function(txt) {
    this.hasError = (txt != "");
    this.errorpre.textContent = txt;
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
      var value;
      if( (type == "text") || (type == "longtext") || (type == "float") || (type == "int") )
      {
        value = control.value;
        if( (type == "float") || (type == "int") )
        {
          var isnumber = !isNaN(parseFloat(value)) && isFinite(value);
          if(!isnumber)
          {
            throw new Error("Not a number: "+value);
          }
          if(type == "int")
          {
            value = parseInt(value, 10);
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
      else if(type == "bool")
      {
        value = control.checked;
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
    this.statusspan.innerHTML = "Processing, please wait...";
    this.enableItems();
    var that = this;
    var paramValues = this.getParamValues();
    var useSync = this.debugging;
    var options = {};

    if(!useSync)
    {
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
          that.setRenderedObjects(obj);
          that.statusspan.innerHTML = "Ready.";
        }
        that.enableItems();
        if(that.onchange) that.onchange();
      });
    }
    else
    {
      try
      {
        var obj = OpenJsCad.parseJsCadScriptSync(this.script, paramValues, this.debugging);
        that.setRenderedObjects(obj);
        that.processing = false;
        that.statusspan.innerHTML = "Ready.";
      }
      catch(e)
      {
        that.processing = false;
        var errtxt = e.toString();
        if(e.stack) 
        {
          errtxt += '\nStack trace:\n'+e.stack;
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
    if(format == "stl")
    {
      blob=this.currentObject.fixTJunctions().toStlBinary();
    }
    else if(format == "x3d") {
      blob=this.currentObject.fixTJunctions().toX3D(bb);
    }
    else if(format == "dxf")
    {
      blob=this.currentObject.toDxf();
    }
    else
    {
      throw new Error("Not supported");
    }
    return blob;
  },
  
  supportedFormatsForCurrentObject: function() {
    if (this.currentObject instanceof CSG) {
      return ["stl", "x3d"];
    } else if (this.currentObject instanceof CAG) {
      return ["dxf"];
    } else {
      throw new Error("Not supported");
    }
  },
  
  formatInfo: function(format) {
    return {
      stl: {
        displayName: "STL",
        extension: "stl",
        mimetype: "application/sla",
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
    this.outputFileBlobUrl = windowURL.createObjectURL(blob)
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
    var filename = this.getFilenameForRenderedObject()+"."+extension;
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
      if( (type !== "text") && (type !== "int") && (type !== "float") && (type !== "choice") && (type !== "longtext") && (type !== "bool") )
      {
        throw new Error(errorprefix + "Unknown parameter type '"+type+"'");
      }
      var initial;
      if('initial' in paramdef)
      {
        initial = paramdef.initial;
      }
      else if('default' in paramdef)
      {
        initial = paramdef['default'];
      }
      var control;
      if( (type == "text") || (type == "int") || (type == "float") )
      {
        control = document.createElement("input");
        control.type = "text";
        if(initial !== undefined)
        {
          control.value = initial;
        }
        else
        {
          if( (type == "int") || (type == "float") )
          {
            control.value = "0";
          }
          else
          {
            control.value = "";
          }
        }
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
          if(initial !== undefined)
          {
            if(initial == values[valueindex])
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
      else if(type == "longtext")
      {
        control = document.createElement("textarea");
        if(initial !== undefined)
        {
          control.value = initial;
        }
        else
        {
          control.value = "";
        }
      }
      else if(type == "bool")
      {
        control = document.createElement("input");
        control.type = "checkbox";
        if(initial !== undefined)
        {
          if(typeof(initial) != "boolean")
          {
            throw new Error(errorprefix + "initial/default of type 'bool' has to be boolean (true/false)");
          }
          control.checked = initial;
        }
        else
        {
          control.checked = false;
        }
      }
      paramControls.push(control);
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var label = paramdef.name + ":";
      if('caption' in paramdef)
      {
        label = paramdef.caption;
      }
      if('visible' in paramdef)
      {
        tr.style.display = (paramdef.visible) ? "table-row" : "none";
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
