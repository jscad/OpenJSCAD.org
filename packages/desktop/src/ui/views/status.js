
const html = require('bel')

module.exports = function designParameters (state, paramsCallbacktoStream) {
  const statusMessage = state.error !== undefined
    ? `Error: ${state.error.message} line: ${state.error.lineno}, filename:${state.error.filename} stack:  ${state.error.stack}` : ''
  const busy = state.busy
  return html`
      <span id='status'>${statusMessage}
        <span id='busy'>${busy ? 'processing, please wait' : ''}</span>
        <span id='appUpdates' style='visibility:${state.appUpdates.available === false ? 'hidden' : 'visible'}'> 
        <a href='${state.appUpdates.releasesUrl}' target="_blank">
          @jscad/desktop version ${state.appUpdates.version} is available! Please click here to view and download
        </a>
      </span>
    </span>
  `
}
