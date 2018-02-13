const LightGLEngine = require('./jscad-viewer-lightgl')
const {colorRGBA, parseColor} = require('./jscad-viewer-helpers')

/**
 * A viewer is a WebGL canvas that lets the user view a mesh.
 * The user can tumble it around by dragging the mouse.
 * @param {DOMElement} containerelement container element
 * @param {object}     options          options for renderer
 */
function Viewer (containerelement, options) {
  // see the defaults method on how to change these
  this.options = Viewer.defaults()
  // apply all options found
  if ('camera' in options) { this.setCameraOptions(options['camera']) }
  if ('plate' in options) { this.setPlateOptions(options['plate']) }
  if ('axis' in options) { this.setAxisOptions(options['axis']) }
  if ('solid' in options) { this.setSolidOptions(options['solid']) }
  if ('glOptions' in options) { this.options.glOptions = options.glOptions }
  
  var engine

  // select drawing engine from options
  if (this.options.engine && Viewer[this.options.engine]) {
    engine = Viewer[this.options.engine]
  }

  // instantiate the rendering engine
  if (!engine) {
    engine = LightGLEngine // || Viewer.ThreeEngine
  }

  if (!engine) {
    throw new Error('Cannot find drawing engine, please define one via "engine" option')
  }

  // mixin methods
  for (var method in Viewer.prototype) {
    if (!(method in engine.prototype)) {
      engine.prototype[method] = Viewer.prototype[method]
    }
  }

  var e = new engine(containerelement, this.options)
  e.init()
  return e
};

/**
 * return defaults which can be customized later
 * @returns {object} [[Description]]
 */
Viewer.defaults = function () {
  return {
    camera: {
      fov: 45,                           // field of view
      angle: {x: -60, y: 0, z: -45},  // view angle about XYZ axis
      position: {x: 0, y: 0, z: 100},  // initial position at XYZ
      clip: {min: 0.5, max: 1000}  // rendering outside this range is clipped
    },
    plate: {
      draw: true,                // draw or not
      size: 200,                 // plate size (X and Y)
      // minor grid settings
      m: {
        i: 1, // number of units between minor grid lines
        color: {r: 0.8, g: 0.8, b: 0.8, a: 0.5} // color
      },
      // major grid settings
      M: {
        i: 10, // number of units between major grid lines
        color: {r: 0.5, g: 0.5, b: 0.5, a: 0.5} // color
      }
    },
    axis: {
      draw: false,                // draw or not
      x: {
        neg: {r: 1.0, g: 0.5, b: 0.5, a: 0.5}, // color in negative direction
        pos: {r: 1.0, g: 0, b: 0, a: 0.8} // color in positive direction
      },
      y: {
        neg: {r: 0.5, g: 1.0, b: 0.5, a: 0.5}, // color in negative direction
        pos: {r: 0, g: 1.0, b: 0, a: 0.8} // color in positive direction
      },
      z: {
        neg: {r: 0.5, g: 0.5, b: 1.0, a: 0.5}, // color in negative direction
        pos: {r: 0, g: 0, b: 1.0, a: 0.8} // color in positive direction
      }
    },
    solid: {
      draw: true,              // draw or not
      lines: false,             // draw outlines or not
      faces: true,
      overlay: false,             // use overlay when drawing lines or not
      smooth: false,             // use smoothing or not
      faceColor: {r: 1.0, g: 0.4, b: 1.0, a: 1.0},        // default face color
      outlineColor: {r: 0.0, g: 0.0, b: 0.0, a: 0.1}        // default outline color
    },
    background: {
      color: {r: 0.93, g: 0.93, b: 0.93, a: 1.0}
    }
  }
}

Viewer.prototype = {
  parseSizeParams: function () {
    // essentially, allow all relative + px. Not cm and such.
    var winResizeUnits = ['%', 'vh', 'vw', 'vmax', 'vmin']
    var width, height
    var containerStyle = this.containerEl.style
    var wUnit = containerStyle.width.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
    var hUnit = typeof containerStyle.height === 'string'
      ? containerStyle.height.match(/^(\d+(?:\.\d+)?)(.*)$/)[2]
      : ''
    // whether unit scales on win resize
    var isDynUnit
      = containerStyle.width.match(/^calc\(/)
      || containerStyle.height.match(/^calc\(/)
      || winResizeUnits.indexOf(wUnit) != -1
      || winResizeUnits.indexOf(hUnit) != -1
    // e.g if units are %, need to keep resizing canvas with dom
    if (isDynUnit) {
      window.addEventListener('resize', this.handleResize.bind(this))
    }
  },
  resizeCanvas: function () {
    var canvas = this.canvas

    var devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = this.containerEl.clientWidth * devicePixelRatio
    canvas.height = this.containerEl.clientHeight * devicePixelRatio
  },
  setCsg: function (csg) {
    if (0 && csg.length) {                            // preparing multiple CSG's (not union-ed), not yet working
      for (var i = 0; i < csg.length; i++) {
        this.meshes.concat(this.csgToMeshes(csg[i]))
      }
    } else {
      this.meshes = this.csgToMeshes(csg)
    }
    this.state = 2 // showing, object
    this.onDraw()
  },

  clear: function () {
    // empty mesh list:
    this.meshes = []
    this.state = 1 // cleared, no object
    this.onDraw()
  },

  resetCamera: function () {
    // reset perpective (camera) to initial settings
    this.angleX = this.options.camera.angle.x
    this.angleY = this.options.camera.angle.y
    this.angleZ = this.options.camera.angle.z
    this.viewpointX = this.options.camera.position.x
    this.viewpointY = this.options.camera.position.y
    this.viewpointZ = this.options.camera.position.z
    this.onDraw()
  },

  supported: function () {
    return !!this.gl
  },

  setCameraOptions: function (options) {
    options = options || {}
  // apply all options found
    for (var x in this.options.camera) {
      if (x in options) { this.options.camera[x] = options[x] }
    }
  },

  setPlateOptions: function (options) {
    options = options || {}
  // apply all options found
    for (var x in this.options.plate) {
      if (x in options) { this.options.plate[x] = options[x] }
    }
  },

  setAxisOptions: function (options) {
    options = options || {}
  // apply all options found
    for (var x in this.options.axis) {
      if (x in options) this.options.axis[x] = options[x]
    }
  },

  setSolidOptions: function (options) {
    options = options || {}
  // apply all options found
    for (var x in this.options.solid) {
      if (x in options) this.options.solid[x] = options[x]
    }
  }
}

module.exports = Viewer
