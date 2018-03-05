const isCommonJsModule = string => {
  return string.includes('module.exports') || string.includes('require(')
}

module.exports = isCommonJsModule
