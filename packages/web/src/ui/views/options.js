const html = require('nanohtml')

const options = (state, i18n) => {
  const languages = state.languages.available.map((language) => {
    const selected = state.languages.active === language.code
    return html`<option value='${language.code}' selected=${selected}>${i18n.translate(language.fullName)}</option>`
  })
  const themes = Object.entries(state.themes.available).map((theme) => {
    const name = theme[0]
    const selected = state.themes.active === name
    return html`<option value='${name}' selected=${selected}>${name}</option>`
  })

  const shortcuts = require('./shortcuts')(state, i18n)

  return html`
  <section id='options' style='visibility:${state.activeTool === 'options' ? 'visible' : 'hidden'}; color:${state.themes.themeSettings.secondaryTextColor}'>   

  <fieldset>
    <legend> <h3> ${i18n`Languages`} </h3> </legend>
    <select id='languageSwitcher'>
      ${languages}  
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`Themes`} </h3> </legend>
    <select id='themeSwitcher'>
      ${themes}
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`Generation`}</h3> </legend>
    <label>${i18n`enable geometry caching`} ${i18n`see`} <a href='https://github.com/jscad/jscad-desktop#geometry-caching' target="_blank">docs</a>
      <input id='toggleVtreeMode' type='checkbox' checked=${state.design.vtreeMode}/>
    </label>
    <label>${i18n`timeout for generation`}
      <input id='solidsTimeout' type='number' min=0 max=200000 value=${state.design.solidsTimeOut} />
    </label>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`Viewer`} </h3> </legend>
    <label>${i18n`enable zoom on new parameters`}
      <input type='checkbox' checked=false id='viewer-zoomtofitonparamschange' disabled />
    </label>
    <label>${i18n`enable zoom on reload`}
      <input type='checkbox' checked=false id='viewer-zoomtofitonload' disabled />
    </label>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`Storage`} </h3> </legend>
    <label>${i18n`settings storage path`} ${i18n`not settable`}
      <input type='text' disabled value='${state.storage.path}' disabled />
    </label>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`File Handling`} </h3> </legend>
    <label>${i18n`enable conversion to scripts`}
      <input type='checkbox' checked=false id='design-convertSupportedTypes' checked=${state.design.convertSupportedTypes}/>
    </label>
  </fieldset>

  ${shortcuts}

</section>`
}

module.exports = options
