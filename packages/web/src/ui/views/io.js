const html = require('nanohtml')

const io = (state, i18n) => {
  const formatsList = state.io.availableExportFormats
    .map(({ name, displayName }) => {
      displayName = i18n.translate(displayName)
      const selected = state.io.exportFormat ? state.io.exportFormat.toLowerCase() === name.toLowerCase() : undefined
      return html`<option value=${name} selected='${selected}'>
      ${displayName}
    </option>`
    })

  const exportAvailable = state.io.availableExportFormats.length > 0

  return html`
  <span id='io'>
      <input type="file" value="${i18n`load project`}" id="fileLoader" multiple webkitdirectory mozdirectory msdirectory odirectory directory  />
      <label for="fileLoader"> ${i18n`load project`}> </label>

      <label for="autoReload">${i18n`auto reload`}</label>
        <input type="checkbox" id="autoReload" checked=${state.design.autoReload}/>
      <span id='exports' style='visibility:${exportAvailable ? 'visible' : 'hidden'}'>
        <select id='exportFormats'>
        ${formatsList}
        </select>
        <input type='button' value="${i18n`export`}" id="exportBtn"/>
      </span>
    </span>
    `
}

module.exports = io
