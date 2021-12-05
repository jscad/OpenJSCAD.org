(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f()
  } else if (typeof define === 'function' && define.amd) {
    define([], f)
  } else {
    let g
    if (typeof window !== 'undefined') {
      g = window
    } else if (typeof global !== 'undefined') {
      g = global
    } else if (typeof self !== 'undefined') {
      g = self
    } else {
      g = this
    }
    g.jscadRenderWorker = f()
  }
})(function () {
  function workerScript () {
    let workerBaseURI, main, perspectiveCamera
    const state = {}

    function require (url) {
      url = require.alias[url] || url
      if (url[0] != '/' && url.substr(0, 2) != './' && url.substr(0, 4) != 'http') url = 'https://unpkg.com/' + url
      let exports = require.cache[url] // get from cache
      if (!exports) { // not cached
        const module = requireModule(url)
        require.cache[url] = exports = module.exports // cache obj exported by module
      }
      return exports // require returns object exported by module
    }

    function requireFile (url) {
      try {
        const X = new XMLHttpRequest()
        X.open('GET', new URL(url, workerBaseURI), 0) // sync
        X.send()
        if (X.status && X.status !== 200) throw new Error(X.statusText)
        return X.responseText
      } catch (e) {
        console.log('problem loading url ', url, 'base', workerBaseURI, ' error:', e.message)
        throw e
      }
    }

    function requireModule (url, source) {
      try {
        const exports = {}
        if (!source) source = requireFile(url)
        const module = { id: url, uri: url, exports: exports, source } // according to node.js modules
        // fix, add comment to show source on Chrome Dev Tools
        source = '//@ sourceURL=' + url + '\n' + source
        // ------
        const anonFn = new Function('require', 'exports', 'module', source) // create a Fn with module code, and 3 params: require, exports & module
        anonFn(require, exports, module) // call the Fn, Execute the module
        return module
      } catch (err) {
        console.error('Error loading module ' + url, err.message)
        throw err
      }
    }

    require.cache = {}
    require.alias = {}

    const rotateSpeed = 0.002
    const panSpeed = 1
    const zoomSpeed = 0.08
    let rotateDelta = [0, 0]
    let panDelta = [0, 0]
    let zoomDelta = 0
    let updateRender = true
    let orbitControls, renderOptions, gridOptions, axisOptions, renderer

    let entities = []

    function createContext (canvas, contextAttributes) {
      function get (type) {
        try {
          return { gl: canvas.getContext(type, contextAttributes), type }
        } catch (e) {
          return null
        }
      }
      return (
        get('webgl2') ||
      get('webgl') ||
      get('experimental-webgl') ||
      get('webgl-experimental')
      )
    }

    const startRenderer = ({ canvas, cameraPosition, cameraTarget, axis = {}, grid = {} }) => {
      const { prepareRender, drawCommands, cameras, controls } = require('@jscad/regl-renderer')
      // ********************
      // Renderer configuration and initiation.
      // ********************

      perspectiveCamera = cameras.perspective
      orbitControls = controls.orbit

      state.canvas = canvas
      // prepare the camera
      state.camera = Object.assign({}, perspectiveCamera.defaults)
      if (cameraPosition) state.camera.position = cameraPosition
      if (cameraTarget) state.camera.target = cameraTarget

      resize({ width: canvas.width, height: canvas.height })

      // prepare the controls
      state.controls = orbitControls.defaults

      const { gl, type } = createContext(canvas)
      // prepare the renderer
      const setupOptions = {
        glOptions: { gl }
      }
      if (type == 'webgl') {
        setupOptions.glOptions.optionalExtensions = ['oes_element_index_uint']
      }
      renderer = prepareRender(setupOptions)

      gridOptions = {
        visuals: {
          drawCmd: 'drawGrid',
          show: grid.show || grid.show === undefined,
          color: grid.color || [0, 0, 0, 1],
          subColor: grid.subColor || [0, 0, 1, 0.5],
          fadeOut: false,
          transparent: true
        },
        size: grid.size || [200, 200],
        ticks: grid.ticks || [10, 1]
      }

      axisOptions = {
        visuals: {
          drawCmd: 'drawAxis',
          show: axis.show || axis.show === undefined
        },
        size: axis.size || 100
      }

      // assemble the options for rendering
      renderOptions = {
        camera: state.camera,
        drawCommands: {
          drawAxis: drawCommands.drawAxis,
          drawGrid: drawCommands.drawGrid,
          drawLines: drawCommands.drawLines,
          drawMesh: drawCommands.drawMesh
        },
        // define the visual content
        entities: [
          gridOptions,
          axisOptions,
          ...entities
        ]
      }
      // the heart of rendering, as themes, controls, etc change

      updateView()
    }

    let renderTimer
    const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame
    console.log('tmFunc', tmFunc, typeof requestAnimationFrame)

    function updateView (delay = 8) {
      if (renderTimer || !renderer) return
      renderTimer = tmFunc(updateAndRender, delay)
    }

    const doRotatePanZoom = () => {
      if (rotateDelta[0] || rotateDelta[1]) {
        const updated = orbitControls.rotate({ controls: state.controls, camera: state.camera, speed: rotateSpeed }, rotateDelta)
        state.controls = { ...state.controls, ...updated.controls }
        rotateDelta = [0, 0]
      }

      if (panDelta[0] || panDelta[1]) {
        const updated = orbitControls.pan({ controls: state.controls, camera: state.camera, speed: panSpeed }, panDelta)
        state.controls = { ...state.controls, ...updated.controls }
        panDelta = [0, 0]
        state.camera.position = updated.camera.position
        state.camera.target = updated.camera.target
      }

      if (zoomDelta) {
        const updated = orbitControls.zoom({ controls: state.controls, camera: state.camera, speed: zoomSpeed }, zoomDelta)
        state.controls = { ...state.controls, ...updated.controls }
        zoomDelta = 0
      }
    }

    const updateAndRender = (timestamp) => {
      renderTimer = null
      doRotatePanZoom()

      const updates = orbitControls.update({ controls: state.controls, camera: state.camera })
      state.controls = { ...state.controls, ...updates.controls }
      if (state.controls.changed) updateView(16) // for elasticity in rotate / zoom

      state.camera.position = updates.camera.position
      perspectiveCamera.update(state.camera)
      renderOptions.entities = [
        gridOptions,
        axisOptions,
        ...entities
      ]
      const time = Date.now()
      renderer(renderOptions)
      if (updateRender) {
        console.log(updateRender, ' first render', Date.now() - time)
        updateRender = ''
      }
    }

    function resize ({ width, height }) {
      state.canvas.width = width
      state.canvas.height = height
      perspectiveCamera.setProjection(state.camera, state.camera, { width, height })
      perspectiveCamera.update(state.camera, state.camera)
      updateView()
    }

    function runMain (params = {}) {
      const { entitiesFromSolids } = require('@jscad/regl-renderer')
      let time = Date.now()
      const solids = main(params)
      const solidsTime = Date.now() - time
      time = Date.now()
      entities = entitiesFromSolids({}, solids)
      updateRender = `generate solids ${solidsTime}ms convert to entities ${Date.now() - time} ms`
      updateView()
    }

    let initialized = false
    const handlers = {
      pan: ({ dx, dy }) => {
        panDelta[0] += dx
        panDelta[1] += dy
        updateView()
      },
      rotate: ({ dx, dy }) => {
        rotateDelta[0] -= dx
        rotateDelta[1] -= dy
        updateView()
      },
      zoom: ({ dy }) => {
        zoomDelta += dy
        updateView()
      },
      runScript: ({ script, url, params = {} }) => {
        if (!initialized) { console.log('worker not initialized'); return }
        const script_module = requireModule(url, script)
        main = script_module.exports.main
        const gp = script_module.exports.getParameterDefinitions
        if (gp) {
          sendCmd({ action: 'parameterDefinitions', data: gp() })
        }
        runMain(params)
      },
      updateParams: ({ params = {} }) => {
        runMain(params)
      },
      resize,
      init: (params) => {
        let { baseURI, alias = [] } = params
        if (!baseURI && typeof document !== 'undefined' && document.baseURI) {
          baseURI = document.baseURI
        }

        if (baseURI) workerBaseURI = baseURI.toString()

        alias.forEach(arr => {
          const [orig, ...aliases] = arr
          aliases.forEach(a => {
            require.alias[a] = orig
            if (a.toLowerCase().substr(-3) !== '.js') require.alias[a + '.js'] = orig
          })
        })
        if (params.canvas) startRenderer(params)
        initialized = true
      }
    }

    function sendCmd (cmd, trans) {
      self.postMessage(cmd, trans)
    }

    function receiveCmd (cmd) {
      const fn = handlers[cmd.action]
      if (!fn) {
        throw new Error('no handler for type: ' + cmd.action)
      }
      fn(cmd)
    }

    if (typeof (window) !== 'undefined') {
      window.receiveCmd = receiveCmd
    } else {
      console.log('WORKER started', self.addEventListener, self)
      self.addEventListener('message', (e) => receiveCmd(e.data))
    }
  }

  const init = (params) => {
    const { canvas, baseURI = document.location.toString() } = params

    // convert HTML events (mouse movement) to viewer changes
    let lastX = 0
    let lastY = 0

    let pointerDown = false

    const moveHandler = (ev) => {
      if (!pointerDown) return
      const cmd = {
        dx: lastX - ev.pageX,
        dy: ev.pageY - lastY
      }

      const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
      cmd.action = shiftKey ? 'pan' : 'rotate'
      sendCmd(cmd)

      lastX = ev.pageX
      lastY = ev.pageY

      ev.preventDefault()
    }
    const downHandler = (ev) => {
      pointerDown = true
      lastX = ev.pageX
      lastY = ev.pageY
      canvas.setPointerCapture(ev.pointerId)
      ev.preventDefault()
    }

    const upHandler = (ev) => {
      pointerDown = false
      canvas.releasePointerCapture(ev.pointerId)
      ev.preventDefault()
    }

    const wheelHandler = (ev) => {
      sendCmd({ action: 'zoom', dy: ev.deltaY })
      ev.preventDefault()
    }

    const cmdParams = {
      ...params,
      action: 'init',
      baseURI
    }
    const cmdTransfer = []
    const jscad_script = document.getElementById('jscad_script')

    if (canvas) {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      const offscreen = canvas.transferControlToOffscreen()
      cmdParams.canvas = offscreen
      cmdParams.width = canvas.width
      cmdParams.height = canvas.height
      cmdTransfer.push(offscreen)

      canvas.onpointermove = moveHandler
      canvas.onpointerdown = downHandler
      canvas.onpointerup = upHandler
      canvas.onwheel = wheelHandler
    }

    sendCmd(cmdParams, cmdTransfer)
  }

  window.addEventListener('resize', resize)

  function resize ({ width, height }) {
    sendCmd({ action: 'resize', width: canvas.offsetWidth, height: canvas.offsetHeight })
  }

  if (document.location.toString().indexOf('no_worker') == -1) {
    const blob = new Blob(['(', workerScript.toString(), '())'], { type: 'text/javascript' })
    window.worker = new Worker(window.URL.createObjectURL(blob))
  // window.worker.onmessage = (m)=>{console.log('onmessage',m)}
  } else {
    workerScript()
  }

  function sendCmd (cmd, ...rest) {
    if (window.receiveCmd) {
      receiveCmd(cmd, ...rest)
    } else if (window.worker) {
      worker.postMessage(cmd, ...rest)
    } else {
      console.error('can not send message', window.worker, cmd)
    }
  }

  return {
    init: (params) => {
      init(params)
      if (window.worker) window.worker.onmessage = onmessage
    },
    resize,
    updateParams: ({ params = {} }) => sendCmd({ action: 'updateParams', params }),
    runScript: ({ script, url = '' }) => sendCmd({ action: 'runScript', script, url })
  }
})
