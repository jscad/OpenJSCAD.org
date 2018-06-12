const most = require('most')

const actions = ({sources}) => {
  const setTheme$ = most.mergeArray([
    sources.dom.select('#themeSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.themeName)
      .map(reply => reply.data.themeName)
  ])
  .startWith('light')
  .map(data => ({type: 'changeTheme', data}))

  return {setTheme$}
}

module.exports = actions
