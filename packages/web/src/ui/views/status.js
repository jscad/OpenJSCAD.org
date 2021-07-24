const html = require('nanohtml')

// status display
const status = (state, paramsCallbacktoStream) => {
  const status = state.status
  const errorMessage = status.error !== undefined && status.error.message ? `${status.error.message}` : ''
  let errorLine = status.error !== undefined && status.error.lineno ? `Line: ${status.error.lineno}` : ''
  const errorStack = status.error !== undefined && status.error.stack ? `Stack: ${status.error.stack}` : ''

  // for now could not find a way to apss right line number from custom error that knows
  // the correct line number the error originates. So added support for line number inside the message
  if(errorMessage.indexOf('line:') !== -1) errorLine = ''

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
