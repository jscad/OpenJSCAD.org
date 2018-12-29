const {baseInteractionsFromEvents, pointerGestures} = require('most-gestures')
const GL = require('./lightgl')
const {colorBytes} = require('./jscad-viewer-helpers')

/**
 * lightgl.js renderer for jscad viewer
 * @param {DOMElement} containerelement container element
 * @param {object}     options    options for renderer
 */
function LightGLEngine (containerelement, options) {
  this.options = options

  this.containerEl = containerelement

  this.createRenderer()

// only window resize is available, so add an event callback for the canvas
  window.addEventListener('resize', this.handleResize.bind(this))
};

LightGLEngine.prototype = {
  init: function () {
  // set initial canvas size
    this.gl.canvas.width = this.containerEl.width
    this.gl.canvas.height = this.containerEl.height

    this.handleResize()
  },
  handleResize: function () {
    // Set up the viewport

    var canvas = this.canvas

    this.resizeCanvas()

    this.gl.viewport(0, 0, canvas.width, canvas.height) // pixels
    this.gl.matrixMode(this.gl.PROJECTION)
    this.gl.loadIdentity()
    this.gl.perspective(this.options.camera.fov, canvas.width / canvas.height, this.options.camera.clip.min, this.options.camera.clip.max)
    this.gl.matrixMode(this.gl.MODELVIEW)

    this.onDraw()
  },
  createRenderer: function () {
    // Set up WebGL state
    var gl = GL.create(this.options.glOptions)
    this.gl = gl
    this.gl.lineWidth(1) // don't let the library choose

    this.canvas = this.gl.canvas
    this.meshes = []
    this.containerEl.appendChild(this.gl.canvas)

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
    this.gl.clearColor.apply(this.gl, colorBytes(this.options.background.color))
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.enable(this.gl.CULL_FACE)

    var outlineColor = this.options.solid.outlineColor

    // Black shader for wireframe
    this.blackShader = new GL.Shader('\
      void main() {\
        gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
      }', '\
      void main() {\
        gl_FragColor = vec4(' + colorBytes(outlineColor).join(', ') + ');\
      }'
    )

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
   )

    var _this = this

    this.createControls()
    this.resetCamera()

    this.gl.ondraw = function () {
      _this.onDraw()
    }

    // state variables, i.e. used for storing values, etc

    // state of viewer
    // 0 - initialized, no object
    // 1 - cleared, no object
    // 2 - showing, object
    this.state = 0
    this.meshes = []
    this.clear() // and draw the inital viewer
  },
  createControls: function () {
    var _this = this

    var shiftControl = document.createElement('div')
    shiftControl.className = 'shift-scene'

    var leftArrow = document.createElement('div')
    leftArrow.classList.add('arrow')
    leftArrow.classList.add('arrow-left')

    var rightArrow = document.createElement('div')
    rightArrow.classList.add('arrow')
    rightArrow.classList.add('arrow-right')

    var topArrow = document.createElement('div')
    topArrow.classList.add('arrow')
    topArrow.classList.add('arrow-top')

    var bottomArrow = document.createElement('div')
    bottomArrow.classList.add('arrow')
    bottomArrow.classList.add('arrow-bottom')

    shiftControl.appendChild(leftArrow)
    shiftControl.appendChild(rightArrow)
    shiftControl.appendChild(topArrow)
    shiftControl.appendChild(bottomArrow)
    this.containerEl.appendChild(shiftControl)

    // we need mobile detection to change the target element of controls:
    // otherwise we have to disable the build in html zoom on mobile , which is not always ideal
    const isMobile = typeof window.orientation !== 'undefined'
    const element = this.containerEl // for now only use the canvas isMobile ? this.containerEl : document
    const baseInteractions = baseInteractionsFromEvents(element)
    const gestures = pointerGestures(baseInteractions)

    const rotateFactor = 0.4
    const panFactor = 0.005
    const zoomFactor = 1.085

    gestures.drags
      .throttle(20)
      .forEach(function (data) {
        const {delta, originalEvents} = data

        const {altKey, shiftKey, ctrlKey, metaKey} = originalEvents[0]
        const button = originalEvents[0].which

        if (altKey || button === 3)                     // ROTATE X,Y (ALT or right mouse button)
        {
          _this.angleY += delta.x * rotateFactor
          _this.angleX += delta.y * rotateFactor
        } else if (shiftKey || button === 2) {            // PAN  (SHIFT or middle mouse button)
          _this.viewpointX -= panFactor * delta.x * _this.viewpointZ
          _this.viewpointY -= panFactor * delta.y * _this.viewpointZ
        } else if (ctrlKey || metaKey) {                   // ZOOM IN/OUT
          let zoom = (-delta.x + delta.y) * 10 * zoomFactor // arbitrary
          const coeff = (_this.viewpointZ - _this.options.camera.clip.min) / (_this.options.camera.clip.max - _this.options.camera.clip.min)
          zoom *= coeff
          _this.viewpointZ += zoom
          _this.viewpointZ = Math.min(Math.max(_this.viewpointZ, _this.options.camera.clip.min), _this.options.camera.clip.max)
        } else {
          _this.angleZ -= delta.x * rotateFactor
          _this.angleX += delta.y * rotateFactor
        }

        _this.onDraw()
      })

    gestures.zooms
      .throttle(20)
      .forEach(function (zoom) {
        const coeff = (_this.viewpointZ - _this.options.camera.clip.min) / (_this.options.camera.clip.max - _this.options.camera.clip.min)
        zoom *= zoomFactor * coeff
        _this.viewpointZ -= zoom //* (this.options.camera.clip.max - this.options.camera.clip.min)
        _this.viewpointZ = Math.min(Math.max(_this.viewpointZ, _this.options.camera.clip.min), _this.options.camera.clip.max)
        _this.onDraw()
      })

    /*this.touch = {
      angleX: 0,
      angleY: 0,
      angleZ: 0,
      lastX: 0,
      lastY: 0,
      scale: 0,
      ctrl: 0,
      shiftTimer: null,
      shiftControl: shiftControl,
      cur: null // current state

    }*/

    /*
    hammerElt.on('press', function (e) {
      console.log('press', e.pointers, e.pointerType)
      if (e.pointers.length === 1) {
        var point = e.center
        shiftControl.classList.add('active')
        shiftControl.style.left = point.pageX + 'px'
        shiftControl.style.top = point.pageY + 'px'
        _this.touch.cur = 'shifting'
      } else {
        _this.clearShift()
      }
    })

    hammerElt.on('pressup', function (e) {
      console.log('pressup')
      _this.clearShift()
      if (_this.touch.cur) {
        shiftControl.classList.remove('active')
        shiftControl.classList.remove('shift-horizontal')
        shiftControl.classList.remove('shift-vertical')
      }
    })

    */

    this.gl.ondraw = function () {
      _this.onDraw()
    }
  },
  clearShift: function () {
    if (this.touch.shiftTimer) {
      clearTimeout(this.touch.shiftTimer)
      this.touch.shiftTimer = null
    }
    return this
  },

  // pan & tilt with one finger
  onPanTilt: function (e) {
    // console.log('onPanTilt')
    this.touch.cur = 'dragging'
    let deltaX = 0
    let deltaY = 0
    const factor = 0.3
    if (this.touch.lastY !== undefined) {  // tilt
      deltaX = e.deltaY - this.touch.lastY
      this.angleX += deltaX * factor
      this.touch.lastY = e.deltaY
    }
    if (this.touch.lastX !== undefined) {  // pan
      deltaY = e.deltaX - this.touch.lastX
      this.angleZ += deltaY * factor
      this.touch.lastX = e.deltaX
    }
    // console.log(delta)
    if (deltaX || deltaY) {
      this.onDraw()
    }
  },

  // shift after 0.5s touch&hold
  onShift: function (e) {
    console.log('onShift')
    this.touch.cur = 'shifting'
    var factor = 5e-3
    var delta = 0

    if (this.touch.lastY && (e.direction == 'up' || e.direction == 'down')) {
      this.touch.shiftControl
        .removeClass('shift-horizontal')
        .addClass('shift-vertical')
        .css('top', e.center.pageY + 'px')
      delta = e.deltaY - this.touch.lastY
      this.viewpointY -= factor * delta * this.viewpointZ
      this.angleX += delta
    }
    if (this.touch.lastX && (e.direction == 'left' || e.direction == 'right')) {
      this.touch.shiftControl
        .removeClass('shift-vertical')
        .addClass('shift-horizontal')
        .css('left', e.center.pageX + 'px')
      delta = e.deltaX - this.touch.lastX
      this.viewpointX += factor * delta * this.viewpointZ
      this.angleZ += delta
    }
    if (delta) {
      this.onDraw()
    }
    this.touch.lastX = e.deltaX
    this.touch.lastY = e.deltaY
  },

  onDraw: function (e) {
    var gl = this.gl
    gl.makeCurrent()

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.loadIdentity()
    // set the perspective based on the camera postion
    gl.translate(this.viewpointX, this.viewpointY, -this.viewpointZ)
    gl.rotate(this.angleX, 1, 0, 0)
    gl.rotate(this.angleY, 0, 1, 0)
    gl.rotate(this.angleZ, 0, 0, 1)
    // draw the solid (meshes)
    if (this.options.solid.draw) {
      gl.enable(gl.BLEND)
      if (!this.options.solid.overlay) gl.enable(gl.POLYGON_OFFSET_FILL)
      for (var i = 0; i < this.meshes.length; i++) {
        var mesh = this.meshes[i]
        this.lightingShader.draw(mesh, gl.TRIANGLES)
      }
      if (!this.options.solid.overlay) gl.disable(gl.POLYGON_OFFSET_FILL)
      gl.disable(gl.BLEND)

      if (this.options.solid.lines) {
        if (this.options.solid.overlay) gl.disable(gl.DEPTH_TEST)
        gl.enable(gl.BLEND)
        for (var i = 0; i < this.meshes.length; i++) {
          var mesh = this.meshes[i]
          this.blackShader.draw(mesh, gl.LINES)
        }
        gl.disable(gl.BLEND)
        if (this.options.solid.overlay) gl.enable(gl.DEPTH_TEST)
      }
    }
    // draw the plate and the axis
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.begin(gl.LINES)

    if (this.options.plate.draw) {
      var m = this.options.plate.m // short cut
      var M = this.options.plate.M // short cut
      var size = this.options.plate.size / 2
      // -- minor grid
      gl.color.apply(gl, colorBytes(m.color))
      var mg = m.i
      var MG = M.i
      for (var x = -size; x <= size; x += mg) {
        if (x % MG) { // draw only minor grid line
          gl.vertex(-size, x, 0)
          gl.vertex(size, x, 0)
          gl.vertex(x, -size, 0)
          gl.vertex(x, size, 0)
        }
      }
      // -- major grid
      gl.color.apply(gl, colorBytes(M.color))
      for (var x = -size; x <= size; x += MG) {
        gl.vertex(-size, x, 0)
        gl.vertex(size, x, 0)
        gl.vertex(x, -size, 0)
        gl.vertex(x, size, 0)
      }
    }
    if (this.options.axis.draw) {
      var size = this.options.plate.size / 2
      // X axis
      var c = this.options.axis.x.neg
      gl.color(c.r, c.g, c.b, c.a) // negative direction is lighter
      gl.vertex(-size, 0, 0)
      gl.vertex(0, 0, 0)
      c = this.options.axis.x.pos
      gl.color(c.r, c.g, c.b, c.a) // positive direction is lighter
      gl.vertex(0, 0, 0)
      gl.vertex(size, 0, 0)
      // Y axis
      c = this.options.axis.y.neg
      gl.color(c.r, c.g, c.b, c.a) // negative direction is lighter
      gl.vertex(0, -size, 0)
      gl.vertex(0, 0, 0)
      c = this.options.axis.y.pos
      gl.color(c.r, c.g, c.b, c.a) // positive direction is lighter
      gl.vertex(0, 0, 0)
      gl.vertex(0, size, 0)
      // Z axis
      c = this.options.axis.z.neg
      gl.color(c.r, c.g, c.b, c.a) // negative direction is lighter
      gl.vertex(0, 0, -size)
      gl.vertex(0, 0, 0)
      c = this.options.axis.z.pos
      gl.color(c.r, c.g, c.b, c.a) // positive direction is lighter
      gl.vertex(0, 0, 0)
      gl.vertex(0, 0, size)
    }
    gl.end()
    gl.disable(gl.BLEND)
  },

  // Convert from CSG solid to an array of GL.Mesh objects
  // limiting the number of vertices per mesh to less than 2^16
  csgToMeshes: function (initial_csg) {
    var csg = initial_csg.canonicalized()
    var mesh = new GL.Mesh({ normals: true, colors: true })
    var meshes = [ mesh ]
    var vertexTag2Index = {}
    var vertices = []
    var colors = []
    var triangles = []
    // set to true if we want to use interpolated vertex normals
    // this creates nice round spheres but does not represent the shape of
    // the actual model
    var smoothlighting = this.options.solid.smooth
    var polygons = csg.toPolygons()
    var numpolygons = polygons.length
    for (var j = 0; j < numpolygons; j++) {
      var polygon = polygons[j]
      var color = colorBytes(this.options.solid.faceColor)  // default color

      if (polygon.shared && polygon.shared.color) {
        color = polygon.shared.color
      } else if (polygon.color) {
        color = polygon.color
      }

      if (color.length < 4) {
        color.push(1.0)
      } // opaque

      var indices = polygon.vertices.map(function (vertex) {
        var vertextag = vertex.getTag()
        var vertexindex = vertexTag2Index[vertextag]
        var prevcolor = colors[vertexindex]
        if (smoothlighting && (vertextag in vertexTag2Index) &&
           (prevcolor[0] === color[0]) &&
           (prevcolor[1] === color[1]) &&
           (prevcolor[2] === color[2])
          ) {
          vertexindex = vertexTag2Index[vertextag]
        } else {
          vertexindex = vertices.length
          vertexTag2Index[vertextag] = vertexindex
          vertices.push([vertex.pos.x, vertex.pos.y, vertex.pos.z])
          colors.push(color)
        }
        return vertexindex
      })
      for (var i = 2; i < indices.length; i++) {
        triangles.push([indices[0], indices[i - 1], indices[i]])
      }
      // if too many vertices, start a new mesh;
      if (vertices.length > 65000) {
        // finalize the old mesh
        mesh.triangles = triangles
        mesh.vertices = vertices
        mesh.colors = colors
        mesh.computeWireframe()
        mesh.computeNormals()

        if (mesh.vertices.length) {
          meshes.push(mesh)
        }

        // start a new mesh
        mesh = new GL.Mesh({ normals: true, colors: true })
        triangles = []
        colors = []
        vertices = []
      }
    }
    // finalize last mesh
    mesh.triangles = triangles
    mesh.vertices = vertices
    mesh.colors = colors
    mesh.computeWireframe()
    mesh.computeNormals()

    if (mesh.vertices.length) {
      meshes.push(mesh)
    }

    return meshes
  }
}

module.exports = LightGLEngine
