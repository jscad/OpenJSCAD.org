const html = require('bel')

module.exports = function io (state, i18n) {
  const formatsList = state.io.availableExportFormats
  .map(function ({name, displayName}) {
    displayName = i18n.translate(displayName)
    const selected = state.exportForma !== undefined ? state.exportFormat.toLowerCase() === name.toLowerCase() : undefined
    return html`<option value=${name} selected='${selected}'>
      ${displayName}
    </option>`
  })
  const exportAvailable = state.io.availableExportFormats.length > 0
  return html`
  <section id='io'>
  
      <input type="file" value="${i18n`load jscad project`}" id="fileLoader" multiple webkitdirectory mozdirectory msdirectory odirectory directory  />
      <label for="fileLoader"> ${i18n`load jscad project`}> </label>

      <label for="autoReload">${i18n`auto reload`}</label>
        <input type="checkbox" id="autoReload" checked=${state.design.autoReload}/>
      <span id='exports' style='visibility:${exportAvailable ? 'visible' : 'hidden'}'>
        <select id='exportFormats'>
        ${formatsList}
        </select>
        <input type='button' value="${i18n`export`}" id="exportBtn"/>
    </span>
    </section>
    `
}
