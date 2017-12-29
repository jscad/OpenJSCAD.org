const fs = require('fs')
const path = require('path')
const {remote} = require('electron')
const {dialog} = remote
const html = require('bel')

const {supportedFormatsForObjects, formats} = require('../io/formats')
const {prepareOutput} = require('../io/prepareOutput')
const {convertToBlob} = require('../io/convertToBlob')

function updateAvailableExports (outputData, designName, designPath) {
  console.log('updating list of available exports')
  const availableformatsForData = supportedFormatsForObjects(outputData)
  let format = availableformatsForData[0]

  const formatsToIgnore = ['jscad', 'js']
  const formatsListUI = availableformatsForData
    .filter(formatName => !formatsToIgnore.includes(formatName))
    .map(function (formatName) {
      const formatDescription = formats[formatName].displayName
      return html`<option value=${formatName}>${formatDescription}</option>`
    })

  let formatsUI = html`<span>
    <select id='exportFormats'>
      ${formatsListUI}
    </select>
    <input type='button' value="export to ${format}" id="exportBtn"/>
  </span>`

  const exportsNode = document.getElementById('exports')
  if (exportsNode) {
    while (exportsNode.firstChild) {
      exportsNode.removeChild(exportsNode.firstChild)
    }
  }
  exportsNode.appendChild(formatsUI)

  const formatButton = document.getElementById('exportBtn')

  formatButton.onclick = event => {
    console.log('exporting data to', event.target.value)
    const extension = formats[format].extension
    const defaultFileName = `${designName}.${extension}`
    const defaultFilePath = path.join(designPath, defaultFileName)
    const defaultPath = defaultFilePath
    dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to', defaultPath}, function (filePath) {
      console.log('saving', filePath)
      if (filePath !== undefined) {
        const blob = convertToBlob(prepareOutput(outputData, {format}))
        const toBuffer = require('blob-to-buffer')
        toBuffer(blob, function (err, buffer) {
          if (err) {
            throw new Error(err)
          }
          fs.writeFileSync(filePath, buffer)
        })
        // const buffers = data.map(blob => Buffer.from(blob))
        // let rawData = Buffer.concat(buffers)
      }
    })
  }

  return formatsUI
}

module.exports = {updateAvailableExports}
