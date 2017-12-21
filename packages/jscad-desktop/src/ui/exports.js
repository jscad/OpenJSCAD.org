const fs = require('fs')
const path = require('path')
const {remote} = require('electron')
const {dialog} = remote

const {supportedFormatsForObjects, formats} = require('../io/formats')
const {prepareOutput} = require('../io/prepareOutput')
const {convertToBlob} = require('../io/convertToBlob')

function updateAvailableExports (outputData, designName, designPath) {
  //console.log('updating list of available exports')
  const availableformatsForData = supportedFormatsForObjects(outputData)

  // const formatsUiElements = formats.map()
  const formatSelector = document.getElementById('exportFormats')
  const formatButton = document.getElementById('exportBtn')

  let format = availableformatsForData[0]
  formatButton.value = `export to ${format}`
  formatSelector.innerHTML = undefined
  formatSelector.onchange = event => {
    format = event.target.value
    const exportText = `export to ${format}`
    formatButton.value = exportText
  }

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

  const formatsToIgnore = ['jscad', 'js']
  availableformatsForData
    .filter(formatName => !formatsToIgnore.includes(formatName))
    .forEach(function (formatName) {
      const formatDescription = formats[formatName].displayName

      const option = document.createElement('option')
      option.value = formatName
      option.text = formatDescription

      formatSelector.add(option)
    })
}

module.exports = {updateAvailableExports}
