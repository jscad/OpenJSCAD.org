
const actions = (sources) => {
  const changeExportFormat$ = sources.dom.select('#exportFormats').events('change')
    .map(e => e.target.value)
    .map(data => ({type: 'changeExportFormat', data}))

  return {
    changeExportFormat$
  }
}

module.exports = actions
