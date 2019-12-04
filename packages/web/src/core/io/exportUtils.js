const path = require('path')
const { head } = require('../../utils/utils')
const { formats } = require('@jscad/core/io/formats')
const isGeom2 = require('@jscad/modeling').geometry.geom2.isA
const isGeom3 = require('@jscad/modeling').geometry.geom3.isA

const supportedFormatsForObjects = objects => {
  let objectFormats = []
  let foundGeom3 = false
  let foundGeom2 = false
  for (let i = 0; i < objects.length; i++) {
    if (isGeom3(objects[i])) { foundGeom3 = true }
    if (isGeom2(objects[i])) { foundGeom2 = true }
  }
  for (let format in formats) {
    if (foundGeom3 && formats[format].convertGeom3 === true) {
      objectFormats[objectFormats.length] = format
      continue // only add once
    }
    if (foundGeom2 && formats[format].convertGeom2 === true) {
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
      return { name: formatName, displayName: formats[formatName].displayName }
    })
  let exportFormat = head(availableExportFormats) ? head(availableExportFormats).name : undefined
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
