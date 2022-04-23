const html = require('nanohtml')

const options = (state, i18n) => {
  const languages = state.languages.available.map((language) => {
    const selected = state.languages.active === language.code
    return html`<option value='${language.code}' selected=${selected}>${i18n.translate(language.fullName)}</option>`
  })
  const themes = Object.entries(state.themes.available).map((theme) => {
    const value = theme[0]
    const name = theme[1].name
    const selected = state.themes.active === value
    return html`<option value='${value}' selected=${selected}>${name}</option>`
  })

  const shortcuts = require('./shortcuts')(state, i18n)

  return html`
  <section class="popup-menu" id='options' style='visibility:${state.activeTool === 'options' ? 'visible' : 'hidden'}; color:${state.themes.themeSettings.secondaryTextColor}'>   

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
    <label>${i18n`timeout for generation`}
      <input id='solidsTimeout' type='number' min=0 max=200000 value=${state.design.solidsTimeOut} />
    </label>
  </fieldset>

  ${shortcuts}

</section>`
}

module.exports = options
