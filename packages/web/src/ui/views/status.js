const html = require('nanohtml')

// status display
const status = (state, paramsCallbacktoStream) => {
  const status = state.status
  let errorWhere = ''
  let errorMessage = ''
  let errorStack = ''
  if (status.error) {
    if (status.error.fileName && !status.error.fileName.startsWith('blob')) {
      // syntax errors provide file name, line, and column number
      errorWhere = `${status.error.fileName}:${status.error.lineNumber}:${status.error.columnNumber}`
    }
    errorMessage = `${status.error.name}: ${status.error.message}`
    if (status.error.stack) {
      errorStack = status.error.stack.trim().split('\n').map((s) => html`<ul>${s}</ul>`)
    }
  }

  const statusMessage = status.error !== undefined
    ? html`<span>
    <div id='errormessage'>
      <p>
        ${errorWhere}
      </p>
      <p>
        ${errorMessage}
      </p>
    </div>
    <div id='stacktrace'>
      ${errorStack}
    </div>
  </span>`
    : ''

  const busy = status.busy
  return html`
      <span id='status'>
        ${statusMessage}
        <span id='busy'>${busy ? 'processing, please wait' : ''}</span>
      </span>
  `
}

module.exports = status
