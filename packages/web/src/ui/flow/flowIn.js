const most = require('most')
const { flatten } = require('@jscad/array-utils')
const { proxy } = require('most-proxy')

const makeActions = (sources) => {
  const { attach, stream } = proxy()
  sources.actions = stream
    .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
    .multicast()

  const toolActions = require('./tools')({ sources })
  const viewerActions = require('./viewer')({ sources })
  const themeActions = require('./themes')({ sources })
  const languageActions = require('./languages')({ sources })
  const shortcutActions = require('./shortcuts')({ sources })
  const errorActions = require('./errors')({ sources })
  const exportActions = require('./exports')({ sources })

  const designActions = require('./design')({ sources })

  const actions = [
    errorActions,
    designActions,
    exportActions,

    toolActions,
    themeActions,
    viewerActions,
    languageActions,
    shortcutActions]

  const output$ = most.mergeArray(flatten(actions.map((actions) => Object.values(actions))))
    .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
    .multicast()
    .filter((x) => x !== undefined)

  attach(output$)
  return output$
}

module.exports = makeActions
