const most = require('most')

const actions = (sources) => {
  const toggleGrid$ = most.mergeArray([
    sources.dom.select('#grid').events('click')
      .map(e => e.target.checked),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.viewer.grid && reply.data.viewer.grid.show !== undefined)
      .map(reply => reply.data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleGrid', data}))

  const toggleAxes$ = most.mergeArray([
    sources.dom.select('#toggleAxes').events('click')
      .map(e => e.target.checked)
    // sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleAxes', data}))

  const toggleAutorotate$ = most.mergeArray([
    sources.dom.select('#autoRotate').events('click')
    .map(e => e.target.checked)
      // sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleAutorotate', data}))

  return {
   // 3d viewer
    toggleGrid$,
    toggleAxes$,
    toggleAutorotate$
  }
}

module.exports = actions
