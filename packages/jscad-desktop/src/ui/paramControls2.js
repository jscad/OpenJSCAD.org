const html = require('bel')

const createParamControls = (targetEl, prevParamValues = {}, paramDefinitions, rebuildSolid) => {
  const entries = []
  console.log('FOOOOOOOO', paramDefinitions)

  // const listUI = someList.map(({name, value}) => html`<li>${name}-------${value}</li>`)

  const controls = html`
  <table>
  
  </table>
  `

  targetEl.appendChild(controls)
}

module.exports = {createParamControls}
