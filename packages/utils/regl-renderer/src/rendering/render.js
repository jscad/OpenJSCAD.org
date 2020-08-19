const renderContext = require('./renderContext')
const renderDefaults = require('./renderDefaults')

const prepareRender = (params) => {
  const defaults = {
  // extensions:['oes_element_index_uint']
  }
  const options = Object.assign(
    {},
    defaults,
    params.glOptions,
    {
      // canvas: (element.nodeName.toLowerCase() === 'canvas') ? element : undefined,
      // container: (element.nodeName.toLowerCase() !== 'canvas') ? element : undefined
      onDone: (err, callback) => {
        if (err) {
          throw err
        }
      }
    }
  )
  // setup regl
  const regl = require('regl')(options)// , (width, height))
  // setup draw command cache
  // const drawCache = {}
  const drawCache2 = new Map()

  // create the main draw command
  const command = (props) => {
    // console.log('params in render', props)
    props.rendering = Object.assign({}, renderDefaults, props.rendering)

    // props is the first parameter, the second one is a function, doing the actual rendering
    renderContext(regl)(props, (context) => {
      regl.clear({
        color: props.rendering.background,
        depth: 1
      })
      // this whole thing is very inneficiant and innelegant ... improve in the future
      if (props.entities) {
        // we need to sort transparents vs non transparents: transparent objects should be rendered last
        // since you can see 'behind' transparent ones, so what is behind needs to already be rendered
        props.entities
          .sort((a, b) => {
            const aTransparent = 'transparent' in a.visuals ? a.visuals.transparent : false
            const bTransparent = 'transparent' in b.visuals ? b.visuals.transparent : false
            return (aTransparent === bTransparent) ? 0 : aTransparent ? 1 : -1
          })
          .forEach((entity) => {
            const { visuals } = entity
            if (visuals.drawCmd && visuals.show && props.drawCommands[visuals.drawCmd]) {
              let drawCmd
              if (visuals.cacheId) {
                drawCmd = drawCache2.get(visuals.cacheId)
              } else {
                visuals.cacheId = drawCache2.size
                drawCmd = props.drawCommands[visuals.drawCmd](regl, entity)
                drawCache2.set(visuals.cacheId, drawCmd)
              }
              // console.log('drawing with', drawCmd, entity)
              const drawParams = { // FIXME: horrible, tidy up !!: what is needed/should be passed to render pass ?
                ...entity,
                ...visuals,
                camera: props.camera
              }
              drawCmd(drawParams)
            }
          })
      }
    })
  }
  // actual render function
  return function render (data) {
    // important for stats, correct resizing etc
    regl.poll()
    command(data)// meh ??
    // tick += 0.01
  }
}

module.exports = prepareRender
