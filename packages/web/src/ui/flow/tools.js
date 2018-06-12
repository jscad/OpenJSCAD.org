const most = require('most')

const actions = ({sources}) => {
  const setActiveTool$ = most.mergeArray([
    sources.dom.select('#toggleOptions').events('click').map(event => 'options'),
    sources.dom.select('#toggleEditor').events('click').map(event => 'editor'),
    sources.dom.select('#toggleHelp').events('click').map(event => 'help')
  ])
    .map(data => ({type: 'setActiveTool', data}))
  return {setActiveTool$}
}

module.exports = actions
