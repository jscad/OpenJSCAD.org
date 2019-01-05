/**
 * @prettier
 */
// == OpenJSCAD.org, Copyright (c) 2017, Licensed under MIT License
const AlertUserOfUncaughtExceptions = require('./errorDispatcher')

const version = require('../../package.json').version
const Processor = require('../jscad/processor-bare')

var gProcessor = null

/**
 * Initialize a jscad viewer.  You can prevent the processor from creating
 * a new `canvas` element by passing a canvas element on `glOptions`.
 *
 * If the viewer element has a `design-url` attribute, that url will be loaded
 * with a `XMLHttpRequest`.  Otherwise load the design using `setJsCad`.
 *
 * @param {Object} viewer - A DOM element to use as the base element.
 * @param {JscadViewerOptions} options - options passed to the viewer processor
 */
function init(viewer, options) {
  const versionText = 'UMD OpenJSCAD.org Version ' + version
  console.log('umd init', versionText, options)

  // Show all exceptions to the user: // WARNING !! this is not practical at dev time
  AlertUserOfUncaughtExceptions()

  let design = viewer.getAttribute('design-url')

  gProcessor = new Processor(viewer, options)

  // load the given design
  if (design) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', design, true)
    gProcessor.setStatus('Loading ' + design)

    xhr.onload = function() {
      var source = this.responseText

      if (design.match(/\.jscad$/i) || design.match(/\.js$/i)) {
        gProcessor.setStatus('Processing ' + design)
        gProcessor.setJsCad(source, design)
      }
    }
    xhr.send()
  }

  return {
    /**
     * Start the processor on generating an output file. Once
     * the file has been created, the `
     * @param {FormatInfo} format
     */
    generateOutputFile: function(format) {
      return gProcessor.generateOutputFile(format)
    },

    clearOutputFile: function() {
      return gProcessor.clearOutputFile()
    },

    resetCamera() {
      return gProcessor.viewer.resetCamera()
    },

    abort() {
      return gProcessor.abort()
    },

    setJsCad(source, design) {
      gProcessor.setJsCad(source, design)
    },

    rebuildSolids() {
      gProcessor.rebuildSolids()
    },
  }
}

module.exports = init

/**
 * @typedef {Object} XYZCoord
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef {Object} MinMax
 * @property {number} min
 * @property {number} max
 */

/**
 * Camera settings
 * @typedef {Object} CameraSettings
 * @property {number} fov - field of view.
 * @property {XYZCoord} angle - view angle about XYZ axis.
 * @property {XYZCoord} position - initial position at XYZ.
 * @property {MinMax} clip - rendering outside this range is clipped.
 */

/**
 * @typedef {Object} RgbaColor
 * @property {number} r - red (values 0.0 - 1.0).
 * @property {number} g - green (values 0.0 - 1.0).
 * @property {number} b - blue (values 0.0 - 1.0).
 * @property {number} a - alpha (values 0.0 - 1.0).
 */

/**
 * Grid settings
 * @typedef {Object} GridSettings
 * @property {number} i - number of units between grid lines.
 * @property {RgbaColor} color - color.
 */

/**
 * @typedef {Object} PlateSettings
 * @property {boolean} draw draw or not (default: true).
 * @property {number} size plate size (X and Y) (default: 200).
 * @property {GridSettings} m minor grid settings.
 * @property {GridSettings} M major grid settings.
 */

/**
 *
 * @typedef {Object} PosNegColor
 * @property {RgbaColor} neg color in negative direction.
 * @property {RgbaColor} pos color in positive direction.
 */

/**
 * @typedef {Object} AxisSettings
 * @property {boolean} draw - draw or not (default: false).
 * @property {PosNegColor} x
 * @property {PosNegColor} y
 * @property {PosNegColor} z
 */

/**
 * @typedef {Object} LightGLOptions
 * @property {Object} canvas - Uses the HTML canvas given in 'options' or creates a new one if necessary.
 * @property {number} width - width applied to the canvas created when `options.canvas` is not set. (default: 800).
 * @property {number} height - height applied to the canvas created when `options.canvas` is not set. (default: 600).
 * @property {number} alpha - The alpha channel is disabled by default because it usually causes unintended transparencies in the canvas.
 *
 */

/**
 * @typedef {Object} JscadViewerOptions
 * @property {PlateSettings} plate - The grid show in the viewer.
 * @property {CameraSettings} camera
 * @property {AxisSettings} axis
 * @property {LightGLOptions} glOptions - Options sent to `GL.create()`.
 * @property {Object} processor - options used by the viewer processor.
 */

/**
 * @typedef {Object} ProcessorOptions
 * @property {Element} viewerContext - The main element that jscad uses.  If no canvas element is set, jscad creates one.
 * @property {Element} viewerdiv - Jscad moves the canvas tag here, or creates one and places it here.
 * @property {Element} parameterstable - A Table element reference.  The design parameters will be added here.
 * @property {Element} viewerCanvas - A Canvas element reference that will be used to draw the GL canvas.
 */
