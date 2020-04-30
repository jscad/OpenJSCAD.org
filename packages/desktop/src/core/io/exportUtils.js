const path = require('path')
const { head } = require('../../utils/utils')
const { supportedFormatsForObjects, formats } = require('./formats')

const availableExportFormatsFromSolids = (solids) => {
  const formatsToIgnore = ['jscad', 'js']
  const availableExportFormats = supportedFormatsForObjects(solids)
    .filter(formatName => !formatsToIgnore.includes(formatName))
    .map(function (formatName) {
      return { name: formatName, displayName: formats[formatName].displayName }
    })
  const exportFormat = head(availableExportFormats) ? head(availableExportFormats).name : undefined
  return { exportFormat, availableExportFormats }
}

const exportFilePathFromFormatAndDesign = (design, exportFormat) => {
  const extension = exportFormat ? formats[exportFormat].extension : ''
  const defaultFileName = `${design.name}.${extension}`
  const exportFilePath = path.join(design.path, defaultFileName)

  return { exportFilePath }
}

module.exports = {
  availableExportFormatsFromSolids,
  exportFilePathFromFormatAndDesign
}
