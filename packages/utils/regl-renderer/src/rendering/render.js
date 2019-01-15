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
  const drawCache = {}

  // create the main draw command
  let command = props => {
    // console.log('params in render', props)
    props.rendering = Object.assign({}, renderDefaults, props.rendering)

    // props is the first parameter, the second one is a function, doing the actual rendering
    renderContext(regl)(props, context => {
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
            const aTransparent = 'isTransparent' in a ? a.isTransparent : false
            const bTransparent = 'isTransparent' in b ? b.isTransparent : false
            return (aTransparent === bTransparent) ? 0 : aTransparent ? 1 : -1
          })
          .forEach(entity => {
            const { visuals } = entity
            if (visuals.drawCmd && visuals.show && props.drawCommands[visuals.drawCmd]) {
              const key = JSON.stringify(entity) // FIXME: EEEEEK horribly inneficient, change this!
              let drawCmd = drawCache[key]
              if (!drawCmd) {
              // make draw function
                drawCmd = props.drawCommands[visuals.drawCmd](regl, entity)
                drawCache[key] = drawCmd
              }
              // console.log('drawing with', entity.drawCmd, entity)
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
