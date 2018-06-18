const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')

const actions = ({sources}) => {
  const setActiveTool$ = most.mergeArray([
    sources.dom.select('#toggleOptions').events('click').map(event => 'options'),
    sources.dom.select('#toggleEditor').events('click').map(event => 'editor'),
    sources.dom.select('#toggleHelp').events('click').map(event => 'help')
  ])
    .thru(withLatestFrom((state, tool) => {
      const activeTool = state.activeTool === tool ? undefined : tool
      return Object.assign({}, state, {activeTool})
    }, sources.state))
    .map(payload => Object.assign({}, {type: 'setActiveTool', sink: 'state'}, {state: payload}))

  return {setActiveTool$}
}

module.exports = actions
