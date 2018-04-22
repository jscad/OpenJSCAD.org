
const html = require('bel')

module.exports = function designParameters (state, paramsCallbacktoStream) {
  const status = state.status
  const statusMessage = status.error !== undefined
  ? `Error: ${status.error.message} line: ${status.error.lineno}, filename:${status.error.filename} stack:  ${status.error.stack}` : ''
  const busy = status.busy
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
