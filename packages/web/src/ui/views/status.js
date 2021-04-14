const html = require('nanohtml')

// status display
const status = (state, paramsCallbacktoStream) => {
  const status = state.status
  const errorMessage = status.error !== undefined && status.error.message ? `${status.error.message}` : ''
  const errorLine = status.error !== undefined && status.error.lineno ? `Line: ${status.error.lineno}` : ''
  const errorStack = status.error !== undefined && status.error.stack ? `Stack: ${status.error.stack}` : ''

  const statusMessage = status.error !== undefined ? html`<span>
    <div>
      ERROR: 
    </div>
    <div>
      ${errorMessage}
    </div>
    <div>
      ${errorLine}
    </div>
    <div>
      ${errorStack}
    </div>
  </span>` : ''

  // ? `Error: ${status.error.message} line: ${status.error.lineno}, filename:${status.error.filename} stack:  ${status.error.stack}` : ''
  // ${statusMessage}
  const busy = status.busy
  return html`
      <span id='status'>
        ${statusMessage}
        <span id='busy'>${busy ? 'processing, please wait' : ''}</span>
      </span>
  `
}

module.exports = status
