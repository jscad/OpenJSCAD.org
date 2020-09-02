const html = require('nanohtml')

const shortcuts = (state, i18n) => {
  const keybindings = state.shortcuts// require('../../../data/keybindings.json')
  const bindingsList = keybindings.map((binding, index) => {
    const { command, key, args, tmpKey, error } = binding

    // if we are in the midst of assigning a keypress (inProgress) display 'type & hit enter'
    // if we already have a temporary key use that one instead
    const placeholder = (tmpKey && tmpKey.length > 0) ? tmpKey : i18n.translate('type and hit enter')
    const value = binding.inProgress ? '' : key

    const validArgs = args || '' // to prevent undefined args
    return html`
    <tr>
        <td>${i18n.translate(command)}: ${i18n.translate(validArgs)}</td>
        <td>
          <input type='text' class='shortcutCommand ${error && binding.inProgress ? 'error' : ''}'
            data-command=${command}
            data-args=${args}
            data-index=${index}
            
            value='${value}'
            placeholder='${placeholder}'
          />
        </td>
        <td>${i18n`always`}</td>
      </tr>
    `
  })

  return html`
<section id='shortcuts'>   
  <h3> ${i18n`Shortcuts`} </h3>
  <table>
    <thead>
      <tr>
        <th>${i18n`Command`}</th>
        <th>${i18n`Key Binding`}</th>
        <th>${i18n`When`}</th>
      </tr>
    </thead>
    <tbody>
      ${bindingsList}
    </tbody>
  </table>
</section>`
}

module.exports = shortcuts
