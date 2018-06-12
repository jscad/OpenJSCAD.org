const path = require('path')
const {head} = require('../../utils/utils')
const {formats} = require('@jscad/core/io/formats')
const {isCSG, isCAG} = require('@jscad/csg')

const supportedFormatsForObjects = objects => {
  let objectFormats = []
  let foundCSG = false
  let foundCAG = false
  for (let i = 0; i < objects.length; i++) {
    if (isCSG(objects[i])) { foundCSG = true }
    if (isCAG(objects[i])) { foundCAG = true }
  }
  for (let format in formats) {
    if (foundCSG && formats[format].convertCSG === true) {
      objectFormats[objectFormats.length] = format
      continue // only add once
    }
    if (foundCAG && formats[format].convertCAG === true) {
      objectFormats[objectFormats.length] = format
    }
  }
  return objectFormats
}

const availableExportFormatsFromSolids = (solids) => {
  const formatsToIgnore = ['jscad', 'js']
  const availableExportFormats = supportedFormatsForObjects(solids)
    .filter(formatName => !formatsToIgnore.includes(formatName))
    .map(function (formatName) {
      return {name: formatName, displayName: formats[formatName].displayName}
    })
  let exportFormat = head(availableExportFormats) ? head(availableExportFormats).name : undefined
  return {exportFormat, availableExportFormats}
}

const exportFilePathFromFormatAndDesign = (design, exportFormat) => {
  const extension = exportFormat ? formats[exportFormat].extension : ''
  const defaultFileName = `${design.name}.${extension}`
  const exportFilePath = path.join(design.path, defaultFileName)

  return {exportFilePath}
}

module.exports = {
  availableExportFormatsFromSolids,
  exportFilePathFromFormatAndDesign
}
