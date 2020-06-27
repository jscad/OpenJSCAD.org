const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')

const actions = ({ sources }) => {
  const setActiveTool$ = most.mergeArray([
    sources.dom.select('#toggleOptions').events('click').map((event) => 'options'),
    sources.dom.select('#toggleEditor').events('click').map((event) => 'editor'),
    sources.dom.select('#toggleHelp').events('click').map((event) => 'help'),
    sources.dom.select('.example').events('mouseup').map((event) => undefined)
    /* sources.state // we changed designs
      .filter(state => state.design)
      .map(state => state.design.mainPath)
      .skipRepeatsWith((mainPath, previousMainPath) => mainPath !== previousMainPath)
      // .map(_ => undefined)
      .tap(x => console.log('changed design')) */
  ])
    .thru(withLatestFrom((state, tool) => {
      const activeTool = state.activeTool === tool ? undefined : tool
      return { activeTool }
    }, sources.state))
    .map((payload) => Object.assign({}, { type: 'setActiveTool', sink: 'state' }, { state: payload }))

  return { setActiveTool$ }
}

module.exports = actions
